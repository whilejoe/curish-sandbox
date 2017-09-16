import QuillEditor from 'components/QuillEditor';
import { gql, graphql, compose } from 'react-apollo';

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation($authorId: ID!, $title: String!) {
    createStory(authorId: $authorId, title: $title) {
      id
      title
    }
  }
`;

export default compose(graphql(CREATE_STORY_MUTATION, { name: 'createStoryMutation' }))(
  QuillEditor
);
