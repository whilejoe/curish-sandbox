import React from 'react';
import { FlexContent } from 'components/Flex';
import StoryContainer from 'components/StoryContainer';
import Editor from 'components/Editor';
import EditorTitle from 'components/EditorTitle';
import StoryHeader, { HeaderTitle } from 'components/StoryHeader';

const StoryPublished = ({ titleText, titleDelta, bodyDelta, author, loading, location }) => {
  return [
    <StoryHeader key="storyHeader">
      <FlexContent>
        <HeaderTitle>{titleText}</HeaderTitle>
      </FlexContent>
    </StoryHeader>,
    <StoryContainer key="storyContainer">
      <EditorTitle readOnly defaultDelta={titleDelta} author={author} referrer={location} />
      <Editor readOnly defaultDelta={bodyDelta} />
    </StoryContainer>
  ];
};

export default StoryPublished;
