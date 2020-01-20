const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    minlength: 8
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String,
  },
  tokenExpiration: {
    type: Number,
  }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }