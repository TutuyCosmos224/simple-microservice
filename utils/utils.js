import Joi from 'joi';
import crypto from 'crypto';
import mongoose from 'mongoose';

/**
 *
 * @param {Object} user user data
 * @returns
 */
const validateUser = (user) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().required(),
    gender: Joi.string().valid('male', 'female').required(),
    address: Joi.string().required(),
    status: Joi.string().valid('active', 'disabled'),
  });
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(user, options);
};

/**
 *
 * @param {String} password user password plain text
 * @returns {Promise} hash password
 */
const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('base64');

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('base64')}`);
    });
  });
};

/**
 *
 * @param {String} password user password plain text
 * @param {String} hash hash password
 * @returns {Promise} true | false
 */
const verifyPassword = async (password, hash) => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('base64'));
    });
  });
};

const toObjectId= (id) => mongoose.Types.ObjectId(id);

export default { validateUser, hashPassword, verifyPassword, toObjectId };