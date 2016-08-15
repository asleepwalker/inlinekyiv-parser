module.exports = function($) {
	var items = [];
	$('.object').each(function(i, el) {
		var $el = $(this);
		var $price = $el.find('.discount .value').length ? $el.find('.discount .value') : $el.find('.price .value');
		var name = $el.find('a.title').text().trim();
		var price = parseFloat($price.text().trim().replace(/[^\d.,]/g, ''));
		var url = $el.find('a.title').attr('href');
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