import Profile from 'routes/Profile';
import { graphql } from 'react-apollo';
import ProfileByUserNameQuery from 'graphql/ProfileByUserNameQuery.graphql';

export default graphql(ProfileByUserNameQuery, {
  name: 'profile',
  skip: ({ match }) => !match.params.userName,
  options: ({ match }) => ({ variables: { userName: match.params.userName } })
})(Profile);
