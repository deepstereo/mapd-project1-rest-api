var mongoose = require ("mongoose");

// Import Mongoose schema from external module
var schema = require('./schema');
var Customer = mongoose.model('Customer', schema.customerSchema);

// Create route functions for server and save them in a module

var routes = {

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

getCustomerByID: function (req, res, next) {
    console.log('GET request for single customer with ID: ' + req.params.id);
    Customer.find({ _id: req.params.id }, function (error, customer) {
    if (error) {
        res.send(error);
      } else {
        res.send(customer);
      }
    });
  },

createCustomer: function (req, res, next){
    console.log('POST request received');
    var newCustomer = new Customer();
    newCustomer.businessName = req.body.businessName;
    newCustomer.address = req.body.address;
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

module.exports = routes;