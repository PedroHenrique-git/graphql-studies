import { gql } from 'apollo-server';
import { apiFiltersResolvers } from './graphql/api-filters/resolvers';
import { apiFiltersTypeDefs } from './graphql/api-filters/typedefs';
import { postResolver } from './graphql/post/resolvers';
import { postTypeDefs } from './graphql/post/typedefs';
import { userResolvers } from './graphql/user/resolvers.js';
import { userTypeDefs } from './graphql/user/typedefs';

export const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }

  type Mutation {
    _empty: Boolean
  }
`;

export const rootResolvers = {
  Query: {
    _empty: async () => true,
  },
  Mutation: {
    _empty: async () => true,
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
];

export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolver,
  apiFiltersResolvers,
];
