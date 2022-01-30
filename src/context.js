import fetch from 'node-fetch';
import { makePostDataLoader } from './graphql/post/dataloaders';
import getPosts from './graphql/post/utils';
import { makeUserDataLoader } from './graphql/user/dataloaders';
import getUsers from './graphql/user/utils';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

export default () => ({
  userDataLoader: makeUserDataLoader(_getUsers),
  postDataLoader: makePostDataLoader(_getPosts),
  getUsers: _getUsers,
  getPosts: _getPosts,
});
