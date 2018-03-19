import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';

const UserHome = ({ userResult }) => {
  if (userResult.loading) return <Container>Loading....</Container>;
  return (
    <PageContainer>
      <Container>
        <h1>Updates</h1>
        <Flex gutters guttersVertical>
          <FlexContent>
            <p>Is being built</p>
          </FlexContent>
        </Flex>
      </Container>
    </PageContainer>
  );
};

export default UserHome;
