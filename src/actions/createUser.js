import ActionTypes from 'constants/actionTypes';
import firebase from 'firebase';

export function createUser(email, password) {
  return dispatch => {
    dispatch(createUserRequestedAction());
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => dispatch(createUserFulfilledAction(email, password)))
    .catch(error => dispatch(createUserRejectedAction(error.message)));
  }
}

function createUserRequestedAction() {
  return {
    type: ActionTypes.CreateUserRequested
  };
}

function createUserRejectedAction(error) {
  return {
    type: ActionTypes.CreateUserRejected,
    error
  }
}

function createUserFulfilledAction(email, password) {
  return {
    type: ActionTypes.CreateUserFulfilled,
    email,
    password
  };
}
