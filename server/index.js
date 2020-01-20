
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser') //this will allow you to use commands like req.BODY<---
const cookieParser = require('cookie-parser')

/*
  Config .env-files in one of two ways:
  A. Through .env-file
  B. Config-folder with subfiles
*/

//A. THROUGH .ENV-FILE
//    require('dotenv').config();   <------------
//    const MONGO_URI = process.env.MONGO_URI
//    const SERVER_PORT = process.env.SERVER_PORT

//B. THROUGH CONFIG-FOLDER WITH SUB FILES
const config = require('./config/key')

//Import
const User = require('./models/user')

//MongoDB
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))


//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())


//Requests to endpoints
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)
  user.save((error, userData) => {
    if (error) {
      return res.json({ success: false, error })
    }
    res.status(200)
      .json({
        success: true,
        userData
      })
  })
  return res.status(200)
})

app.post('/api/user/login', (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (error, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'Authentication failed email is not registered'
      })
    }
    //compare password in db
    user.comparePassword(req.body.password, (error, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: 'Wrong password!'
        })
      }
    })
  })

  //Generate token
  user.generateToken((error, userData) => {
    if (error) {
      return res.status(400).send(error)
    }
    res.cookie('xyz_auth', user.token)
      .status(200)
      .json({
        loginSuccess: true,
      })
  })
})

app.listen(config.SERVER_PORT)