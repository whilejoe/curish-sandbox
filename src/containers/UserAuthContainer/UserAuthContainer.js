import {connect} from 'react-redux';
import Authenticate from 'routes/Authenticate/Authenticate';
import {createUserWithEmail} from 'actions/createUserWithEmail';
import {loginUserWithEmail, loginUserWithFacebook, loginUserWithGoogle} from 'actions/loginUser';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  createUserWithEmail: (email, password) => dispatch(createUserWithEmail(email, password)),
  loginUserWithEmail: (email, password) => dispatch(loginUserWithEmail(email, password)),
  loginUserWithFacebook: () => dispatch(loginUserWithFacebook()),
  loginUserWithGoogle: () => dispatch(loginUserWithGoogle())
});

const UserAuthContainer = connect(mapStateToProps, mapDispatchToProps)(Authenticate);

export default UserAuthContainer;