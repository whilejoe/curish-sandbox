import React from 'react';
import PageContainer from 'components/PageContainer';
import ProfileHeader from 'components/ProfileHeader';
import ProfileStoryList from 'components/ProfileStoryList';
import { Flex, FlexContent } from 'components/Flex';
import Button from 'components/Button';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';
import NoMatch from 'routes/NoMatch';

const Profile = ({ profile: { loading, User }, location }) => {
  if (loading) return <PageContainer>Loading...</PageContainer>;
  // Since userName is a param on the root url
  // catch the no match here.
  if (!User) return <NoMatch location={location} />;
  const { stories, userName } = User;
  return [
    <SubHeaderPortal key="portal">
      <Flex align="center" justify="space-between">
        <FlexContent space="self">
          <SubHeaderTitle>@{userName}</SubHeaderTitle>
        </FlexContent>
        <FlexContent space="self">
          <Button>Follow</Button>
        </FlexContent>
      </Flex>
    </SubHeaderPortal>,
    <ProfileHeader key="profileHeader" user={User} />,
    <ProfileStoryList key="storyList" stories={stories} referrer={location} />
  ];
};

export default Profile;
