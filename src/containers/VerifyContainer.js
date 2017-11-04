import { connect } from 'react-redux';
import { submit } from 'abyss-form/lib/actions';
import { formatNumber } from 'utils/phoneNumber';
import { verifyCode } from 'utils/authService';
import Verify from 'routes/Verify';

const mapStateToProps = state => ({
  loginForm: state.forms.login,
  verifyForm: state.forms.verify
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  verifyLoginCode: (phone, code) => {
    dispatch(
      submit('verify', () => {
        const formatted = formatNumber(phone);
        verifyCode(formatted, code)
          .then(res => {
            console.log('response in verify', res);
            ownProps.history.push('/');
          })
          .catch(err => console.error('error verifying code', err));
      })
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
