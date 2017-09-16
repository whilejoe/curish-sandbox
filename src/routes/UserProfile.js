import React from 'react';
import Container from 'components/Container';
import Button from 'components/Button';
import { logout } from 'utils/AuthService';

const UserProfile = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <div>Loading</div>;
  if (!user) {
    console.log('!user');
    // determine how to handle this
    return (
      <Container>
        <h1>Sorry you don't exist :(</h1>
      </Container>
    );
  }
  const { fullName, userName, email, createdAt } = user;
  const joinedDate = new Date(createdAt).getFullYear();
  return (
    <Container>
      <h1>Profile</h1>
      <p>Username: @{userName}</p>
      <p>Full Name: {fullName}</p>
      <p>Email: {email}</p>
      <p>Year Joined: {joinedDate}</p>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

export default UserProfile;
