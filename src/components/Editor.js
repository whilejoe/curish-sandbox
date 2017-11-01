import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import EditToolbar from 'components/EditToolbar';
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
    delta: { ops: [{ insert: '\n' }] }, // Init with a blank Delta
    showToolbar: false
  };

  componentWillMount() {
    if (this.props.defaultDelta) this.setState({ delta: JSON.parse(this.props.defaultDelta) });
  }

  componentDidMount() {
    if (this.props.focus && this.quillRef) this.quillRef.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.focus !== nextProps.focus && nextProps.focus) {
      if (this.quillRef) this.quillRef.focus();
    }
  }

  handleChange = (content, delta, source, editor) => {
    if (!editor || this.props.readOnly) return; // Need to test if I need this
    const contents = editor.getContents();
    this.setState({ delta: contents, showToolbar: false });
    this.props.onChangeCallback(contents, editor);
  };

  handleChangeSelection = (range, source, editor) => {
    if (range && range.length) this.setState({ showToolbar: true });
    else this.setState({ showToolbar: false });
  };

  setRef = node => {
    this.quillRef = node;
  };

  render() {
    const { readOnly = true, placeholder = '', modules, formats } = this.props;
    const { delta, showToolbar } = this.state;
    return (
      <div>
        {!modules && <EditToolbar id="toolbar" show={showToolbar && !readOnly} />}
        <ReactQuill
          theme={null}
          readOnly={readOnly}
          placeholder={placeholder || 'Tell your story...'}
          value={delta}
          onChange={this.handleChange}
          onChangeSelection={!modules ? this.handleChangeSelection : null}
          modules={modules || Editor.modules}
          formats={formats || Editor.formats}
          ref={node => this.setRef(node)}
        />
      </div>
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
