import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getIdToken, logout } from 'utils/AuthService';

// Create Cache
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  addTypename: true
  // fragmentMatcher: // matcher,
  // cacheResolvers: // cache resolvers
});

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  );

const batchedLinkWithSubscription = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHCOOL_SUBSCRIPTION_ENDPOINT,
    options: { reconnect: true }
  }),
  new BatchHttpLink({
    uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT
  })
);

// Batch Requests
// const batchedHTTPLink = new BatchHttpLink({
//   uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT
// });

// Attempt Request Again on Error
const retryLink = new RetryLink();

// Add Middleware
const middlewareLink = new ApolloLink((operation, forward) => {
  // Log request name
  console.log(`%c${operation.operationName} STARTED`, 'color: dodgerblue; font-weight: bold;');

  // Get token from local storage and pass with each request
  const token = getIdToken();
  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : null }
  });

  // Log and return data response
  return forward(operation).map(response => {
    console.log(
      `%c${operation.operationName} SUCCESS`,
      'color: seagreen; font-weight: bold;',
      response.data
    );
    return response;
  });
});

// Log Errors and Redirect
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let { code, message, locations, path } of graphQLErrors) {
      console.error(`[GraphQL error]: Message: ${message}, Locations: ${locations}, Path: ${path}`);
      if (code === 3008) {
        logout();
        break;
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Chain links
const link = ApolloLink.from([middlewareLink, errorLink, retryLink, batchedLinkWithSubscription]);

const apolloClient = new ApolloClient({
  link,
  cache: cache.restore(window.__APOLLO_STATE__ || {})
});

export default apolloClient;
