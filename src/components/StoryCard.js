import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent, FlexColumn } from 'components/Flex';
import Link from 'components/Link';
import Avatar from 'components/Avatar';
import ListCard from 'components/ListCard';
import TagLink, { TagsContainer } from 'components/Tag';
import media from 'utils/media';
import { getMonthDayYear } from 'utils/date';

const StoryLink = styled(Link)`
  font-family: inherit;
  font-weight: inherit;
`;

const StoryAvatar = styled(Avatar)`
  margin-bottom: 0.55rem;
  display: inline-block;
  font-size: 0.9em;
  line-height: inherit;
  font-weight: 400;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.1em;
  font-size: 1.1em;
`;

const Description = styled.p`
  margin-bottom: 0;
  font-size: 0.85em;
  color: #777;
`;

const PublishedAt = styled.p`
  margin-bottom: 0.6rem;
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
  const matched = tags.map(tag => {
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
    <ListCard>
      <Flex gutters guttersVertical>
        <FlexContent space={[100, { sm: 'reset' }]}>
          <Flex noWrap align="center">
            <FlexContent>
              <Title>
                <StoryLink
                  to={{ pathname: `/${published ? 'story' : 'edit'}/${id}`, state: { referrer } }}
                  onMouseOver={onMouseOverCallback}
                >
                  {titleText || 'Untitled'}
                </StoryLink>
              </Title>
            </FlexContent>
            {published && (
              <FlexContent space="self" hide={{ sm: true }}>
                <PublishedAt>{getMonthDayYear(updatedAt)}</PublishedAt>
              </FlexContent>
            )}
          </Flex>
          {author && <StoryAvatar user={author} to={{ state: { referrer } }} />}
          <Description>{description ? description : 'No description'} </Description>
        </FlexContent>
        <FlexColumn space={[100, { sm: 30, md: 25 }]}>
          {published && (
            <FlexContent hide={[true, { sm: false }]}>
              <PublishedAt>{getMonthDayYear(updatedAt)}</PublishedAt>
            </FlexContent>
          )}
          {tags.length > 0 && (
            <FlexContent>
              <StoryTags>{matchTags(matchValue, tags, referrer)}</StoryTags>
            </FlexContent>
          )}
        </FlexColumn>
      </Flex>
    </ListCard>
  );
};

export default StoryCard;
