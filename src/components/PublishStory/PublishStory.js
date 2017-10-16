import React from 'react';
import { connect } from 'react-redux';
import Description from './Description';
import Tags from './Tags';
import { submit, set, reset } from 'abyss-form/lib/actions';

class PublishStory extends React.Component {
  state = {
    activeForm: 'descriptionForm'
  };

  componentWillMount() {
    const { dispatch, storyData: { Story: { description, tags } } } = this.props;
    console.log('willMount', this.props);
    if (description) dispatch(set('publish.description', description));
    // dispatch(set('publish.tags', tags && tags.length ? tags : undefined));
    if (tags && tags.length) {
      console.log('******tags && tags.length*****', tags);
      dispatch(set('publish.tags', tags));
    }
    // dispatch(set('publish.tags', options));
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
          console.log('result', result);
          if (result.data) this.setState({ activeForm: 'tagsForm' });
          // dispatch(reset('publish.description'));
        } else this.setState({ activeForm: 'tagsForm' });
      })
    );
  };

  onTagsFormSubmit = async () => {
    const { dispatch, updateStoryMutation, storyData, publishForm } = this.props;
    const { variables } = storyData;
    const { tags } = publishForm;
    console.log('tags onSubmit', tags);
    dispatch(
      submit('publish', async () => {
        if (tags && tags.length > 0) {
          const result = await updateStoryMutation({
            variables: {
              storyId: variables.storyId,
              tagsIds: tags
            }
          });
          console.log('tags result', result);
          if (result.data) this.setState({ activeForm: 'attestForm' });
          // dispatch(reset('publish.tags'));
        } else this.setState({ activeForm: 'attestForm' });
      })
    );
    // if (Story.tags !== tags) {
    //   const result = await updateStoryMutation({
    //     variables: {
    //       storyId: variables.storyId,
    //       tags
    //     }
    //   });
    //   if (result.data) console.log('result', result);
    // } else console.log('no need to update');
  };

  // handleChangeSelect = vals => {
  //   console.log('vals', vals);
  //   this.setState({ selectedTags: vals });
  // };

  render() {
    const { publishForm: { description, tags }, storyData: { Story } } = this.props;
    const { activeForm } = this.state;
    // console.log('story.tags', Story.tags);
    // console.log('this.props', this.props);

    if (activeForm === 'descriptionForm') {
      return (
        <Description
          formDescription={description}
          storyDescription={Story.description}
          onSubmitCallback={this.onDescriptionFormSubmit}
        />
      );
    } else if (activeForm === 'tagsForm') {
      return (
        <Tags formTags={tags} storyTags={Story.tags} onSubmitCallback={this.onTagsFormSubmit} />
      );
    } else if (activeForm === 'attestForm') {
      return <p>Attest Form!!</p>;
    }
    return null;
  }
}

const mapStateToProps = state => ({
  publishForm: state.forms.publish.model
});

export default connect(mapStateToProps)(PublishStory);
