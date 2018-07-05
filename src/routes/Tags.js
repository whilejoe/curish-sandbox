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
          <h1>Stories by "{match.params.key}"</h1>
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
        <h1>All Tags</h1>
        <SubHeaderPortal>
          <FlexContent space="self">
            <SubHeaderTitle>All Tags</SubHeaderTitle>
          </FlexContent>
        </SubHeaderPortal>
        <TagsContainer>
          {allTagsQuery.allTags.map(tag => (
            <TagLink key={tag.id} tagName={tag.key} referrer={location} />
          ))}
        </TagsContainer>
      </Container>
    </PageContainer>
  );
};

export default Tags;
