import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import Button from 'components/Button';
import { AUTH_TOKEN } from 'constants/tuts';
// import store from 'state/store';
// import { push } from 'react-router-redux';

class LoginAuth0 extends Component {
  constructor(props) {
    super(props);

    this._lock = new Auth0Lock(props.clientId, props.domain);
  }

  componentDidMount() {
    this._lock.on('authenticated', authResult => {
      console.log('authResult', authResult);
      localStorage.setItem(AUTH_TOKEN, authResult.idToken);
      // store.dispatch(push('/join'));
    });
  }

  _showLogin = () => {
    // this._lock.show({
    //   auth: {
    //     params: { responseType: 'id_token token' }
    //   }
    // });
    this._lock.show();
  };

  render() {
    return <Button onClick={this._showLogin}>Log in with Auth0</Button>;
  }
}

export default LoginAuth0;
