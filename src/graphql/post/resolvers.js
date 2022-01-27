export const postResolver = {
  Query: {
    post: async (_, { id }, { fetch }) => {
      const post = await fetch(`http://localhost:3004/posts/${id}`);
      return await post.json();
    },
    posts: async (_, __, { fetch }) => {
      const posts = await fetch(`http://localhost:3004/posts`);
      return await posts.json();
    },
  },
};
