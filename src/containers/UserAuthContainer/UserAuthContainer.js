import {connect} from 'react-redux';
import Authenticate from 'routes/Authenticate/Authenticate';
import {createUser} from 'actions/createUser';
import {loginUserWithEmail, loginUserWithFacebook, loginUserWithGoogle} from 'actions/loginUser';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  createUser: (email, password) => dispatch(createUser(email, password)),
  loginUserWithEmail: (email, password) => dispatch(loginUserWithEmail(email, password)),
  loginUserWithFacebook: () => dispatch(loginUserWithFacebook()),
  loginUserWithGoogle: () => dispatch(loginUserWithGoogle())
});

const UserAuthContainer = connect(mapStateToProps, mapDispatchToProps)(Authenticate);

export default UserAuthContainer;