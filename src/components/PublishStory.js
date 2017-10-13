import React from 'react';
import styled from 'styled-components';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import { THEME, ERROR_KEY, SECONDARY_KEY } from 'constants/theme';

const PublishInputGroup = styled(InputGroup)`
  margin-top: 0.9rem;
  position: relative;

  &:after {
    position: absolute;
    content: '';
    height: 3px;
    width: ${props => props.count / 160 * 100}%;
    max-width: 100%;
    background-color: ${props => (props.count > 160 ? THEME[ERROR_KEY] : THEME[SECONDARY_KEY])};
    bottom: 5px;
    left: 0;
    border-radius: 2px;
    transition: width 200ms ease-out;
  }
`;

const InputTitle = styled.p`
  margin-bottom: 0;
  font-size: 1.05em;
  color: #444;
`;

const PublishStory = ({
  publishForm: { description },
  storyData: { Story },
  updateStoryMutation,
  updatePublishStory
}) => {
  console.log('Story', Story);
  const validators = { required: val => !val, length: val => val.length > 160 };
  return (
    <div>
      <InputTitle>Add a description (160 characters or less)</InputTitle>
      <PublishInputGroup
        inputType="textArea"
        count={description ? description.length : 0}
        id="description"
        label="Add a description"
        model="publish.description"
        defaultValue={Story.description}
        validators={validators}
        errorMessages={{ required: 'A description is required', length: 'Too many characters :(' }}
      />
      <Button onClick={() => updatePublishStory(description)}>Next</Button>
    </div>
  );
};

export default PublishStory;
