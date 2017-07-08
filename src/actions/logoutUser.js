import ActionTypes from 'constants/actionTypes';
import firebase from 'firebase';
import {pushRoute} from './pushRoute';

export function logoutUser() {
  return dispatch => {
    dispatch(logoutUserRequestedAction());
    return firebase.auth().signOut()
    // .then(() => dispatch(logoutUserFulfilledAction()))
    .then(
      () => {
        dispatch(logoutUserFulfilledAction());
        dispatch(pushRoute('/authenticate'));
      }
    )
    .catch(error => dispatch(logoutUserRejectedAction(error.message)));
  }
}

function logoutUserRequestedAction() {
  return {
    type: ActionTypes.LogoutUserRequested
  };
}

function logoutUserRejectedAction(error) {
  return {
    type: ActionTypes.LogoutUserRejected,
    error
  }
}

function logoutUserFulfilledAction() {
  return {
    type: ActionTypes.LogoutUserFulfilled
  };
}
