import StoryPublished from 'routes/StoryPublished';
import { graphql } from 'react-apollo';
import { STORY_QUERY } from './StoryEditContainer';

export default graphql(STORY_QUERY, {
  name: 'storyData',
  options: ({ match }) => ({ variables: { storyId: match.params.id } })
})(StoryPublished);
