import ActionTypes from 'constants/actionTypes';
import firebase from 'firebase';

export function addAuthListener(dispatch) {
  return firebase.auth().onAuthStateChanged(user => {
    console.log('***LISTENING FOR AUTHENTICATION*****');
    // if (user) dispatch(listenToAuthAction(user))
    // else console.log('User Is Not Signed IN');
    dispatch(listenToAuthAction(user))
  });
}

function listenToAuthAction(user) {
  return {
    type: ActionTypes.ListenToAuth,
    user
  };
}