import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'styles/QuillEditor.css';

class Editor extends Component {
  state = {
    delta: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.delta) {
      const { defaultDelta } = nextProps;
      // defaultDelta is passed for existing stories,
      // otherwise init Editor with blank delta
      const delta = defaultDelta ? JSON.parse(defaultDelta) : { ops: [{ insert: '\n' }] };
      return {
        delta
      };
    }

    return null;
  }

  componentDidMount() {
    if (this.props.focus && this.quillRef) this.quillRef.focus();
  }

  handleChange = (content, delta, source, editor) => {
    if (!editor || this.props.readOnly) return; // Need to test if I need this
    const contents = editor.getContents();
    this.setState({ delta: contents }, () => {
      this.props.onChangeCallback(contents, editor);
    });
  };

  handleChangeSelection = (range, source, editor) => {
    const showToolbar = range && range.length;
    this.props.onSelectionCallback(showToolbar);
  };

  setRef = node => {
    this.quillRef = node;
  };

  render() {
    const { readOnly = true, placeholder = '', modules, formats, onSelectionCallback } = this.props;
    const { delta } = this.state;
    // Return null to prevent onChange event from being fired when setting delta
    return !delta ? null : (
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

Editor.modules = {
  toolbar: false
};

Editor.formats = ['header', 'blockquote'];

export default Editor;
