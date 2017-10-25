import ApolloClient from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
// import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { getIdToken, logout } from 'utils/AuthService';

// Create Cache
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
  addTypename: true
  // fragmentMatcher: // matcher,
  // cacheResolvers: // cache resolvers
});

// Batch Requests
const batchedHTTPLink = new BatchHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cj6l71pg81npn0191lrufaos5'
});

// Add Authorization
const middlewareLink = new ApolloLink((operation, forward) => {
  const token = getIdToken();
  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : null }
  });
  return forward(operation);
});

// Log Errors and Redirect
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let { code, message, locations, path } of graphQLErrors) {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      if (code === 3008) {
        logout();
        break;
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Chain links
const linkWithMiddleware = middlewareLink.concat(batchedHTTPLink);
const linkWithMiddlewareAndError = errorLink.concat(linkWithMiddleware);

const apolloClient = new ApolloClient({
  link: linkWithMiddlewareAndError,
  cache: cache.restore(window.__APOLLO_STATE__ || {})
});

export default apolloClient;
