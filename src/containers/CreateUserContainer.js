import { connect } from 'react-redux';
import CreateUser from 'components/CreateUser';
import { submit } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  registerForm: state.forms.register
});

const mapDispatchToProps = dispatch => ({
  createAppUser: userData => {
    dispatch(submit('register', () => {}));
  }
});

const CreateUserContainer = connect(mapStateToProps, mapDispatchToProps)(CreateUser);

export default CreateUserContainer;
