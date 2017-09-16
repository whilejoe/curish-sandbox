import CreateUser from 'components/CreateUser';
import { gql, graphql, compose } from 'react-apollo';

export const createStory = async (title, { createStoryMutation, user: { id } }) => {
  const result = await createStoryMutation({
    variables: {
      id,
      title
    }
  });
  console.log('create user result =', result);
};

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation($id: String!, $title: String!) {
    createStory(authorId: $id, title: $title) {
      id
      title
    }
  }
`;

const USER_QUERY = gql`
  query {
    user {
      id
    }
  }
`;

export default compose(
  graphql(CREATE_STORY_MUTATION, { name: 'createStoryMutation' }),
  graphql(USER_QUERY)
)(CreateUser);
