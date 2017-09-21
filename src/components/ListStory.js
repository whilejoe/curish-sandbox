import React from 'react';
import styled from 'styled-components';
// import { Flex, FlexContent } from 'components/Flex';
import { Link } from 'react-router-dom';
import { AvatarLink } from 'components/Avatar';

const StoryItemContainer = styled.div`margin-bottom: 2rem;`;

const StoryItemTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.15rem;
  font-size: 1.25rem;
`;

const StoryDescription = styled.p`
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: #666;
`;

const ListStory = ({ story }) => (
  <StoryItemContainer>
    <StoryItemTitle>
      <Link to={`/write/${story.id}`}>{story.title}</Link>
    </StoryItemTitle>
    <AvatarLink user={story.author} small />
    <StoryDescription>{story.description ? story.description : 'No description'}</StoryDescription>
  </StoryItemContainer>
);

export default ListStory;
