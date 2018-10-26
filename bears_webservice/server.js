
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
  })

// ----------------------------------------------------

router.route('/bears/:bear_id')
   // get the bear with that id (accessed at GET http://localhost:port/api/bears/:bear_id)
   .get(function(req, res) {
      var bear_id = req.params.bear_id;
      console.log('In router.route.get(): received GET request to /bears/bear_id. bear_id=' + bear_id);
      Bear.findById(bear_id, function(err, bear) {
         if (err) {
            res.send(err);
         }
         console.log('In router.route.get(): retrieved bear');
         res.json(bear);
      });
   })
   // update the bear with this id (accessed at PUT http://localhost:port/port/bears/:bear_id)
   .put(function(req, res) {
      var bear_id = req.params.bear_id;
      var new_bear_name = req.body.name;
      console.log('In router.route.put(): received PUT request to /bears/bear_id. bear_id=' + bear_id + ', new_bear_name=' + new_bear_name);
      // use our bear model to find the bear we want
      Bear.findById(bear_id, function(err, bear) {
         if (err) {
            res.send(err);
         }
         bear.name = new_bear_name;  // update the bears info

         // save the bear
         bear.save(function(err) {
            if (err) {
               res.send(err);
            }
            console.log('In router.route.put(): updated bear name');
            res.json({ message: 'Bear updated!' });
         });
      });
  })
  // delete the bear with this id (accessed at DELETE http://localhost:port/api/bears/:bear_id)
   .delete(function(req, res) {
      var bear_id = req.params.bear_id;
      console.log('In router.route.delete(): received DELETE request to /bears/bear_id. bear_id=' + bear_id);

      Bear.remove({
         _id: bear_id
      }, function(err, bear) {
         if (err) {
            res.send(err);
         }
         console.log('In router.route.delete(): deleted bear');         
         res.json({ message: 'Successfully deleted' });
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