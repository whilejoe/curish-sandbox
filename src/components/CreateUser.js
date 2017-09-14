import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
// import store from 'state/store';
// import { push } from 'react-router-redux';
import Container from 'components/Container';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import { getIdToken } from 'utils/AuthService';

class CreateUser extends React.Component {
  state = {
    email: '',
    fullName: '',
    userName: ''
  };

  render() {
    if (this.props.userData.loading) {
      return <div>Loading</div>;
    }
    if (this.props.userData.user) {
      console.warn('Already Registered');
      // decide if Redirect is the best way to go
      // this.props.history.push('/profile');
      // store.dispatch(push('/profile'));
      return (
        <Redirect
          to={{
            pathname: '/profile'
          }}
        />
      );
    }

    return (
      <Container narrow>
        <h1>Join</h1>
        <InputGroup
          autoFocus
          id="email"
          label="Email"
          type="email"
          model="register.email"
          placeholder="me@me.com"
          validators={{ required: value => !value }}
          errorMessages={{ required: 'Email is required' }}
        />
        <InputGroup
          id="fullName"
          label="Full Name"
          type="text"
          model="register.fullName"
          placeholder="Marquis De Sade"
          validators={{ required: value => !value }}
          errorMessages={{ required: 'Full Name is required' }}
        />
        <InputGroup
          id="userName"
          label="Username"
          type="text"
          model="register.userName"
          placeholder="theoriginalsadist"
          validators={{ required: value => !value }}
          errorMessages={{ required: 'Username is required' }}
        />
        <Button onClick={this.createUser}>Join Curish</Button>
      </Container>
    );
  }
  createUser = async () => {
    const { email, fullName, userName } = this.props.registerForm.model;
    const idToken = getIdToken();
    const result = await this.props.createUserMutation({
      variables: {
        idToken,
        fullName,
        userName,
        email
      }
    });
    console.log('result', result);
    this.props.history.push('/profile');
    // store.dispatch(push('/profile'));
  };
}

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
  graphql(USER_QUERY, { name: 'userData', options: { fetchPolicy: 'network-only' } })
)(CreateUser);

// const ComposedCreateUser = compose(
//   graphql(USER_EXISTS_QUERY, { name: 'userData', options: { fetchPolicy: 'network-only' } }),
//   graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })
// )(CreateUser);

// export default withRouter(ComposedCreateUser);

// export default graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })(
//   graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(CreateUser)
// );

// export default graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })(CreateUser);
