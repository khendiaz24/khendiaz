/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(!e)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 2.1
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

	// our plugin constructor
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$nav = this.$elem.find('a');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	// the plugin prototype
	OnePageNav.prototype = {
		defaults: {
			currentClass: 'current_page_item',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 800,
			scrollOffset: 0,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},

		init: function() {
			var self = this;

			// Introduce defaults that can be extended either
			// globally or using an object literal.
			self.config = $.extend({}, self.defaults, self.options, self.metadata);

			//Filter any links out of the nav
			if(self.config.filter !== '') {
				self.$nav = self.$nav.filter(self.config.filter);
			}

			//Handle clicks on the nav
			self.$nav.on('click.onePageNav', $.proxy(self.handleClick, self));

			//Get the section positions
			self.getPositions();

			//Handle scroll changes
			self.bindInterval();

			//Update the positions on resize too
			self.$win.on('resize.onePageNav', $.proxy(self.getPositions, self));

			return this;
		},

		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},

		bindInterval: function() {
			var self = this;
			var docHeight;

			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});

			self.t = setInterval(function() {
				docHeight = self.$doc.height();

				//If it was scrolled
				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}

				//If the document height changes
				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},

		getHash: function($link) {
			return $link.attr('href').split('#')[1];
		},

		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;

			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				topPos = $('#' + linkHref).offset().top;

				self.sections[linkHref] = Math.round(topPos) - self.config.scrollOffset;
			});
		},

		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}

			return returnValue;
		},

		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);

			if(!$parent.hasClass(self.config.currentClass)) {
				//Start callback
				if(self.config.begin) {
					self.config.begin();

				}

				//Change the highlighted nav item
				self.adjustNav(self, $parent);

				//Removing the auto-adjust on scroll
				self.unbindInterval();

				//Scroll to the correct position
				$.scrollTo(newLoc, self.config.scrollSpeed, {
					axis: 'y',
					easing: self.config.easing,
					offset: {
						top: -self.config.scrollOffset
					},
					onAfter: function() {
						//Do we need to change the hash?
						if(self.config.changeHash) {
							window.location.hash = newLoc;
						}

						//Add the auto-adjust on scroll back in
						self.bindInterval();

						//End callback
						if(self.config.end) {
							self.config.end();
						}
					}
				});
			}

			e.preventDefault();
		},

		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;

			//If the position is set
			if(position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();

				//If it's not already the current section
				if(!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);

					//If there is a scrollChange callback
					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}

			var layer1Height = $('.layer1').height() - 100;
			var layer2Height = $('.layer2').height();
			var totalHeight = layer1Height + layer2Height;
			if($(window).scrollTop() < totalHeight){
				$('.nav li').removeClass('current_page_item');
			}
		},

		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init();
		});
	};


})( jQuery, window , document );

