import React from 'react';
import Container from 'components/Container';
import PageContainer from 'components/PageContainer';
import Button from 'components/Button';
import ProfileHeader from 'components/ProfileHeader';
import { logout } from 'utils/AuthService';

const UserProfile = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (!user) {
    console.log('!user');
    // determine how to handle this
    return (
      <Container>
        <h1>Sorry you don't exist :(</h1>
      </Container>
    );
  }
  const { email } = user;
  return (
    <div>
      <ProfileHeader user={user} />
      <Container>
        <p>Email: {email}</p>
        <Button onClick={logout}>Logout</Button>
      </Container>
    </div>
  );
};

export default UserProfile;
