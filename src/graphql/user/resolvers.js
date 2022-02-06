export const userResolvers = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      const user = await dataSources.userApi.getUser(id);
      return user;
    },
    users: async (_, { inputFilter }, { dataSources }) => {
      const apiFiltersInput = new URLSearchParams(inputFilter);
      const users = await dataSources.userApi.getUsers(apiFiltersInput);
      return users;
    },
  },
  User: {
    posts: async ({ id }, _, { dataSources }) => {
      return dataSources.postApi.batchLoadByUserId(id);
    },
  },
  Mutation: {
    createUser: async (_, { data }, { dataSources }) => {
      return dataSources.userApi.createUser(data);
    },
    updateUser: async (_, { userId, data }, { dataSources }) => {
      return dataSources.userApi.updateUser(userId, data);
    },
    deleteUser: async (_, { userId }, { dataSources }) => {
      return dataSources.userApi.deleteUser(userId);
    },
  },
};
