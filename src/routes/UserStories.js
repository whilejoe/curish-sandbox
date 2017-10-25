import React from 'react';
import StoryContainer from 'components/StoryContainer';
import NewItemButton from 'components/NewItemButton';
import StoryCard from 'components/StoryCard';

const UserStories = ({ userData: { loading, user }, location, ...props }) => {
  if (loading || !user) return <StoryContainer />;
  return (
    <StoryContainer>
      <h1>Your Stories</h1>
      <NewItemButton to={{ pathname: '/write', state: { referrer: location } }} title="new story" />
      {user.stories && user.stories.length > 0 ? (
        user.stories.map(story => <StoryCard key={story.id} story={story} referrer={location} />)
      ) : (
        <h2>You haven't written any stories yet :(</h2>
      )}
    </StoryContainer>
  );
};

export default UserStories;
