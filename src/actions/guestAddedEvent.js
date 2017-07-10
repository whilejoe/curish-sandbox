import database from './database';

export const GUEST_ADDED = 'GUEST_ADDED';

export function watchGuestAddedEvent(dispatch) {
  console.log('***LISTENING FOR GUESTS*****');
  return database.ref('/guests').on('child_added', snap => {
    console.log('snap.val()', snap.val());
    dispatch(getGuestAddedAction(snap.val()));
  });
}

export function removeGuestAddedEvent(dispatch) {
  console.log('***REMOVE GUEST LISTENER*****');
  return database.ref('/guests').off('child_added', snap => {
    dispatch(getGuestAddedAction(snap.val()));
  });
}

export const getGuestAddedAction = guest => {
  return {
    type: GUEST_ADDED,
    payload: guest
  };
}