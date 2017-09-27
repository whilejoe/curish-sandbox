import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar';

const StoryItemContainer = styled.div`margin-bottom: 2rem;`;

const StoryItemTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.15rem;
  font-size: 1.25rem;
`;

const StoryItemLink = styled(Link)`font-family: inherit;`;

const StoryDescription = styled.p`
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: #666;
`;

const ListStory = ({ story }) => (
  <StoryItemContainer>
    <StoryItemTitle>
      <StoryItemLink to={`/write/${story.id}`}>{story.title}</StoryItemLink>
    </StoryItemTitle>
    <Avatar user={story.author} small />
    <StoryDescription>{story.description ? story.description : 'No description'}</StoryDescription>
  </StoryItemContainer>
);

export default ListStory;
