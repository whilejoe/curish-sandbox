import CreateUser from 'components/CreateUser';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getIdToken } from 'utils/AuthService';
import { submit } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  registerForm: state.forms.register.model
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createUser: (email, fullName, userName) => {
    const { createUserMutation } = ownProps;
    dispatch(
      submit('register', async () => {
        const idToken = getIdToken();
        const result = await createUserMutation({
          variables: {
            idToken,
            fullName,
            userName,
            email
          }
        });
        console.log('create user result =', result);
        dispatch(push('/profile'));
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

const USER_QUERY = gql`
  query {
    user {
      id
    }
  }
`;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(USER_QUERY, { name: 'userData', options: { fetchPolicy: 'network-only' } }),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateUser);
