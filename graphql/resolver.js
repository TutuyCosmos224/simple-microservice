const userService = require('../service/service.js');

const addUser = ({ userInput }) => {
  const result = userService.createUser(userInput);
  return result;
};

const getAllUsers = () => {
  return userService.getAllUsers();
};

const getUserByID = ({ id }) => {
  return userService.getUserById(id);
};

const updateUser = ({ id, userInput }) => {
  return userService.updateUser(id, userInput);
};

const deleteUser = ({ id }) => {
  return userService.deleteUser(id);
};

module.exports = {
  addUser,
  users: getAllUsers,
  user: getUserByID,
  updateUser,
  deleteUser,
};