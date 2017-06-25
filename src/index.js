import React from 'react';
import App from './App';
import {render} from 'react-snapshot';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store, {history} from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
