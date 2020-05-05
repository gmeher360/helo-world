require('dotenv').config();
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './schema'
import resolvers from './resolvers.js'
import models from './models'
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(express.json());
server.applyMiddleware({ app });

models.sequelize.sync({ force: true }).then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})
