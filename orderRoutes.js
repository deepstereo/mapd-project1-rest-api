var mongoose = require ("mongoose");

// Import Mongoose schema from external module
var schema = require('./schema');
var Order = mongoose.model('Order', schema.orderSchema);
var Customer = mongoose.model('Customer', schema.customerSchema);

// Create route functions for server and save them in a module

var orderRoutes = {

// GET /orders
getOrders: function (req, res, next) {
    console.log('GET request for all orders');
    Order.find({}, function (error, result){
      if (error) {
          console.log(error);
          res.send(error);
      } else {
        res.send(result);
        return next();
      }
    });
  },

// GET orders/:id 
getOrderById: function (req, res, next) {
    console.log('GET request for single order with Id: ' + req.params.id);
    Order.findOne({ _id: req.params.id }, function (error, order) {
    if (error) {
        res.send(error);
      } else {
        res.send(order);
      }
    });
  },

// GET orders by customer ID /customers/:id/orders 
getOrdersByCustomerId: function (req, res, next) {
    Order.find({ customerId: req.params.id }, function (error, order) {
    if (error) {
        res.send(error);
      } else {
        res.send(order);
      }
    });
  },

// POST /orders
createOrder: function (req, res, next){
    console.log('POST request');
    var newOrder = new Order(req.body);
    newOrder.save(function (error, order){
        if (error) {
            console.log(error);
            res.send(error);    
        } else {
            console.log("Order added");
            res.send(order);
        }
    });
},

// POST /customers/:id/orders
createOrderByCustomerId: function (req, res, next){
    var newOrder = new Order({
        customerId: req.params.id,
        productId: req.body.productId,
        amount: req.body.amount,
        isPaid: req.body.isPaid
    });
    newOrder.save(function (error, order){
        if (error) {
            console.log(error);
            res.send(error);    
        } else {
            console.log("Order added");
            res.send(order);
        }
    });
},

// PUT /orders/:id
updateOrder: function (req, res, next){
    console.log('PUT request');
    Order.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(error, order){
        if (error) {
            console.log(error);
            res.send(error);    
        } else {
            console.log("Order updated");
            res.send(order);
        }
    });
},

// DEL /orders/:id
deleteOrder: function (req, res, next) {
    console.log('DEL request for Order with Id: ' + req.params.id);
    Order.remove({ _id: req.params.id }, function (error, result) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("Deleted successfully");
            res.send({message: "Deleted successfully"});
        }
    });
    }

};

module.exports = orderRoutes;
