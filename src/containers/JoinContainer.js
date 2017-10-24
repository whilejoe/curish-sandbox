import Join from 'routes/Join';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { getIdToken } from 'utils/AuthService';
import { submit } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  profileForm: state.forms.profile.model
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createUser: (email, fullName, userName) => {
    const { createUserMutation, userResult, history } = ownProps;
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
        history.push('/');
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
)(Join);
