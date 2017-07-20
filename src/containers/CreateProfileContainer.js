import { connect } from 'react-redux';
import CreateProfile from 'routes/CreateProfile/CreateProfile';
import { createAppUser } from 'actions/createAppUser';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  createAppUser: user => dispatch(createAppUser(user))
});

const CreateProfileContainer = connect(mapStateToProps, mapDispatchToProps)(CreateProfile);

export default CreateProfileContainer;
