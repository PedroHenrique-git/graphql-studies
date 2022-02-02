import { ApolloServer } from 'apollo-server';
import context from './context';
import { PostsApi } from './graphql/post/datasources';
import { UserApi } from './graphql/user/datasources';
import { resolvers, typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => ({
    postApi: new PostsApi(),
    userApi: new UserApi(),
  }),
});

server.listen(4003).then(({ url }) => {
  console.log(`server is running on ${url} 🚀`);
});
