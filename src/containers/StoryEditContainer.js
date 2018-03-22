import StoryEdit from 'routes/StoryEdit';
import { graphql, compose } from 'react-apollo';
import StoryByIdQuery from 'graphql/StoryByIdQuery.graphql';
import UpdateStoryMutation from 'graphql/UpdateStoryMutation.graphql';

export default compose(
  graphql(UpdateStoryMutation, { name: 'updateStoryMutation' }),
  graphql(StoryByIdQuery, {
    name: 'storyData',
    options: ({ match }) => ({ variables: { storyId: match.params.id } })
  })
)(StoryEdit);
