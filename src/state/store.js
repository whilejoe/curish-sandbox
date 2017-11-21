import { createStore, applyMiddleware } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './index';

const logger = createLogger();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;

// revisit Redux Persist. jp

// import { createStore, applyMiddleware } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
// import { persistStore, autoRehydrate } from 'redux-persist';
// import { REHYDRATE } from 'redux-persist/constants';
// import createActionBuffer from 'redux-action-buffer';
// import localForage from 'localforage';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
// import createHistory from 'history/createBrowserHistory';
// import rootReducer from 'reducers/index';

// export const history = createHistory();

// const logger = createLogger();

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(
//     applyMiddleware(thunk, createActionBuffer(REHYDRATE), routerMiddleware(history), logger),
//     autoRehydrate()
//   )
// );

// persistStore(store, { storage: localForage }, () => {
//   console.log('persistStore complete');
// });

// export default store;
