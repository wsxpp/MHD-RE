'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const checkAuth = app.middleware.checkAuth();
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/users', checkAuth, controller.user.list);
  router.get('/user/:id', checkAuth, controller.user.userInfo);
  router.put('/user/:id', checkAuth, controller.user.updateUserInfo);
  router.del('/user/:id', checkAuth, controller.user.delUser);

  router.post('/login', controller.login.login);
  router.post('/registered', controller.login.registered);
};
