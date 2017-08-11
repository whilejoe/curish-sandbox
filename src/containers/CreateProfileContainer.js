import { connect } from 'react-redux';
import CreateProfile from 'routes/CreateProfile';
import { createAppUser } from 'actions/createAppUser';
import { submit } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  user: state.user,
  registerForm: state.forms.register
});

const mapDispatchToProps = dispatch => ({
  createAppUser: userData => {
    dispatch(
      submit('register', () => {
        dispatch(createAppUser(userData));
      })
    );
  }
});

const CreateProfileContainer = connect(mapStateToProps, mapDispatchToProps)(CreateProfile);

export default CreateProfileContainer;
