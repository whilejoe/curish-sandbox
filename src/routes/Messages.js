import React from 'react';
import Container from 'components/Container';

const Messages = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  return (
    <Container>
      <h1>Messages</h1>
    </Container>
  );
};

export default Messages;
