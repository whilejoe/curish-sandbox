import { connect } from 'react-redux';
import PasswordlessLogin from 'routes/PasswordlessLogin';

const mapStateToProps = state => ({
  authForm: state.forms.auth
});

const LoginContainer = connect(mapStateToProps)(PasswordlessLogin);

export default LoginContainer;
