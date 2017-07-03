import React, {Component} from 'react';
import 'medium-draft/lib/index.css';
import {Editor, createEditorState} from 'medium-draft';

class CreateStory extends Component {

  state = {
    editorState: createEditorState(), // for empty content
  };

  onChange = editorState => {
    this.setState({editorState});
  };

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const {editorState} = this.state;
    const currentContent = editorState.getSelection();
    console.log('currentContent', currentContent);
    return (
      <div>
        <h1>Stories</h1>
        <Editor
          ref="editor"
          textAlignment="center"
          spellCheck
          editorState={editorState}
          onChange={this.onChange} />
      </div>
    );
  }
}

export default CreateStory;