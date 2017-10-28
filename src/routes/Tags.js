// TODO: Handle loading states better
import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import { ButtonLink } from 'components/Button';
import StoryContainer from 'components/StoryContainer';
import StoryCard from 'components/StoryCard';
import TagLink, { Tag, TagsContainer } from 'components/Tag';
import { copyFont } from 'styles/elements';

const HeaderTag = Tag.extend`
  margin: 0;
  padding: 0 0.3rem;
  font-size: inherit;
  font-family: ${copyFont};
  line-height: inherit;
  border-radius: 4px;
`;

const Tags = ({ match, tagQuery, allTagsQuery, location }) => {
  if (match.params.key) {
    if (tagQuery.loading) return <StoryContainer>Tag Loading ...</StoryContainer>;
    return (
      <StoryContainer>
        <Flex gutters align="center" justify="space-between">
          <FlexContent space="self">
            <h1>
              <HeaderTag matches>{tagQuery.Tag.key}</HeaderTag>
            </h1>
          </FlexContent>
          <FlexContent space="self">
            <ButtonLink to={{ pathname: '/tags', state: { referrer: location } }}>
              All Tags
            </ButtonLink>
          </FlexContent>
        </Flex>
        {tagQuery.Tag.stories.length
          ? tagQuery.Tag.stories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                referrer={location}
                matchValue={tagQuery.Tag.key}
              />
            ))
          : null}
      </StoryContainer>
    );
  } else if (allTagsQuery.loading) return <StoryContainer>All Tags Loading ...</StoryContainer>;
  return (
    <StoryContainer>
      <h1>Tags</h1>
      <TagsContainer>
        {allTagsQuery.allTags.map(tag => (
          <TagLink key={tag.id} tagName={tag.key} referrer={location} />
        ))}
      </TagsContainer>
    </StoryContainer>
  );
};

export default Tags;
