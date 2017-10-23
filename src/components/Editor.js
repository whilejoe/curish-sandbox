import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'styles/QuillEditor.css';

class Editor extends Component {
  state = {
    delta: { ops: [{ insert: '\n' }] } // Init with a blank Delta
  };

  componentWillMount() {
    if (this.props.delta) this.setState({ delta: this.props.delta });
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
    if (!editor) return;
    const contents = editor.getContents();
    this.setState({ delta: contents });
    this.props.onChangeCallback(contents);
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
        placeholder={placeholder}
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
