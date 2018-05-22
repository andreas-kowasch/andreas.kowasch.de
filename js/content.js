function openTabFromURL() {

	var activeTab = $('.nav a[href="' + location.hash + '"]').tab('show');

	if (activeTab.length) {
		activeTab.tab('show');
	} else {
		$('.nav a:first').tab('show');
	}
}

////////////////////////////////////////////////////////////////////////////////

openTabFromURL();

////////////////////////////////////////////////////////////////////////////////

// push clicked tab to browser history

$('a[data-toggle="tab"]').click(function(e) {
	history.pushState(null, null, e.target.hash);
	$('html, body').animate( { scrollTop: 0 }, 'slow');
});

// open poped tab from browser history

window.addEventListener("popstate", function() {
	openTabFromURL();
});

////////////////////////////////////////////////////////////////////////////////

var is_touch_device = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch;

// technology tags popover

$('.technologies a[data-toggle="popover"]').popover({
	placement: 'top',
	trigger: is_touch_device ? 'click' : 'focus',
	html: true,
	title: 'Beschreibung'
})

// messenger tags popover

$('.messenger button[data-toggle="popover"]').popover({
	placement: 'top',
	trigger: is_touch_device ? 'click' : 'hover focus',
	title: 'Benutzername'
})

// protected tags popover

$('i + a + a[data-toggle="popover"]').popover({
	placement: 'top',
	trigger: is_touch_device ? 'click' : 'focus',
	html: true,
	title: 'Geschützter Bereich',
	content: 'Für den Zugriff auf Zertifikate und Zeugnisse wird eine Kennung benötigt. Sie liegt Bewerbungsunterlagen bei, kann aber auch bei Interesse beantragt werden.' +
		'<span class="vspace-0-5"></span>' +
		'<i class="fa fa-envelope-o" aria-hidden="true"></i>' + ' ' +
		'<a href="mailto:andreas@kowasch.de?subject=Antrag%20für%20eine%20Kennung&amp;'+
			'body=Hallo%2C%0A%0Aich%20bin%20%5B...%5D%20von%20der%20Firma%20%5B...%5D.%0A%0AIch%20interessiere%20mich%20f%C3%BCr%20einen%20Zugang%20zu%20den%20Zertifikaten%20und%20Zeugnissen%20auf%20ihrer%20Webseite%20und%20m%C3%B6chte%20daher%20eine%20Kennung%20beantragen.%0A%0A%5B...%5D"' +
			'>Kennung beantragen</a>'
})

////////////////////////////////////////////////////////////////////////////////

// show and hide specific details links

$('a[data-toggle="collapse"][data-toggle-type="main"]').click(function() {
	$(this).text(function(i, old) {
		return old=='\u2191 Details ausblenden' ? '\u2193 Details einblenden' : '\u2191 Details ausblenden';
	});
});

$('a[data-toggle="collapse"][data-toggle-type="sub"]').click(function() {
	$(this).text(function(i, old) {
		return old=='\u2191 ausblenden' ?  '\u2193 einblenden' : '\u2191 ausblenden';
	});
});

// show and hide all details links

$('.link-collapse-show').click(function() {
	$(location.hash + ' .collapse').collapse('show');
	$(location.hash + ' a[data-toggle="collapse"][data-toggle-type="main"]').text('\u2191 Details ausblenden');
	$(location.hash + ' a[data-toggle="collapse"][data-toggle-type="sub"]').text('\u2191 ausblenden');
	return false;
});

$('.link-collapse-hide').click(function() {
	$(location.hash + ' .collapse').collapse('hide');
	$(location.hash + ' a[data-toggle="collapse"][data-toggle-type="main"]').text('\u2193 Details einblenden');
	$(location.hash + ' a[data-toggle="collapse"][data-toggle-type="sub"]').text('\u2193 einblenden');
	return false;
});

////////////////////////////////////////////////////////////////////////////////

// footer navigation links

$('.navigate').click(function (e) {
	e.preventDefault();
	$('.nav a[href="' + $(this).attr('href') + '"]').click();
});

$('.link-top').click(function() {
	$('html, body').animate( { scrollTop: 0 }, 'slow');
	return false;
});

////////////////////////////////////////////////////////////////////////////////

// calculate current age

var today = new Date();
var birthday = new Date($('#age').attr('data-age'));
var age = Math.floor((today-birthday) / (365.25 * 24 * 60 * 60 * 1000));
$('#age').html('(' + age + ' Jahre)');

////////////////////////////////////////////////////////////////////////////////

// calculate time spans

$('.time-span').each(function() {
	moment.locale('de');
	var from = moment($(this).find('.time-from').attr('time-from'));
	if ($(this).find('.time-to').attr('time-to')) {
		var to = moment($(this).find('.time-to').attr('time-to'));
	} else {
		var to = moment(new Date());
	}
	$(this).find('.time-output').html(moment.duration(from.diff(to)).humanize());
});
