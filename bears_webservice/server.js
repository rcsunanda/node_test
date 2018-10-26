
// BASE SETUP

// call the packages we need
var express    = require('express');   // call express
var app        = express();   // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var Bear     = require('./app/models/bear'); // contains Bear schema

// configure app to use bodyParser (this will let us get the data from a POST)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 10000; // set our port
var mondodb_url = 'mongodb://localhost:27017/bears';


// =============================================================================

// ROUTES FOR OUR API

var router = express.Router();   // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
   // do things like logging, keeping statistics, validating input etc
   console.log('In router.use()');
   next(); // Important: make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:port/api)
router.get('/', function(req, res) {
   console.log('In router.get(): received GET request to /');
   res.json({ message: 'Hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// ----------------------------------------------------
router.route('/bears')
    // create a bear (accessed at POST http://localhost:port/api/bears)
   .post(function(req, res) {
      var bear_name = req.body.name;     // get the bears name (comes from the request)
      console.log('In router.route.post(): received POST request to /bears. name=' + bear_name);

      var bear = new Bear();      // create a new instance of the Bear model
      bear.name = bear_name;

      // save the bear and check for errors
      bear.save(function(err) {
         if (err) {
            res.send(err);
         }
         console.log('In router.route.post(): saved bear instance to DB');
         res.json({ message: 'Bear created!' });
      });
   })
    // get all the bears (accessed at GET http://localhost:port/api/bears)
   .get(function(req, res) {
      Bear.find(function(err, bears) {
         if (err) {
            res.send(err);
         }
         res.json(bears);
      });
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// =============================================================================

// Connect to MongoDB

mongoose.connect(mondodb_url); // connect to our database


// START THE SERVER

app.listen(port);
console.log('Bears webservice started on port: ' + port);