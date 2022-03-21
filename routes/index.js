import express from 'express';

import userRouter from './routes.js';

const Routes = () => {
  const router = express.Router();
  router.use('/users', userRouter());
  return router;
};

export default Routes;