require('dotenv').config();
import express from 'express';
import cors from 'cors'
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import models from './models'
import jwt from 'jsonwebtoken'
import { refreshTokens } from './auth';

const app = express();
app.use(express.json());
app.use(cors())

const addUser = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  const reToken = authHeader && authHeader.split(' ')[2]

  if (token) {
    try {
      const { user2 } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user2
    } catch (err) {
      const { currentToken, refreshToken, user } = await refreshTokens(token, reToken, models)
      req.user = user;
      res.set('Access-Control-Expose-Headers', 'x-token,x-refresh-token');
      res.set('x-token', currentToken);
      res.set('x-refresh-token', refreshToken);
      console.log(err.message)
    }
  }
  next()
}

app.use(addUser);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ models, user: req.user }) //user id from jwt
});

server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})
