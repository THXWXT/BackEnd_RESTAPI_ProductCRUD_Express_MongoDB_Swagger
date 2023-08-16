const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    prod_name: String,
    prod_price: String,
    prod_id: Number,
    prod_desc: String,
    updated_time: {type: Date,default:Date.now}
})

module.exports = mongoose.model('Product',ProductSchema)