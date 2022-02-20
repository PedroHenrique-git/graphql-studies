import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import context from './context';
import { LoginApi } from './graphql/login/datasourcers';
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
    loginApi: new LoginApi(),
  }),
  cors: {
    origin: ['https://cdpn.io'],
    credentials: true,
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(4003).then(({ url }) => {
  console.log(`server is running on ${url} 🚀`);
});
