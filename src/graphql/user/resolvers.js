import { v4 as uuidv4 } from 'uuid';

export const userResolvers = {
  Query: {
    user: async () => {
      return { id: uuidv4(), userName: 'pedro123' };
    },
    users: async () => {
      return [
        { id: uuidv4(), userName: 'user1' },
        { id: uuidv4(), userName: 'user2' },
        { id: uuidv4(), userName: 'user3' },
        { id: uuidv4(), userName: 'user4' },
      ];
    },
  },
};
