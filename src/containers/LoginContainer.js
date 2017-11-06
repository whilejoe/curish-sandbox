import { connect } from 'react-redux';
import { submit } from 'abyss-form/lib/actions';
import { formatNumber } from 'utils/phoneNumber';
import { startPasswordless } from 'utils/AuthService';
import Login from 'routes/Login';

const mapStateToProps = state => ({
  loginForm: state.forms.login
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  beginLogin: phone => {
    dispatch(
      submit('login', () => {
        const formatted = formatNumber(phone);
        startPasswordless(formatted)
          .then(res => {
            console.log('response in login', res);
            ownProps.history.push('/verify');
          })
          .catch(err => console.error('error logging in', err));
      })
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
