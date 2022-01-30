import DataLoader from 'dataloader';
import 'dotenv/config';
import fetch from 'node-fetch';

const userDataLoader = new DataLoader(async (ids) => {
  const urlQuery = ids.join('&id=');
  const url = `${process.env.API_URL}/users/?id=${urlQuery}`;
  const users = await (await fetch(url)).json();
  return ids.map((id) => users.find((user) => user.id === id));
});

export const postResolver = {
  Query: {
    post: async (_, { id }, { getPosts }) => {
      const post = await getPosts(`/${id}`);
      const postData = await post.json();

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
    posts: async (_, { inputFilter }, { getPosts }) => {
      const apiFiltersInput = new URLSearchParams(inputFilter).toString();
      const posts = await getPosts('/?' + apiFiltersInput);
      return await posts.json();
    },
  },
  Post: {
    unixTimeStamp: ({ createdAt }) => {
      const dateInSeconds = Math.floor(new Date(createdAt).getTime() / 1000);
      return dateInSeconds;
    },
    user: async ({ userId }) => {
      return userDataLoader.load(userId);
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
};
