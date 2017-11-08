import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'styles/QuillEditor.css';

// keeping as an example
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, '★');
  this.quill.setSelection(cursorPosition + 1);
}

class Editor extends Component {
  state = {
    delta: { ops: [{ insert: '\n' }] } // Init with a blank Delta
  };

  componentWillMount() {
    if (this.props.defaultDelta) this.setDefaultDelta(this.props.defaultDelta);
  }

  componentDidMount() {
    if (this.props.focus && this.quillRef) this.quillRef.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.focus !== nextProps.focus && nextProps.focus) {
      if (this.quillRef) this.quillRef.focus();
    }
    if (this.props.defaultDelta !== nextProps.defaultDelta) {
      this.setDefaultDelta(nextProps.defaultDelta);
    }
  }

  handleChange = (content, delta, source, editor) => {
    if (!editor || this.props.readOnly) return; // Need to test if I need this
    const contents = editor.getContents();
    this.setState({ delta: contents });
    this.props.onSelectionCallback && this.props.onSelectionCallback(false);
    this.props.onChangeCallback(contents, editor);
  };

  handleChangeSelection = (range, source, editor) => {
    const showToolbar = range && range.length;
    this.props.onSelectionCallback(showToolbar);
  };

  setRef = node => {
    this.quillRef = node;
  };

  setDefaultDelta(delta) {
    this.setState({ delta: JSON.parse(delta) });
  }

  render() {
    const { readOnly = true, placeholder = '', modules, formats, onSelectionCallback } = this.props;
    const { delta } = this.state;
    return (
      <ReactQuill
        theme={null}
        readOnly={readOnly}
        placeholder={placeholder || 'Tell your story...'}
        value={delta}
        onChange={this.handleChange}
        onChangeSelection={onSelectionCallback ? this.handleChangeSelection : null}
        modules={modules || Editor.modules}
        formats={formats || Editor.formats}
        ref={this.setRef}
      />
    );
  }
}

// Editor.modules = {
//   toolbar: [[{ header: [2, false] }], ['blockquote'], ['clean']],
//   clipboard: { matchVisual: false }
// };

Editor.modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      insertStar: insertStar
    }
  }
};

Editor.formats = ['header', 'blockquote'];

export default Editor;
