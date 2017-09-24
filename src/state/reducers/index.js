import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import formReducer from 'state/forms/reducer';

export default combineReducers({
  router: routerReducer,
  forms: formReducer
});
