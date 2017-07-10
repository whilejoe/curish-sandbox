import database from './database';

export const GET_INVITE_REQUESTED = 'GET_INVITE_REQUESTED';
export const GET_INVITE_REJECTED = 'GET_INVITE_REJECTED';
export const GET_INVITE_FULFILLED = 'GET_INVITE_FULFILLED';

export function getInvite() {
  return dispatch => {
    dispatch(getInviteRequestedAction());
    return database.ref()
      .once('value', snap => dispatch(getInviteFulfilledAction(snap.val())))
      .catch(error => dispatch(getInviteRejectedAction(error)));
  }
}

export const getInviteRequestedAction = () => {
  return {
    type: GET_INVITE_REQUESTED
  };
}

export const getInviteRejectedAction = () => {
  return {
    type: GET_INVITE_REJECTED
  }
}

export const getInviteFulfilledAction = invite => {
  return {
    type: GET_INVITE_FULFILLED,
    payload: invite
  };
}
