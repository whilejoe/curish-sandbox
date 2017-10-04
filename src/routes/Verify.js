import React from 'react';
import Button from 'components/Button';
import PageContainer from 'components/PageContainer';
import InputGroup from 'components/InputGroup';
import { Redirect } from 'react-router-dom';
import { isAuthed } from 'utils/AuthService';

const Verify = ({ loginForm, verifyForm, verifyLoginCode }) => {
  if (isAuthed()) return <Redirect to="/" />;

  const { phone } = loginForm.model;
  const { code } = verifyForm.model;
  return (
    <PageContainer narrow>
      <h1>Enter Code!</h1>
      <InputGroup
        autoFocus
        id="code"
        label="Code"
        type="tel"
        model="verify.code"
        validators={{ required: value => !value }}
        errorMessages={{ required: 'A code is required' }}
        onKeyDown={e => e.keyCode === 13 && verifyLoginCode(phone, code)}
      />
      <Button onClick={() => verifyLoginCode(phone, code)}>Verify Code</Button>
    </PageContainer>
  );
};

export default Verify;
