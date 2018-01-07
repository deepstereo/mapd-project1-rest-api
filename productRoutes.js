var mongoose = require ("mongoose");

// Import Mongoose schema from external module
var schema = require('./schema');
var Product = mongoose.model('Product', schema.productSchema);

// Create route functions for server and save them in a module

var productRoutes = {

// GET /products
getProducts: function (req, res, next) {
    console.log('GET request for all products');
    Product.find({}, function (error, result){
      if (error) {
          console.log(error);
          res.send(error);
      } else {
        res.send(result);
        return next();
      }
    });
  },

// GET products/:id 
getProductById: function (req, res, next) {
    console.log('GET request for single product with ID: ' + req.params.id);
    Product.findOne({ _id: req.params.id }, function (error, product) {
    if (error) {
        res.send(error);
      } else {
        res.send(product);
      }
    });
  },

// POST /products
createProduct: function (req, res, next){
    console.log('POST request to /products');
    var newProduct = new Product(req.body);
    newProduct.save(function (error, product){
        if (error) {
            console.log(error);
            res.send(error);    
        } else {
            console.log("Product added");
            res.send(product);
        }
    });
},

// PUT /products/:id
updateProduct: function (req, res, next){
    console.log('PUT request to /products/' + req.params._id);
    Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(error, product){
        if (error) {
            console.log(error);
            res.send(error);    
        } else {
            console.log("Product updated");
            res.send(product);
        }
    });
},

// DEL /products/:id
deleteProduct: function (req, res, next) {
    console.log('DEL request for product with Id: ' + req.params._id);
    Product.remove({ _id: req.params.id }, function (error, result) {
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

module.exports = productRoutes;
