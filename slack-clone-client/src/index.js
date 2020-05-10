import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Routes from './Routes';
import './index.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token} ${refreshToken}` : "",
    }
  }
});
const afterWare = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();
  if (headers) {
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');
    if (token) {
      localStorage.setItem('token', token);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  return forward(operation)
});

const client = new ApolloClient({
  link: from([
    // retrieveFreshTokens,
    afterWare,
    authLink,
    httpLink,
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
