(function($) {

	$(document).ready(function() {

		var $thrXray = $('.thr-xray'),
			$thrXrayItem = $('.thr-xray-item'),
			$thrPopupContent = $('.thr-popup-content'),
			$thrStats = $('.thr-stats'),
			$thrIcon = $('.thr-icon img'),
			inViewHeight,
			winHeight,
			statsNum = 0;

		// Set up a data index for each x-ray item

		$thrXrayItem.each(function(i){
			$(this).attr('data-index', i);
		});

		// Test for android native browser

		var isAndroid;

		function isAndroidBrowser() {
			var objAgent = navigator.userAgent;
			var objfullVersion  = ''+parseFloat(navigator.appVersion);

			if ((objOffsetVersion=objAgent.indexOf("Chrome")) != -1) {
				objfullVersion = objAgent.substring(objOffsetVersion+7, objOffsetVersion+9);
				if (objfullVersion < 19) {
				    isAndroid = true;
				}
			}

			isAndroid = false;
		}

		isAndroidBrowser();

		// Scroll position non-mobile

		function scrollPosition(){
			$thrXrayItem.each(function(){
				winHeight = $(window).height();
				if($(window).scrollTop() >= $(this).offset().top + ($(this).height() / $(this).data('view-interval')) - winHeight){

					$(this).addClass('is-in-view');
					
					if($(this).data('index') == 2 && $(this).hasClass('is-in-view')){
						setTimeout(function(){ statsCounter(); }, 400);
					}
				}
			});
		}

		var prevInView = 0,
			currentInView = 0,
			nextInView = 0;

		function mobileScrollPosition(){
			$thrXrayItem.each(function(i){
				if($(window).scrollTop() >= $(this).offset().top + ($(this).height() / 2)  - $(window).height()){
					// console.log(i);
					
					currentInView = $thrXrayItem.eq(i).data('index');
					$thrXrayItem.eq(currentInView).addClass('is-in-view popup-is-in-view');

					if($thrXrayItem.eq(i).data('index') >= 1){
						$thrXrayItem.eq(currentInView - 1).removeClass('popup-is-in-view');
					}

					if($thrXrayItem.eq(i).data('index') <= $thrXrayItem.length){
						$thrXrayItem.eq(currentInView + 1).removeClass('popup-is-in-view');
					}

					if($(this).data('index') == 2 && $(this).hasClass('is-in-view')){
						setTimeout(function(){ statsCounter(); }, 400);
					}

				}
			});

			if($(window).scrollTop() <= $thrXray.offset().top - $(window).height() || $(window).scrollTop() >= ($thrXray.offset().top + $thrXray.height())) {
    			$thrXrayItem.removeClass('popup-is-in-view');
			}
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

		if(!Modernizr.svg || isAndroid){
			$thrIcon.each(function(){
				if($(this).attr('src').match(/.*\.svg$/)){
					$(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
				}
			});
		}

		$(window).scroll(function(){
			if($(window).width() > 767){
				scrollPosition();
			}
			else{
				mobileScrollPosition();
			}
		});

	});
})(jQuery);