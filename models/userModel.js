const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: 3,
    maxlength: 12,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  gender: {
    type: String,
    enum : ['male','female'],
    required: [true, 'Gender is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  status: {
    type: String,
    enum : ['active','disabled'],
    default : 'active',
    required: [true, 'Status is required'],
  },
},
{
    timestamps: { createdAt: 'createdDate: ', updatedAt: 'modifyDate: ' },
    collection: 'users',
},
)

const user_model = mongoose.model('userModel', userSchema)

module.exports={ user_model } ;