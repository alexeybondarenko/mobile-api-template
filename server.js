
var express = require('express');
var app = express ();
var bodyParser = require ('body-parser');
var validator = require('validator');

// post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port
// routes
var router = express.Router();

// website static files. SPA
//app.use(express.static(__dirname + '/../www'));

// Если произошла ошибка валидации, то отдаем 400 Bad Request
app.use(function (err, req, res, next) {
    if (err.name == "ValidationError") res.status(400).send(err);
    else next(err);
});

// Если же произошла иная ошибка то отдаем 500 Internal Server Error
app.use(function (err, req, res, next) {
    res.status(500).send(err);
});

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function (req, res) {
    res.status(200).json({
        text: "Hi. I'm mobile api template."
    })
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);