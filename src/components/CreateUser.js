import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
// import store from 'state/store';
// import { push } from 'react-router-redux';
import Container from 'components/Container';
import StatelessInput from 'components/StatelessInput';
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
    if (this.props.userData.user || !getIdToken()) {
      console.warn('not a new user or already logged in');
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
      <Container>
        <StatelessInput
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          type="text"
          placeholder="email"
        />
        <StatelessInput
          value={this.state.fullName}
          onChange={e => this.setState({ fullName: e.target.value })}
          type="text"
          placeholder="Full Name"
        />
        <StatelessInput
          value={this.state.userName}
          onChange={e => this.setState({ userName: e.target.value })}
          type="text"
          placeholder="username"
        />
        {this.state.email &&
        this.state.fullName &&
        this.state.userName && <Button onClick={this.createUser}>Sign up</Button>}
      </Container>
    );
  }
  createUser = async () => {
    const { fullName, userName, email } = this.state;
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
