
var restify = require('restify');
var mongoose = require ("mongoose");
var port = process.env.PORT || 3000;

// Establish database connection with Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://centennial:01928374@cluster0-shard-00-00-9pqfl.mongodb.net:27017,cluster0-shard-00-01-9pqfl.mongodb.net:27017,cluster0-shard-00-02-9pqfl.mongodb.net:27017/projectOne?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {useMongoClient: true});

// Create the restify server
var server = restify.createServer();

// Start the server and log  
server.listen(port, function () {
  console.log('Server listening at port ' + port);
  console.log('The following endpoints are available:');
  console.log(' /customers');
  console.log(' /customers/:id');
  console.log(' /customers/:id/orders');
  console.log(' /orders');
  console.log(' /orders/:id');
  console.log(' /products');
  console.log(' /products/:id');
});

// Use body-parser to parse HTTP request body
server.use(restify.plugins.bodyParser());
// server.use(restify.plugins.acceptParser(server.acceptable));

// cross origin for web client
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

// Default endpoint returns a success message
server.get('/', function(req, res, next) {
    res.send('Server is listening on port ' + port + '. Endpoints: /customers, /orders, /products');
    return next();
  });

// Import routes from external module
var customerRoutes = require('./customerRoutes');
var orderRoutes = require('./orderRoutes');
var productRoutes = require('./productRoutes');

// Use server routes for Customers defined in external module
server.get('/customers', customerRoutes.getCustomers);
server.get('/customers/:id', customerRoutes.getCustomerById);
server.post('/customers', customerRoutes.createCustomer);
server.put('/customers/:id', customerRoutes.updateCustomer);
server.del('/customers/:id', customerRoutes.deleteCustomer);

// Use server routes for Orders defined in external module
server.get('/orders', orderRoutes.getOrders);
server.get('/orders/:id', orderRoutes.getOrderById);
server.get('/customers/:id/orders', orderRoutes.getOrdersByCustomerId);
server.post('/orders', orderRoutes.createOrder);
server.post('/customers/:id/orders', orderRoutes.createOrderByCustomerId);
server.put('/orders/:id', orderRoutes.updateOrder);
server.del('/orders/:id', orderRoutes.deleteOrder);

// Use server routes for Products defined in external module
server.get('/products', productRoutes.getProducts);
server.get('/products/:id', productRoutes.getProductById);
server.post('/products', productRoutes.createProduct);
server.put('/products/:id', productRoutes.updateProduct);
server.del('/products/:id', productRoutes.deleteProduct);
