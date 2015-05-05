(function($) {

	$(document).ready(function() {

		var $thrXray = $('.thr-xray'),
			$thrXrayItem = $('.thr-xray-item'),
			$thrPopupContent = $('.thr-popup-content'),
			$thrStats = $('.thr-stats'),
			inViewHeight,
			winHeight,
			statsNum = 0,
			currentInView;

		$thrXrayItem.each(function(i){
			$(this).attr('data-index', i);
		});

		function scrollPosition(i){
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

		function mobileScrollPosition(){
			$thrXrayItem.each(function(){
				if($(window).scrollTop() >= $(this).offset().top + $(this).height() - $(window).height() && $(window).scrollTop() <= $(this).offset().top + $(this).height()){
					$(this).addClass('is-in-view');
					currentInView = $(this).data('index');
					if($(this).data('index') == 2 && $(this).hasClass('is-in-view')){
						setTimeout(function(){ statsCounter(); }, 400);
					}
				}
				else{
					if($(this).data('index') !== currentInView){
						$(this).removeClass('is-in-view');
					}
					currentInView = null;
				}
			});
		}

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

