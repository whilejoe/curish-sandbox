import React, { Component } from 'react';
import Container from 'components/Container';
import { Flex, FlexContent } from 'components/Flex';
import StatelessInput from 'components/StatelessInput';
import Button from 'components/Button';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
// import { pushRoute } from 'actions/pushRoute';
import { USER_ID, AUTH_TOKEN } from 'constants/tuts';

class TutsLogin extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    fullName: '',
    userName: ''
  };

  render() {
    return (
      <Container>
        <h1>{this.state.login ? 'Login' : 'Join'}</h1>
        {!this.state.login && (
          <div>
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
          </div>
        )}
        <StatelessInput
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          type="text"
          placeholder="email"
        />
        <StatelessInput
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          type="password"
          placeholder="password"
        />
        <Flex gutters guttersVertical>
          <FlexContent space="self">
            <Button onClick={() => this._confirm()}>
              {this.state.login ? 'login' : 'join curish'}
            </Button>
          </FlexContent>
          <FlexContent space="self">
            <Button onClick={() => this.setState({ login: !this.state.login })}>
              {this.state.login ? 'need to create an account?' : 'already have an account?'}
            </Button>
          </FlexContent>
        </Flex>
      </Container>
    );
  }

  _confirm = async () => {
    const { fullName, userName, email, password } = this.state;
    if (this.state.login) {
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      });
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this._saveUserData(id, token);
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          fullName,
          userName,
          email,
          password
        }
      });
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this._saveUserData(id, token);
    }
    // this.props.dispatch(pushRoute('/')); // Update once profile is hooked up
  };

  _saveUserData = (id, token) => {
    localStorage.setItem(USER_ID, id);
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $fullName: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      fullName: $fullName
      userName: $userName
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

export default compose(
  connect(),
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(TutsLogin);
