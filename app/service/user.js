'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async list(app) {
    const users = await app.mysql.select('user');
    return users;
  }

  async find(app, id) {
    const userInfo = await app.mysql.get('user', { id });
    delete userInfo.password;
    return userInfo;
  }

  async auth(app, userId) {
    const authInfo = await app.mysql.get('auth', { userId });
    return authInfo;
  }

  async update(app, row) {
    const userInfo = await app.mysql.update('user', row);
    return userInfo;
  }

  async del(app, id) {
    const userInfo = await app.mysql.delete('user', { id });
    return userInfo;
  }
}

module.exports = UserService;
