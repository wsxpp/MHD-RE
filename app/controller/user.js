'use strict';

const Controller = require('egg').Controller;
const { setResponse } = require('./response');
const { getJwt } = require('../utils/jwt');

class UserController extends Controller {
  async list() {
    const { ctx, app } = this;
    const data = await ctx.service.user.list(app);
    ctx.body = setResponse(data);
  }

  async userInfo() {
    const { ctx, app } = this;
    const data = await ctx.service.user.find(app, ctx.params.id);
    const { info } = getJwt(ctx.request.header.token);
    const auth = await ctx.service.user.auth(app, info.id);
    const canEdit = (auth && !!auth.admin) || info.id === Number(ctx.params.id);
    ctx.body = setResponse(Object.assign(data, { canEdit }));
  }

  async updateUserInfo() {
    const { ctx, app } = this;
    const data = await ctx.service.user.update(app, ctx.request.body);
    ctx.body = setResponse(data);
  }

  async delUser() {
    const { ctx, app } = this;
    const { info } = getJwt(ctx.request.header.token);
    if (info.id === Number(ctx.params.id)) {
      ctx.body = setResponse(null, '不能删除自己', 406);
    } else {
      await ctx.service.user.del(app, ctx.params.id);
      ctx.body = setResponse(null);
    }
  }
}

module.exports = UserController;
