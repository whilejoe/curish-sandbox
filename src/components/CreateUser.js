import React from 'react';
import Container from 'components/Container';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import { Redirect } from 'react-router-dom';

const CreateUser = ({
  userResult: { loading, user },
  profileForm: { email, fullName, userName },
  createUser
}) => {
  if (loading) return <div>Loading</div>;

  if (user) {
    console.warn('Already Registered');
    // decide if Redirect is the best way to go
    return <Redirect to={{ pathname: '/profile' }} />;
  }

  const validators = { required: value => !value };
  return (
    <Container narrow>
      <h1>Join</h1>
      <InputGroup
        autoFocus
        id="email"
        label="Email"
        type="email"
        model="profile.email"
        placeholder="me@me.com"
        validators={validators}
        errorMessages={{ required: 'Email is required' }}
      />
      <InputGroup
        id="fullName"
        label="Full Name"
        type="text"
        model="profile.fullName"
        placeholder="Marquis De Sade"
        validators={validators}
        errorMessages={{ required: 'Full Name is required' }}
      />
      <InputGroup
        id="userName"
        label="Username"
        type="text"
        model="profile.userName"
        placeholder="theoriginalsadist"
        validators={validators}
        errorMessages={{ required: 'Username is required' }}
      />
      <Button onClick={() => createUser(email, fullName, userName)}>Join Curish</Button>
    </Container>
  );
};

export default CreateUser;
