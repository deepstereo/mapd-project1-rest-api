var mongoose = require ("mongoose");

// Create schemas for Customer and Order

var schema = {

customerSchema: new mongoose.Schema({
    businessName: String, 
    address: String, 
    telephone: Number,
    contactPerson: String,
    email: String
}),

orderSchema: new mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: "Customer"}, 
    product: String,
    amount: Number,
    discount: Number
})

};

module.exports = schema;