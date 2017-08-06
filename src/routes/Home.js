import React from 'react';
import Button from 'components/Button';
import { Flex, FlexContent } from 'components/Flex';
import styled from 'styled-components';

const Title = styled.h1`text-align: center;`;

const Input = styled.input`
  padding: .5rem;
  font-size: 1rem;
`;

const SearchButton = styled(Button)`
  height: 100%;
`;

const Home = () => {
  return (
    <div>
      <Title>Curious?</Title>
      <Flex gutters guttersVertical justify="center">
        <FlexContent space="self">
          <Input type="text" placeholder="search story titles/tags" autoFocus />
        </FlexContent>
        <FlexContent space="self">
          <SearchButton theme="tertiary" large>
            Search
          </SearchButton>
        </FlexContent>
      </Flex>
    </div>
  );
};

export default Home;
