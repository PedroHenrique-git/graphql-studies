import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(inputFilter: ApiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
  }

  union PostResult = PostNotFoundError | PostTimeoutError | Post

  interface PostError {
    statusCode: Int!
    message: String!
  }

  type PostTimeoutError implements PostError {
    statusCode: Int!
    message: String!
    timeout: Float!
  }

  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
    postId: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    indexRef: Int!
    user: User!
    createdAt: String!
    unixTimeStamp: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    userId: String!
  }
`;
