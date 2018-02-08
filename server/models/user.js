var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var User = function (username, password) {
    this.username = username;
    this.password = password;
}

User.prototype.generateJWT = function() {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
  
User.prototype.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = User;