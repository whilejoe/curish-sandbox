import React from 'react';
import Button from 'components/Button';
import Container from 'components/Container';
import InputGroup from 'components/InputGroup';
import { Redirect } from 'react-router-dom';
import { isAuthed } from 'utils/AuthService';

const Verify = ({ loginForm, verifyForm, verifyLoginCode }) => {
  if (isAuthed()) return <Redirect to="/profile" />;

  const { phone } = loginForm.model;
  const { code } = verifyForm.model;
  return (
    <Container narrow>
      <h1>Enter Code!</h1>
      <InputGroup
        autoFocus
        id="code"
        label="Code"
        type="tel"
        model="verify.code"
        validators={{ required: value => !value }}
        errorMessages={{ required: 'A code is required' }}
      />
      <Button onClick={() => verifyLoginCode(phone, code)}>Verify Code</Button>
    </Container>
  );
};

export default Verify;
