import UserStories from 'routes/UserStories';
import { gql, graphql } from 'react-apollo';

export const USER_STORIES_QUERY = gql`
  query getAllUserStories {
    user {
      id
      stories(orderBy: updatedAt_DESC) {
        id
        createdAt
        updatedAt
        published
        titleText
        titleDelta
        bodyDelta
        description
        tags {
          id
          key
        }
      }
    }
  }
`;

// const ALL_USER_STORIES_QUERY = gql`
// query AllUserStoriesQuery($searchText: String!) {
//   allStories(
//     filter: {
//       published: true
//     }
//     orderBy: titleText_ASC
//   ) {
//     id
//     createdAt
//     updatedAt
//     published
//     titleText
//     titleDelta
//     bodyDelta
//     description
//     tags {
//       id
//       key
//     }
//     author {
//       id
//       userName
//     }
//   }
// }
// `;

export default graphql(USER_STORIES_QUERY, {
  name: 'userData'
  // options: { fetchPolicy: 'cache-and-network' }
})(UserStories);
