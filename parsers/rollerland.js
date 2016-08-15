module.exports = function($) {
	var items = [];
	$('.item').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.title a').text().trim();
		var price = parseFloat($el.find('.price').html()
			.replace(/&#x[^;]+;/g, '') // Remove unicode text
			.replace(/<b>.*?<\/b>/, '') // Remove strikeout text
			.replace(/[^\d.,]/g, '') // Remove anything but number
			.trim());
		var url = $el.find('.title a').attr('href');

		var itemText = $el.text();
		var available = itemText.indexOf('Нет на складе') == -1 && itemText.indexOf('Снят с производства') == -1;

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