const userService = require('../service/service.js');
const UserRepository = require('../repository/repository.js');
const userModel = require('../models/userModel.js');
const userRepo = new UserRepository(userModel.userSchema);

const root = {
    users : () => {
      return userService.getAllUsers();
    },
    
    user : ({ id }) => {
      return userService.getUserById(id);
    },
    addUser : ({ userInput }) => {
      const result = userService.createUser(userInput);
      return result;
    },
    updateUser : ({ id, userInput }) => {
      return userService.updateUser(id, userInput);
    },
    
    deleteUser : ({ id }) => {
      return userService.deleteUser(id);
    }
  };
module.exports = {
  root
};