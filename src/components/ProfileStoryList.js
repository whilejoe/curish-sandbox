import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import Avatar from 'components/Avatar';

const StoryItemContainer = styled.div`
  margin-bottom: 1rem;
`;

const StoryItemTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.05em;
`;

const StoryItemLink = styled(Link)`
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
`;

const StoryDescription = styled.p`
  margin-top: 0.4em;
  font-size: 0.9em;
  color: #666;
`;

const ProfileStoryList = ({ story: { id, titleText, author, description }, referrer }) => {
  return (
    <StoryItemContainer>
      <StoryItemTitle>
        <StoryItemLink to={{ pathname: `/story/${id}`, state: { referrer } }}>
          {titleText}
        </StoryItemLink>
      </StoryItemTitle>
      <Avatar user={author} />
      <StoryDescription>{description}</StoryDescription>
    </StoryItemContainer>
  );
};

export default ProfileStoryList;
