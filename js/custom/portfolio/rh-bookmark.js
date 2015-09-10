//  ;(function($) {


// 		var $rhScrollItem = $('.rh__js--scroll-item'),

// 			controller = new ScrollMagic.Controller(),
// 			rhInView;

// $(document).ready(function(){
//     console.log('test');

// 		function scrollHandler() {

// 			// Add class when item is in view
// 			$rhScrollItem.each(function(i){

// 				rhInView = new ScrollMagic.Scene({
// 					triggerElement: $rhScrollItem[i],
// 					triggerHook: 'onCenter'
// 				})
// 				.on('enter', function() {
// 					var _$this = $(this.triggerElement());

// 					_$this.toggleClass('rh__js--is-in-view');
// 				})
// 				.addTo(controller);
// 			});

// 		}

// 		scrollHandler();

// });
// })(jQuery);