module.exports = function($) {
	var items = [];
	$('.list-item').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.item-list-type').text().trim();
		var price = parseFloat($el.find('.item-list-price .price-value').text().trim().replace(/[^\d.,]/g, ''));
		var url = $el.find('a.list-item-href').attr('href');
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