import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import 'styles/elements.js';
import App from './App';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import store from 'state/store';
import apolloClient from 'utils/apolloClient';
import history from 'utils/history';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
