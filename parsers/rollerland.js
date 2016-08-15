module.exports = function($) {
	var items = [];
	$('.item').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.title a').text().trim();
		var price = $el.find('.price').html()
			.replace(/&#x[^;]+;/g, '') // Remove unicode text
			.replace(/<b>.*?<\/b>/, '') // Remove strikeout text
			.replace(/[^\d.,]/g, '') // Remove anything but number
			.trim();
		var url = $el.find('.title a').attr('href');
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