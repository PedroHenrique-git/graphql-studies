export const userResolvers = {
  Query: {
    user: async (_, { id }, { getUsers }) => {
      const user = await getUsers(`/${id}`);
      return await user.json();
    },
    users: async (_, { inputFilter }, { getUsers }) => {
      const apiFiltersInput = new URLSearchParams(inputFilter).toString();
      const users = await getUsers('/?' + apiFiltersInput);
      return await users.json();
    },
  },
  User: {
    posts: async ({ id }, _, { postDataLoader }) => {
      return postDataLoader.load(id);
    },
  },
};
