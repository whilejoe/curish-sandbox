import React, { Component } from 'react';
import Editor from 'components/Editor';
import styled from 'styled-components';
import Avatar from 'components/Avatar';

const StoryHeader = styled.div`
  margin-bottom: 1.8rem;
`;

// Editor expects a stringified delta from api
// so stringify the delta for new stories
const DEFAULT_DELTA = JSON.stringify({
  ops: [{ insert: 'Untitled' }, { insert: '\n', attributes: { header: 1 } }]
});

class EditorTitle extends Component {
  handleChange = (delta, editor) => {
    const titleText = editor.getText(0, 100);
    this.props.onChangeCallback(delta, titleText);
  };

  render() {
    const { author, readOnly = true, referrer, focus, defaultDelta } = this.props;
    return (
      <StoryHeader>
        <Editor
          readOnly={readOnly}
          placeholder="Untitled"
          defaultDelta={defaultDelta || DEFAULT_DELTA}
          onChangeCallback={this.handleChange}
          formats={['header']}
          focus={focus}
        />
        <Avatar user={author} to={referrer && { state: { referrer } }} />
      </StoryHeader>
    );
  }
}

export default EditorTitle;
