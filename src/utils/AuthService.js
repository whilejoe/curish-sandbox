// TODO: Cleanup

// import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import store from 'state/store';
import { push, replace } from 'react-router-redux';
import { client } from 'index';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const REDIRECT = 'http://localhost:3000/callback';
// const SCOPE = 'YOUR_SCOPE';
// const AUDIENCE = 'AUDIENCE_ATTRIBUTE';

const webAuth = new auth0.WebAuth({
  clientID: process.env.REACT_APP_AUTH_0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH_0_DOMAIN,
  redirectUri: REDIRECT,
  responseType: 'id_token token',
  scope: 'openid'
});

// export const startPasswordless = phone => {
//   webAuth.passwordlessStart(
//     {
//       connection: 'sms',
//       send: 'code',
//       phoneNumber: phone
//     },
//     (err, res) => {
//       // handle errors or continue
//       console.log(err, '<= error, response =>', res);
//     }
//   );
// };

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

// export const verifyCode = (phone, code) => {
//   webAuth.passwordlessVerify(
//     {
//       connection: 'sms',
//       phoneNumber: phone,
//       verificationCode: code
//     },
//     (err, res) => {
//       if (err) {
//         // Handle error
//         console.log('unsuccessful login err', err);
//         return;
//       }
//       console.log('successful response', res);
//       // If successful, save the user's token and proceed
//     }
//   );
// };

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
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  client.resetStore();
  store.dispatch(push('/login'));
  // window.location.reload();
};

// export function requireAuth() {
//   if (!isLoggedIn()) {
//     store.dispatch(replace('/'));
//   }
// }

export const getIdToken = () => localStorage.getItem(ID_TOKEN_KEY);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

// Get and store access_token in local storage
export const setAccessToken = accessToken => localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

// Get and store id_token in local storage
export const setIdToken = idToken => localStorage.setItem(ID_TOKEN_KEY, idToken);

// export function isLoggedIn() {
//   const idToken = getIdToken();
//   return !!idToken && !isTokenExpired(idToken);
// }

// function getTokenExpirationDate(encodedToken) {
//   const token = decode(encodedToken);
//   if (!token.exp) {
//     return null;
//   }

//   const date = new Date(0);
//   date.setUTCSeconds(token.exp);

//   return date;
// }

// function isTokenExpired(token) {
//   const expirationDate = getTokenExpirationDate(token);
//   return expirationDate < new Date();
// }

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name, hash) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export const parseURL = hash => {
  if (hash) {
    const accessToken = getParameterByName('access_token', hash);
    const idToken = getParameterByName('id_token', hash);
    console.log('***** accessToken *****', accessToken);
    console.log('***** idToken *****', idToken);
    if (accessToken && idToken) {
      setAccessToken(accessToken);
      setIdToken(idToken);
      return { idToken, accessToken };
    }
    return null;
  }
  return null;

  // return new Promise((resolve, reject) => {
  //   if (!hash) return reject('no hash to parse');
  //   const accessToken = getParameterByName('access_token', hash);
  //   const idToken = getParameterByName('id_token', hash);
  //   if (!accessToken || !idToken) return reject('no token available');
  //   // console.log('***** accessToken *****', accessToken);
  //   // console.log('***** idToken *****', idToken);
  //   setAccessToken(accessToken);
  //   setIdToken(idToken);
  //   resolve({ idToken, accessToken });
  // });
};