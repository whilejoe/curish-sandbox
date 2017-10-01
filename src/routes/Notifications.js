import React from 'react';
import Container from 'components/Container';

const Notifications = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  return (
    <Container>
      <h1>Notifications</h1>
    </Container>
  );
};

export default Notifications;
