import React, { Component } from 'react';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import Editor from 'components/Editor';
import EditorTitle from 'components/EditorTitle';
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

    if (result.data) {
      this.setState({ dataIsSaving: false }, () =>
        // Route to Story Edit
        // Pass stories route as referrer so back button has somewhere to go
        history.replace(`/edit/${result.data.createStory.id}`, { referrer: '/stories' })
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
      <PageContainer>
        <Container>
          <EditorTitle
            readOnly={dataIsSaving}
            onChangeCallback={(delta, titleText) =>
              this.debouncedCreateStory({ titleDelta: JSON.stringify(delta), titleText })
            }
            author={user}
          />
          <Editor
            readOnly={dataIsSaving}
            onChangeCallback={delta =>
              this.debouncedCreateStory({ bodyDelta: JSON.stringify(delta) })
            }
          />
        </Container>
      </PageContainer>
    );
  }
}

export default StoryNew;
