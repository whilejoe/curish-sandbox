import ApolloClient from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
// import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { getIdToken, logout } from './authService';

// Create Cache
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  addTypename: true
  // fragmentMatcher: // matcher,
  // cacheResolvers: // cache resolvers
});

// Batch Requests
const batchedHTTPLink = new BatchHttpLink({
  uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT
});

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
const link = ApolloLink.from([middlewareLink, errorLink, batchedHTTPLink]);

const apolloClient = new ApolloClient({
  link,
  cache: cache.restore(window.__APOLLO_STATE__ || {})
});

export default apolloClient;
