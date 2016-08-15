module.exports = function($) {
	var items = [];
	$('.product-list > div').each(function(i, el) {
		var $el = $(this);
		var $price = $el.find('.price .price-new').length ? $el.find('.price .price-new') : $el.find('.price');
		var name = $el.find('.name a').text().trim();
		var price = parseFloat($price.text().trim().replace(/[^\d.,]/g, ''));
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