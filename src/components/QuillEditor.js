// TODO: Cleanup
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'styles/QuillEditor.css';
import styled from 'styled-components';
import { FlexContent } from 'components/Flex';
import Button from 'components/Button';
import Modal from 'components/Modal';
import StoryContainer from 'components/StoryContainer';
import TitleEditor from 'components/TitleEditor';
import StoryHeader from 'components/StoryHeader';
import debounce from 'lodash/debounce';
import { isAuthed } from 'utils/AuthService';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const EDIT_MODE_UNSAVED = 'Unsaved Changes';
const EDIT_MODE_SAVING = 'Saving...';
const EDIT_MODE_SAVED = 'Saved';

const EditModeStatus = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
  color: ${props => (props.mode === EDIT_MODE_SAVING ? THEME[PRIMARY_KEY] : '#b4b4b4')};
  font-size: 0.8em;
  vertical-align: middle;
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
    const noMatch =
      (match.params.id && !storyData.Story) ||
      (storyData && storyData.Story && match.params.id !== storyData.Story.id);
    return [
      <StoryHeader key="storyHeader">
        <FlexContent>
          <HeaderTitle>{storyData && storyData.Story && storyData.Story.titleText}</HeaderTitle>
        </FlexContent>
        {!noMatch && isAuthed() ? (
          <FlexContent space="self">
            {isEditMode ? (
              <EditModeStatus mode={editModeState}>{editModeState}</EditModeStatus>
            ) : (
              <Button key="modalTrigger" onClick={this.handleEditModeButton}>
                Edit
              </Button>
            )}
            {match.params.id &&
              storyData &&
              storyData.Story && (
                <Modal
                  key="modal"
                  trigger={<Button theme="tertiary">Publish</Button>}
                  title="Publish Story"
                >
                  <p>
                    Kayla always thought this day would end up being the worst day of her life. Her
                    mother finally kicked her out of their trailer, this time for good, after
                    getting into a heated fight with one of her drunk boyfriends. She was in such a
                    hurry to get out of there that she hardly had time to grab any of her things.
                    All she had in the world were the clothes on her back and a backpack full of
                    underwear, t-shirts, and make-up. She had almost no money either, just a few
                    crumpled one dollar bills in the back pocket of her jean shorts. That is why she
                    was hitchhiking along the interstate that afternoon, praying to God that someone
                    would stop before it got dark. She had no idea where she wanted to go, just that
                    she needed to get far away from the life she was leaving behind. Just when she
                    was beginning to think no one would stop for her, an old Jeep slowed to a stop
                    just a few yards ahead of her. Thinking it could take off at any moment, Kay ran
                    toward it with her tired legs.
                  </p>
                </Modal>
              )}
          </FlexContent>
        ) : null}
      </StoryHeader>,
      <StoryContainer key="storyContainer">
        {storyData && storyData.loading && !storyData.Story ? (
          <span>loading...</span>
        ) : noMatch ? (
          <h1>Whoops, that story doesn't exist :(</h1>
        ) : (
          [
            <TitleEditor
              key="titleEditor"
              author={user}
              title={storyTitle}
              readOnly={!isEditMode}
              onChangeTitle={(delta, content) => this.handleTitle(delta, content)}
              referrer={location}
            />,
            <ReactQuill
              key="bodyEditor"
              theme="bubble"
              readOnly={!storyData || !isEditMode}
              placeholder="It all started this one day..."
              value={storyBody}
              onChange={this.handleChange}
              modules={QuillEditor.modules}
              formats={QuillEditor.formats}
              ref={node => this.setRef(node)}
            />
          ]
        )}
      </StoryContainer>
    ];
  }
}

QuillEditor.modules = {
  toolbar: [[{ header: [2, 3, false] }], ['blockquote'], ['clean']],
  clipboard: { matchVisual: false }
};

QuillEditor.formats = ['header', 'blockquote'];

export default QuillEditor;
