import React from 'react';
import Container from 'components/Container';
import PageContainer from 'components/PageContainer';
import { ButtonLink } from 'components/Button';
import ProfileHeader from 'components/ProfileHeader';
import { logout } from 'utils/AuthService';

const UserProfile = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <PageContainer>Loading...</PageContainer>;
  const { email } = user;
  return [
    <ProfileHeader key="header" user={user} />,
    <Container key="container">
      <p>Email: {email}</p>
      <ButtonLink to="/login" replace onClick={logout}>
        Logout
      </ButtonLink>
    </Container>
  ];
};

export default UserProfile;
