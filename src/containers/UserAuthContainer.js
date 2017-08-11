import { connect } from 'react-redux';
import Auth from 'routes/Auth';
import { createUserWithEmail } from 'actions/createUserWithEmail';
import { loginUserWithEmail, loginUserWithFacebook, loginUserWithGoogle } from 'actions/loginUser';
import { submit, reset } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  user: state.user,
  authForm: state.forms.auth
});

const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(reset('auth')),
  registerWithEmail: (email, password) => {
    dispatch(
      submit('auth', () => {
        dispatch(createUserWithEmail(email, password));
      })
    );
  },
  loginWithEmail: (email, password) => {
    dispatch(
      submit('auth', () => {
        dispatch(loginUserWithEmail(email, password));
      })
    );
  },
  loginWithFacebook: () => dispatch(loginUserWithFacebook()),
  loginWithGoogle: () => dispatch(loginUserWithGoogle())
});

const UserAuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default UserAuthContainer;
