import React from 'react';
import Container from 'components/Container';

const UserStories = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  return (
    <Container>
      <h1>Stories</h1>
    </Container>
  );
};

export default UserStories;
