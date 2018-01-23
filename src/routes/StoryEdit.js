import React, { Component } from 'react';
import { Flex, FlexContent } from 'components/Flex';
import Button from 'components/Button';
import Modal from 'components/Modal';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import Editor from 'components/Editor';
import EditorTitle from 'components/EditorTitle';
import EditToolbar from 'components/EditToolbar';
import SubHeaderPortal from 'components/SubHeaderPortal';
import PublishStory from 'components/PublishStory/PublishStory';
import debounce from 'lodash/debounce';
import StoryEditStatus, { UNSAVED, SAVING, SAVED } from 'components/StoryEditStatus';

const TOOLBAR_ID = 'toolbar';

class StoryEdit extends Component {
  state = {
    editModeState: SAVED,
    showToolbar: false
  };

  componentWillMount() {
    const { storyData, history } = this.props;
    if (storyData.Story && storyData.Story.published) history.push(`/story/${storyData.Story.id}`);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.storyData.Story && nextProps.storyData.Story) {
      const { published, id } = nextProps.storyData.Story;
      if (published) nextProps.history.push(`/story/${id}`);
    }
  }

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

  setShowToolbar = showToolbar => {
    this.setState({ showToolbar });
  };

  render() {
    const { storyData, updateStoryMutation } = this.props;
    const { editModeState, showToolbar } = this.state;

    if (!storyData.Story) return null;

    const { titleText = '', titleDelta, bodyDelta, author } = storyData.Story;
    return (
      <PageContainer>
        <Container>
          <SubHeaderPortal>
            <Flex noWrap align="center" justify="flex-end">
              <FlexContent hide={!showToolbar} offset={{ sm: 5, lg: 16 }}>
                <EditToolbar id={TOOLBAR_ID} />
              </FlexContent>
              <FlexContent space="self">
                <StoryEditStatus mode={editModeState}>{editModeState}</StoryEditStatus>
              </FlexContent>
              <FlexContent space="self">
                {bodyDelta && (
                  <Modal
                    key="modal"
                    trigger={<Button theme="secondary">Publish</Button>}
                    title={`Publish: ${titleText || 'Untitled'}`}
                  >
                    <PublishStory storyData={storyData} updateStoryMutation={updateStoryMutation} />
                  </Modal>
                )}
              </FlexContent>
            </Flex>
          </SubHeaderPortal>
          <EditorTitle
            defaultDelta={titleDelta}
            readOnly={false}
            onChangeCallback={this.onTitleChange}
            author={author}
          />
          <Editor
            readOnly={false}
            defaultDelta={bodyDelta}
            modules={{
              toolbar: { container: `#${TOOLBAR_ID}` }
            }}
            onChangeCallback={this.onBodyChange}
            onSelectionCallback={this.setShowToolbar}
          />
        </Container>
      </PageContainer>
    );
  }
}

export default StoryEdit;
