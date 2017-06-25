import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {inviteReducer} from './inviteReducer';

export default combineReducers({
  invite: inviteReducer,
  router: routerReducer
})