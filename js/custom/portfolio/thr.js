(function($) {

	$(document).ready(function() {

		var $thrXray = $('.thr-xray'),
			$thrXrayItem = $('.thr-xray-item'),
			$thrPopupContent = $('.thr-popup-content'),
			$thrStats = $('.thr-stats'),
			$thrIcon = $('.thr-icon img'),
			inViewHeight,
			winHeight,
			statsNum = 0,
			currentInView;

		// set up a data index for each x-ray item
		$thrXrayItem.each(function(i){
			$(this).attr('data-index', i);
		});

		// Scroll position non-mobile

		function scrollPosition(){
			$thrXrayItem.each(function(){
				winHeight = $(window).height();
				// the rate items come into view is calculated within the data tag
				if($(window).scrollTop() >= $(this).offset().top + ($(this).height() / $(this).data('view-interval')) - winHeight){
					$(this).addClass('is-in-view');
					if($(this).data('index') == 2 && $(this).hasClass('is-in-view')){
						setTimeout(function(){ statsCounter(); }, 400);
					}
				}
			});
		}

		// Scroll position as mobile

		function mobileScrollPosition(){
			$thrXrayItem.each(function(){
				// the rate items come into view is calculated within the data tag
				if($(window).scrollTop() >= $(this).offset().top + ($(this).height()) - $(window).height() && $(window).scrollTop() <= $(this).offset().top + $(this).height()){

					currentInView = $(this).data('index');
					$(this).addClass('is-in-view popup-is-in-view');

					if($(this).data('index') == 2 && $(this).hasClass('is-in-view')){
						setTimeout(function(){ statsCounter(); }, 400);
					}
				}
				else{
					if($(this).data('index') !== currentInView){
						$(this).removeClass('popup-is-in-view');
					}
					currentInView = null;
				}
			});
		}

		// Stats counter

		function statsCounter(){
			$thrStats.text(statsNum);
			timeout = setTimeout(function(){ 
				if(statsNum < 471){
					statsNum++;
					statsCounter();
				}
				else{
					clearTimeout(timeout);
				} 
			}, 10);
		}

		// Test for svg support

		if(!Modernizr.svg){
			$thrIcon.each(function(){
				if($(this).attr('src').match(/.*\.svg$/)){
					console.log('test');
					$(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
				}
			});
		}

		$(window).scroll(function(){
			if($(window).width() > 768){
				scrollPosition();
			}
			else{
				mobileScrollPosition();
			}
		});

	});
})(jQuery);

