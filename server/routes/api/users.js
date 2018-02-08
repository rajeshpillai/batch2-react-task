var router = require('express').Router();


// Get all users
router.get("/users", function (req, res) {
    let db = req.db;
    res.json(db.users);
});

module.exports = router;