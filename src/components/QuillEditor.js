import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'styles/QuillEditor.css';
import styled from 'styled-components';
import StoryContainer from 'components/StoryContainer';
import Container from 'components/Container';
import { AvatarLink } from 'components/Avatar';
import { Flex, FlexContent } from 'components/Flex';
import Button from 'components/Button';
import debounce from 'lodash/debounce';
import { isAuthed } from 'utils/AuthService';
// import TextInput from 'abyss-form/lib/TextInput';

const EDIT_MODE_UNSAVED = 'Unsaved Changes';
const EDIT_MODE_SAVING = 'Saving...';
const EDIT_MODE_SAVED = 'Saved';

const Input = styled.input`
  margin-top: 3rem;
  margin-bottom: 0.5rem;
  padding: 0;
  width: 100%;
  background-color: transparent;
  color: inherit;
  line-height: inherit;
  font-size: 2rem;
  font-family: 'Roboto Slab', serif;
  font-weight: 400;
  text-transform: capitalize;
  border: none;
  outline: none;
  box-shadow: none;

  &::placeholder {
    font-size: inherit;
    color: #ccc;
  }
`;

const StoryTitle = styled.h1`
  display: inline-block;
  margin-top: 3rem;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  text-transform: capitalize;
`;

const StoryHeader = styled.div`margin-bottom: 1.8rem;`;

const EditModeContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const EditModeStatus = styled.span`
  color: ${props => (props.mode === EDIT_MODE_SAVING ? 'SeaGreen' : '#b4b4b4')};
  font-size: 0.8em;
`;

class QuillEditor extends Component {
  state = {
    quillContent: { ops: [{ insert: '\n' }] }, // Init with a blank Delta
    title: '',
    isEditMode: false,
    editModeState: ''
  };

  componentWillMount() {
    const { match, storyData } = this.props;
    if (match.params.id) {
      if (storyData.Story && storyData.Story.quillContent) {
        const parsed = JSON.parse(storyData.Story.quillContent);
        this.setState({
          quillContent: parsed,
          title: storyData.Story.title
        });
      } else if (this.props.location.state) {
        const { title = '', isEditMode = false, editModeState = '' } = this.props.location.state;
        this.setState({
          title,
          isEditMode,
          editModeState
        });
      }
    } else this.setState({ isEditMode: true });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id) {
      if (!this.props.storyData.Story && nextProps.storyData.Story) {
        console.log('nextProps.storyData.Story', nextProps.storyData.Story);
        this.setState({ title: nextProps.storyData.Story.title, editModeState: EDIT_MODE_SAVED });
        if (nextProps.storyData.Story.quillContent) {
          const parsed = JSON.parse(nextProps.storyData.Story.quillContent);
          this.setState({ quillContent: parsed, editModeState: EDIT_MODE_SAVED });
        }
        this.handleSetEditorFocus();
      }
    }
  }

  handleChange = () => {
    if (!this.quillRef) return;
    const editor = this.quillRef.getEditor();
    const delta = editor.getContents();
    this.setState({ quillContent: delta, editModeState: EDIT_MODE_UNSAVED });
    this.debouncedUpdateStory(delta);
  };

  handleSetEditorFocus = () => {
    console.log('handle set editor focus called');
    this.quillRef && this.quillRef.focus();
  };

  handleTitle = () => {
    if (!this.props.match.params.id) {
      if (this.state.title.length) this.createStory();
    } else this.updateTitle();
  };

  handleKeyDown = e => {
    if (e && (e.keyCode === 9 || e.keyCode === 13)) {
      this.handleTitle();
      if (this.props.match.params.id) this.handleSetEditorFocus();
    }
  };

  handleBlur = e => {
    if (e) this.handleTitle();
  };

  handleEditModeButton = e => {
    this.setState({ isEditMode: true, editModeState: EDIT_MODE_SAVED }, () =>
      this.handleSetEditorFocus()
    );
  };

  setRef = node => {
    this.quillRef = node;
  };

  createStory = async () => {
    const { createStoryMutation, userResult: { user }, history } = this.props;
    if (!user) return;
    const { title } = this.state;
    const result = await createStoryMutation({
      variables: {
        userId: user.id,
        title
      }
    });
    // console.log('create story result =', result);
    // Push id onto route and pass title as state to populate title on page
    history.push(`/write/${result.data.createStory.id}`, {
      title,
      isEditMode: true,
      editModeState: EDIT_MODE_SAVING
    });
  };

  debouncedUpdateStory = debounce(
    delta => {
      this.updateStory(delta);
    },
    1200
    // { maxWait: 5000 }
  );

  updateStory = async (delta = null) => {
    const { updateStoryMutation, userResult: { user }, storyData } = this.props;

    if (!user || !delta || !storyData) return;
    this.setState({ editModeState: EDIT_MODE_SAVING });
    const stringifiedDelta = JSON.stringify(delta);
    const result = await updateStoryMutation({
      variables: {
        storyId: storyData.variables.storyId,
        quillContent: stringifiedDelta
      }
    });
    this.setState({ editModeState: EDIT_MODE_SAVED });
    console.log('update story result with delta =', result);
  };

  updateTitle = async () => {
    const { updateStoryMutation, userResult: { user }, storyData: { variables } } = this.props;
    const { title } = this.state;

    if (!user) return;
    // this.setState({ editModeState: EDIT_MODE_SAVING });
    const result = await updateStoryMutation({
      variables: {
        storyId: variables.storyId,
        title
      }
    });
    // this.setState({ editModeState: EDIT_MODE_SAVED });
    console.log('update story result title only =', result);
  };

  render() {
    const { userResult: { user }, match, storyData } = this.props;
    const { title, quillContent, isEditMode, editModeState } = this.state;
    if (storyData && storyData.loading) return <Container>Loading...</Container>;
    return (
      <StoryContainer style={{ position: 'relative' }}>
        {match.params.id && isAuthed() ? (
          <EditModeContainer>
            {isEditMode ? (
              <EditModeStatus mode={editModeState}>{editModeState}</EditModeStatus>
            ) : (
              <Button theme="primary" editMode={isEditMode} onClick={this.handleEditModeButton}>
                Edit
              </Button>
            )}
          </EditModeContainer>
        ) : null}
        <StoryHeader>
          {isEditMode ? (
            <Input
              autoFocus={isEditMode && !match.params.id}
              type="text"
              placeholder="Our First Time"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              onKeyDown={e => this.handleKeyDown(e)}
              // onBlur={e => this.handleBlur(e)}
              disabled={!isEditMode && match.params.id}
            />
          ) : (
            <StoryTitle>{title}</StoryTitle>
          )}
          <Flex align="center">
            <FlexContent space="self">
              <span>Author:&nbsp;</span>
            </FlexContent>
            <FlexContent>
              <AvatarLink user={!match.params.id ? user : storyData.Story.author} small />
            </FlexContent>
          </Flex>
        </StoryHeader>
        <ReactQuill
          theme="bubble"
          readOnly={!title.length || !isEditMode}
          placeholder="It all started this one day..."
          value={quillContent}
          onChange={this.handleChange}
          modules={QuillEditor.modules}
          formats={QuillEditor.formats}
          ref={node => this.setRef(node)}
        />
      </StoryContainer>
    );
  }
}

QuillEditor.modules = {
  toolbar: [[{ header: [2, 3, false] }], ['blockquote'], ['clean']],
  clipboard: {
    matchVisual: false
  }
};

QuillEditor.formats = ['header', 'blockquote'];

export default QuillEditor;
