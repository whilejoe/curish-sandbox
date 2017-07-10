import database from './database';

export const ADD_TO_INVITE_REQUESTED = 'ADD_TO_INVITE_REQUESTED';
export const ADD_TO_INVITE_REJECTED = 'ADD_TO_INVITE_REJECTED';
export const ADD_TO_INVITE_FULFILLED = 'ADD_TO_INVITE_FULFILLED';

export function addToInvite(name) {
  return dispatch => {
    dispatch(addToInviteRequestedAction());
    database.ref('/guests')
    .push({name})
    .then(() => dispatch(addToInviteFulfilledAction()))
    .catch(error => dispatch(addToInviteRejectedAction(error.message)));
  }
}

export const addToInviteRequestedAction = () => {
  return {
    type: ADD_TO_INVITE_REQUESTED
  };
}

export const addToInviteRejectedAction = error => {
  return {
    type: ADD_TO_INVITE_REJECTED,
    payload: error
  }
}

export const addToInviteFulfilledAction () => {
  return {
    type: ADD_TO_INVITE_FULFILLED
  };
}