import ActionTypes from 'constants/actionTypes';
import database from './database';

export function addToInvite(name) {
  return dispatch => {
    dispatch(addToInviteRequestedAction());
    database.ref('/guests')
    .push({name})
    .then(() => dispatch(addToInviteFulfilledAction()))
    .catch(error => dispatch(addToInviteRejectedAction(error.message)));
  }
}

function addToInviteRequestedAction() {
  return {
    type: ActionTypes.AddToInviteRequested
  };
}

function addToInviteRejectedAction(error) {
  return {
    type: ActionTypes.AddToInviteRejected,
    error
  }
}

function addToInviteFulfilledAction() {
  return {
    type: ActionTypes.AddToInviteFulfilled
  };
}