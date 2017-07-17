import React, {Component} from 'react';
import './Authenticate.css';
import Button from 'components/Button';

class Authenticate extends Component {

  state = {
    email: '',
    password: '',
    userCreated: false
  };

  handleCreateAccount = () => {
    const {email, password} = this.state;
    this.props.createUserWithEmail(email, password);
  }

  render() {
    const {user} = this.props;
    const {email, password} = this.state;
    return (
      <div>
        <h1>Login/Create Account</h1>
        {user.error && <p style={{color: 'red'}}>{user.error}</p>}
        <p>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => this.setState({ email: e.target.value })} 
            autoFocus />
        </p>
        <p>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })} />
        </p>
        <Button
          onClick={() => ((email && password) && this.props.loginUserWithEmail(email, password))}
          className="login-action">
          Login With Email
        </Button>
        <Button
          theme="secondary"
          onClick={() => this.props.loginUserWithFacebook()}
          className="login-action">
          Login With Facebook
        </Button>
        <Button
          theme="tertiary"
          onClick={() => this.props.loginUserWithGoogle()}
          className="login-action">
          Login With Google
        </Button>
        <Button
          onClick={() => ((email && password) && this.handleCreateAccount())}
          className="login-action">
          Create Account
        </Button>
      </div>
    );
  }
}

export default Authenticate;