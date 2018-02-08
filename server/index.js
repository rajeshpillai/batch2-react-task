const express = require("express")
      bodyParser = require("body-parser"),
      cors = require("cors"),
      passport = require("passport"),
      path = require("path"),
      uuidv4 = require('uuid/v4'),
      errorhandler = require("errorhandler");
      
var isProduction = process.env.NODE_ENV === 'production';


const app = express();

app.set("view engine", 'ejs');

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static("public"));

if (!isProduction) {
    app.use(errorhandler());
}

var homeController = require("./controllers/home");

db = {
    users:[
        {email: "test1@algorisys.com", password: "123"},
        {email: "test2@algorisys.com", password: "123"},
    ],
    tasks: [
        {id: uuidv4(), edit: false, "title": "Learn React", author: "rajesh", completed: false},
        {id: uuidv4(), edit: false, "title": "Learn Angular", author: "sangram", completed: false},
    ]
};

app.use(function (req, res, next) {
    req.db = db;
    next();
});

User = require('./models/user');

require('./config/passport');

app.use(require('./routes'));

app.get("/", homeController);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// development error handler will print stack trace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
})


var port = 8888;

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
