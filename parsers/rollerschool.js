module.exports = function($) {
	var items = [];
	$('.post').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.entry-title').text().trim();
		var price = parseFloat($el.find('.post_price').text().trim().replace(/[^\d.,]/g, ''));
		var url = $el.find('.entry-title a').attr('href');
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