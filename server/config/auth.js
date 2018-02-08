var jwt = require('jsonwebtoken');
var config = require('../config');

const auth = {
    ensureToken: function (req, res, next) {
        const header = req.headers["authorization"];
        if (typeof header === 'undefined') {
            console.log("forbidden....");
            return res.sendStatus(403);
        }
        const bearer = header.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;

        console.log("token: ", bearerToken);

        auth.verify(req.token, config.secret, function (err, data) {
            if (err) {
                res.sendStatus(403);
            } else {
                next(null, data);
            }
        });
    },
    verify: function (token, secret, callback) {
        jwt.verify(token, secret, function (err, data) {
            if (err) {
                callback(true, data);
            } else {
                callback (null, data);
            }
        });
    }
}

module.exports = auth;