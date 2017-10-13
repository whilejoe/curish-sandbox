import PublishStory from 'components/PublishStory';
import { connect } from 'react-redux';
import { submit } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  publishForm: state.forms.publish.model
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updatePublishStory: (description = null, tags = null) => {
    const { updateStoryMutation, storyData } = ownProps;
    const { Story, variables } = storyData;
    const dataToUpdate = description && !tags ? { description } : { tags };
    console.log('ownProps', ownProps);
    if (Story.description !== description || Story.tags !== tags) {
      dispatch(
        submit('publish', async () => {
          const result = await updateStoryMutation({
            variables: {
              storyId: variables.storyId,
              ...dataToUpdate
            }
          });
          console.log('result', result);
          return result;
        })
      );
    } else console.log('no need to update');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishStory);
