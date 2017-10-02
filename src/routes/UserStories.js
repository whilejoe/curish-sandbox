import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import NewItemButton from 'components/NewItemButton';

const UserStories = ({ userResult: { loading, user }, location, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  return (
    <Container>
      <Flex gutters align="center">
        <FlexContent>
          <h1>Stories</h1>
        </FlexContent>
        <FlexContent space="self">
          <NewItemButton
            to={{ pathname: '/write', state: { referrer: location } }}
            title="new story"
          />
        </FlexContent>
      </Flex>
    </Container>
  );
};

export default UserStories;
