// TODO: Cleanup

import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import store from 'state/store';
import { push, replace } from 'react-router-redux';
import { apolloClient } from 'index';
import { isEnvBrowser } from './env';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const CALLBACK_PATH = '/callback';

// const CALLBACK_URL =
//   process.env.NODE_ENV === 'production'
//     ? `${process.env.URL}${CALLBACK_PATH}`
//     : `http://localhost:3000${CALLBACK_PATH}`;

// can't get netlify env var to work so hardcoding
const CALLBACK_URL =
  process.env.NODE_ENV === 'production'
    ? `https://feature-graphql.curish.com${CALLBACK_PATH}`
    : `http://localhost:3000${CALLBACK_PATH}`;
console.log('callback URL', CALLBACK_URL);
// const REDIRECT = 'http://localhost:3000/callback';
// const SCOPE = 'YOUR_SCOPE';
// const AUDIENCE = 'AUDIENCE_ATTRIBUTE';

const webAuth =
  isEnvBrowser &&
  new auth0.WebAuth({
    clientID: process.env.REACT_APP_AUTH_0_CLIENT_ID,
    domain: process.env.REACT_APP_AUTH_0_DOMAIN,
    redirectUri: CALLBACK_URL,
    responseType: 'id_token token',
    scope: 'openid'
  });

// export const authorize = () => {
//   webAuth.authorize();
// };

export const startPasswordless = phone => {
  return new Promise((resolve, reject) => {
    webAuth.passwordlessStart(
      {
        connection: 'sms',
        send: 'code',
        phoneNumber: phone
      },
      (err, res) => {
        if (err !== null) return reject(err);
        resolve(res);
      }
    );
  });
};

export const verifyCode = (phone, code) => {
  return new Promise((resolve, reject) => {
    webAuth.passwordlessVerify(
      {
        connection: 'sms',
        phoneNumber: phone,
        verificationCode: code
      },
      (err, res) => {
        if (err !== null) return reject(err);
        resolve(res);
      }
    );
  });
};

export const parseHash = () => {
  webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
    if (err) {
      store.dispatch(replace('/login'));
      console.log('parseHash error', err);
      return;
    }
    console.log('parseHash authResult', authResult);
    const { accessToken, idToken } = authResult;
    setAccessToken(accessToken);
    setIdToken(idToken);
    store.dispatch(replace('/'));
    // webAuth.client.userInfo(authResult.accessToken, (err, user) => {
    //   if (err) return console.log('err', err);
    //   // Now you have the user's information
    //   console.log('user', user);
    //   store.dispatch(replace('/'));
    // });
  });
};

// export const logout = () => {
//   webAuth.logout({
//     // returnTo: 'some url here',
//     clientID: 'some client ID here'
//   });
//   clearIdToken();
//   clearAccessToken();
//   store.dispatch(replace('/'));
// };

export const logout = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  apolloClient.resetStore();
  store.dispatch(push('/login'));
  // window.location.reload();
};

// export function requireAuth() {
//   if (!isLoggedIn()) {
//     store.dispatch(replace('/'));
//   }
// }

export const getIdToken = () => (isEnvBrowser ? window.localStorage.getItem(ID_TOKEN_KEY) : null);

export const getAccessToken = () =>
  isEnvBrowser ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;

// Get and store access_token in local storage
export const setAccessToken = accessToken =>
  isEnvBrowser && window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

// Get and store id_token in local storage
export const setIdToken = idToken =>
  isEnvBrowser && window.localStorage.setItem(ID_TOKEN_KEY, idToken);

export const isAuthed = () => {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
};

const getTokenExpirationDate = encodedToken => {
  const token = decode(encodedToken);
  if (!token.exp) return null;

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
};

const isTokenExpired = token => {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
};

// Helper function to extract the access_token and id_token from url hash
const getParameterByName = (name, hash) => {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

export const parseURL = hash => {
  // In case callback url is hit directly and not from Auth0
  // Return t or f to redirect in component
  if (!hash || isAuthed()) return false;
  setAccessToken(getParameterByName('access_token', hash));
  setIdToken(getParameterByName('id_token', hash));
  return true;
};
