import React from 'react';
import PageContainer from 'components/PageContainer';
import NewItemButton from 'components/NewItemButton';

const UserStories = ({ userResult: { loading, user }, location, ...props }) => {
  if (loading) return <PageContainer>Loading...</PageContainer>;
  return (
    <PageContainer>
      <h1>Your Stories</h1>
      <NewItemButton to={{ pathname: '/write', state: { referrer: location } }} title="new story" />
    </PageContainer>
  );
};

export default UserStories;
