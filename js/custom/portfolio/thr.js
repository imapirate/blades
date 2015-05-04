(function($) {
	$(document).ready(function() {
		var $thrXrayItem = $('.thr-xray-item'),
			inViewHeight;

		var scrollPosition = function(){
			$thrXrayItem.each(function(){
				inViewHeight = $(this).height() / 2;
				if(($(this).offset().top - $(window).height()) + inViewHeight < $(window).scrollTop()){
					$(this).addClass('is-in-view');
				}
				else{
					$(this).removeClass('is-in-view');
				}	
			});
		}

		$(window).scroll(function(){
			scrollPosition();
		});

	});
})(jQuery);

