var mongoose = require ("mongoose");


// Create schemas for Customer, Order, Product

var schema = {

customerSchema: new mongoose.Schema({
    businessName: String, 
    address: String, 
    telephone: Number,
    email: String,
    contactPerson: String,
    // orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    dateCreated: {type: Date, default: Date.now}
}),

orderSchema: new mongoose.Schema({
    customerID: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    product: String,
    amount: Number,
    isPaid: Boolean,
    dateCreated: {type: Date, default: Date.now}
}),

productSchema: new mongoose.Schema({
    productName: String,
    price: Number,
    dateCreated: {type: Date, default: Date.now}
})

};

// var Order = mongoose.model('Order', schema.orderSchema);
// var Customer = mongoose.model('Customer', schema.customerSchema);
// var Product = mongoose.model('Product', schema.productSchema);

module.exports = schema;