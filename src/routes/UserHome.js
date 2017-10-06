import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import PageContainer from 'components/PageContainer';

const UserHome = ({ userResult }) => {
  if (userResult.loading) return <PageContainer>Loading....</PageContainer>;
  // add logic to redirect when user doesn't exist.
  return (
    <PageContainer>
      <h1>Updates</h1>
      <Flex gutters guttersVertical>
        <FlexContent>
          <p>placeholder</p>
        </FlexContent>
      </Flex>
    </PageContainer>
  );
};

export default UserHome;
