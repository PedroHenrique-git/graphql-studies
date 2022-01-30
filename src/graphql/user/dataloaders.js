import DataLoader from 'dataloader';

export const makeUserDataLoader = (getUsers) => {
  return new DataLoader(async (ids) => {
    const urlQuery = '?id=' + ids.join('&id=');
    const users = await (await getUsers(urlQuery)).json();
    return ids.map((id) => users.find((user) => user.id === id));
  });
};
