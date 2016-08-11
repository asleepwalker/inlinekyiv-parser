var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	market: String,
	sourceId: String,
	productId: String,
	name: String,
	price: Number,
	currency: String,
	lastupdate: Number
});

module.exports = mongoose.model('Item', itemSchema);