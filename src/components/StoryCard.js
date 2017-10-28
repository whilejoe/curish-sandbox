import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import Link from 'components/Link';
import Avatar from 'components/Avatar';
import TagLink, { TagsContainer } from 'components/Tag';
import media from 'utils/media';
import { getMonthDayYear } from 'utils/date';
import orderBy from 'lodash/orderBy';

const StoryItemContainer = styled.div`
  margin-bottom: 1rem;
  padding: 0.95rem 1rem 0.9rem;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  box-shadow: 0px 2px 15px -3px rgba(0, 0, 0, 0.1);
`;

const StoryItemTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.1em;
  font-size: 1.1em;
`;

const StoryLink = styled(Link)`
  font-family: inherit;
  font-weight: inherit;
`;

const StoryItemAvatar = styled(Avatar)`
  margin-bottom: 0.55rem;
  display: inline-block;
  font-size: 0.9em;
  line-height: inherit;
  font-weight: 400;
`;

const StoryDescription = styled.p`
  margin-bottom: 0;
  font-size: 0.85em;
  color: #777;
`;

const PublishedAt = styled.p`
  margin-bottom: 0.3rem;
  font-size: 0.75em;
  color: #666;
  line-height: 1.2;
  text-align: left;
  ${media.sm`text-align: right;`};
`;

const StoryTags = TagsContainer.extend`
  text-align: left;
  ${media.sm`text-align: right;`};
`;

const matchTags = (matchVal = '', tags = [], referrer) => {
  // TODO: Move ordering to apollo
  const ordered = orderBy(tags, 'key', 'asc');
  const matched = ordered.map(tag => {
    const matches = matchVal ? tag.key.toLowerCase().includes(matchVal.toLowerCase()) : false;
    return <TagLink key={tag.id} matches={matches} tagName={tag.key} referrer={referrer} />;
  });
  return matched;
};

const StoryCard = ({
  story: { id, published, updatedAt, titleText, author, tags = [], description },
  referrer,
  matchValue = '',
  onMouseOverCallback
}) => {
  return (
    <StoryItemContainer>
      <Flex gutters guttersVertical>
        <FlexContent space={[100, { sm: 'reset' }]}>
          <StoryItemTitle>
            <StoryLink
              to={{ pathname: `/${published ? 'story' : 'edit'}/${id}`, state: { referrer } }}
              onMouseOver={onMouseOverCallback}
            >
              {titleText || 'Untitled'}
            </StoryLink>
          </StoryItemTitle>
          {author && <StoryItemAvatar user={author} to={{ state: { referrer } }} />}
          <StoryDescription>{description ? description : 'No description'} </StoryDescription>
        </FlexContent>
        <FlexContent space={[100, { sm: 30, md: 25 }]}>
          {published && <PublishedAt>{getMonthDayYear(updatedAt)}</PublishedAt>}
          {tags.length > 0 && <StoryTags>{matchTags(matchValue, tags, referrer)}</StoryTags>}
        </FlexContent>
      </Flex>
    </StoryItemContainer>
  );
};

export default StoryCard;
