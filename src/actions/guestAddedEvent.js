import ActionTypes from 'constants/actionTypes';
import database from './database';

export function watchGuestAddedEvent(dispatch) {
  console.log('***LISTENING FOR GUESTS*****');
  return database.ref('/guests').on('child_added', snap => {
    dispatch(getGuestAddedAction(snap.val()));
  });
}

export function removeGuestAddedEvent(dispatch) {
  console.log('***REMOVE GUEST LISTENER*****');
  return database.ref('/guests').off('child_added', snap => {
    dispatch(getGuestAddedAction(snap.val()));
  });
}

function getGuestAddedAction(guest) {
  return {
    type: ActionTypes.GuestAdded,
    guest
  };
}