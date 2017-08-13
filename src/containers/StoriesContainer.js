import { connect } from 'react-redux';
import Stories from 'routes/Stories/Stories';
import { getStories } from 'actions/getStories';

const mapStateToProps = state => ({
  stories: state.stories.stories
});

const mapDispatchToProps = dispatch => ({
  getStories: () => dispatch(getStories())
});

const StoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Stories);

export default StoriesContainer;
