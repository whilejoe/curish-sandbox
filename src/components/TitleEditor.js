import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import Avatar from 'components/Avatar';

const StoryHeader = styled.div`
  margin-bottom: 1.8rem;
`;

class TitleEditor extends Component {
  componentDidMount() {
    this.quillRef && this.quillRef.focus();
  }

  handleChange = (content, delta, source, editor) => {
    if (!editor) return;
    const fullDelta = editor.getContents();
    const titleText = editor.getText(0, 100);
    this.props.onChangeTitle(fullDelta, titleText);
  };

  setRef = node => {
    this.quillRef = node;
  };

  render() {
    const { author, readOnly, title, referrer } = this.props;
    return (
      <StoryHeader>
        <ReactQuill
          theme={null}
          readOnly={readOnly}
          placeholder="Untitled"
          value={title}
          onChange={this.handleChange}
          modules={TitleEditor.modules}
          formats={TitleEditor.formats}
          ref={node => this.setRef(node)}
        />
        {author && <Avatar user={author} to={{ state: { referrer } }} />}
      </StoryHeader>
    );
  }
}

TitleEditor.modules = {
  toolbar: false
};

TitleEditor.formats = ['header'];

export default TitleEditor;
