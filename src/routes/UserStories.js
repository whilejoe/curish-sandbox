import React from 'react';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import NewItemButton from 'components/NewItemButton';
import StoryCard from 'components/StoryCard';
import StoryCardLoading from 'components/StoryCardLoading';

const UserStories = ({ userData: { loading, user }, location, ...props }) => {
  return (
    <PageContainer>
      <Container>
        <h1>My Stories</h1>
        <NewItemButton
          to={{ pathname: '/write', state: { referrer: location } }}
          title="new story"
        />
        {!loading ? (
          user.stories && user.stories.length > 0 ? (
            user.stories.map(story => (
              <StoryCard key={story.id} story={story} referrer={location} />
            ))
          ) : (
            <h2>You haven't written any stories yet :(</h2>
          )
        ) : (
          [<StoryCardLoading key="1" />, <StoryCardLoading key="2" />, <StoryCardLoading key="3" />]
        )}
      </Container>
    </PageContainer>
  );
};

export default UserStories;
