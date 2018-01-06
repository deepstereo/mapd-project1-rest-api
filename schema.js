var mongoose = require ("mongoose");


// Create schemas for Customer, Order, Product

var schema = {

customerSchema: new mongoose.Schema({
    businessName: {type: String, default: " "}, 
    address: {type: String, default: " "}, 
    telephone: {type: Number, default: " "},
    email: {type: String, default: " "},
    contactPerson: {type: String, default: " "},
    dateCreated: {type: Date, default: Date.now}
}),

orderSchema: new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    amount: {type: Number, default: 1},
    isPaid: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now}
}),

productSchema: new mongoose.Schema({
    productName: {type: String, default: " "},
    price: {type: Number, default: 0},
    dateCreated: {type: Date, default: Date.now}
})

};

module.exports = schema;
