;(function($) {
	$( document ).ready(function() {
		var mySwiper = new Swiper('.swiper-container',{
		    //Your options here:
		    mode:'horizontal',
		    calculateHeight: true,
		    loop: true
		    //etc..
		  });

		$('#gallery_control').on('click', function(e){
			mySwiper.swipeNext();
			console.log('i was click');
		});

	}); // end ready
})(jQuery);


// <script>
// 		window.onload = function() {
// 		  var mySwiper = new Swiper('.swiper-container',{
// 		    //Your options here:
// 		    mode:'horizontal',
// 		    calculateHeight: true,
// 		    loop: true
// 		    //etc..
// 		  });
// 		  console.log('llllll');
// 		}

// 		var galleryNext = document.getElementById('gallery_control');
// 		galleryNext.onClick
// 		p.onclick = function() { alert("moot!"); };
// 		  //  galleryNext.on('click', function(e) {
// 	   //          Swiper.swipeNext();
// 	   //      });



// 		// $( document ).ready(function() {
// 		//     console.log( "i'm here" );
// 		// });

// 	</script>
