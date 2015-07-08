;(function($) {

	$(document).ready(function() {

		var $thrXray = $('.thr-xray'),
			$thrXrayItem = $('.thr-xray-item'),
			$thrPopupContent = $('.thr-popup-content'),
			$thrStats = $('.thr-stats'),
			$thrIcon = $('.thr-icon img'),
			$thrNavLink = $('.thr__nav-link'),
		
			controller = new ScrollMagic.Controller(),
			statsInView = false,
			isAndroid,
			statsNum = 100;

		// Test for android native browser

		function isAndroidBrowser() {
			var objAgent = navigator.userAgent;
			var objfullVersion  = ''+parseFloat(navigator.appVersion);

			if ((objOffsetVersion=objAgent.indexOf('Chrome')) != -1) {
				objfullVersion = objAgent.substring(objOffsetVersion+7, objOffsetVersion+9);
				if (objfullVersion < 19) {
				    return true;
				}
			}

			return false;
		}

		isAndroid = isAndroidBrowser();

		// Stats counter

		function statsCounter(){
			$thrStats.text(statsNum);
			timeout = setTimeout(function(){ 
				if(statsInView){
					if(statsNum < 471){
						statsNum++;
						statsCounter();
					}
					else{
						clearTimeout(timeout);
					} 
				}
				else{
					if(statsNum <= 471 && statsNum >= 101){
						statsNum--;
						statsCounter();
					}
					else{
						clearTimeout(timeout);
					} 
				}
			}, 1);
		}

		// Test for svg support

		if(!Modernizr.svg || isAndroid){
			$thrIcon.each(function(){
				if($(this).attr('src').match(/.*\.svg$/)){
					$(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
				}
			});
		}

		var scrollHandler = function(){

			$thrXrayItem.each(function(i){

				new ScrollMagic.Scene({
					triggerElement: $thrXrayItem[i], 
					triggerHook: 'onCenter'
				})
				.on('leave', function(e) {
					var _$this = $(this.triggerElement());

					if(e.scrollDirection == 'REVERSE' && _$this.index() == 2){
						statsInView = false;
						statsCounter();
					}
				})
				.on('enter', function(e) {
					var _$this = $(this.triggerElement());

					if(_$this.index() == 2){
						statsInView = true;
						statsCounter();
					}
				})
				.setClassToggle($thrXrayItem[i], 'is-in-view')
				.duration($thrXrayItem[i].height)
				.addTo(controller);		
			});

		};

		scrollHandler();
		
		// Navigation Smooth Scroll

		$('.thr__nav-link').click(function(e) {
			e.preventDefault();
			var scrollLink = $(this).attr('href');

			$('body, html').animate({
				scrollTop: $(scrollLink).offset().top,
				easing: 'easeInOutExpo'
			}, 600);
		});

	});
})(jQuery);