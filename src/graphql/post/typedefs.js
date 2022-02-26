import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(inputFilter: ApiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
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
    comments: [Comment!]!
    unixTimeStamp: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    # userId: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    userId: String
  }
`;
