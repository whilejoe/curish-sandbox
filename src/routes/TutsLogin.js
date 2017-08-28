import React, { Component } from 'react';
import Container from 'components/Container';
import StatelessInput from 'components/StatelessInput';
import Button from 'components/Button';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { pushRoute } from 'actions/pushRoute';
import { GC_USER_ID, GC_AUTH_TOKEN } from 'constants/tuts';

class TutsLogin extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: ''
  };

  render() {
    return (
      <Container>
        <h1>
          {this.state.login ? 'Login' : 'Sign Up'}
        </h1>
        {!this.state.login &&
          <StatelessInput
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="Your name"
          />}
        <StatelessInput
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          type="text"
          placeholder="Your email address"
        />
        <StatelessInput
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          type="password"
          placeholder="Choose a safe password"
        />
        <Button onClick={() => this._confirm()}>
          {this.state.login ? 'login' : 'create account'}
        </Button>
        <Button onClick={() => this.setState({ login: !this.state.login })}>
          {this.state.login ? 'need to create an account?' : 'already have an account?'}
        </Button>
      </Container>
    );
  }

  _confirm = async () => {
    const { name, email, password } = this.state;
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
          name,
          email,
          password
        }
      });
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this._saveUserData(id, token);
    }
    this.props.dispatch(pushRoute('/graph-ql'));
  };

  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  };
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, authProvider: { email: { email: $email, password: $password } }) {
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
