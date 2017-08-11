import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import InputGroup from 'components/InputGroup';

const AuthButton = styled(Button)`
  display: block;
  margin-bottom: .8rem;
`;

const Auth = props => {
  const {
    user,
    authForm,
    loginWithEmail,
    loginWithFacebook,
    loginWithGoogle,
    registerWithEmail
  } = props;
  const { email, password } = authForm.model;
  return (
    <Container narrow id="container">
      <h1>Login/Join</h1>
      {user.error &&
        <p style={{ color: 'red' }}>
          {user.error}
        </p>}
      <InputGroup
        autoFocus
        id="email"
        label="Email"
        type="email"
        model="auth.email"
        hasValue={email && email.length > 0}
        validators={{ required: value => !value }}
        errorMessages={{ required: 'Email is required' }}
      />
      <InputGroup
        id="password"
        label="Password"
        type="password"
        model="auth.password"
        hasValue={password && password.length > 0}
        onFocus={() => console.log('i got clicked')}
        validators={{ required: value => !value }}
        errorMessages={{ required: 'A password is required' }}
      />
      <AuthButton onClick={() => loginWithEmail(email, password)}>Login With Email</AuthButton>
      <AuthButton theme="secondary" onClick={() => loginWithFacebook()}>
        Login With Facebook
      </AuthButton>
      <AuthButton theme="tertiary" onClick={() => loginWithGoogle()}>
        Login With Google
      </AuthButton>
      <AuthButton onClick={() => registerWithEmail(email, password)}>Create Account</AuthButton>
    </Container>
  );
};

export default Auth;
