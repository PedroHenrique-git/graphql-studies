export const postResolver = {
  Query: {
    post: async (_, { id }, { getPosts }) => {
      const post = await getPosts(`/${id}`);
      return await post.json();
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
};
