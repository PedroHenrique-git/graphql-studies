import fetch from 'node-fetch';
import getPosts from './graphql/post/utils';
import getUsers from './graphql/user/utils';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

export default () => ({
  getUsers: _getUsers,
  getPosts: _getPosts,
});
