import React from 'react';
import 'styles/index.css';
import App from './App';
import { render } from 'react-snapshot';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from 'state/store';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { GC_AUTH_TOKEN } from 'constants/tuts';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6l71pg81npn0191lrufaos5'
});

const wsClient = new SubscriptionClient(
  'wss://subscriptions.us-west-2.graph.cool/v1/cj6l71pg81npn0191lrufaos5',
  {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(GC_AUTH_TOKEN)
    }
  }
);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const token = localStorage.getItem(GC_AUTH_TOKEN);
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();

      // get the authentication token from local storage if it exists
      // if (localStorage.getItem('auth0IdToken')) {
      //   req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`;
      // }
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

// const GRAPHQL_ENDPOINT = 'wss://subscriptions.us-west-2.graph.cool/v1/cj6ppvelr0y0t0177u31owwi4l';

// const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
//   reconnect: true,
//   connectionParams: {
//     authToken: localStorage.getItem(GC_AUTH_TOKEN)
//   }
// });

// const apolloClient = new ApolloClient({
//   networkInterface: client
// });

render(
  <ApolloProvider client={client} store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
