import React from 'react';
import Button from 'components/Button';
import Container from 'components/Container';
import InputGroup from 'components/InputGroup';

const CreateProfile = props => {
  const { user, registerForm, createAppUser } = props;
  const { userName, fullName } = registerForm.model;
  const userData = {
    userName,
    displayName: fullName
  };
  return (
    <Container narrow>
      <h1>Complete Profile</h1>
      <InputGroup
        autoFocus
        id="fullName"
        label="Full Name"
        type="text"
        model="register.fullName"
        defaultValue={user.displayName}
        placeholder="Marquis De Sade"
        hasValue={fullName && fullName.length > 0}
        validators={{ required: value => !value }}
        errorMessages={{ required: 'Full Name is required' }}
      />
      <InputGroup
        id="userName"
        label="username"
        type="text"
        model="register.userName"
        placeholder="theoriginalsadist"
        hasValue={userName && userName.length > 0}
        validators={{ required: value => !value }}
        errorMessages={{ required: 'username is required' }}
      />
      <Button onClick={() => createAppUser(userData)}>complete profile</Button>
    </Container>
  );
};

export default CreateProfile;
