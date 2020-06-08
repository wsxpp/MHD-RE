'use strict';

const Controller = require('egg').Controller;
const { setResponse } = require('./response');

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    try {
      const { name, password } = ctx.request.body;
      const userInfo = await ctx.service.login.login(app, name, password);
      ctx.body = setResponse(userInfo);
    } catch (error) {
      ctx.body = setResponse(null, error.message, 401);
    }
  }

  async registered() {
    const { ctx, app } = this;
    try {
      const data = await ctx.service.login.registered(app, ctx.request.body);
      ctx.body = setResponse(data);
    } catch (error) {
      ctx.body = setResponse(null, error.message, 400);
    }
  }
}

module.exports = UserController;
