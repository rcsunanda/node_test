
// BASE SETUP

// call the packages we need
var express    = require('express');   // call express
var app        = express();   // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// configure app to use bodyParser (this will let us get the data from a POST)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 10000; // set our port
var mondodb_url = 'mongodb://localhost:27017/bears';


// =============================================================================

// ROUTES FOR OUR API

var router = express.Router();   // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:port/api)
router.get('/', function(req, res) {
    res.json({ message: 'Hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// =============================================================================

// Connect to MongoDB

mongoose.connect(mondodb_url); // connect to our database


// START THE SERVER

app.listen(port);
console.log('Bears webservice started on port: ' + port);