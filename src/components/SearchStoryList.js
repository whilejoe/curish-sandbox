import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import Link from 'components/Link';
import Avatar from 'components/Avatar';
import { THEME, SECONDARY_KEY } from 'constants/theme';

const StoryItemContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1.1rem 1rem 0.6rem;
  background: #fdfdfd;
  border: 1px solid #efefef;
  border-radius: 2px;
  box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.1);
`;

const StoryItemHeader = styled.div`
  margin-bottom: 0.4rem;
`;

const StoryItemTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.12em;
  font-size: 1.18em;
`;

const StoryItemAvatar = styled(Avatar)`
  margin-bottom: 0.15rem;
  display: inline-block;
  line-height: inherit;
  font-weight: 400;
`;

const StoryDescription = styled.p`
  margin-bottom: 0.6rem;
  font-size: 0.9em;
  color: #777;
`;

const Tags = styled.div`
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
        <Flex gutters justify="space-between">
          <FlexContent space="self">
            <StoryItemTitle>{titleText}</StoryItemTitle>
            <StoryItemAvatar user={author} to={{ state: { referrer } }} />
          </FlexContent>
          <FlexContent space="self">
            {tags ? <Tags>{tags.map(tag => <Tag key={tag.id}>{tag.key}</Tag>)}</Tags> : null}
          </FlexContent>
        </Flex>
      </StoryItemHeader>
      <StoryDescription>
        {description ? description : 'No description'}{' '}
        <Link to={{ pathname: `/write/${id}`, state: { referrer } }}>read</Link>
      </StoryDescription>
    </StoryItemContainer>
  );
};

export default ListStory;
