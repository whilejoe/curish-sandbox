import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import Avatar from 'components/Avatar';

const StoryItemContainer = styled.div`margin-bottom: 2rem;`;

const StoryItemHeader = styled.div`
  margin-top: 0;
  margin-bottom: 0.4rem;
`;

const StoryItemTitle = styled.h3`
  display: inline-block;
  margin-top: 0;
  margin-right: 0.8rem;
  margin-bottom: 0;
  vertical-align: middle;
`;

const StoryItemLink = styled(Link)`
  font-family: inherit;
  font-size: 1.2rem;
`;

const StoryDescription = styled.p`
  margin-top: 0.8rem;
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
