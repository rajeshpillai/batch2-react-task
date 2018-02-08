var router = require('express').Router();
var User = require("../../models/User");
const Authentication = require("../../controllers/users");
var jwt = require('jsonwebtoken');
var config = require('../../config');
const auth = require('../../config/auth');


router.get('/users', auth.ensureToken,  function(req, res) {
    res.json(req.db.users);
});
router.post('/users/signin', Authentication.signin);
router.post('/users/signup', Authentication.signup);

module.exports = router;