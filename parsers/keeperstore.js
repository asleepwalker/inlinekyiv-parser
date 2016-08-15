module.exports = function($) {
	var items = [];
	$('#goods .section').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('a.header').text().trim();
		var price = parseFloat($el.find('.price').text().trim().replace(/[^\d.,]/g, ''));
		var url = $el.find('a.header').attr('href');
		var available = !$el.find('.catalog-item-links .availability.no').length;
		if (available && name && price && url) {
			items.push({
				name: name,
				price: price,
				url: url
			});
		}
	});
	return items;
};