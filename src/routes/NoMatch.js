import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h1`margin-top: 25vh;`;

const NoMatch = ({ location }) => {
  return (
    <div>
      <Title>
        Whoops, {location.pathname} doesn't exist :(
      </Title>
      <Link to="/">Head home</Link>
    </div>
  );
};

export default NoMatch;
