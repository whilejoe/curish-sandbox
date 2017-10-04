import React from 'react';
import Button from 'components/Button';
import PageContainer from 'components/PageContainer';
import InputGroup from 'components/InputGroup';
import { Redirect } from 'react-router-dom';
import { isAuthed } from 'utils/AuthService';

const Login = ({ loginForm, beginLogin }) => {
  if (isAuthed()) return <Redirect to="/" />;

  const { phone } = loginForm.model;
  return (
    <PageContainer narrow>
      <h1>Login/Join</h1>
      <p>We'll text you a login code</p>
      <InputGroup
        autoFocus
        id="phone"
        label="Phone"
        type="tel"
        model="login.phone"
        mask="999-999-9999"
        maskChar={null}
        placeholder="111-222-3333"
        validators={{
          required: value => !value
          // validate: value => validatePhone(value)
        }}
        errorMessages={{
          required: 'A phone number is required to log in'
          // validate: 'Phone number must be valid'
        }}
        onKeyDown={e => e.keyCode === 13 && beginLogin(phone)}
      />
      <Button onClick={() => beginLogin(phone)}>Send Text</Button>
    </PageContainer>
  );
};

export default Login;
