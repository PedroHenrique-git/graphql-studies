import 'dotenv/config';
import fetch from 'node-fetch';

export default () => ({
  getUsers: (path = '') => fetch(`${process.env.API_URL}/users` + path),
  getPosts: (path = '') => fetch(`${process.env.API_URL}/posts` + path),
});
