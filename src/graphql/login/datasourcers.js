import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { FetchError } from 'node-fetch';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users/`;
  }

  async getUser(userName) {
    const user = await this.get(
      '',
      { userName },
      {
        cacheOptions: {
          ttl: 0,
        },
      },
    );

    if (!user) throw new FetchError('User does not exists');

    return user;
  }

  async login(userName, password) {
    const user = await this.getUser(userName);

    if (user.length === 0) throw new AuthenticationError('User not found');

    const { passwordHash, id: userId } = user[0];

    const passwordIsValid = await this.checkUserPassword(
      password,
      passwordHash,
    );

    if (!passwordIsValid) throw new AuthenticationError('Invalid credentials');

    const token = this.createJwtToken({ userId });

    this.context.res.cookie('jwtToken', token, {
      secure: true, // Redes seguras - Https
      httpOnly: true, // Não deve ser acessado via código
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      path: '/',
      sameSite: 'none', // strict lax none
    });

    await this.patch(userId, { token }, { cacheOptions: { ttl: 0 } });

    return {
      userId,
      token,
    };
  }

  async logout(userName) {
    const user = await this.getUser(userName);

    if (!user) throw new FetchError('User not found');

    const { id: userId } = user[0];

    this.context.res.clearCookie('jwtToken');

    const logoutUser = await this.patch(
      userId,
      { token: '' },
      { cacheOptions: { ttl: 0 } },
    );

    return !!logoutUser;
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
