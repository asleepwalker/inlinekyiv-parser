module.exports = function($) {
	var items = [];
	$('.list td').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('a').eq(1).text().trim();
		var price = parseFloat($el.find('span').eq(1).text().trim().replace(/[^\d.,]/g, ''));
		var url = $el.find('a').eq(1).attr('href');
		if (name && price && url) {
			items.push({
				name: name,
				price: price,
				url: url
			});
		}
	});
	return items;
};