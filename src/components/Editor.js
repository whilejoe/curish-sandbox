import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'styles/QuillEditor.css';

class Editor extends Component {
  state = {
    delta: { ops: [{ insert: '\n' }] } // Init with a blank Delta
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
    this.setState({ delta: contents });
    this.props.onChangeCallback(contents, editor);
  };

  setRef = node => {
    this.quillRef = node;
  };

  render() {
    const { readOnly = true, placeholder = '', modules, formats, theme } = this.props;
    const { delta } = this.state;
    return (
      <ReactQuill
        theme={theme || 'bubble'}
        readOnly={readOnly}
        placeholder={placeholder || 'It all started this one day...'}
        value={delta}
        onChange={this.handleChange}
        modules={modules || Editor.modules}
        formats={formats || Editor.formats}
        ref={node => this.setRef(node)}
      />
    );
  }
}

Editor.modules = {
  toolbar: [[{ header: [2, false] }], ['blockquote'], ['clean']],
  clipboard: { matchVisual: false }
};

Editor.formats = ['header', 'blockquote'];

export default Editor;
