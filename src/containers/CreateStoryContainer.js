import QuillEditor from 'components/QuillEditor';
import { gql, graphql, compose } from 'react-apollo';

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation($userId: ID!, $title: String!) {
    createStory(authorId: $userId, title: $title) {
      id
      title
      author {
        id
      }
    }
  }
`;

export default compose(graphql(CREATE_STORY_MUTATION, { name: 'createStoryMutation' }))(
  QuillEditor
);
