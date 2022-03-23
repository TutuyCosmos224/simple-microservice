const express = require('express');

const userRouter =  require('./routes.js');

const Routes = () => {
  const router = express.Router();
  router.use('/users', userRouter.userRoutes());
  return router;
};

module.exports = {Routes};