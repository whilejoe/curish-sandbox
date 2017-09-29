import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import Link from 'components/Link';

const Title = styled.h1`margin-top: 25vh;`;

const NoMatch = ({ location }) => {
  return (
    <Container>
      <Title>{`Whoops, ${location.pathname} doesn't exist :(`}</Title>
      <Link to="/" exact>
        Head home
      </Link>
    </Container>
  );
};

export default NoMatch;
