import ActionTypes from 'constants/actionTypes';
import database from './database';

export function addToInvite(name) {
  return dispatch => {
    dispatch(addToInviteRequestedAction());
    database.ref('/guests')
    .push({name})
    .then(() => dispatch(addToInviteFulfilledAction({name})))
    .catch(error => dispatch(addToInviteRejectedAction(error)));
  }
}

function addToInviteRequestedAction() {
  return {
    type: ActionTypes.AddToInviteRequested
  };
}

function addToInviteRejectedAction() {
  return {
    type: ActionTypes.AddToInviteRejected
  }
}

function addToInviteFulfilledAction(guest) {
  return {
    type: ActionTypes.AddToInviteFulfilled,
    guest
  };
}