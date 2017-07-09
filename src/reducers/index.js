import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {authReducer} from './authReducer';
import {inviteReducer} from './inviteReducer';
import {storyReducer} from './storyReducer';

export default combineReducers({
  user: authReducer,
  router: routerReducer,
  invite: inviteReducer,
  stories: storyReducer
})