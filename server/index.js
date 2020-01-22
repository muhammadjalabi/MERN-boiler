
const express = require('express');
const passport = require('passport');

const app = express();
const path = require('path');
const cors = require('cors')

const mongoose = require('mongoose');
const bodyParser = require('body-parser') //this will allow you to use commands like req.BODY<---

// const cookieParser = require('cookie-parser')

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
const { User } = require('./models/user')
const { auth } = require('./middleware/auth')

//MongoDB
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Data base connected'))
  .catch(error => console.log(error))


//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser())
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use('/api/users', require('./routes/users'))

//Serving statics






const port = process.env.PORT || config.SERVER_PORT
app.listen(port, () => {
  console.log('Server running on port ' + port)
})