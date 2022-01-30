import { ApolloServer } from 'apollo-server';
import context from './context';
import { resolvers, typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen(4003).then(({ url }) => {
  console.log(`server is running on ${url} 🚀`);
});
