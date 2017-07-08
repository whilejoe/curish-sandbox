import store from '../store';
import {push} from 'react-router-redux';

export function pushRoute(path) {
  return dispatch => {
    console.log('ROUTE_PUSHED =', path);
    return store.dispatch(push(path));
  }
}