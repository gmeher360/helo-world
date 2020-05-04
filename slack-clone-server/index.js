// const express = require('express');
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import typeDefs from './schema'
import resolvers from './resolvers.js'


const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

