module.exports = function($) {
	var items = [];
	$('[id=product_list_item]').each(function(i, el) {
		var $el = $(this);
		var name = $el.find('.title').text().trim();
		var price = $el.find('[id=price]').text().trim();
		var url = $el.find('a').attr('href');
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