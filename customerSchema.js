var mongoose = require ("mongoose");



// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.

var customerSchema = new mongoose.Schema({
    businessName: String, 
    address: String, 
    telephone: Number,
    contactPerson: String,
    email: String
});

module.exports = customerSchema;