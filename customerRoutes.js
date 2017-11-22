var mongoose = require ("mongoose");

// Import Mongoose schema from external module
var customerSchema = require('./customerSchema');
var Customer = mongoose.model('Customer', customerSchema);

// Create route functions for server and save them in an object

var routes = {

getCustomers: function (req, res, next) {
    
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
  },

getCustomerByID: function (req, res, next) {
    console.log('GET request for single customer with ID: ' + req.params.id);
    // Find a single patient by their id
    Customer.find({ _id: req.params.id }, function (error, customer) {
    if (error) {
        res.send(error);
      } else {
        res.send(customer);
      }
    });
  },

createCustomer: function (req, res, next){
    console.log('POST request');
    // Creating new customer according to customerSchema.
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

updateCustomer: function (req, res, next){
    console.log('PUT request');
    // Creating new customer according to customerSchema.
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

deleteCustomer: function (req, res, next) {
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
    }

};

module.exports = routes;