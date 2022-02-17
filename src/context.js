import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import getPosts from './graphql/post/utils';
import getUsers from './graphql/user/utils';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

const authorizeUser = (req) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const [_, token] = authorization.split(' ');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch (err) {
    return '';
  }
};

export default ({ req }) => {
  return {
    loggedUserId: authorizeUser(req),
    getUsers: _getUsers,
    getPosts: _getPosts,
  };
};
