import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import Editor from 'components/Editor';
import EditorTitle from 'components/EditorTitle';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';

const StoryPublished = ({ titleText, titleDelta, bodyDelta, author, loading, location }) => {
  // TODO: Handle loading state
  if (loading) return <Container>loading...</Container>;
  return (
    <PageContainer>
      <Container>
        <SubHeaderPortal>
          <Flex align="center">
            <FlexContent space="self">
              <SubHeaderTitle>{titleText}</SubHeaderTitle>
            </FlexContent>
          </Flex>
        </SubHeaderPortal>
        <EditorTitle readOnly defaultDelta={titleDelta} author={author} referrer={location} />
        <Editor readOnly defaultDelta={bodyDelta} />
      </Container>
    </PageContainer>
  );
};

export default StoryPublished;
