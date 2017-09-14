import React from 'react';
import { gql, graphql } from 'react-apollo';
import Container from 'components/Container';
import Button from 'components/Button';
import { logout } from 'utils/AuthService';

const UserProfile = ({ data: { loading, user, refetch } }) => {
  if (loading) return <div>Loading</div>;
  if (!user) {
    // is this a better approach than fetchPolicy to make
    // the user query reload data after creating a user?
    refetch();
    console.log('!user');
    // determine how to handle this.
    return <Button onClick={logout}>Logout</Button>;
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

export const USER_PROFILE_QUERY = gql`
  query {
    user {
      id
      fullName
      userName
      email
      createdAt
    }
  }
`;

export default graphql(USER_PROFILE_QUERY)(UserProfile);
