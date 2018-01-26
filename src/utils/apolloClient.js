import ApolloClient from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { getIdToken, logout } from 'utils/AuthService';

// Create Cache
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  addTypename: true
});

// Batched HTTP Link
const batchedHttpLink = new BatchHttpLink({
  uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT
});

// Subscription link
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHCOOL_SUBSCRIPTION_ENDPOINT,
  options: {
    timeout: 10000,
    reconnect: true,
    connectionParams: {
      authToken: getIdToken
    },
    connectionCallback: error => {
      if (error) {
        console.error('SUBSCRIPTION CONNECTION ERRORED', error);
      } else {
        console.log('%cSUBSCRIPTION CONNECTION SUCCESS', 'color: seagreen; font-weight: bold;');
      }
    },
    reconnectionAttempts: 3
  }
});

// Send data to each link depending on what kind of operation is being sent
const batchedLinkWithSubscription = split(
  // Split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  batchedHttpLink
);

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
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Chain links
const link = ApolloLink.from([middlewareLink, errorLink, retryLink, batchedLinkWithSubscription]);

const apolloClient = new ApolloClient({
  link,
  cache: cache.restore(window.__APOLLO_STATE__ || {})
});

export default apolloClient;
