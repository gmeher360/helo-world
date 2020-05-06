require('dotenv').config();
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import models from './models'
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ models, user: { id: 1 } }) // passing a a random user from context as we have not setup JWT and user authentication yet
  // pass the session User as the user, when infrastructure is set.
});

const app = express();
app.use(express.json());
server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})
