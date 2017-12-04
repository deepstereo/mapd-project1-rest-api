var restify = require('restify');
var mongoose = require ("mongoose");
var port = process.env.PORT || 3000;

// Establish database connection with Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://svkozak:49QzM4%40tQz@cluster0-shard-00-00-9pqfl.mongodb.net:27017,cluster0-shard-00-01-9pqfl.mongodb.net:27017,cluster0-shard-00-02-9pqfl.mongodb.net:27017/projectOne?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {useMongoClient: true});

// Create the restify server
var server = restify.createServer();

// Start the server and log  
server.listen(port, function () {
  console.log('Server listening at port ' + port);
  console.log('Use the following endpoints:');
  console.log(' /customers');
  console.log(' /customers/:id');
  console.log(' /orders');
  console.log(' /orders/:id');
});

// Use body-parser to parse HTTP request body
server.use(restify.plugins.bodyParser({mapParams: true}));

// Default endpoint returns a success message
server.get('/', function(req, res, next) {
    res.send('Server is listening on port ' + port + '. Endpoints: /customers, /orders')
    return next();
  });

// Import routes from external module
var routes = require('./customerRoutes');
var orderRoutes = require('./orderRoutes')

// Use server routes for Customers defined in external module
server.get('/customers', routes.getCustomers);
server.get('/customers/:id', routes.getCustomerByID);
server.post('/customers', routes.createCustomer);
server.put('/customers/:id', routes.updateCustomer);
server.del('/customers/:id', routes.deleteCustomer);

// Use server routes for Orders defined in external module
server.get('/orders', orderRoutes.getOrders);
server.get('/orders/:id', orderRoutes.getOrderByID);
server.post('/orders', orderRoutes.createOrder);
server.put('/orders/:id', orderRoutes.updateOrder);
server.del('/orders/:id', orderRoutes.deleteOrder);
