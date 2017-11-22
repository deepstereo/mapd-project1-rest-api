var DEFAULT_PORT = 5000
var DEFAULT_HOST = '127.0.0.1'
var SERVER_NAME = 'healthrecords'

var http = require ('http');
var mongoose = require ("mongoose");

var port = process.env.PORT || 3000;
var ipaddress = process.env.IP; // TODO: figure out which IP to use for the heroku

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://svkozak:49QzM4%40tQz@cluster0-shard-00-00-9pqfl.mongodb.net:27017,cluster0-shard-00-01-9pqfl.mongodb.net:27017,cluster0-shard-00-02-9pqfl.mongodb.net:27017/projectOne?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {useMongoClient: true});

var customerSchema = require('./customerSchema');

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Customers' collection in the MongoDB database
var Customer = mongoose.model('Customer', customerSchema);

var restify = require('restify');

  // Create the restify server
var server = restify.createServer();
  
server.listen(port, ipaddress, function () {
  console.log('Server listening at port ' + port);
  console.log('Resources:');
  console.log(' /customers');
  console.log(' /customers/:id');
});


// Allow the use of POST - ??
// server.use(restify.fullResponse());

// Maps req.body to req.params so there is no switching between them
server.use(restify.plugins.bodyParser());

server.get('/', function(req, res, next) {
    res.send('Server is listening on port 3000.')
    return next();
  });


// Get all customers in the system

server.get('/customers', function (req, res, next) {
    
    console.log('GET request for all customers');
    // Find every entity within the given collection
    Customer.find({}, function (error, result){
      if (error) {
          console.log(error);
          res.send(error);
      } else {
        res.send(result);
        return next();
      }
    });
  });


  // Get a single patient by their patient id
server.get('/customers/:id', function (req, res, next) {
    console.log('GET request for single customer with ID: ' + req.params.id);

    // Find a single patient by their id
    Customer.find({ _id: req.params.id }, function (error, customer) {
    if (error) {
        res.send(error);
      } else {
        res.send(customer);
      }
    });
  });


  // Create a new customer
server.post('/customers', function (req, res, next){
    
    console.log('POST request');
    // Creating new customer according to customerSchema.
    var newCustomer = new Customer(req.body);

    // Saving new customer to db
    newCustomer.save(function (error, customer){
        if (error) {
            console.log(error);
            res.send(error);    
        } else {
            console.log("Customer added");
            res.json(customer);
        }
    });
});


  // Delete patient with the given id
  server.del('/customers/:id', function (req, res, next) {
    console.log('DEL request for customer with ID: ' + req.params.id);
    Customer.remove({ _id: req.params.id }, function (error, result) {
      // If there are any errors, pass them to next in the correct format
      if (error) {
          res.send(error);
      } else {
          console.log("Deleted successfully");
          res.send({message: "Deleted successfully"});
      }
    });
  })