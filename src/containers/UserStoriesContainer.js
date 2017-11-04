import UserStories from 'routes/UserStories';
import { graphql } from 'react-apollo';
import AllUsersStoriesQuery from 'graphql/AllUsersStoriesQuery.graphql';

export default graphql(AllUsersStoriesQuery, {
  name: 'userData'
})(UserStories);
