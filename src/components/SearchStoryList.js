import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import Avatar from 'components/Avatar';
import { THEME, SECONDARY_KEY } from 'constants/theme';

const StoryItemContainer = styled.div`
  margin-bottom: 2rem;
`;

const StoryItemHeader = styled.div`
  margin-bottom: 0.4rem;
`;

const StoryItemTitle = styled.h2`
  margin-bottom: 0.2em;
  font-size: 1.1em;
`;

const StoryItemLink = styled(Link)`
  font-family: inherit;
`;

const StoryItemAvatar = styled(Avatar)`
  margin-bottom: 0.5rem;
  display: inline-block;
  line-height: inherit;
`;

const StoryDescription = styled.p`
  font-size: 0.92em;
  color: #333;
`;

const Tags = styled.div`
  margin-top: 0.3em;
  margin-left: -0.2rem;
  margin-right: -0.2rem;
`;

const Tag = styled.span`
  display: inline-block;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
  padding: 0.1rem 0.35rem;
  font-size: 0.82em;
  background-color: ${THEME[SECONDARY_KEY]};
  color: white;
  font-weight: 600;
  border-radius: 2px;
`;

const ListStory = ({ story: { id, titleText, author, tags, description }, referrer }) => {
  return (
    <StoryItemContainer>
      <StoryItemHeader>
        <StoryItemTitle>
          <StoryItemLink to={{ pathname: `/write/${id}`, state: { referrer } }}>
            {titleText}
          </StoryItemLink>
        </StoryItemTitle>
        <StoryItemAvatar user={author} to={{ state: { referrer } }} />
        {tags ? <Tags>{tags.map(tag => <Tag key={tag.id}>{tag.key}</Tag>)}</Tags> : null}
      </StoryItemHeader>
      <StoryDescription>{description ? description : 'No description'}</StoryDescription>
    </StoryItemContainer>
  );
};

export default ListStory;
