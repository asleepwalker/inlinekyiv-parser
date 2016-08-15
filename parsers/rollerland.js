module.exports = function($) {
	var items = [];
	$('.item').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.title a').text().trim();
		var price = $el.find('.price').html().replace(/<b>.*?<\/b>/, '').trim();
		var url = $el.find('.title a').attr('href');
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