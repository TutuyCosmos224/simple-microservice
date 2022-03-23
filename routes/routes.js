const express = require('express');

const handler = require('../handler/handler.js');

const userRoutes = () => {
  const router = express.Router();

  router.get('/wow', handler.wow);
  router.post('/', handler.postUser);
  router.get('/', handler.getUsers);
  router.get('/:userId', handler.getById);
  router.put('/:userId', handler.updateUser);
  router.delete('/:userId', handler.deleteUser);

  return router;
};

module.exports = {userRoutes};