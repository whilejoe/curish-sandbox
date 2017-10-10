import React from 'react';
import styled from 'styled-components';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
// import { isAuthed } from 'utils/AuthService';

const PublishInputGroup = styled(InputGroup)`
  margin-top: 0.9rem;
`;

const InputTitle = styled.p`
  margin-bottom: 0;
  font-size: 1.05em;
  color: #444;
`;

const PublishStory = ({ publishForm: { description } }) => {
  const validators = { required: value => !value };
  return (
    <div>
      <InputTitle>Add a description (the best are 160 characters or less)</InputTitle>
      <PublishInputGroup
        inputType="textArea"
        autoFocus
        id="description"
        label="Add a description"
        model="publishForm.description"
        validators={validators}
        errorMessages={{ required: 'A description is required' }}
      />
      <Button>Next</Button>
    </div>
  );
};

export default PublishStory;