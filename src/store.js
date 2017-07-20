import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'reducers/index';

export const history = createHistory();

const logger = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), logger))
);

export default store;
