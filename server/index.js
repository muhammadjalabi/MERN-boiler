const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))


app.get('/', (req, res) => {
  res.send('From express to the client')
})



app.listen(5000)