var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
var mysql = require('mysql');

var dbconfig = require('./dbconfig.json')
var connection = mysql.createConnection(dbconfig);

connection.connect();
connection.on('error', function(err) { console.log(err); });

// Get the oldest data source
connection.query('select * from as_sources where id = 1 order by lastupdate limit 0,1', function (err, sources) {
	if (err) return console.error(err);

	var source = sources[0];

	// Move to the end of list
	connection.query('update as_sources set lastupdate = NOW() where id = ' + source.id);

	var parser = require('./parsers/' + source.service);
	request({
		uri: source.endpoint,
		method: source.method,
		form: source.payload ? JSON.parse(source.payload) : undefined
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var items = parser(cheerio.load(body));
			upsertItems(items, source)
				.then(function() { connection.end(); });
		}
	});
});

function upsertItems(items, source) {
	var sourceUrl = url.parse(source.endpoint);
	var basePath = sourceUrl.protocol + '//' + sourceUrl.host + '/';
	return Promise.all(items.map(function(item, index) {
		return new Promise(function(resolve, reject) {
			var query = 'insert into as_items ( ' +
				'market, source, name, price, currency, url, lastupdate' +
			') values ( ' +
				'"' + source.market + '", ' +
				'"' + source.id + '", ' +
				'"' + connection.escape(item.name) + '", ' +
				'"' + connection.escape(item.price) + '", ' +
				'"' + source.currency + '", ' +
				'"' + connection.escape(url.resolve(basePath, item.url)) + '", ' +
				'NOW()' +
			') on duplicate key update ' +
				'name = "' + connection.escape(item.name) + '", ' +
				'price = "' + connection.escape(item.price) + '", ' +
				'currency = "' + source.currency + '", ' +
				'lastupdate = NOW()';
			connection.query(query, function(err) {
				return !err ? resolve() : reject(err);
			});
		});
	}));
}
