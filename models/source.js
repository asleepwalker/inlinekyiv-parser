var mongoose = require('mongoose');

var sourceSchema = mongoose.Schema({
	market: String,
	page: String,
	endpoint: String,
	method: String,
	payload: Object,
	service: String,
	currency: String,
	lastupdate: Number
});

module.exports = mongoose.model('Source', sourceSchema);