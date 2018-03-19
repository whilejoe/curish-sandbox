import React from 'react';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import ProfileHeader from 'components/ProfileHeader';
import ProfileStoryList from 'components/ProfileStoryList';
import { Flex, FlexContent } from 'components/Flex';
import Button from 'components/Button';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';
import NoMatch from 'routes/NoMatch';

const Profile = ({ profile: { loading, User }, location }) => {
  if (loading) return <Container>Loading...</Container>;
  // Since userName is a param on the root url
  // catch the no match here.
  if (!User) return <NoMatch location={location} />;
  const { stories, userName } = User;
  return (
    <PageContainer>
      <Container>
        <SubHeaderPortal>
          <Flex align="center" justify="space-between">
            <FlexContent space="self">
              <SubHeaderTitle>@{userName}</SubHeaderTitle>
            </FlexContent>
            <FlexContent space="self">
              <Button>Follow</Button>
            </FlexContent>
          </Flex>
        </SubHeaderPortal>
        <ProfileHeader user={User} />
        <ProfileStoryList stories={stories} referrer={location} />
      </Container>
    </PageContainer>
  );
};

export default Profile;
