module.exports = function($) {
	var items = [];
	$('a.sales_roller').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.name_rol').text().trim();
		var price = parseFloat($el.find('.priceNum[id=UAH] .cost_rol').text().trim().replace(/[^\d.,]/g, ''));
		var url = $el.attr('href');
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