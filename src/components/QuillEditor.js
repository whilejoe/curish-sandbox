import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'styles/QuillEditor.css';
import styled from 'styled-components';
import StoryContainer from 'components/StoryContainer';
// import TextInput from 'abyss-form/lib/TextInput';

const Input = styled.input`
  margin-top: 3rem;
  margin-bottom: 1.8rem;
  background-color: transparent;
  color: inherit;
  border: none;
  outline: none;
  width: 100%;
  font-size: 2rem;
  font-family: 'Roboto Slab', serif;
  font-weight: 400;
  padding: 0;
  box-shadow: none;
  box-sizing: content-box;

  &::placeholder {
    font-size: inherit;
    color: #ccc;
  }
`;

class QuillEditor extends Component {
  state = {
    text: '', // You can also pass a Quill Delta here
    titleEditor: '',
    title: ''
  };

  componentWillMount() {
    if (this.props.match.params.id)
      this.setState({
        title: this.props.match.params.id,
        titleEditor: `<h1>${this.props.match.params.id}</h1>`
      });
  }

  componentDidMount() {
    if (this.state.title.length) this.handleSetEditorFocus();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.match.params.id !== nextProps.match.params.id) {
  //     console.log('nextProps.match.params', nextProps.match.params);
  //     if (nextProps.match.params.id) this.setState({ title: nextProps.match.params.id });
  //   }
  // }

  handleChange = value => {
    this.setState({ text: value });
    // console.log('editor value', value);
  };

  handleSetEditorFocus = () => {
    this.quillRef && this.quillRef.focus();
  };

  handleTitle = e => {
    const { title } = this.state;
    if (e && (e.keyCode === 9 || e.keyCode === 13)) {
      if (!this.props.match.params.id) this.props.history.push(`/write/${title}`);
      else if (title.length) this.handleSetEditorFocus();
      else console.warn('Must Add A Title');
    }
  };

  setRef = node => {
    this.quillRef = node;
  };

  render() {
    const { title, text } = this.state;
    return (
      <StoryContainer>
        <Input
          autoFocus
          type="text"
          placeholder="The First Time We Met"
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
          onKeyDown={e => this.handleTitle(e)}
        />
        <ReactQuill
          theme="bubble"
          readOnly={!title.length}
          placeholder="It all started this one day..."
          value={text}
          onChange={this.handleChange}
          modules={QuillEditor.modules}
          formats={QuillEditor.formats}
          ref={node => this.setRef(node)}
        />
      </StoryContainer>
    );
  }
}

QuillEditor.modules = {
  toolbar: [[{ header: [2, 3, false] }], ['blockquote'], ['clean']]
};

QuillEditor.formats = ['header', 'blockquote'];

export default QuillEditor;
