import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import { ButtonLink } from 'components/Button';
import StoryCard from 'components/StoryCard';
import TagLink, { TagsContainer } from 'components/Tag';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';

const Tags = ({ match, tagQuery, allTagsQuery, location }) => {
  if (match.params.key) {
    if (tagQuery.loading) return <Container>Tag Loading ...</Container>;
    return (
      <PageContainer>
        <Container>
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
        </Container>
      </PageContainer>
    );
  } else if (allTagsQuery.loading) return <Container>All Tags Loading ...</Container>;
  return (
    <PageContainer>
      <Container>
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
      </Container>
    </PageContainer>
  );
};

export default Tags;
