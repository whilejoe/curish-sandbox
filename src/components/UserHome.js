import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';

const UserHome = ({ userResult }) => {
  if (userResult.loading) return <Container>Loading....</Container>;
  // add logic to redirect when user doesn't exist.
  return (
    <div>
      <Container>
        <h1>Updates</h1>
        <Flex gutters guttersVertical>
          <FlexContent>
            <p>placeholder</p>
          </FlexContent>
        </Flex>
      </Container>
    </div>
  );
};

export default UserHome;
