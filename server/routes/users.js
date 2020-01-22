const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const { User } = require('../models/user')
const { auth } = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
  res.status(200)
    .json({
      _id: req.id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
    })
})

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists!" })
      }
    })

  const user = new User(req.body)

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        throw error;
      }
      user.password = hash;
      user.save()
        .then(user => res.json(user))
        .catch(error => console.log(error))
    })
  })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ email: `Email cannot be found` })
      }
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          }
          jwt.sign(payload, 'secret',
            {
              expiresIn: 31556926 // 1 year in seconds!
            }, (error, token) => {
              res.send({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        }
      })
    })
})


router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (error, info) => {
    if (error) {
      return res.json({ success: false, error })
    }
    res.status(200)
      .send({
        success: true
      })
  })
})

module.exports = router;