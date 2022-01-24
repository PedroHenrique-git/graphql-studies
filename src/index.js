import { ApolloServer, gql } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      id: ID
      name: String
      age: Int
      salary: Float
      isUser: Boolean
      notNull: String!
      arrayString: [String!]!
    }
  `,
  resolvers: {
    Query: {
      id: async () => {
        return uuidv4();
      },
      name: async () => {
        return 'Pedro';
      },
      age: async () => {
        return Math.ceil(Math.random() * 100);
      },
      salary: async () => {
        return (Math.random() * 1000).toFixed(2);
      },
      isUser: async () => {
        return true;
      },
      notNull: async () => {
        return null || 'Teste';
      },
      arrayString: async () => {
        return ['A', 'B', 'C', 'D'];
      },
    },
  },
});

server.listen(4003).then(() => {
  console.log('SERVER EXECUTANDO');
});
