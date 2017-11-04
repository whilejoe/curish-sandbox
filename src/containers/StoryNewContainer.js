import StoryNew from 'routes/StoryNew';
import { graphql } from 'react-apollo';
import CreateStoryMutation from 'graphql/CreateStoryMutation.graphql';

export default graphql(CreateStoryMutation, { name: 'createStoryMutation' })(StoryNew);
