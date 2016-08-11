module.exports = function($, source) {
	var items = [];
	$('.item_small:not(.netnasklade)').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.name').text().trim();
		var price = parseInt($el.find('.price').text().trim()) || undefined;
		var url = $el.find('.name a').attr('href');
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