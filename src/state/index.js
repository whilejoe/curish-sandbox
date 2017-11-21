import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import contextNavReducer from './contextNav/reducer';
import formReducer from './forms/reducer';

export default combineReducers({
  // router: routerReducer,
  contextNav: contextNavReducer,
  forms: formReducer
});
