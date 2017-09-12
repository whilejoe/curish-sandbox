import React from 'react';
import 'styles/index.css';
import App from './App';
import { render } from 'react-snapshot';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from 'state/store';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { getIdToken } from 'utils/AuthService';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6l71pg81npn0191lrufaos5'
});

const wsClient = new SubscriptionClient(
  'wss://subscriptions.us-west-2.graph.cool/v1/cj6l71pg81npn0191lrufaos5',
  {
    reconnect: true,
    connectionParams: {
      authToken: getIdToken()
    }
  }
);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) req.options.headers = {};
      // get the authentication token from local storage if it exists
      const token = getIdToken();
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
      // if (idToken) req.options.headers.authorization = `Bearer ${idToken}`;
      // next();
    }
  }
]);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

// new subscription implementation. revisit

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
