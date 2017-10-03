import React from 'react';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import NewItemButton from 'components/NewItemButton';

const UserStories = ({ userResult: { loading, user }, location, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  return (
    <PageContainer>
      <Container>
        <h1>Messages</h1>
        <NewItemButton
          to={{ pathname: '/write', state: { referrer: location } }}
          title="new story"
        />
      </Container>
    </PageContainer>
  );
};

export default UserStories;
