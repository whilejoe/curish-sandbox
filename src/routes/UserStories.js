import React from 'react';
// import PageContainer from 'components/PageContainer';
import StoryContainer from 'components/StoryContainer';
import NewItemButton from 'components/NewItemButton';
import SearchStoryList from 'components/SearchStoryList';

const UserStories = ({ userData: { loading, user }, location, ...props }) => {
  if (loading) return <StoryContainer />;
  if (user) {
    return (
      <StoryContainer>
        <h1>Your Stories</h1>
        <NewItemButton
          to={{ pathname: '/write', state: { referrer: location } }}
          title="new story"
        />
        {user.stories && user.stories.length ? (
          user.stories.map(story => (
            <SearchStoryList key={story.id} story={story} referrer={location} />
          ))
        ) : (
          <h2>You haven't written any stories yet. :(</h2>
        )}
      </StoryContainer>
    );
  }
  return <h1>No User</h1>;
};

export default UserStories;
