const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 90
  },
  lastname: {
    type: String,
    maxlength: 80,
  },
  email: {
    type: String,
    trim: true,
    unique: 1
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