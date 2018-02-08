const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false

    var user = db.users.find((user) => {
      return (user.email.trim() === email.trim()
            && user.password === password );
    });

      console.log("localLogin: ", user);
  
      if (!user) {
        return done(null, false, {errors: {'email or password': 'is invalid'}});
      }
      return done(null, user);

     // compare passwords - is `password` equal to user.password?
    //  user.comparePassword(password, function(err, isMatch) {
    //   if (err) { return done(err); }
    //   if (!isMatch) { return done(null, false); }

    //   return done(null, user);
    // });

});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  var user = db.users.find((user) => {
     return (user.email.trim() === payload.sub
          && user.password === password );
  });

  console.log("jwtLogin: ", user);

  
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);



// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy({
//   usernameField: 'user[email]',
//   passwordField: 'user[password]'
// }, function(email, password, done) {
//     var user = db.users.find((user) => {
//         return (user.email.trim() === email.trim()
//             && user.password === password );
//     });

//     if (!user) {
//       return done(null, false, {errors: {'email or password': 'is invalid'}});
//     }
//     return done(null, user);
// }));