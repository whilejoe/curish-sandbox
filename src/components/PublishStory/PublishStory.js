import React from 'react';
import { connect } from 'react-redux';
import Description from './Description';
import Tags from './Tags';
import Confirmation from './Confirmation';
import { submit, set, reset } from 'abyss-form/lib/actions';

const DESCRIPTION_KEY = 'descriptionForm';
const TAGS_KEY = 'tagsForm';
const CONFIRM_KEY = 'confirm';

class PublishStory extends React.Component {
  state = {
    activeForm: DESCRIPTION_KEY
  };

  componentWillMount() {
    const { dispatch, storyData: { Story: { description, tags } } } = this.props;
    if (description) dispatch(set('publish.description', description));
    if (tags && tags.length) dispatch(set('publish.tags', tags));
  }

  componentWillUnmount() {
    this.props.dispatch(reset('publish'));
  }

  onDescriptionFormSubmit = () => {
    const { dispatch, updateStoryMutation, storyData, publishForm } = this.props;
    const { Story, variables } = storyData;
    const { description = null } = publishForm;
    dispatch(
      submit('publish', async () => {
        if (Story.description !== description) {
          const result = await updateStoryMutation({
            variables: {
              storyId: variables.storyId,
              description
            }
          });
          if (result.data) this.setState({ activeForm: TAGS_KEY });
        } else this.setState({ activeForm: TAGS_KEY });
      })
    );
  };

  onTagsFormSubmit = () => {
    const { dispatch, updateStoryMutation, storyData: { variables }, publishForm } = this.props;
    const { tags } = publishForm;
    dispatch(
      submit('publish', async () => {
        const tagsResult = await updateStoryMutation({
          variables: {
            storyId: variables.storyId,
            tagsIds: tags
          }
        });
        if (tagsResult.data) this.publishStory();
      })
    );
  };

  publishStory = async () => {
    const { updateStoryMutation, storyData: { variables } } = this.props;
    const result = await updateStoryMutation({
      variables: {
        storyId: variables.storyId,
        published: true
      }
    });
    if (result.data) this.setState({ activeForm: CONFIRM_KEY });
  };

  render() {
    const { publishForm: { description, tags }, storyData: { Story } } = this.props;
    const { activeForm } = this.state;

    if (activeForm === DESCRIPTION_KEY) {
      return (
        <Description
          formDescription={description}
          storyDescription={Story.description}
          onSubmitCallback={this.onDescriptionFormSubmit}
        />
      );
    } else if (activeForm === TAGS_KEY) {
      return (
        <Tags formTags={tags} storyTags={Story.tags} onSubmitCallback={this.onTagsFormSubmit} />
      );
    } else if (activeForm === CONFIRM_KEY) {
      return <Confirmation story={Story} />;
    }
    return null;
  }
}

const mapStateToProps = state => ({
  publishForm: state.forms.publish.model
});

export default connect(mapStateToProps)(PublishStory);
