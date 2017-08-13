import store from 'state/store';
import { push } from 'react-router-redux';

export function pushRoute(path) {
  return dispatch => {
    store.dispatch(push(path));
  };
}
