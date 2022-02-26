import { ApolloServer } from 'apollo-server';
import context from './context';
import { CommentSQLDataSource } from './graphql/comment/datasourcers';
import { LoginApi } from './graphql/login/datasourcers';
import { PostsApi } from './graphql/post/datasources';
import { UserApi } from './graphql/user/datasources';
import { knex } from './knex/index';
import { resolvers, typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => ({
    postApi: new PostsApi(),
    userApi: new UserApi(),
    loginApi: new LoginApi(),
    commentDb: new CommentSQLDataSource(knex),
  }),
  cors: {
    origin: ['https://cdpn.io', 'https://studio.apollographql.com'],
    credentials: true,
  },
  //plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(4003).then(({ url }) => {
  console.log(`server is running on ${url} 🚀`);
});
