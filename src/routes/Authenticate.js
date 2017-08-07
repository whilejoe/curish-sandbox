import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const LoginButton = styled(Button)`
  display: block;
  margin-bottom: 1rem;
`;

class Authenticate extends Component {
  state = {
    email: '',
    password: '',
    userCreated: false
  };

  handleCreateAccount = () => {
    const { email, password } = this.state;
    this.props.createUserWithEmail(email, password);
  };

  render() {
    const { user } = this.props;
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login/Create Account</h1>
        {user.error &&
          <p style={{ color: 'red' }}>
            {user.error}
          </p>}
        <p>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            autoFocus
          />
        </p>
        <p>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </p>
        <LoginButton
          onClick={() => email && password && this.props.loginUserWithEmail(email, password)}
        >
          Login With Email
        </LoginButton>
        <LoginButton theme="secondary" onClick={() => this.props.loginUserWithFacebook()}>
          Login With Facebook
        </LoginButton>
        <LoginButton theme="tertiary" onClick={() => this.props.loginUserWithGoogle()}>
          Login With Google
        </LoginButton>
        <LoginButton onClick={() => email && password && this.handleCreateAccount()}>
          Create Account
        </LoginButton>
      </div>
    );
  }
}

export default Authenticate;
