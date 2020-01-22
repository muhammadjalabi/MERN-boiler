const { User } = require('../models/user');
let auth = (req, res, next) => {
  let token = req.cookies.xyz_auth;
  User.findByToken(token, (error, user) => {
    if (error) throw error;
    if (!user) {
      res.json({
        isAuth: false,
        error: true,
      })
    }
    req.token = token
    req.user = user
    next()
  })
}

module.exports = { auth };