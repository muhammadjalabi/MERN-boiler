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


userSchema.pre('save', (next) => {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      if (error) {
        return next(error)
      }
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          return next(error)
        }
        user.password = hash;
      })
    }
    next();
  })
})

userSchema.methods.comparePassword = (plainPassword, callback) => {
  bcrypt.compare(plainPassword, this.password /*this.password is the password in the database*/, (error, isMatch) => {
    if (error) {
      return callback(error)
    }
    callback(null, isMatch)
  })
}

userSchema.methods.generateToken = (callback) => {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), 'secret')
  user.token = token;
  user.save((error, userInfo) => {
    if (error) {
      return callback(error)
    }
    callback(null, userInfo)
  })
}

module.exports = User = mongoose.model('User', userSchema)