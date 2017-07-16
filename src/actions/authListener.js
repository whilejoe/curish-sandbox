import firebase from 'firebase';
import database from './database';
import {pushRoute} from './pushRoute';

export const LISTEN_TO_AUTH = 'LISTEN_TO_AUTH';

export function addAuthListener(dispatch) {
  return firebase.auth().onAuthStateChanged(user => {
    console.log('***LISTENING FOR AUTHENTICATION*****');
    if (user) {
      const {displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData} = user;
      const appUserRef = database.ref('users/' + uid);
      appUserRef.once('value', snap => {
        const appUser = snap.val();
        if (!appUser) {
          // user is not registered so pass firebase user to populate profile form and redirect
          dispatch(listenToAuthAction({
            displayName,
            email,
            emailVerified,
            photoURL,
            isAnonymous,
            uid,
            providerData
          }));
          dispatch(pushRoute('/create-profile'));
        } else {
          // user is registered so pass app user and append relevant up to date firebase user data
          dispatch(listenToAuthAction({...appUser, emailVerified, providerData}));
          dispatch(pushRoute('/profile'));
        }
      });
    } else dispatch(listenToAuthAction(null)); // not authed so pass null to clear user state
  });
}

export const listenToAuthAction = user => {
  return {
    type: LISTEN_TO_AUTH,
    payload: user
  };
}