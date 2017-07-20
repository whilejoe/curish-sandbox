import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Story.css';

const Story = props => {
  if (!props.rawData) return null;
  const parsedJson = JSON.parse(props.rawData);
  const editorState = EditorState.createWithContent(convertFromRaw(parsedJson));
  return <Editor editorState={editorState} readOnly className="RichEditor-editor" />;
};

export default Story;
