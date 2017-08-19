import React from 'react';
import Container from 'components/Container';
import Avatar from 'components/Avatar';
import Button from 'components/Button';

const Profile = ({ user, logoutUser }) => {
  const { photoURL, displayName, userName, email, userSince } = user;
  const joinedDate = new Date(userSince).getFullYear();
  return (
    <Container>
      <h1>Profile</h1>
      <p>
        <Avatar src={photoURL} alt="user-profile" name={userName} />
      </p>
      <p>
        Full Name: {displayName}
      </p>
      <p>
        Email: {email}
      </p>
      <p>
        Year Joined: {joinedDate}
      </p>
      <Button onClick={logoutUser}>Logout</Button>
    </Container>
  );
};

export default Profile;
