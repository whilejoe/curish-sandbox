import ActionTypes from 'constants/actionTypes';
import firebase from 'firebase';
import {pushRoute} from './pushRoute';

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

function createUserWithEmailRequestedAction() {
  return {
    type: ActionTypes.CreateUserWithEmailRequested
  };
}

function createUserWithEmailRejectedAction(error) {
  return {
    type: ActionTypes.CreateUserWithEmailRejected,
    error
  }
}

function createUserWithEmailFulfilledAction(email) {
  return {
    type: ActionTypes.CreateUserWithEmailFulfilled,
    email
  };
}
