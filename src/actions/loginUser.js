import ActionTypes from 'constants/actionTypes';
import {pushRoute} from './pushRoute';
import firebase from 'firebase';

export function loginUserWithEmail(email, password) {
  return dispatch => {
    dispatch(loginUserRequestedAction());
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      () => {
        dispatch(loginUserFulfilledAction());
        dispatch(pushRoute('/profile'));
      }
    )
    .catch(error => dispatch(loginUserRejectedAction(error.message)));
  }
}

export function loginUserWithFacebook() {
  return dispatch => {
    const provider = new firebase.auth.FacebookAuthProvider();
    dispatch(loginUserRequestedAction());
    return firebase.auth().signInWithPopup(provider)
    .then(
      () => {
        dispatch(loginUserFulfilledAction());
        dispatch(pushRoute('/profile'));
      }
    )
    .catch(error => dispatch(loginUserRejectedAction(error.message)));
  }
}

export function loginUserWithGoogle() {
  return dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider();
    dispatch(loginUserRequestedAction());
    return firebase.auth().signInWithPopup(provider)
    // .then(result => dispatch(loginUserFulfilledAction(result.user)))
    .then(
      () => {
        dispatch(loginUserFulfilledAction());
        dispatch(pushRoute('/profile'));
      }
    )
    .catch(error => dispatch(loginUserRejectedAction(error.message)));
  }
}

function loginUserRequestedAction() {
  return {
    type: ActionTypes.LoginUserRequested
  };
}

function loginUserRejectedAction(error) {
  return {
    type: ActionTypes.LoginUserRejected,
    error
  }
}

function loginUserFulfilledAction(user = null) {
  return {
    type: ActionTypes.LoginUserFulfilled,
    user
  };
}
