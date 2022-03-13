const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const table = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username: {
    type: Date,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  gender: {
    type: String,
    enum : ['male','female'],
    required: [true, 'Gender is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    required: [true, 'Created Date is required']
  },
  modifyDate: {
    type: Date,
    default: Date.now(),
    required: [true, 'Modify Date is required']
  },
  status: {
    type: String,
    enum : ['active','disabled'],
    default : 'active',
    required: [true, 'Status is required']
  }
})

module.exports = table