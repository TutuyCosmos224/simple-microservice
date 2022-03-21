const userModel = require('../models/userModel.js');

const utils = require('../utils/utils.js');

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   *
   * @param {Object} object user data
   * @returns {Obejct} new user data
   */
  async create(object) {
    const isExist = await this.model.exists({ username: object.username });
    if (isExist) throw new Error('Username already exist');
    return this.model.create(object);
  }

  /**
   *
   * @returns {Array} users data
   */
  async getAll() {
    const users = await this.model.find();
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
  async deleteUser(id) {
    const userId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: userId });
    if (!isExist) throw new Error('User Not Found!');
    return this.model.findByIdAndDelete(userId);
  }
}

const newRepo = new UserRepository(userModel)
module.exports = {newRepo} ;