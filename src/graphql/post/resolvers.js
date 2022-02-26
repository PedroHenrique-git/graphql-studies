import { AuthenticationError } from 'apollo-server';
import { checkIfIsLogged } from '../login/utils/login-functions';

export const postResolver = {
  Query: {
    post: async (_, { id }, { dataSources }) => {
      const post = await dataSources.postApi.getPost(id);
      const postData = post;

      /*
        if (Math.random() > 0.5) {
          return {
            statusCode: 500,
            message: 'Post timeout!',
            timeout: Math.random(),
          };
        }
      */

      if (typeof postData.id === 'undefined') {
        return {
          statusCode: 404,
          message: 'Post not found!',
          postId: id,
        };
      }

      return postData;
    },
    posts: async (_, { inputFilter }, { dataSources, loggedUserId }) => {
      if (!loggedUserId) throw new AuthenticationError('You have to log in');
      const apiFiltersInput = new URLSearchParams(inputFilter);
      const posts = await dataSources.postApi.getPosts(apiFiltersInput);
      return await posts;
    },
  },
  Post: {
    unixTimeStamp: ({ createdAt }) => {
      const dateInSeconds = Math.floor(new Date(createdAt).getTime() / 1000);
      return dateInSeconds;
    },
    user: async ({ userId }, _, { dataSources }) => {
      return dataSources.userApi.batchLoadByUserId(userId);
    },
    comments: async ({ id: post_id }, _, { dataSources }) => {
      return dataSources.commentDb.batchLoad(post_id);
    },
  },
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      if (typeof obj.id !== 'undefined') return 'Post';
      return null;
    },
  },
  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      return null;
    },
  },
  Mutation: {
    createPost: async (_, { data }, { dataSources, loggedUserId }) => {
      checkIfIsLogged(loggedUserId);
      data.userId = loggedUserId;
      return dataSources.postApi.createPost(data);
    },
    updatePost: async (_, { id: postId, data }, { dataSources }) => {
      return dataSources.postApi.updatePost(postId, data);
    },
    deletePost: async (_, { id: postId }, { dataSources }) => {
      return dataSources.postApi.deletePost(postId);
    },
  },
};
