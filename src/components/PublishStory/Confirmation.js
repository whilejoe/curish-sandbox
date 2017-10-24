import React from 'react';
// import styled from 'styled-components';
import { ButtonLink } from 'components/Button';

const Confirmation = ({ story: { id } }) => {
  return (
    <div>
      <h1>Congrats! You've published a story!</h1>
      <ButtonLink replace to={`/story/${id}`}>
        Let's see it
      </ButtonLink>
    </div>
  );
};

export default Confirmation;
