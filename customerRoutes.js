var mongoose = require ("mongoose");

// Import Mongoose schema from external module
var schema = require('./schema');
var Customer = mongoose.model('Customer', schema.customerSchema);

// Create route functions for server and save them in a module

var customerRoutes = {

// GET /customers
getCustomers: function (req, res, next) {
    console.log('GET request for all customers');
    Customer.find({}, function (error, result){
      if (error) {
          console.log(error);
          res.send(error);
      } else {
        res.send(result);
        return next();
      }
    });
  },

// GET /customers/:id
getCustomerById: function (req, res, next) {
    console.log('GET request for single customer with Id: ' + req.params.id);
    Customer.findOne({ _id: req.params.id }, function (error, customer) {
    if (error) {
        res.send(error);
      } else {
        res.send(customer);
      }
    });
  },

// POST /customers
createCustomer: function (req, res, next){
    console.log('POST request received');
    var newCustomer = new Customer(req.body);
    newCustomer.save(function (error, customer){
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("Customer added");
            res.send(customer);
        }
    });
},

// PUT customers/:id
updateCustomer: function (req, res, next){
    console.log('PUT request');
    Customer.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(error, customer){
        if (error) {
            console.log(error);
            res.send(error);    
        } else {
            console.log("Customer updated");
            res.send(customer);
        }
    });
},

// DEL customers/:id
deleteCustomer: function (req, res, next) {
    console.log('DEL request for customer with Id: ' + req.params.id);
    Customer.remove({ _id: req.params.id }, function (error, result) {
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

module.exports = customerRoutes;
