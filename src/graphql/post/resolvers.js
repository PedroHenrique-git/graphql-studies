import { v4 as uuidv4 } from 'uuid';

export const postResolver = {
  Query: {
    post: async () => {
      return { id: uuidv4(), title: 'post1' };
    },
    posts: async () => {
      return [
        { id: uuidv4(), title: 'post1' },
        { id: uuidv4(), title: 'post2' },
        { id: uuidv4(), title: 'post3' },
        { id: uuidv4(), title: 'post4' },
      ];
    },
  },
};
