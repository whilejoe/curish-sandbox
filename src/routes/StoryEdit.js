import React, { Component } from 'react';
import { FlexContent } from 'components/Flex';
import Button from 'components/Button';
import Modal from 'components/Modal';
import StoryContainer from 'components/StoryContainer';
import Editor from 'components/Editor';
import EditorTitle from 'components/EditorTitle';
import StoryHeader, { HeaderTitle } from 'components/StoryHeader';
import PublishStory from 'components/PublishStory/PublishStory';
import debounce from 'lodash/debounce';
import StoryEditStatus, { UNSAVED, SAVING, SAVED } from 'components/StoryEditStatus';

class StoryEdit extends Component {
  state = {
    editModeState: SAVED
  };

  updateStory = async variables => {
    const { updateStoryMutation, storyData } = this.props;

    this.setState({ editModeState: SAVING });

    const result = await updateStoryMutation({
      variables: {
        storyId: storyData.variables.storyId,
        ...variables
      }
    });

    if (result.data) this.setState({ editModeState: SAVED });
  };

  onBodyChange = delta => {
    this.setState({ editModeState: UNSAVED });
    this.debouncedUpdateStory(delta);
  };

  onTitleChange = (delta, content) => {
    this.setState({ editModeState: UNSAVED });
    this.debouncedUpdateTitle(delta, content);
  };

  debouncedUpdateStory = debounce(delta => {
    const stringifiedDelta = JSON.stringify(delta);
    this.updateStory({ bodyDelta: stringifiedDelta });
  }, 1200);

  debouncedUpdateTitle = debounce((delta, content) => {
    const stringifiedDelta = JSON.stringify(delta);
    this.updateStory({ titleDelta: stringifiedDelta, titleText: content });
  }, 1200);

  render() {
    const { storyData, updateStoryMutation } = this.props;
    const { editModeState } = this.state;
    if (!storyData.Story) return null;
    const { titleText = '', titleDelta, bodyDelta, author } = storyData.Story;
    return [
      <StoryHeader key="storyHeader">
        <FlexContent>
          <HeaderTitle>{titleText || 'Untitled'}</HeaderTitle>
        </FlexContent>
        <FlexContent space="self">
          <StoryEditStatus mode={editModeState}>{editModeState}</StoryEditStatus>
          <Modal
            key="modal"
            trigger={<Button theme="secondary">Publish</Button>}
            title={`Publish: ${titleText || 'Untitled'}`}
          >
            <PublishStory storyData={storyData} updateStoryMutation={updateStoryMutation} />
          </Modal>
        </FlexContent>
      </StoryHeader>,
      <StoryContainer key="storyContainer">
        <EditorTitle
          defaultDelta={titleDelta}
          readOnly={false}
          onChangeCallback={this.onTitleChange}
          author={author}
        />
        <Editor readOnly={false} defaultDelta={bodyDelta} onChangeCallback={this.onBodyChange} />
      </StoryContainer>
    ];
  }
}

export default StoryEdit;
