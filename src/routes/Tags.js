// TODO: Handle loading states better
import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import { ButtonLink } from 'components/Button';
import StoryContainer from 'components/StoryContainer';
import StoryCard from 'components/StoryCard';
import TagLink, { TagsContainer } from 'components/Tag';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';
// import { copyFont } from 'styles/elements';

// const HeaderTag = Tag.extend`
//   margin: 0;
//   padding: 0 0.3rem;
//   font-size: inherit;
//   font-family: ${copyFont};
//   line-height: inherit;
//   border-radius: 4px;
// `;

const StoryList = styled.div`
  margin-top: 1rem;
`;

const Tags = ({ match, tagQuery, allTagsQuery, location }) => {
  if (match.params.key) {
    if (tagQuery.loading) return <StoryContainer>Tag Loading ...</StoryContainer>;
    return (
      <StoryList>
        <StoryContainer>
          <SubHeaderPortal>
            <Flex gutters align="center">
              <FlexContent>
                <SubHeaderTitle>{tagQuery.Tag.key}</SubHeaderTitle>
              </FlexContent>
              <FlexContent space="self">
                <ButtonLink to={{ pathname: '/tags', state: { referrer: location } }}>
                  All Tags
                </ButtonLink>
              </FlexContent>
            </Flex>
          </SubHeaderPortal>
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
      </StoryList>
    );
  } else if (allTagsQuery.loading) return <StoryContainer>All Tags Loading ...</StoryContainer>;
  return (
    <StoryList>
      <StoryContainer>
        <SubHeaderPortal>
          <FlexContent space="self">
            <SubHeaderTitle>All Tags</SubHeaderTitle>
          </FlexContent>
        </SubHeaderPortal>
        <TagsContainer>
          {allTagsQuery.allTags.map(tag => (
            <div key={tag.id}>
              <TagLink tagName={tag.key} referrer={location} />
            </div>
          ))}
        </TagsContainer>
      </StoryContainer>
    </StoryList>
  );
};

export default Tags;
