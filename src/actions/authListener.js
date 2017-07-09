import firebase from 'firebase';

export const LISTEN_TO_AUTH = 'LISTEN_TO_AUTH';

export function addAuthListener(dispatch) {
  return firebase.auth().onAuthStateChanged(user => {
    console.log('***LISTENING FOR AUTHENTICATION*****');
    // if (user) dispatch(listenToAuthAction(user))
    // else console.log('User Is Not Signed IN');
    dispatch(listenToAuthAction(user))
  });
}

export const listenToAuthAction = user => {
  return {
    type: LISTEN_TO_AUTH,
    payload: user
  };
}