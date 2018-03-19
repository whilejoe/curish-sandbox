import React from 'react';
import StoryCard from 'components/StoryCard';

const ProfileStoryList = ({ stories, referrer }) => {
  return (
    <div>
      <h2>Stories</h2>
      {stories.length > 0 &&
        stories.map(story => <StoryCard key={story.id} story={story} referrer={referrer} />)}
    </div>
  );
};

export default ProfileStoryList;
