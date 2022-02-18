import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import getPosts from './graphql/post/utils';
import { UserApi } from './graphql/user/datasources';
import getUsers from './graphql/user/utils';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

const authorizeUser = async (req) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split(' ');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const userApi = new UserApi();
    userApi.initialize({});
    const foundUser = await userApi.getUser(userId);

    if (foundUser.token !== token) return '';
    return userId;
  } catch (e) {
    return '';
  }
};

const context = async ({ req }) => {
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
    getUsers: _getUsers,
    getPosts: _getPosts,
  };
};

export default context;
