import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {inviteReducer} from './inviteReducer';
import {storyReducer} from './storyReducer';

export default combineReducers({
  invite: inviteReducer,
  router: routerReducer,
  stories: storyReducer
})