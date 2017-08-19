import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import Container from 'components/Container';
import Button from 'components/Button';
import 'draft-js/dist/Draft.css';
import './CreateStory.css';

class CreateStory extends Component {
  state = {
    editorState: EditorState.createEmpty() // for empty content
  };

  handleSubmit = () => {
    const contentState = this.state.editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const jsonContentState = JSON.stringify(rawContentState);
    const { onAddToStory, user } = this.props;
    onAddToStory(user.userName, 'this title', jsonContentState);
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  };

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    const content = editorState.getCurrentContent().getBlockMap().first().getLength();

    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <Container>
        <h1>Create A Story</h1>
        <div className="RichEditor-root">
          <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
          <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck
              autoCapitalize
              autoComplete
              autoCorrect
            />
          </div>
        </div>
        <Button onClick={content && this.handleSubmit}>submit for review</Button>
      </Container>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}
class StyleButton extends React.Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' }
];

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default CreateStory;
