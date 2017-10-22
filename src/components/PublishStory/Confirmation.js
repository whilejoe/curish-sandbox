import React from 'react';
// import styled from 'styled-components';
import Button from 'components/Button';

class Confirmation extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitCallback();
  };

  render() {
    return (
      <div>
        <h1>Congrats, you've earned a badge!</h1>
        <Button>Take me to my story</Button>
      </div>
    );
  }
}

export default Confirmation;
