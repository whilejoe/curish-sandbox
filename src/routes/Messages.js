import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import NewItemButton from 'components/NewItemButton';

const Messages = ({ userResult: { loading, user }, location, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  return (
    <Container>
      <Flex gutters align="center">
        <FlexContent>
          <h1>Messages</h1>
        </FlexContent>
        <FlexContent space="self">
          <NewItemButton
            to={{ pathname: '/message', state: { referrer: location } }}
            title="new message"
          />
        </FlexContent>
      </Flex>
    </Container>
  );
};

export default Messages;
