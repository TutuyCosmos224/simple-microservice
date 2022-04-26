const mongoose = require('mongoose');
const models = require ('../models/userModel')

const utils = require('../utils/utils.js');

module.exports = class UserRepository {
  constructor(model) {
    const user_model = mongoose.model('userModel', model);
    this.model = user_model;
  }

  /**
   *
   * @param {Object} object user data
   * @returns {Object} new user data
   */
  async create(object) {
    const isExist = await this.model.exists({ username: object.username });
    if (isExist) {
      throw new Error('Username already exist');
    }
    return this.model.create(object);
  }

  /**
   *
   * @returns {Array} users data
   */
  async getAll() {
    const users = await this.model.find();
    console.log(users);
    return users;
  }

  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  async getById(id) {
    const userId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: userId });
    if (!isExist) throw new Error('User Not Found!');
    const user = await this.model.findById(userId);
    return user;
  }

  /**
   *
   * @param {String} id user id
   * @param {Object} object user object data
   * @returns {Object} updated user data
   */
  async updateUser(id, object) {
    const userId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: userId });
    if (!isExist) throw new Error('User Not Found!');
    const user = await this.model.findByIdAndUpdate(userId, object, {
      new: true,
    });
    return user;
  }

  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  async deleteById(id) {
    const userId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: userId });
    if (!isExist) throw new Error('User Not Found!');
    return this.model.findByIdAndDelete(userId);
  }
} ;