import React from 'react';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

const MAX_COUNT = 160;

class Description extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitCallback();
  };

  render() {
    const { formDescription = '' } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup
          inputType="textArea"
          id="description"
          currentCount={formDescription ? formDescription.length : 0}
          countMax={MAX_COUNT}
          labelLarge
          label={`Describe your story in ${MAX_COUNT} characters or less`}
          model="publish.description"
          // defaultValue={storyDescription}
          validators={{ required: val => !val, length: val => val.length > MAX_COUNT }}
          errorMessages={{
            required: 'A description is required',
            length: 'Too many characters :('
          }}
        />
        <Button type="submit">Next</Button>
      </form>
    );
  }
}

export default Description;
