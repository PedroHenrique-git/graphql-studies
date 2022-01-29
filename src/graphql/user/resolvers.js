export const userResolvers = {
  Query: {
    user: async (_, { id }, { getUsers }) => {
      const user = await getUsers(`/${id}`);
      return await user.json();
    },
    users: async (_, __, { getUsers }) => {
      const users = await getUsers();
      return await users.json();
    },
  },
};
