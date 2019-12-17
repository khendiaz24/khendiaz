function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	//Nav scroll
	if ($(window).width() > 640 ){
		$('.menu-inner').onePageNav({
			scrollOffset: 56
		});
	} else {
		$('.menu-inner').onePageNav({
			scrollOffset: 0
		});
	}

	$('.t-logo').click(function(e){
		$('body,html').animate({ scrollTop:$(window).height()==0}, 600, 'linear');
		event.preventDefault();
	});
}


function opNav(){
	$('.menu-open span,.menu-close span').addClass('start').delay(500).queue(function(){
		$('.menu-open span,.menu-close span').removeClass('start').dequeue();
	});
}

$(window).resize(function() {
	resize();
});

$(document).ready(function() {
	resize();
	opNav();

	// Menu
	$('.menu-open').click(function(){
		$(this).hide();
		$('.menu-close').show();
		$('nav').addClass('open');
		opNav();
	});
	$('.menu-close').click(function(){
		$(this).hide();
		$('.menu-open').show();
		$('nav').removeClass('open');
		opNav();
	});

});

$(window).load(function() {
	resize();

	//animation
	if (!Modernizr.touch) {
		$.stellar();
		$('.anim-content').each(function() {
			$(this).children().each(function(index) {
				var element = $(this);
				var delayNum = 0.1 + (0.1 * index) + 's';
				$(element).addClass('inview');
				setTimeout(function() {
					$(element).css('-webkit-transition-delay', delayNum)
						.css('-moz-transition-delay', delayNum)
						.css('-ms-transition-delay', delayNum)
						.css('-o-transition-delay', delayNum)
				}, 100);
			});
		});

		$('.anim-content').appear(function(){
			var elem = $(this);
			setTimeout(function(){
				elem.addClass('visible');
			}, 500);
		});

	} else {
		$('.anim-content').removeClass('anim-content');
	}

	// Percent Count
	$('.html-bar').css('width',0);
	$(".skills").appear(function(){
		var mytest = true;
		if(mytest){
			setTimeout(function(){
				$('.single').css({'opacity':1});
				$('.single').each(function () {
					$(this).prop('Counter',0).animate({
						Counter: $(this).text()
					}, {
						duration: 2500,
						easing: 'swing',
						step: function (now) {
							$(this).text(Math.ceil(now));
						}
					});
				});
			}, 500);
			mytest = false;
		}

		$('.html-bar').each(function(){
			var bData = $(this);
			var bValue = bData.data('value');
			setTimeout(function(){
				bData.animate({'width':bValue + '%'}, 2500,'swing');
			}, 500);
			console.log(bValue);
		});
	});

});

// preloader once done
Pace.on('done', function() {
	// totally hide the preloader especially for IE
	setTimeout(function() {
		$('.pace-inactive').hide();
	}, 500);
});
