import firebase from 'firebase';
import { pushRoute } from './pushRoute';

export const LOGIN_USER_REQUESTED = 'LOGIN_USER_REQUESTED';
export const LOGIN_USER_REJECTED = 'LOGIN_USER_REJECTED';
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED';

export function loginUserWithEmail(email, password) {
  return dispatch => {
    dispatch(loginUserRequestedAction());
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(loginUserFulfilledAction());
        dispatch(pushRoute('/profile')); // TODO: revisit and check if user is registered
      })
      .catch(error => dispatch(loginUserRejectedAction(error.message)));
  };
}

export function loginUserWithFacebook() {
  return dispatch => {
    const provider = new firebase.auth.FacebookAuthProvider();
    dispatch(loginUserRequestedAction());
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        dispatch(loginUserFulfilledAction());
        dispatch(pushRoute('/profile'));
      })
      .catch(error => dispatch(loginUserRejectedAction(error.message)));
  };
}

export function loginUserWithGoogle() {
  return dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider();
    dispatch(loginUserRequestedAction());
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        dispatch(loginUserFulfilledAction());
        dispatch(pushRoute('/profile'));
      })
      .catch(error => dispatch(loginUserRejectedAction(error.message)));
  };
}

export const loginUserRequestedAction = () => ({
  type: LOGIN_USER_REQUESTED
});

export const loginUserRejectedAction = error => ({
  type: LOGIN_USER_REJECTED,
  payload: error
});

export const loginUserFulfilledAction = () => ({
  type: LOGIN_USER_FULFILLED
});
