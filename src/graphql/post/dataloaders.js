import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  return new DataLoader(async (ids) => {
    const urlQuery = '?userId=' + ids.join('&userId=');
    const posts = await getPosts(urlQuery);
    return ids.map((id) => posts.filter((posts) => posts.userId === id));
  });
};
