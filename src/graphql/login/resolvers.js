export const loginResolvers = {
  Mutation: {
    login: async (_, { data }, { dataSources }) => {
      const { userName, password } = data;
      return dataSources.loginApi.login(userName, password);
    },
  },
};
