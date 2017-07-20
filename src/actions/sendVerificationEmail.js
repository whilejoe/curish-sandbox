import firebase from 'firebase';
// import {pushRoute} from './pushRoute';

export const SEND_VERIFICATION_EMAIL_REQUESTED = 'SEND_VERIFICATION_EMAIL_REQUESTED';
export const SEND_VERIFICATION_EMAIL_REJECTED = 'SEND_VERIFICATION_EMAIL_REJECTED';
export const SEND_VERIFICATION_EMAIL_FULFILLED = 'SEND_VERIFICATION_EMAIL_FULFILLED';

export function sendVerificationEmail() {
  return dispatch => {
    dispatch(sendVerificationEmailRequestedAction());
    const currentUser = firebase.auth().currentUser;
    if (!currentUser.emailVerified) {
      return currentUser
        .sendEmailVerification()
        .then(() => dispatch(sendVerificationEmailFulfilledAction()))
        .catch(error => dispatch(sendVerificationEmailRejectedAction(error.message)));
    } else console.log('EMAIL IS VERIFIED');
  };
}

export const sendVerificationEmailRequestedAction = () => {
  return {
    type: SEND_VERIFICATION_EMAIL_REQUESTED
  };
};

export const sendVerificationEmailRejectedAction = error => {
  return {
    type: SEND_VERIFICATION_EMAIL_REJECTED,
    payload: error
  };
};

export const sendVerificationEmailFulfilledAction = () => {
  return {
    type: SEND_VERIFICATION_EMAIL_FULFILLED
  };
};
