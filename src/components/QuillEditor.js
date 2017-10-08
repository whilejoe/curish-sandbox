// TODO: Cleanup
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'styles/QuillEditor.css';
import styled from 'styled-components';
import { FlexContent } from 'components/Flex';
import Button from 'components/Button';
import StoryContainer from 'components/StoryContainer';
import TitleEditor from 'components/TitleEditor';
import StoryHeader from 'components/StoryHeader';
import debounce from 'lodash/debounce';
import { isAuthed } from 'utils/AuthService';
import { THEME, PRIMARY_KEY } from 'constants/theme';
// import { ellipsis } from 'polished';

const EDIT_MODE_UNSAVED = 'Unsaved Changes';
const EDIT_MODE_SAVING = 'Saving...';
const EDIT_MODE_SAVED = 'Saved';

// const EditModeContainer = styled.div`
//   position: absolute;
//   top: 0.3rem;
//   right: 1.25rem;
//   z-index: 1;
// `;
// const EditModeContainer = styled.div`
//   padding: 0.65rem;
//   text-align: right;
// `;

const EditModeStatus = styled.span`
  color: ${props => (props.mode === EDIT_MODE_SAVING ? THEME[PRIMARY_KEY] : '#b4b4b4')};
  font-size: 0.8em;
`;

const HeaderTitle = styled.div`
  font-size: 0.9em;
  color: #666;
`;

class QuillEditor extends Component {
  state = {
    storyBody: { ops: [{ insert: '\n' }] }, // Init with a blank Delta
    storyTitle: { ops: [{ insert: 'Untitled' }, { insert: '\n', attributes: { header: 1 } }] },
    isEditMode: false,
    editModeState: ''
  };

