import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Routes from './Routes';

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

// const retrieveFreshTokens = new ApolloLink((operation, forward) => {
//   if (!operation.response)
//     return;
//   const { response: { headers } } = operation;
//   const token = headers.get('x-token') && null;
//   const refreshToken = headers.get('x-refresh-token') && null;
//   token && localStorage.setItem('token', token);
//   refreshToken && localStorage.setItem('refreshToken', 'refreshToken');
//   forward(operation);
// })


const client = new ApolloClient({
  link: from([
    // retrieveFreshTokens,
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache()
});



// client
//   .query({
//     query: gql`
//       query {
//         allUsers{
//           username
//           email
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));


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
