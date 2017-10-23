import React from 'react';
import PageContainer from 'components/PageContainer';
import ProfileHeader from 'components/ProfileHeader';
import ProfileStoryList from 'components/ProfileStoryList';
import NoMatch from 'routes/NoMatch';

const Profile = ({ profile: { loading, User }, location }) => {
  if (loading) return <PageContainer>Loading...</PageContainer>;
  // Since userName is a param on the root url
  // catch the no match here.
  if (!User) return <NoMatch location={location} />;
  const { stories } = User;
  return [
    <ProfileHeader key="profileHeader" user={User} />,
    <ProfileStoryList key="storyList" stories={stories} referrer={location} />
  ];
};

export default Profile;
