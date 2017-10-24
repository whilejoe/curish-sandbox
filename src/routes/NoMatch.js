import React from 'react';
import styled from 'styled-components';
import PageContainer from 'components/PageContainer';
import Link from 'components/Link';

const Title = styled.h1`
  margin-top: 25vh;
`;

const NoMatch = ({ location }) => {
  return (
    <PageContainer>
      <Title>{`Whoops, ${location.pathname} doesn't exist :(`}</Title>
      <Link to="/">Head home</Link>
    </PageContainer>
  );
};

export default NoMatch;
