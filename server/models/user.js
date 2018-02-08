var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var User = function (username, password) {
    this.username = username;
    this.password = password;
}

User.prototype.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
}
  
User.prototype.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = User;