(async () => {
  console.clear();

  const GRAPQL_URL = 'http://localhost:4003/';

  const createPost = async (variables = {}) => {
    const query = `
          mutation CREATE_POST($data: CreatePostInput!) {
            createPost(data: $data) {
              id
              title
              body
              user {
                id
                firstName
                lastName
                createdAt
              }
            }
          }
      `;

    const response1 = await fetch(GRAPQL_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const newPost1 = await response1.json();
    return newPost1;
  };

  const post1 = await createPost({
    data: {
      title: 'NEW POST WITH fetch',
      body: 'NEW POST WITH fetch',
      userId: '602',
    },
  });

  console.log(post1);
})();
