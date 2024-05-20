const mongoose = require("mongoose");

//scheema of product that will be store in monodb cloud
const orderSchema = mongoose.Schema({
    
    
});

exports.Order = mongoose.model('Order', orderSchema);
