import StoryNew from 'routes/StoryNew';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation(
    $userId: ID!
    $titleText: String
    $titleDelta: String
    $bodyDelta: String
  ) {
    createStory(
      authorId: $userId
      titleText: $titleText
      titleDelta: $titleDelta
      bodyDelta: $bodyDelta
    ) {
      id
      titleText
      titleDelta
      bodyDelta
      author {
        id
        userName
      }
    }
  }
`;

export default graphql(CREATE_STORY_MUTATION, { name: 'createStoryMutation' })(StoryNew);
