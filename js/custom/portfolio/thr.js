;(function($) {

		var $thrXray = $('.thr-xray'),
			$thrXrayItem = $('.thr-xray-item'),
			$thrPopupContent = $('.thr-popup-content'),
			$thrStats = $('.thr-stats'),
			$thrIcon = $('.thr-icon img'),
			$thrNavLink = $('.thr__nav-link'),
			$thrScrollItem = $('.thr__js--scroll-item'),
			$thrToggleScroll = $('.thr__js--toggle-scroll'),
			$thrVideoOverview = $('.thr__video-overview'),
			$thrVideo,
			$thrVideoTemplate,
		
			controller = new ScrollMagic.Controller(),
			statsInView = false,
			thrInView,
			thrToggle,
			thrSwiper,
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

		function statsCounter() {
			$thrStats.text(statsNum);
			timeout = setTimeout(function() { 
				if(statsInView){
					if(statsNum < 471) {
						statsNum++;
						statsCounter();
					}
					else {
						clearTimeout(timeout);
					} 
				}
				else {
					if(statsNum <= 471 && statsNum >= 101){
						statsNum--;
						statsCounter();
					}
					else {
						clearTimeout(timeout);
					} 
				}
			}, 1);
		}

		// Test for svg support

		if(!Modernizr.svg || isAndroid) {
			$thrIcon.each(function(){
				if($(this).attr('src').match(/.*\.svg$/)){
					$(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
				}
			});
		}

		function injectVideo() {
			$thrVideoTemplate = $('<video/>', {
					'id': 'thr__video',
					'preload': 'auto',
					'poster': '/wp-content/themes/blades/images/portfolio/hechinger/hechinger-video-overview-cover.jpg'
				}).append(
					$('<source/>', {
					'source': 'video-mp4',
					'type': 'video/mp4; codecs=avc1.42E01E,mp4a.40.2',
					'src': '/wp-content/themes/blades/images/portfolio/hechinger/video/hechinger-overview.mp4'
				})
				).append(
					$('<source/>', {
					'class': 'video-ogg',
					'type': 'video/ogg; codecs=theora,vorbis',
					'src': '/wp-content/themes/blades/images/portfolio/hechinger/video/hechinger-overview.ogv'
				})
				).append(
					$('<source/>', {
					'class': 'video-webm',
					'type': 'video/webm; codecs=vp8,vorbis',
					'src': '/wp-content/themes/blades/images/portfolio/hechinger/video/hechinger-overview.mp4'
				})
			);

			if(!Modernizr.touch) {
				$thrVideoTemplate.attr('loop', 'true');
			}
		}

		function bindVideoScroll() {
			$thrVideo = $('#thr__video').get(0);

			$thrToggleScroll.each(function(i) {
				thrToggle = new ScrollMagic.Scene({
					triggerElement: $thrToggleScroll[i],
					triggerHook: 'onCenter'
				})
				.on('enter', function() {
					$thrVideo.play();
				})
				.on('leave', function() {
					$thrVideo.pause();
				})
				.duration(600)
				.addTo(controller);	
			});
		}

		function scrollHandler() {

			$thrXrayItem.each(function(i) {

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

			$thrScrollItem.each(function(i){

				thrInView = new ScrollMagic.Scene({
					triggerElement: $thrScrollItem[i], 
					triggerHook: 'onCenter'
				})
				.on('enter', function() {
					var _$this = $(this.triggerElement());

					_$this.addClass('thr__js--is-in-view');
				})
				.addTo(controller);
				
			});

		}

		// $thrVideo.addEventListener('playing', vidHandler, false);
		// $thrVideo.addEventListener('ended', vidHandler, false);

		// function vidHandler(event) {
		// 	switch(event.type){
		// 		case 'playing':
		// 			// console.log('video is playing');
		// 		break;
		// 		case 'ended':
		// 			// console.log('video has ended');
		// 		break;
		// 	}
		// }
		
		// Navigation Smooth Scroll

		$('.thr__nav-link').click(function(e) {
			e.preventDefault();
			var scrollLink = $(this).attr('href');

			$('body, html').animate({
				scrollTop: $(scrollLink).offset().top,
				easing: 'easeInOutExpo'
			}, 600);
		});

		// Swiper
		
		function thrSwiperInit() {
			thrSwiper = new Swiper('.thr__swiper', {
				resizeReInit: true,
				loop: true,
				calculateHeight: true,
			    mode: 'horizontal',
			    roundLengths: true,
			    resistance: '100%',
			    grabCursor: true,
			    autoplay: 4000,
			    speed: 500
			}); 
		}

		window.addEventListener('orientationchange', function() {
			thrSwiper.destroy();
			thrSwiperInit();
		}, false);

	$(document).ready(function() {
		scrollHandler();
		thrSwiperInit();
		if($(window).width() > 499) {
			injectVideo();
			$thrVideoOverview.html($thrVideoTemplate);
			bindVideoScroll();
		}
	});

})(jQuery);