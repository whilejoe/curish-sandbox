import firebase from 'firebase';
import { pushRoute } from './pushRoute';

export const LOGOUT_USER_REQUESTED = 'LOGOUT_USER_REQUESTED';
export const LOGOUT_USER_REJECTED = 'LOGOUT_USER_REJECTED';
export const LOGOUT_USER_FULFILLED = 'LOGOUT_USER_FULFILLED';

export function logoutUser() {
  return dispatch => {
    dispatch(logoutUserRequestedAction());
    return firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logoutUserFulfilledAction());
        dispatch(pushRoute('/authenticate'));
      })
      .catch(error => dispatch(logoutUserRejectedAction(error.message)));
  };
}

export const logoutUserRequestedAction = () => {
  return {
    type: LOGOUT_USER_REQUESTED
  };
};

export const logoutUserRejectedAction = error => {
  return {
    type: LOGOUT_USER_REJECTED,
    payload: error
  };
};

export const logoutUserFulfilledAction = () => {
  return {
    type: LOGOUT_USER_FULFILLED
  };
};
