(function($) {

	$(document).ready(function() {

		var $thrXray = $('.thr-xray'),
			$thrXrayItem = $('.thr-xray-item'),
			$thrPopupContent = $('.thr-popup-content'),
			$thrStats = $('.thr-stats'),
			$thrIcon = $('.thr-icon img'),
			statsNum = 0;

		// Test for android native browser

		function isAndroidBrowser() {
			var objAgent = navigator.userAgent;
			var objfullVersion  = ''+parseFloat(navigator.appVersion);

			if ((objOffsetVersion=objAgent.indexOf("Chrome")) != -1) {
				objfullVersion = objAgent.substring(objOffsetVersion+7, objOffsetVersion+9);
				if (objfullVersion < 19) {
				    return true;
				}
			}

			return false;
		}

		var isAndroid = isAndroidBrowser();

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

		// Init controller
		var controller = new ScrollMagic.Controller();

		var scrollHandler = function(){

			$thrXrayItem.each(function(i){

				new ScrollMagic.Scene({
					triggerElement: $thrXrayItem[i], 
					triggerHook: 'onCenter'
				})
					.on('enter', function(e) {
						
						var _$this = $(this.triggerElement());

						if(!_$this.hasClass('is-in-view')){
							_$this.addClass('is-in-view');
							if(_$this.index() == 2){
								statsCounter();
							}
						}
					})
					.setClassToggle($thrXrayItem[i], 'is-in-view--toggle')
					.duration($($thrXrayItem[i]).height())
					.addTo(controller);		
			});

		};

		scrollHandler();

		$(window).resize(function() {
    		scrollHandler();
		});

	});
})(jQuery);