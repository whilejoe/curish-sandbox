import QuillEditor from 'components/QuillEditor';
import { gql, graphql, compose } from 'react-apollo';

export const STORY_QUERY = gql`
  query getStoryById($storyId: ID!) {
    Story(id: $storyId) {
      id
      published
      titleText
      titleDelta
      bodyDelta
      description
      tags {
        id
        key
      }
      author {
        id
        userName
      }
    }
  }
`;

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

const UPDATE_STORY_MUTATION = gql`
  mutation UpdateStoryMutation(
    $storyId: ID!
    $published: Boolean
    $titleText: String
    $titleDelta: String
    $bodyMarkup: String
    $bodyDelta: String
    $description: String
    $tagsIds: [ID!]
  ) {
    updateStory(
      id: $storyId
      published: $published
      titleText: $titleText
      titleDelta: $titleDelta
      bodyMarkup: $bodyMarkup
      bodyDelta: $bodyDelta
      description: $description
      tagsIds: $tagsIds
    ) {
      id
      published
      titleText
      titleDelta
      bodyDelta
      description
      tags {
        id
        key
      }
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
