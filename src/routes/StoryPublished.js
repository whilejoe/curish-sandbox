import React from 'react';
import { Flex, FlexContent } from 'components/Flex';
import StoryContainer from 'components/StoryContainer';
import Editor from 'components/Editor';
import EditorTitle from 'components/EditorTitle';
import StoryHeaderTitle from 'components/StoryHeaderTitle';
import SubHeaderPortal from 'components/SubHeaderPortal';

const StoryPublished = ({ titleText, titleDelta, bodyDelta, author, loading, location }) => {
  // TODO: Handle loading state
  if (loading) return null;
  return (
    <StoryContainer>
      <SubHeaderPortal>
        <Flex align="center">
          <FlexContent space="self">
            <StoryHeaderTitle>{titleText}</StoryHeaderTitle>
          </FlexContent>
        </Flex>
      </SubHeaderPortal>
      <EditorTitle readOnly defaultDelta={titleDelta} author={author} referrer={location} />
      <Editor readOnly defaultDelta={bodyDelta} />
    </StoryContainer>
  );
};

export default StoryPublished;
