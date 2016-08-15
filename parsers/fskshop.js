module.exports = function($) {
	var items = [];
	$('.item:not(.net_na_sklade1)').each(function(i, el) {
		var $el = $(this);
		var $price = $el.find('.price .price_new').length ? $el.find('.price .price_new') : $el.find('.price');
		var name = $el.find('.name a').text().trim();
		var price = parseFloat($price.text().replace(/<b>.*?<\/b>/, '').trim().replace(/[^\d.,]/g, ''));
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