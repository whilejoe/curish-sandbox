import {connect} from 'react-redux';
import CreateStory from 'routes/CreateStory/CreateStory';
import {addToStory} from 'actions/addToStory';

const mapStateToProps = state => ({
  stories: state.stories,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onAddToStory: (author, title, rawData) => dispatch(addToStory({
    author,
    title,
    rawData
  }))
});

const CreateStoryContainer = connect(mapStateToProps, mapDispatchToProps)(CreateStory);

export default CreateStoryContainer;