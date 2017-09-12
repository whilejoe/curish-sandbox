import auth0 from 'auth0-js';
import store from 'state/store';
import { replace } from 'react-router-redux';

// const ID_TOKEN_KEY = 'id_token';
// const ACCESS_TOKEN_KEY = 'access_token';
// const CLIENT_ID = 'uUid5o9vKnYu72bsKlTIgLnd84y6Ag7r';
// const CLIENT_DOMAIN = 'curish.auth0.com';
// const REDIRECT = 'http://localhost:3000/callback';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'curish.auth0.com',
    clientID: 'uUid5o9vKnYu72bsKlTIgLnd84y6Ag7r',
    redirectUri: 'http://localhost:3000',
    audience: 'https://curish.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        store.dispatch(replace('/'));
      } else if (err) {
        store.dispatch(replace('/'));
        console.log(err);
      }
    });
  };

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    store.dispatch(replace('/'));
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    store.dispatch(replace('/'));
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
}
