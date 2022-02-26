import { checkIfIsLogged } from '../login/utils/login-functions';

export const commentsResolvers = {
  Mutation: {
    createComment: async (_, { data }, { dataSources, loggedUserId }) => {
      checkIfIsLogged(loggedUserId);
      const { postId, comment } = data;
      await dataSources.postApi.getPost(postId);
      return dataSources.commentDb.create({
        postId,
        comment,
        userId: loggedUserId,
        index_ref: Math.floor(Math.random() * 1000),
      });
    },
  },
  Comment: {
    user: async ({ user_id }, _, { dataSources }) => {
      const user = await dataSources.userApi.batchLoadByUserId(user_id);
      return user;
    },
  },
};
