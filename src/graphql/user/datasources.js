import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloaders';
import {
  createUserFn,
  deleteUserFn,
  // eslint-disable-next-line prettier/prettier
  updateUserFn
} from './utils/userRepository';

export class UserApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users`;
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getUser(id) {
    return this.get(`/${id}`, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async createUser(userData) {
    return createUserFn(userData, this);
  }

  async updateUser(userId, userData) {
    return updateUserFn(userId, userData, this);
  }

  async deleteUser(userId) {
    return deleteUserFn(userId, this);
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
