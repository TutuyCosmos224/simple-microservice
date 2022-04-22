const utils = require('../utils/utils.js');
const UserRepository = require('../repository/repository.js');
const userModel = require('../models/userModel.js');
const producer = require('./kafkaProducer.js');
const userRepo = new UserRepository(userModel.userSchema);
/**
 *
 * @param {Object} user
 * @returns {Object} new user
 */
 const createUser = async (user) => {
    try {
      const { error } = utils.validateUser(user);
      if (error) {
        throw new Error(error.details.map((err) => err.message));
      }
  
      const hashedPassword = await utils.hashPassword(user.password);
      const newUser = {
		    name : user.name,
		    username : user.username,
		    password : hashedPassword,
		    gender : user.gender,
		    address : user.address,
	}

      producer.kafkaProduce.sendMessage('INSERT', newUser);
      console.log("success insert");
      // return await userRepo.create(newUser);
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  /**
   *
   * @returns all users data
   */
  const getAllUsers = () => {
    try {
      return userRepo.getAll();
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  const getUserById = async (id) => {
    try {
      return await userRepo.getById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  /**
   *
   * @param {String} id user id
   * @param {Object} user
   * @returns {Object} updated user data
   */
  const updateUser = async (id, user) => {
    const { error } = utils.validateUser(user);
    if (error) {
      throw new Error(error.details.map((err) => err.message));
    }
    try {
      const hashedPassword = await utils.hashPassword(user.password);

      const userUpdate = {
        _id: id,
	    	name : user.name,
		    username : user.username,
		    password : hashedPassword,
		    gender : user.gender,
		    address : user.address,
	}
      producer.kafkaProduce.sendMessage('UPDATE', userUpdate);
      console.log("update success");
      // const updatedUser = await userRepo.updateUser(id, userUpdate);
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  const deleteUser = async (id) => {
    try {
      producer.kafkaProduce.sendMessage('DELETE', {userId: id});
      console.log('delete success')
      // return await Use.deleteById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  
  // eslint-disable-next-line object-curly-newline
  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  };