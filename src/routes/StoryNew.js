import React, { Component } from 'react';
import Editor from 'components/Editor';
import EditorTitle from 'components/EditorTitle';
import StoryContainer from 'components/StoryContainer';
import debounce from 'lodash/debounce';

class StoryNew extends Component {
  state = {
    dataIsSaving: false
  };

  createStory = async variables => {
    const { createStoryMutation, userResult: { user }, history } = this.props;

    // Prevent duplicate story creation
    this.setState({ dataIsSaving: true });

    // Create story
    const result = await createStoryMutation({
      variables: {
        userId: user.id,
        ...variables
      }
    });

    // Push to edit route with id
    if (result.data) {
      this.setState({ dataIsSaving: false }, () =>
        history.push(`/edit/${result.data.createStory.id}`)
      );
    }
  };

  debouncedCreateStory = debounce(variables => {
    this.createStory(variables);
  }, 1600);

  render() {
    const { userResult: { user } } = this.props;
    const { dataIsSaving } = this.state;
    return (
      <StoryContainer>
        <EditorTitle
          readOnly={dataIsSaving}
          onChangeCallback={(delta, titleText) =>
            this.debouncedCreateStory({ titleDelta: JSON.stringify(delta), titleText })}
          author={user}
        />
        <Editor
          readOnly={dataIsSaving}
          onChangeCallback={delta =>
            this.debouncedCreateStory({ bodyDelta: JSON.stringify(delta) })}
        />
      </StoryContainer>
    );
  }
}

export default StoryNew;
