import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar';
import { getMonthDayYear } from 'utils/date';

const StoryItemContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1.1rem 1rem 0.6rem;
  background: #fdfdfd;
  border: 1px solid #efefef;
  border-radius: 2px;
  box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.1);
`;

const StoryItemTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.12em;
  font-size: 1.18em;
`;

const StoryLink = styled(Link)`
  font-family: inherit;
  font-weight: inherit;
`;

const StoryItemAvatar = styled(Avatar)`
  margin-bottom: 0.55rem;
  display: inline-block;
  line-height: inherit;
  font-weight: 400;
`;

const StoryDescription = styled.p`
  margin-bottom: 0.6rem;
  font-size: 0.9em;
  color: #777;
`;

const PublishedAt = styled.p`
  margin-bottom: 0.3rem;
  font-size: 0.82em;
  color: #555;
  text-align: right;
`;

const Tags = styled.div`
  margin-left: -0.2rem;
  margin-right: -0.2rem;
  text-align: right;
`;

const Tag = styled.span`
  display: inline-block;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
  padding: 0.1rem 0.35rem;
  vertical-align: bottom;
  font-size: 0.75em;
  background-color: #eee;
  font-weight: 600;
  border-radius: 2px;
`;

const StoryCard = ({
  story: { id, published, updatedAt, titleText, author, tags, description },
  referrer
}) => {
  return (
    <StoryItemContainer>
      <Flex gutters guttersVertical>
        <FlexContent space={[100, { sm: 'reset' }]}>
          <StoryItemTitle>
            <StoryLink to={{ pathname: `/write/${id}`, state: { referrer } }}>
              {titleText}
            </StoryLink>
          </StoryItemTitle>
          {author && <StoryItemAvatar user={author} to={{ state: { referrer } }} />}
          <StoryDescription>{description ? description : 'No description'} </StoryDescription>
        </FlexContent>
        <FlexContent space={[100, { sm: 'self' }]}>
          {published && <PublishedAt>{getMonthDayYear(updatedAt)}</PublishedAt>}
          {tags &&
            tags.length > 0 && <Tags>{tags.map(tag => <Tag key={tag.id}>#{tag.key}</Tag>)}</Tags>}
        </FlexContent>
      </Flex>
    </StoryItemContainer>
  );
};

export default StoryCard;