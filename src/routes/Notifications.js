import React from 'react';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';

const Notifications = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  return (
    <PageContainer>
      <Container>
        <h1>Notifications</h1>
      </Container>
    </PageContainer>
  );
};

export default Notifications;
