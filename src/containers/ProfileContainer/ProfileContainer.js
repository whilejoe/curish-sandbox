import {connect} from 'react-redux';
import Profile from 'routes/Profile/Profile';
import {logoutUser} from 'actions/logoutUser';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;