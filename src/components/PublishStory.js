import React from 'react';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
// import { isAuthed } from 'utils/AuthService';

const PublishStory = ({ publishForm: { description } }) => {
  const validators = { required: value => !value };
  return (
    <div>
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
      <Button>Next</Button>
    </div>
  );
};

export default PublishStory;
