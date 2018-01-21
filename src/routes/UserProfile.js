import React from 'react';
import StoryContainer from 'components/StoryContainer';
import PageContainer from 'components/PageContainer';
import { ButtonLink } from 'components/Button';
import ProfileHeader from 'components/ProfileHeader';
import { logout } from 'utils/AuthService';

const UserProfile = ({ userResult: { loading, user }, ...props }) => {
  if (loading) return <PageContainer>Loading...</PageContainer>;
  const { email } = user;
  return [
    <ProfileHeader key="header" user={user} />,
    <StoryContainer key="container">
      <p>Email: {email}</p>
      <ButtonLink to="/login" replace onClick={logout}>
        Logout
      </ButtonLink>
    </StoryContainer>
  ];
};

export default UserProfile;
