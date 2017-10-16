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
    const { storyDescription = '', formDescription = '' } = this.props;
    // console.log('this.props', this.props);
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup
          inputType="textArea"
          currentCount={formDescription ? formDescription.length : 0}
          countMax={MAX_COUNT}
          labelLarge
          id="description"
          label={`${storyDescription
            ? 'Update'
            : 'Add a'} description (${MAX_COUNT} characters or less)`}
          model="publish.description"
          // defaultValue={storyDescription}
          validators={{ required: val => !val, length: val => val.length > MAX_COUNT }}
          errorMessages={{
            required: 'A description is required',
            length: 'Too many characters :('
          }}
        />
        <Button>Next</Button>
      </form>
    );
  }
}

export default Description;
