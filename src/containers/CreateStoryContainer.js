import QuillEditor from 'components/QuillEditor';
import { gql, graphql, compose } from 'react-apollo';

export const STORY_QUERY = gql`
  query getStoryById($storyId: ID!) {
    Story(id: $storyId) {
      id
      titleText
      titleDelta
      bodyDelta
      description
      tags
      author {
        id
        userName
      }
    }
  }
`;

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation($userId: ID!, $titleText: String!, $titleDelta: String!) {
    createStory(authorId: $userId, titleText: $titleText, titleDelta: $titleDelta) {
      id
      titleText
      titleDelta
      author {
        id
        userName
      }
    }
  }
`;

const UPDATE_STORY_MUTATION = gql`
  mutation UpdateStoryMutation(
    $storyId: ID!
    $titleText: String
    $titleDelta: String
    $bodyMarkup: String
    $bodyDelta: String
    $description: String
    $tags: [String!]
  ) {
    updateStory(
      id: $storyId
      titleText: $titleText
      titleDelta: $titleDelta
      bodyMarkup: $bodyMarkup
      bodyDelta: $bodyDelta
      description: $description
      tags: $tags
    ) {
      id
      titleText
      titleDelta
      bodyDelta
      description
      tags
      author {
        id
        userName
      }
    }
  }
`;

export default compose(
  graphql(CREATE_STORY_MUTATION, { name: 'createStoryMutation' }),
  graphql(UPDATE_STORY_MUTATION, { name: 'updateStoryMutation' }),
  graphql(STORY_QUERY, {
    name: 'storyData',
    skip: ({ match }) => !match.params.id,
    options: ({ match }) => ({ variables: { storyId: match.params.id } })
  })
)(QuillEditor);
