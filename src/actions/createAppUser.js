import firebase from 'firebase';
import database from './database';
import { pushRoute } from './pushRoute';

export const CREATE_APP_USER_REQUESTED = 'CREATE_APP_USER_REQUESTED';
export const CREATE_APP_USER_REJECTED = 'CREATE_APP_USER_REJECTED';
export const CREATE_APP_USER_FULFILLED = 'CREATE_APP_USER_FULFILLED';

export function createAppUser(userData) {
  return dispatch => {
    dispatch(createAppUserRequestedAction());
    const currentUser = firebase.auth().currentUser;
    // confirm user is authed
    if (currentUser) {
      const { uid } = currentUser;
      const userSince = Date.now();
      const appUser = { ...userData, uid, userSince };

      return database
        .ref('users/' + uid)
        .set({ ...appUser }) // this is only called for a new user so we can create a new record
        .then(() => {
          dispatch(createAppUserFulfilledAction(appUser));
          dispatch(pushRoute('/profile'));
          console.log('USER SUCCESSFULLY CREATED');
        })
        .catch(error => dispatch(createAppUserRejectedAction(error.message)));
    } else dispatch(createAppUserRejectedAction('USER IS NOT LOGGED IN'));
  };
}

export const createAppUserRequestedAction = () => {
  return {
    type: CREATE_APP_USER_REQUESTED
  };
};

export const createAppUserRejectedAction = error => {
  return {
    type: CREATE_APP_USER_REJECTED,
    payload: error
  };
};

export const createAppUserFulfilledAction = userData => {
  return {
    type: CREATE_APP_USER_FULFILLED,
    payload: userData
  };
};
