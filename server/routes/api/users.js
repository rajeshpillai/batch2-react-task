var router = require('express').Router();
var User = require("../../models/User");
const Authentication = require("../../controllers/authentication");
var jwt = require('jsonwebtoken');
var config = require('../../config');

function ensureToken(req, res, next) {
    const header = req.headers["authorization"];
    if (typeof header === 'undefined') {
        return res.sendStatus(403);
    }
    const bearer = header.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
}
router.get('/users', ensureToken,  function(req, res) {
    jwt.verify(req.token, config.secret, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json(req.db.users);
        }
    });

});
router.post('/users/signin', Authentication.signin);
router.post('/users/signup', Authentication.signup);

module.exports = router;