import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(inputFilter: ApiFiltersInput): [Post!]!
  }

  union PostResult = PostNotFoundError | Post

  type PostNotFoundError {
    statusCode: Int!
    message: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    indexRef: Int!
    createdAt: String!
    unixTimeStamp: String!
  }
`;
