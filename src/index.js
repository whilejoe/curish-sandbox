import React from 'react';
import 'styles/index.css';
import App from './App';
import { render } from 'react-snapshot';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from 'state/store';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6l71pg81npn0191lrufaos5'
});

const client = new ApolloClient({ networkInterface });

render(
  <ApolloProvider client={client} store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
