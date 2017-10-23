import Profile from 'routes/Profile';
import { gql, graphql } from 'react-apollo';

export const PROFILE_QUERY = gql`
  query getProfileByUserName($userName: String!) {
    User(userName: $userName) {
      id
      createdAt
      userName
      fullName
      photoURL
      stories(filter: { published: true }, orderBy: updatedAt_DESC) {
        id
        updatedAt
        published
        titleText
        description
        tags {
          id
          key
        }
      }
    }
  }
`;

export default graphql(PROFILE_QUERY, {
  name: 'profile',
  skip: ({ match }) => !match.params.userName,
  options: ({ match }) => ({ variables: { userName: match.params.userName } })
})(Profile);
