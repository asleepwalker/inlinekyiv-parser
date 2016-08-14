var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
var mysql = require('mysql');

var dbconfig = require('./dbconfig.json')
var connection = mysql.createConnection(dbconfig);

connection.connect();
connection.on('error', function(err) { console.log(err); });

// Get the oldest data source
connection.query('select * from as_sources order by lastupdate limit 0,1', function (err, sources) {
	if (err) return console.error(err);

	var source = sources[0];

	// Move to the end of list
	connection.query('update as_sources set lastupdate = NOW() where id = ' + mysql.escape(source.id));

	var parser = require('./parsers/' + source.service);
	request({
		uri: source.endpoint,
		method: source.method,
		encoding: !source.encoding ? 'utf8' : null, // null for binary, which is convertable by iconv
		form: source.payload ? JSON.parse(source.payload) : undefined
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			if (source.encoding) {
				var Iconv = require('iconv').Iconv;
				var translator = new Iconv(source.encoding, 'utf-8');
				body = translator.convert(body).toString();
			}

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
			var query = getUpsertQuery({
				market: mysql.escape(source.market),
				source: mysql.escape(source.id),
				name: mysql.escape(item.name),
				price: mysql.escape(item.price),
				currency: mysql.escape(source.currency),
				url: mysql.escape(url.resolve(basePath, item.url))
			});
			connection.query(query, function(err) {
				return !err ? resolve() : reject(err);
			});
		});
	}));
}

function getUpsertQuery(d) {
	return 'insert into as_items ( ' +
		'market, source, name, price, currency, url, lastupdate' +
	') values (' +
		[d.market, d.source, d.name, d.price, d.currency, d.url].join() + ', NOW()' +
	') on duplicate key update ' +
		'name = ' + d.name + ', price = ' + d.price + ', currency = ' + d.currency + ', lastupdate = NOW()';
}