import React from 'react';
import StoryContainer from 'components/StoryContainer';
import StoryCard from 'components/StoryCard';

const ProfileStoryList = ({ stories, referrer }) => {
  return (
    <StoryContainer>
      <h2>Stories</h2>
      {stories.length > 0 &&
        stories.map(story => <StoryCard key={story.id} story={story} referrer={referrer} />)}
    </StoryContainer>
  );
};

export default ProfileStoryList;
