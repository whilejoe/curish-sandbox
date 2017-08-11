import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './authReducer';
import { inviteReducer } from './inviteReducer';
import { storyReducer } from './storyReducer';
import formReducer from 'state/forms/reducer';

export default combineReducers({
  user: authReducer,
  invite: inviteReducer,
  stories: storyReducer,
  router: routerReducer,
  forms: formReducer
});