$(window).load(function(){
	// Scroll layer
	setTimeout(function() {
		var hash_loc = window.location;
		var hash_str = hash_loc.toString();
		var hash_link = hash_str.split('?');

		if (hash_link[1] === 'audienceTargeting' || hash_link[1] === 'adFormats' || hash_link[1] === 'theyTrustUs' || hash_link[1] === 'p-rt-mb') {
			$('body, html').animate({scrollTop:$('#'+hash_link[1]).offset().top}, 1200);
		}

		if($(window).width() > 767){

			// Programmatic - ReTargeting - MyBrand
			if (hash_link[1] === 'programmatic' || hash_link[1] === 'retargeting' || hash_link[1] === 'myBrand'){
				$('.default').addClass('current');
				$('body, html').animate({scrollTop:$('#p-rt-mb').offset().top}, 1000).delay(1000).queue(function(){
					$('html').addClass('fancybox-lock');
					$('#'+hash_link[1]).addClass('animated lightSpeedIn').show();
					$('.media-popup').removeClass('lightSpeedOut');
				}).dequeue();
			}

			if (hash_link[1] === 'richMedia' || hash_link[1] === 'native' || hash_link[1] === 'display' || hash_link[1] === 'video'){
				$('.default').addClass('current');
				$('body, html').animate({scrollTop:$('#adFormats').offset().top}, 1000).delay(1000).queue(function(){
					$('html').addClass('fancybox-lock');
					$('#'+hash_link[1]).addClass('animated lightSpeedIn').show();
					$('.media-popup').removeClass('lightSpeedOut');
				}).dequeue();
			}

			// Rich Media
			if (hash_link[1] === 'miniGame' || hash_link[1] === 'form' || hash_link[1] === 'site' || hash_link[1] === 'mInt'){
				$('.tab-content,.media-t-nav a').removeClass('current');
				$('#'+hash_link[1]).addClass('current');
				$('.media-t-nav .'+hash_link[1]).addClass('current');

				$('body, html').animate({scrollTop:$('#adFormats').offset().top}, 1000).delay(1000).queue(function(){
					$('html').addClass('fancybox-lock');
					$('.mp-layer1').animate({'opacity':'1'}, 900);
					$('.media-rich-popup').addClass('animated lightSpeedIn').show().queue(function(){
						setTimeout(function(){
							$('.'+hash_link[1]).removeClass('lightSpeedIn').removeClass('lightSpeedOut').dequeue();
						},900);
					});
				}).dequeue();
			}

			//Native
			if (hash_link[1] === 'buddyPack' || hash_link[1] === 'sponsoredEvent'){
				$('.tab-content,.media-t-nav a').removeClass('current');
				$('#'+hash_link[1]).addClass('current');
				$('.media-t-nav .'+hash_link[1]).addClass('current');

				$('body, html').animate({scrollTop:$('#adFormats').offset().top}, 1000).delay(1000).queue(function(){
					$('html').addClass('fancybox-lock');
					$('.mp-layer1').animate({'opacity':'1'}, 900);
					$('.media-native-popup').addClass('animated lightSpeedIn').show().queue(function(){
						setTimeout(function(){
							$('.'+hash_link[1]).removeClass('lightSpeedIn').removeClass('lightSpeedOut').dequeue();
						},900);
					});
				}).dequeue();
			}

			// Display
			if (hash_link[1] === 'mediumRectangle' || hash_link[1] === 'interstitial' || hash_link[1] === 'banner'){
				$('.tab-content,.media-t-nav a').removeClass('current');
				$('#'+hash_link[1]).addClass('current');
				$('.media-t-nav .'+hash_link[1]).addClass('current');

				$('body, html').animate({scrollTop:$('#adFormats').offset().top}, 1000).delay(1000).queue(function(){
					$('html').addClass('fancybox-lock');
					$('.mp-layer1').animate({'opacity':'1'}, 900);
					$('.media-display-popup').addClass('animated lightSpeedIn').show().queue(function(){
						setTimeout(function(){
							$('.'+hash_link[1]).removeClass('lightSpeedIn').removeClass('lightSpeedOut').dequeue();
						},900);
					});
				}).dequeue();
			}

			// Video
			if (hash_link[1] === 'vBan' || hash_link[1] === 'vInterstitialPlus' || hash_link[1] === 'vInterstitial' || hash_link[1] === 'nativeVideo'){
				$('.tab-content,.media-t-nav a').removeClass('current');
				$('#'+hash_link[1]).addClass('current');
				$('.media-t-nav .'+hash_link[1]).addClass('current');

				$('body, html').animate({scrollTop:$('#adFormats').offset().top}, 1000).delay(1000).queue(function(){
					$('html').addClass('fancybox-lock');
					$('.mp-layer1').animate({'opacity':'1'}, 900);
					$('.media-video-popup').addClass('animated lightSpeedIn').show().queue(function(){
						setTimeout(function(){
							$('.'+hash_link[1]).removeClass('lightSpeedIn').removeClass('lightSpeedOut').dequeue();
						},900);
					});
				}).dequeue();
			}
		} else {

			// Programmatic - ReTargeting - MyBrand
			if (hash_link[1] === 'programmatic' || hash_link[1] === 'retargeting' || hash_link[1] === 'myBrand'){
				$('#'+hash_link[1]).stop().show();
				$('.default').addClass('current');
				$('.tab-content').slideUp();
				$('.tab-content.current').slideDown();
				$('body,html').animate({scrollTop:$('#'+hash_link[1]).offset().top - 42}, 900);
			}

			if (hash_link[1] === 'richMedia' || hash_link[1] === 'native' || hash_link[1] === 'display' || hash_link[1] === 'video'){
				$('#'+hash_link[1]).stop().show();
				$('.default').addClass('current');
				$('.tab-content').slideUp();
				$('.tab-content.current').slideDown();
				$('body,html').animate({scrollTop:$('#'+hash_link[1]).offset().top}, 900);
			}

			//Rich Media
			if (hash_link[1] === 'miniGame' || hash_link[1] === 'form' || hash_link[1] === 'site' || hash_link[1] === 'mInt'){
				$('.media-rich-popup').stop().show();
				$('.tab-content').slideUp();
				$('#'+hash_link[1]).addClass('current');
				$('#'+hash_link[1]).slideDown();
				$('body,html').animate({scrollTop:$('.media-rich-popup').offset().top}, 900);
			}

			//Native
			if (hash_link[1] === 'buddyPack' || hash_link[1] === 'sponsoredEvent'){
				$('.media-native-popup').stop().show();
				$('.tab-content').slideUp();
				$('.'+hash_link[1]).addClass('current');
				$('#'+hash_link[1]).slideDown();
				$('body,html').animate({scrollTop:$('.media-native-popup').offset().top}, 900);
			}

			//Display
			if (hash_link[1] === 'mediumRectangle' || hash_link[1] === 'interstitial' || hash_link[1] === 'banner'){
				$('.media-display-popup').stop().show();
				$('.tab-content').slideUp();
				$('.'+hash_link[1]).addClass('current');
				$('#'+hash_link[1]).slideDown();
				$('body,html').animate({scrollTop:$('.media-display-popup').offset().top}, 900);
			}

			//Video
			if (hash_link[1] === 'vBan' || hash_link[1] === 'vInterstitialPlus' || hash_link[1] === 'vInterstitial' || hash_link[1] === 'nativeVideo'){
				$('.media-video-popup').stop().show();
				$('.tab-content').slideUp();
				$('.'+hash_link[1]).addClass('current');
				$('#'+hash_link[1]).slideDown();
				$('body,html').animate({scrollTop:$('.media-video-popup').offset().top}, 900);
			}
		}

	}, 1000);
});
