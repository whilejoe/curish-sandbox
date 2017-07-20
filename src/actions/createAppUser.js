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
    if (currentUser) {
      // make sure user is logged in
      const { uid } = currentUser;
      const appUser = { ...userData, uid };
      return database
        .ref('users/' + uid)
        .set({ ...appUser }) // this is only called for a new user so we can create a new record
        .then(() => {
          dispatch(createAppUserFulfilledAction(userData));
          dispatch(pushRoute('/profile'));
          console.log('USER SUCCESSFULLY CREATED');
        })
        .catch(error => dispatch(createAppUserRejectedAction(error.message)));
    } else console.log('USER IS NOT LOGGED IN');
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