  componentWillMount() {
    const { match, storyData, location } = this.props;
    if (match.params.id) {
      if (storyData.Story) {
        if (storyData.Story.titleDelta) {
          this.setState({ storyTitle: JSON.parse(storyData.Story.titleDelta) });
        }
        if (storyData.Story.bodyDelta) {
          this.setState({ storyBody: JSON.parse(storyData.Story.bodyDelta) });
        }
      } else if (location.state) {
        const { isEditMode = false, editModeState = '' } = location.state;
        this.setState({
          isEditMode,
          editModeState
        });
      }
    } else this.setState({ isEditMode: true });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id) {
      if (!this.props.storyData.Story && nextProps.storyData.Story) {
        const { storyData } = nextProps;
        console.log('nextProps.storyData.Story', storyData.Story);
        this.setState({
          storyTitle: JSON.parse(storyData.Story.titleDelta),
          editModeState: EDIT_MODE_SAVED
        });
        if (storyData.Story.bodyDelta) {
          this.setState({ storyBody: JSON.parse(storyData.Story.bodyDelta) });
        }
        // this.handleSetEditorFocus(); This is not working, why?
      }
    }
  }

  handleChange = (content, delta, source, editor) => {
    if (!editor) return;
    // console.log('content length', editor.getLength());
    const fullDelta = editor.getContents();
    this.setState({
      storyBody: fullDelta,
      editModeState: EDIT_MODE_UNSAVED
    });
    this.debouncedUpdateStory(fullDelta);
  };

  handleSetEditorFocus = () => {
    console.log('handle set editor focus called');
    this.quillRef && this.quillRef.focus();
  };

  handleTitle = (delta = null, content) => {
    this.setState({
      storyTitle: delta,
      editModeState: EDIT_MODE_UNSAVED
    });
    if (!this.props.match.params.id) this.debouncedCreateStory(delta, content);
    else this.debouncedUpdateTitle(delta, content);
  };

  // TODO: Revisit
  // handleKeyDown = e => {
  //   if (e && (e.keyCode === 9 || e.keyCode === 13)) {
  //     this.handleTitle();
  //     if (this.props.match.params.id) this.handleSetEditorFocus();
  //   }
  // };

  // handleBlur = e => {
  //   if (e) this.handleTitle();
  // };

  handleEditModeButton = e => {
    this.setState(
      {
        isEditMode: true,
        editModeState: EDIT_MODE_SAVED
      },
      () => this.handleSetEditorFocus()
    );
  };

  setRef = node => {
    this.quillRef = node;
  };

  createStory = async (delta = null, content) => {
    const { createStoryMutation, userResult: { user }, history } = this.props;
    if (!user || !delta) return;
    const stringifiedDelta = JSON.stringify(delta);
    const result = await createStoryMutation({
      variables: {
        userId: user.id,
        titleDelta: stringifiedDelta,
        titleText: content
      }
    });
    // Push id onto route and pass title as state to populate title on page
    history.push(`/write/${result.data.createStory.id}`, {
      isEditMode: true,
      editModeState: EDIT_MODE_SAVING
    });
  };

  // TODO: Consolidate duplicate functionality
  debouncedCreateStory = debounce((delta, content) => {
    this.createStory(delta, content);
  }, 1200);

  debouncedUpdateStory = debounce(delta => {
    this.updateStory(delta);
  }, 1200);

  debouncedUpdateTitle = debounce((delta, content) => {
    this.updateTitle(delta, content);
  }, 1200);

  updateStory = async (delta = null) => {
    const { updateStoryMutation, userResult: { user }, storyData } = this.props;
    if (!user || !delta || !storyData) return;
    this.setState({ editModeState: EDIT_MODE_SAVING });
    const stringifiedDelta = JSON.stringify(delta);
    const result = await updateStoryMutation({
      variables: {
        storyId: storyData.variables.storyId,
        bodyDelta: stringifiedDelta
      }
    });
    this.setState({ editModeState: EDIT_MODE_SAVED });
    console.log('update story result with delta =', result);
  };

  updateTitle = async (delta = null, content) => {
    const { updateStoryMutation, userResult: { user }, storyData } = this.props;

    if (!user || !delta || !storyData) return;
    this.setState({ editModeState: EDIT_MODE_SAVING });
    const stringifiedDelta = JSON.stringify(delta);
    const result = await updateStoryMutation({
      variables: {
        storyId: storyData.variables.storyId,
        titleDelta: stringifiedDelta,
        titleText: content
      }
    });
    this.setState({ editModeState: EDIT_MODE_SAVED });
    console.log('update story result title only =', result);
  };

  render() {
    const { userResult: { user }, match, storyData, location } = this.props;
    const { storyTitle, storyBody, isEditMode, editModeState } = this.state;
    if (storyData && storyData.loading) return <StoryContainer>Loading...</StoryContainer>;
    if (
      (match.params.id && !storyData.Story) ||
      (storyData && storyData.Story && match.params.id !== storyData.Story.id)
    ) {
      return (
        <StoryContainer>
          <h1>Whoops, that story doesn't exist :(</h1>
        </StoryContainer>
      );
    }
    return (
      <div>
        <StoryHeader>
          <FlexContent>
            <HeaderTitle>
              {storyData && storyData.Story && (storyData.Story.titleText || 'Untitled')}
            </HeaderTitle>
          </FlexContent>
          {match.params.id && isAuthed() ? (
            <FlexContent space="self">
              {isEditMode ? (
                <EditModeStatus mode={editModeState}>{editModeState}</EditModeStatus>
              ) : (
                <Button editMode={isEditMode} onClick={this.handleEditModeButton}>
                  Edit
                </Button>
              )}
            </FlexContent>
          ) : null}
        </StoryHeader>
        <StoryContainer style={{ position: 'relative' }}>
          <TitleEditor
            author={user}
            title={storyTitle}
            readOnly={!isEditMode}
            onChangeTitle={(delta, content) => this.handleTitle(delta, content)}
            referrer={location}
          />
          <ReactQuill
            theme="bubble"
            readOnly={!storyData || !isEditMode}
            placeholder="It all started this one day..."
            value={storyBody}
            onChange={this.handleChange}
            modules={QuillEditor.modules}
            formats={QuillEditor.formats}
            ref={node => this.setRef(node)}
          />
        </StoryContainer>
      </div>
    );
  }
}

QuillEditor.modules = {
  toolbar: [[{ header: [2, 3, false] }], ['blockquote'], ['clean']],
  clipboard: { matchVisual: false }
};

QuillEditor.formats = ['header', 'blockquote'];

export default QuillEditor;
