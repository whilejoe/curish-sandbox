import React, { Component } from 'react';
import Button from 'components/Button';
import Container from 'components/Container';
import InputGroup from 'components/InputGroup';
import { Redirect } from 'react-router-dom';
import { isAuthed, startPasswordless, verifyCode } from 'utils/AuthService';

class PasswordlessLogin extends Component {
  state = {
    showCode: false
  };

  isUserAuthed = isAuthed();

  beginLogin = phone => {
    const preparedPhone = this.preparePhone(phone);
    startPasswordless(preparedPhone)
      .then(res => {
        console.log('response in login', res);
        this.setState({ showCode: true });
      })
      .catch(err => console.error('error in login', err));
  };

  verifyLoginCode = (phone, code) => {
    const preparedPhone = this.preparePhone(phone);
    verifyCode(preparedPhone, code)
      .then(res => {
        console.log('response in login', res);
        this.setState({ showCode: true });
      })
      .catch(err => console.error('error in login', err));
  };

  validatePhone = phone => {
    const preparedPhone = this.preparePhone(phone);
    const rgx = /^\+[0-9]{1,15}$/;
    const isValid = rgx.test(preparedPhone);
    console.log('isValid phone number', isValid);
    return !isValid;
  };

  preparePhone(phone) {
    const stripped = phone.replace(/\D/g, '');
    const withCountryCode = `+1${stripped}`;
    return withCountryCode;
  }

  render() {
    // If user is already login redirect to profile
    if (this.isUserAuthed) return <Redirect to={{ pathname: '/profile' }} />;

    const { phone, code } = this.props.authForm.model;
    const { showCode } = this.state;
    if (!showCode)
      return (
        <Container narrow>
          <h1>Login/Join</h1>
          <h3>We'll text you a login code</h3>
          <InputGroup
            autoFocus
            id="phone"
            label="Phone"
            type="tel"
            model="auth.phone"
            mask="999-999-9999"
            maskChar={null}
            placeholder="111-222-3333"
            validators={{
              required: value => !value
              // validate: value => this.validatePhone(value)
            }}
            errorMessages={{
              required: 'Phone number is required'
              // validate: 'Phone number must be valid'
            }}
          />
          <Button onClick={() => this.beginLogin(phone)}>Send Text</Button>
        </Container>
      );
    return (
      <Container narrow>
        <h1>Enter Code!</h1>
        <InputGroup
          autoFocus
          id="code"
          label="Code"
          type="tel"
          model="auth.code"
          validators={{ required: value => !value }}
          errorMessages={{ required: 'Code is required' }}
        />
        <Button onClick={() => this.verifyLoginCode(phone, code)}>Verify Code</Button>
      </Container>
    );
  }
}

export default PasswordlessLogin;
