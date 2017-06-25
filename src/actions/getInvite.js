import ActionTypes from 'constants/actionTypes';
import database from './database';

export function getInvite() {
  return dispatch => {
    dispatch(getInviteRequestedAction());
    return database.ref()
      .once('value', snap => dispatch(getInviteFulfilledAction(snap.val())))
      .catch(error => dispatch(getInviteRejectedAction(error)));
  }
}

function getInviteRequestedAction() {
  return {
    type: ActionTypes.GetInviteRequested
  };
}

function getInviteRejectedAction() {
  return {
    type: ActionTypes.GetInviteRejected
  }
}

function getInviteFulfilledAction(invite) {
  return {
    type: ActionTypes.GetInviteFulfilled,
    invite
  };
}
