import firebase from 'firebase';
import {pushRoute} from './pushRoute';

export const CREATE_USER_WITH_EMAIL_REQUESTED = 'CREATE_USER_WITH_EMAIL_REQUESTED';
export const CREATE_USER_WITH_EMAIL_REJECTED = 'CREATE_USER_WITH_EMAIL_REJECTED';
export const CREATE_USER_WITH_EMAIL_FULFILLED = 'CREATE_USER_WITH_EMAIL_FULFILLED';

export function createUserWithEmail(email, password) {
  return dispatch => {
    dispatch(createUserWithEmailRequestedAction());
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      () => {
        dispatch(createUserWithEmailFulfilledAction(email));
        dispatch(pushRoute('/profile'));
      }
    )
    .catch(error => dispatch(createUserWithEmailRejectedAction(error.message)));
  }
}

export const createUserWithEmailRequestedAction = () => {
  return {
    type: CREATE_USER_WITH_EMAIL_REQUESTED
  };
}

export const createUserWithEmailRejectedAction = error => {
  return {
    type: CREATE_USER_WITH_EMAIL_REJECTED,
    payload: error
  }
}

export const createUserWithEmailFulfilledAction = email => {
  return {
    type: CREATE_USER_WITH_EMAIL_FULFILLED,
    payload: email
  };
}
