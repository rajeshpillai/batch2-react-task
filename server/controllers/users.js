const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

exports.signin = function(req, res, next) {
  console.log(req.body);
  var email  =    req.body.user.email;
  var password = req.body.user.password;

  var user = db.users.find((user) => {
    return (user.email.trim() === email.trim()
          && user.password === password );
  });
  
  console.log("found: ", user);
  if (!user) {
     return next(null, false, {errors: {'email or password': 'is invalid'}});
  }
  const token = jwt.sign({user}, config.secret);
  res.json({
    token: token
  })
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
}