import React, { Component } from 'react';
import Editor from 'components/Editor';
import StoryContainer from 'components/StoryContainer';
import TitleEditor from 'components/TitleEditor';
import debounce from 'lodash/debounce';

class StoryNew extends Component {
  createStory = async variables => {
    const { createStoryMutation, userResult: { user }, history } = this.props;
    if (!user) return; // handle this better
    const result = await createStoryMutation({
      variables: {
        userId: user.id,
        ...variables
      }
    });
    // Push to edit route with id
    if (result.data) {
      history.push(`/edit/${result.data.createStory.id}`);
    }
  };

  debouncedCreateStory = debounce(variables => {
    this.createStory(variables);
  }, 1600);

  render() {
    const { userResult: { user }, location } = this.props;
    return (
      <StoryContainer>
        <TitleEditor
          author={user}
          onChangeTitle={(delta, titleText) =>
            this.debouncedCreateStory({ titleDelta: JSON.stringify(delta), titleText })}
          referrer={location}
        />,
        <Editor
          readOnly={false}
          placeholder="It all started this one day..."
          onChangeCallback={delta =>
            this.debouncedCreateStory({ storyBody: JSON.stringify(delta) })}
        />
      </StoryContainer>
    );
  }
}

export default StoryNew;
