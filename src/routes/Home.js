import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { Flex, FlexContent } from 'components/Flex';
import { InputText } from 'components/InputGroup';
import PageContainer from 'components/PageContainer';
import UserHome from 'routes/UserHome';
import { isAuthed } from 'utils/auth';

const Title = styled.h1`
  margin-top: 25vh;
  text-align: center;
`;

const Home = ({ userResult }) => {
  if (!isAuthed()) {
    return (
      <PageContainer>
        <Title>Curious?</Title>
        <Flex gutters guttersVertical align="center" justify="center">
          <FlexContent space={[100, { sm: 45, md: 40, lg: 30 }]}>
            <InputText
              type="text"
              placeholder="search story titles or tags"
              autoFocus
              model="search.search"
            />
          </FlexContent>
          <FlexContent space="self">
            <Button>Search</Button>
          </FlexContent>
        </Flex>
      </PageContainer>
    );
  }
  return <UserHome userResult={userResult} />;
};

export default Home;
