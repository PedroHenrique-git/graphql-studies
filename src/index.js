import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4003).then(() => {
  console.log('SERVER EXECUTANDO');
});
