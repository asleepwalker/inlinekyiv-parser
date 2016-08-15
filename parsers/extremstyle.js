module.exports = function($) {
	var items = [];
	$('.row_product').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.infob a').text().trim();
		var price = parseFloat($el.find('.cost').text().trim());
		var url = $el.find('.infob a').attr('href');
		if (name && price && url) {
			items.push({
				name: name,
				price: price.replace(/[^\d.,]/g, ''),
				url: url
			});
		}
	});
	return items;
};