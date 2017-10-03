import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import Avatar from 'components/Avatar';

const StoryItemContainer = styled.div`margin-bottom: 2rem;`;

const StoryItemHeader = styled.div`margin-bottom: 0.4rem;`;

const StoryItemTitle = styled.h3`margin-bottom: 0.1em;`;

const StoryItemLink = styled(Link)`font-family: inherit;`;

const StoryDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const ListStory = ({ story, referrer }) => {
  return (
    <StoryItemContainer>
      <StoryItemHeader>
        <StoryItemTitle>
          <StoryItemLink to={{ pathname: `/write/${story.id}`, state: { referrer } }}>
            {story.title}
          </StoryItemLink>
        </StoryItemTitle>
        <Avatar user={story.author} to={{ state: { referrer } }} />
      </StoryItemHeader>
      <StoryDescription>
        {story.description ? story.description : 'No description'}
      </StoryDescription>
    </StoryItemContainer>
  );
};

export default ListStory;
