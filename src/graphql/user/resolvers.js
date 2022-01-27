export const userResolvers = {
  Query: {
    user: async (_, { id }, { fetch }) => {
      const user = await fetch(`http://localhost:3004/users/${id}`);
      return await user.json();
    },
    users: async (_, __, { fetch }) => {
      const users = await fetch('http://localhost:3004/users');
      return await users.json();
    },
  },
};
