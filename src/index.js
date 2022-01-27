import { ApolloServer } from 'apollo-server';
import fetch from 'node-fetch';
import { resolvers, typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    fetch,
  }),
});

server.listen(4003).then(() => {
  console.log('SERVER EXECUTANDO');
});
