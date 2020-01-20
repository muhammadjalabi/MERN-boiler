
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser')
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
  })
  return res.status(200)
})

app.listen(config.SERVER_PORT)