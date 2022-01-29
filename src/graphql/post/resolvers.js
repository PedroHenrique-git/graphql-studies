export const postResolver = {
  Query: {
    post: async (_, { id }, { getPosts }) => {
      const post = await getPosts(`/${id}`);
      return await post.json();
    },
    posts: async (_, __, { getPosts }) => {
      const posts = await getPosts();
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
