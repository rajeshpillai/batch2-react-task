var router = require('express').Router();

router.use('/', require('./users'));
router.use('/tasks', require('./tasks'));

module.exports = router;
