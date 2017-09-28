import React from 'react';
import Container from 'components/Container';
import Button from 'components/Button';
import ProfileHeader from 'components/ProfileHeader';
import { logout } from 'utils/AuthService';

const UserProfile = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  if (!user) {
    console.log('!user');
    // determine how to handle this
    return (
      <Container>
        <h1>Sorry you don't exist :(</h1>
      </Container>
    );
  }
  const { userName, email, createdAt } = user;
  const joinedDate = new Date(createdAt).getFullYear();
  return (
    <div>
      <ProfileHeader user={user} />
      <Container>
        <p>Username: @{userName}</p>
        <p>Email: {email}</p>
        <p>Year Joined: {joinedDate}</p>
        <Button onClick={logout}>Logout</Button>
      </Container>
    </div>
  );
};

export default UserProfile;
