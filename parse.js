var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/inlinekyiv');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function () {
	var sourceModel = require('./models/source');
	var itemSchema = require('./models/item');

	sourceModel.findOne().sort('lastupdate').exec(function (err, source) {
		if (err) return console.error(err);
		
		var parser = require('./parsers/' + source.service);
		request({
			uri: source.endpoint,
			method: source.method,
			form: source.payload
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var items = parser(cheerio.load(body));
				console.log(addSourceData(items, source));
			}
		});
	});
});

function addSourceData(items, source) {
	var sourceUrl = url.parse(source.endpoint);
	var basePath = sourceUrl.protocol + '//' + sourceUrl.host + '/';
	return items.map(function(item) {
		item.url = url.resolve(basePath, item.url);
		item.market = source.market;
		item.endpoint = source.endpoint;
		item.currency = source.currency;
		return item;
	});
}
