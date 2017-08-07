import { connect } from 'react-redux';
import Profile from 'routes/Profile';
import { logoutUser } from 'actions/logoutUser';
import { createAppUser } from 'actions/createAppUser';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  createAppUser: user => dispatch(createAppUser(user))
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
