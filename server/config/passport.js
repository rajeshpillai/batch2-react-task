var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
    var user = db.users.find((user) => {
        return (user.email.trim() === email.trim()
            && user.password === password );
    });

    if (!user) {
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }
    return done(null, user);
}));