var router = require('express').Router();


router.post('/users/login', function(req, res, next){
    console.log("AUTH: ", req.body);
    try {
        if(!req.body.user.email){
            console.log("no email..");
            return res.status(422).json({errors: {email: "can't be blank"}});
        }
        if(!req.body.user.password){
            console.log("no pass..");
            return res.status(422).json({errors: {password: "can't be blank"}});
        }
    }catch(e){
        console.log("ERROR: ", e);
        return res.status(422).json({errors: {server: "Invalid request"}});
    }

    passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){ return next(err); }
        user = new User(user.email, user.password);
        console.log("User: ", user);

        if(user){
            user.token = user.generateJWT();
            console.log("token: ", user.token);
            return res.json({user: user.toAuthJSON()});
        } else {
         return res.status(422).json(info);
        }
    })(req, res, next);
});

// Get all users
router.get("/users", function (req, res) {
    let db = req.db;
    res.json(db.users);
});

module.exports = router;