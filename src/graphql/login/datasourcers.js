import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users/`;
  }

  async login(userName, password) {
    const user = await this.get(
      '',
      { userName },
      {
        cacheOptions: {
          ttl: 0,
        },
      },
    );

    if (user.length === 0) throw new AuthenticationError('User not found');

    const { passwordHash, id: userId } = user[0];

    const passwordIsValid = await this.checkUserPassword(
      password,
      passwordHash,
    );

    if (!passwordIsValid) throw new AuthenticationError('Invalid credentials');

    const token = this.createJwtToken({ userId });

    await this.patch(userId, { token }, { cacheOptions: { ttl: 0 } });

    return {
      userId,
      token,
    };
  }

  checkUserPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  createJwtToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}
