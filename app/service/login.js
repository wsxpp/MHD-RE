'use strict';
const Service = require('egg').Service;
const md5 = require('md5');
const { setJwt } = require('../utils/jwt');

class LoginService extends Service {
  async login(app, name, password) {
    const userInfo = await app.mysql.get('user', { name });
    if (!userInfo || userInfo.password !== md5(password)) {
      throw Error('密码错误或用户不存在');
    }
    return {
      token: setJwt({ ...userInfo }),
      name: userInfo.name,
      id: userInfo.id,
    };
  }

  async registered(app, data) {
    try {
      const userInfo = await app.mysql.get('user', { name: data.name });
      if (userInfo) {
        throw Error('用户已存在');
      }
      data.password = md5(data.password);
      await app.mysql.insert('user', data);
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = LoginService;
