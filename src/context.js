import fetch from 'node-fetch';
import getPosts from './graphql/post/utils';
import { makeUserDataLoader } from './graphql/user/dataloaders';
import getUsers from './graphql/user/utils';

export default () => ({
  userDataLoader: makeUserDataLoader(getUsers(fetch)),
  getUsers: getUsers(fetch),
  getPosts: getPosts(fetch),
});
