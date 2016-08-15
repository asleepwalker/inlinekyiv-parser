module.exports = function($) {
	var items = [];
	$('.cat-item').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('h4 a').text().trim();
		var price = parseFloat($el.find('.price').text().trim().replace(/[^\d.,]/g, ''));
		var url = $el.find('h4 a').attr('href');
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