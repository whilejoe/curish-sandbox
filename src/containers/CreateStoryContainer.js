import QuillEditor from 'components/QuillEditor';
import { gql, graphql, compose } from 'react-apollo';

export const STORY_QUERY = gql`
  query getStoryById($storyId: ID!) {
    Story(id: $storyId) {
      id
      title
      quillContent
      author {
        id
        userName
      }
    }
  }
`;

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation($userId: ID!, $title: String!) {
    createStory(authorId: $userId, title: $title) {
      id
      title
      author {
        id
        userName
      }
    }
  }
`;

const UPDATE_STORY_MUTATION = gql`
  mutation UpdateStoryMutation($storyId: ID!, $title: String, $quillContent: String) {
    updateStory(id: $storyId, title: $title, quillContent: $quillContent) {
      id
      title
      quillContent
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
