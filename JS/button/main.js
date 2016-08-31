function MagicButton(button) {
    button.click(function() {
        if ($(this).attr('data-color') == 'blue') {
            $(this).attr('data-color', 'red').css('color', 'red');
        } else {
            $(this).attr('data-color', 'blue').css('color', 'blue');
        }
	});

    button.hover(function() {
		$(this).css('color', 'green');
	}, function() {
		$(this).css('color', $(this).attr('data-color'));
	});
}

$(document).ready(function() {
	MagicButton($('#customButton'));

    $(document).keypress(function(e) {
        if (e.which == 13) {
            MagicButton($('<button>', {
                text: 'New Button'
            }).attr('data-color', 'blue').css('color', 'blue').appendTo(document.body));
        }
    })
});
