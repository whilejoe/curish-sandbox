import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import { Link } from 'react-router-dom';
import { AvatarLink } from 'components/Avatar';

const StoryItemContainer = styled.div`margin-bottom: 2rem;`;

const StoryItemTitle = styled.h2`
  margin: 0;
  font-size: 1.4rem;
`;

const ListStory = ({ story }) => (
  <StoryItemContainer>
    <Flex gutters align="center">
      <FlexContent space="self">
        <StoryItemTitle>
          <Link to={`/write/${story.id}`}>{story.title}</Link>
        </StoryItemTitle>
      </FlexContent>
      <FlexContent space="self">
        <AvatarLink user={story.author} />
      </FlexContent>
    </Flex>
  </StoryItemContainer>
);

export default ListStory;
