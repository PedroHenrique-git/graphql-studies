import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import getPosts from './graphql/post/utils';
import { UserApi } from './graphql/user/datasources';
import getUsers from './graphql/user/utils';
import { cookieParser } from './utils/cookie-parser';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

const verifyJwtToken = async (token) => {
  try {
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

const authorizeUserWithBearerToken = async (req) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split(' ');
    return await verifyJwtToken(token);
  } catch (e) {
    return '';
  }
};

const context = async ({ req, res }) => {
  let loggedUserId = await authorizeUserWithBearerToken(req);

  if (!loggedUserId) {
    if (req.headers.cookie) {
      const { jwtToken } = cookieParser(req.headers.cookie);
      loggedUserId = await verifyJwtToken(jwtToken);
    }
  }

  return {
    loggedUserId,
    res,
    getUsers: _getUsers,
    getPosts: _getPosts,
  };
};

export default context;
