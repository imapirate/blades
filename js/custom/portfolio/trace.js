;(function($) {

		var $thrXray = $('.trace-design-list'),
			$thrXrayItem = $('.trace-design-item'),
			$thrPopupContent = $('.thr-popup-content'),
			$thrStats = $('.thr-stats'),
			$thrIcon = $('.thr-icon img'),
			$thrNavLink = $('.portfolio__nav-link'),
			$thrScrollItem = $('.portfolio__js--scroll-item'),
			$thrVideoToggle = $('.thr__js--video-toggle'),
			$thrVideoOverview = $('.thr__video-overview'),
			$thrVideoProgressBar = $('.thr__video-progress-bar'),
			$thrVideo,
			$thrVideoTemplate,
		
			controller = new ScrollMagic.Controller(),
			statsInView = false,
			thrInView,
			thrVidToggle,
			thrSwiper,
			isAndroid,
			statsNum = 100;

		// Test for android native browser

		function isAndroidBrowser() {
			var objAgent = navigator.userAgent;
			var objfullVersion = ''+parseFloat(navigator.appVersion);

			if ((objOffsetVersion=objAgent.indexOf('Chrome')) != -1) {
				objfullVersion = objAgent.substring(objOffsetVersion + 7, objOffsetVersion + 9);
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
					} else {
						clearTimeout(timeout);
					} 
				}
				else {
					if(statsNum <= 471 && statsNum >= 101){
						statsNum--;
						statsCounter();
					} else {
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
					'preload': 'auto'
				}).append(
					$('<source/>', {
					'class': 'video-mp4',
					'type': 'video/mp4; codecs=avc1.42E01E,mp4a.40.2'
				})
				).append(
					$('<source/>', {
					'class': 'video-ogg',
					'type': 'video/ogg; codecs=theora,vorbis'
				})
				).append(
					$('<source/>', {
					'class': 'video-webm',
					'type': 'video/webm; codecs=vp8,vorbis'
				})
			);

			if(!Modernizr.touch) {
				$thrVideoTemplate.attr('loop', 'true');
			}
			
			// Swaps video out
			var video_elements = {
				video_overview: $thrVideoTemplate.clone()
					.attr('poster', '/wp-content/themes/blades/images/portfolio/hechinger/hechinger-video-overview-cover.jpg')
					.attr('class', 'thr__video')
					.attr('id', 'thr__video--overview')
					.find('.video-mp4')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hechinger-overview.mp4')
						.end()
					.find('.video-ogg')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hechinger-overview.ogv')
						.end()
					.find('.video-webm')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hechinger-overview.webm')
						.end(),
				video_stream_click_drag: $thrVideoTemplate.clone()
					.attr('poster', '/wp-content/themes/blades/images/portfolio/hechinger/hechinger-stream-cover--click-drag.jpg')
					.attr('class', 'thr__video thr__video--stream thr__video--progress')
					.find('.video-mp4')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--click-drag.mp4')
						.end()
					.find('.video-ogg')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--click-drag.ogv')
						.end()
					.find('.video-webm')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--click-drag.webm')
						.end(),
				video_stream_pin: $thrVideoTemplate.clone()
					.attr('poster', '/wp-content/themes/blades/images/portfolio/hechinger/hechinger-stream-cover--pin.jpg')
					.attr('class', 'thr__video thr__video--stream thr__video--progress')
					.find('.video-mp4')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--pin.mp4')
						.end()
					.find('.video-ogg')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--pin.ogv')
						.end()
					.find('.video-webm')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--pin.webm')
						.end(),
				video_stream_search: $thrVideoTemplate.clone()
					.attr('poster', '/wp-content/themes/blades/images/portfolio/hechinger/hechinger-stream-cover--search.jpg')
					.attr('class', 'thr__video thr__video--stream thr__video--progress')
					.find('.video-mp4')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--search.mp4')
						.end()
					.find('.video-ogg')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--search.ogv')
						.end()
					.find('.video-webm')
						.attr('src', '/wp-content/themes/blades/images/portfolio/hechinger/video/hech-stream--search.webm')
						.end(),
				};

			$.each(video_elements, function(el_class, video_html) {
				$('.thr__' + el_class).replaceWith(video_html);
			});
		}

		function bindVideos() {
			$('.thr__video').each(function(i) {
				// Fixes a repaint issue in iOS
				this.load();
			});

			// videoProgressBar();
			// videoControls();
		}

		// function videoControls() {
		// 	$('.thr__video-controls').each(function(i) {
				
		// 		$(this).on('click', function() {

		// 			if($(this).hasClass('is-playing')){
		// 				$('.thr__video--stream')[i].pause();
		// 				$(this).removeClass('is-playing');
		// 			} else {
		// 				$('.thr__video')[i].play();
		// 				$(this).addClass('is-playing');
		// 			}
		// 		});
		// 	});
		// }

		// function videoProgressBar() {
		// 	$('.thr__video--progress').each(function(i) {

		// 		this.addEventListener('loadeddata', function() {
  //  					var barWidth = 0;

		// 			this.addEventListener('timeupdate', function() {
		// 				barWidth = this.currentTime / this.duration * 100;
		// 				$thrVideoProgressBar.eq(i).css('width', barWidth.toFixed(2) + '%');
		// 	     	}, false);
		// 		}, false);
		// 	});
		// }

		function bindVideoScroll() {

			$thrVideoToggle.each(function(i) {

				thrVidToggle = new ScrollMagic.Scene({
					triggerElement: $thrVideoToggle[i],
					triggerHook: 'onCenter'
				})
				.on('enter', function() {
					$('.thr__video')[i].play();
					// $('.thr__video-controls').eq(i).addClass('is-playing');
				})
				.on('leave', function() {
					$('.thr__video')[i].pause();
					// $('.thr__video-controls').eq().removeClass('is-playing');
				})
				.duration(600)
				.addTo(controller);	
			});
		}

		function scrollHandler() {

			// Xray Items
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

			// Add class when item is in view
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
		
		// Navigation Smooth Scroll

		$('.portfolio__nav-link').click(function(e) {
			e.preventDefault();
			var scrollLink = $(this).attr('href');

			$('body, html').animate({
				scrollTop: $(scrollLink).offset().top,
				easing: 'easeInOutExpo'
			}, 600);
		});

		// Swiper
		
		function thrSwiperInit() {
			thrSwiper = new Swiper('.trace__swiper', {
				resizeReInit: true,
				loop: true,
				calculateHeight: true,
			    mode: 'horizontal',
			    roundLengths: true,
			    resistance: '100%',
			    grabCursor: true,
			    autoplay: 4000,
			    speed: 500,
			    spaceBetween: 30,
			}); 
		}

		window.addEventListener('orientationchange', function() {
			thrSwiper.destroy();
			thrSwiperInit();
		}, false);
	
	$(document).ready(function() {
		scrollHandler();
		thrSwiperInit();
		injectVideo();
		bindVideos();
		bindVideoScroll();
	});

})(jQuery);