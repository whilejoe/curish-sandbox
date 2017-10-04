import React from 'react';
import PageContainer from 'components/PageContainer';

const Notifications = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <PageContainer>Loading...</PageContainer>;
  return (
    <PageContainer>
      <h1>Notifications</h1>
    </PageContainer>
  );
};

export default Notifications;
