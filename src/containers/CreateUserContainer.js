import CreateUser from 'components/CreateUser';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { getIdToken } from 'utils/AuthService';
import { submit } from 'abyss-form/lib/actions';
import store from 'state/store';
import { push } from 'react-router-redux';

const mapStateToProps = state => ({
  profileForm: state.forms.profile.model
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createUser: (email, fullName, userName) => {
    const { createUserMutation, userResult } = ownProps;
    dispatch(
      submit('profile', async () => {
        const idToken = getIdToken();
        await createUserMutation({
          variables: {
            idToken,
            fullName,
            userName,
            email
          }
        });
        // Refetch user query after create
        await userResult.refetch();
        store.dispatch(push('/profile'));
      })
    );
  }
});

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $idToken: String!
    $fullName: String!
    $userName: String!
    $email: String!
  ) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      fullName: $fullName
      userName: $userName
      email: $email
    ) {
      id
    }
  }
`;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateUser);
