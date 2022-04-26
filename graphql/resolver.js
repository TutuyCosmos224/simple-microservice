const userService = require('../service/service.js');

const root = {
  addUser : ({ userInput }) => {
    const result = userService.createUser(userInput);
    return result;
  },
  
  users : () => {
    return userService.getAllUsers();
  },
  
  user : ({ id }) => {
    return userService.getUserById(id);
  },
  
  updateUser : ({ id, userInput }) => {
    return userService.updateUser(id, userInput);
  },
  
  deleteUser : ({ id }) => {
    return userService.deleteUser(id);
  },
}

module.exports = {
  root
};