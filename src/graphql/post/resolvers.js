export const postResolver = {
  Query: {
    post: async (_, { id }, { getPosts }) => {
      const post = await getPosts(`/${id}`);
      const postData = await post.json();

      if (typeof postData.id === 'undefined') {
        return {
          statusCode: 404,
          message: 'Post not found!',
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
  },
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.statusCode !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.id !== 'undefined') return 'Post';
      return null;
    },
  },
};
