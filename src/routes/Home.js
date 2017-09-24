import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { Flex, FlexContent } from 'components/Flex';
import { Input } from 'components/InputGroup';
import Container from 'components/Container';

const Title = styled.h1`
  margin-top: 25vh;
  text-align: center;
`;

const Home = () => {
  return (
    <Container>
      <Title>Curious?</Title>
      <Flex gutters guttersVertical align="flex-end" justify="center">
        <FlexContent space={[100, { sm: 45, md: 40, lg: 30 }]}>
          <Input
            type="text"
            placeholder="search story titles or tags"
            autoFocus
            model="storySearch.search"
          />
        </FlexContent>
        <FlexContent space="self">
          <Button>Search</Button>
        </FlexContent>
      </Flex>
    </Container>
  );
};

export default Home;
