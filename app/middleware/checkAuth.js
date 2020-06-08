'use strict';
const { setResponse } = require('../controller/response');
const { getJwt } = require('../utils/jwt.js');

module.exports = () => {
  return async function checkAuth(ctx, next) {
    const accessToken = ctx.request.header.token;
    const result = getJwt(accessToken);
    if (result.success) {
      await next();
    } else {
      ctx.body = setResponse(null, 'invalid token', 401);
    }
  };
};
