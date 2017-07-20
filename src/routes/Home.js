import React from 'react';
import Button from 'components/Button';
import styled from 'styled-components';

const HomeContainer = styled.div`
  margin-top: 26vh;
  text-align: center;
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>Curious?</h1>
      <input type="text" placeholder="search story titles/tags" autoFocus />
      <Button>Search</Button>
    </HomeContainer>
  );
};

export default Home;
