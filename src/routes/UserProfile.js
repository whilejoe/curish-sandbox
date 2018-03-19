import React from 'react';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import { ButtonLink } from 'components/Button';
import ProfileHeader from 'components/ProfileHeader';
import { logout } from 'utils/AuthService';

const UserProfile = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <Container>Loading...</Container>;
  const { email } = user;
  return (
    <PageContainer>
      <Container>
        <ProfileHeader user={user} />
        <p>Email: {email}</p>
        <ButtonLink to="/login" replace onClick={logout}>
          Logout
        </ButtonLink>
      </Container>
    </PageContainer>
  );
};

export default UserProfile;
