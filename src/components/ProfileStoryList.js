import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import Avatar from 'components/Avatar';

const StoryItemContainer = styled.div`margin-bottom: 2rem;`;

const StoryItemTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1rem;
`;

const StoryItemLink = styled(Link)`font-family: inherit;`;

const StoryDescription = styled.p`
  margin-top: 0.4rem;
  font-size: 0.9rem;
  color: #666;
`;

const ProfileStoryList = ({ story, referrer }) => {
  return (
    <StoryItemContainer>
      <StoryItemTitle>
        <StoryItemLink to={{ pathname: `/write/${story.id}`, state: { referrer } }}>
          {story.title}
        </StoryItemLink>
      </StoryItemTitle>
      <Avatar user={story.author} to={{ state: { referrer } }} />
      <StoryDescription>
        {story.description ? story.description : 'No description'}
      </StoryDescription>
    </StoryItemContainer>
  );
};

export default ProfileStoryList;
