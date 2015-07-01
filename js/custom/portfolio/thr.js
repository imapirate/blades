;(function($) {

	$(document).ready(function() {

		var $thrXray = $('.thr-xray'),
			$thrXrayItem = $('.thr-xray-item'),
			$thrPopupContent = $('.thr-popup-content'),
			$thrStats = $('.thr-stats'),
			$thrIcon = $('.thr-icon img'),
		
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

		// Collage

		var collageScroll;

		var yellowStroke = Snap('#h-yellow-stroke__svg'),
        strokeEl = yellowStroke.select('#SVGID_1_'),

        hDash = Snap('#h-dash__stroke'),
        allStrokes = Snap.selectAll('#stroke--one, #stroke--two, #stroke--three, #stroke--four'),
        speedArray = [],

        hBooks = Snap('#h-books'),
        allBooks = Snap.selectAll('#book--one, #book--two, #book--three, #book--four, #book--five, #book--six'),
        maxDuration = 12000,

        paths = $('.h-signature path'),
        speed,
        delay = 0,
        length;

	    function animateStrokes(index, speed, delay, callback){
	        setTimeout(function(){
	            allStrokes[index].animate({
	                "stroke-dashoffset": 0
	            }, speed, mina.easeinout, function(){
	                if(callback === true){
	                    allStrokes[allStrokes.length - 1].animate({
	                        "stroke-dashoffset": 0
	                    }, speedArray[speedArray.length - 1], mina.easeinout);
	                }
	            });
	        }, delay);
	    }

	    for(i = 0; i < allStrokes.length; i++){
	        length = allStrokes[i].getTotalLength();
	        speed = length < 100 ? 500 : Math.floor(length * 4);
	        speedArray.push(speed);
	        $(paths[i]).attr('stroke-dasharray', length + ',' + length).attr('stroke-dashoffset', length);
	    }

	    function runAnimateStrokes(){
		    animateStrokes(0, speedArray[0], 0, false);
		    animateStrokes(1, speedArray[1], 100, false);
		    animateStrokes(2, speedArray[2], 500, true);
	    }

	    // allBooks[0].animate({"transform": "scale(0.98, 0.98, 0.98)", "opacity": 0.5 }, 5000, mina.elastic, function(){
	    // 		allBooks[0].animate({"transform": "scale(1, 1, 1)", "opacity": 1}, 5000, mina.elastic);
	    // });

	    function animateBooks(element, index, duration, delay){
	       	setTimeout(function(){
	            element[index].animate({
	                "transform": "scale(0.98, 0.98, 0.98)", 
	                "opacity": 0.5 
	            }, duration, mina.elastic, function(){
	                element[index].animate({"transform": "scale(1, 1, 1)", "opacity": 1}, duration, mina.elastic);
	            });
	        }, delay);
	    }

	    function runAnimation(){
	        animateBooks(allBooks, 0, 3000, 1000);
	        animateBooks(allBooks, 1, 3000, 1000);
	        animateBooks(allBooks, 2, 3000, 2000);
	        animateBooks(allBooks, 3, 3000, 4000);
	        animateBooks(allBooks, 4, 3000, 2000);
	        animateBooks(allBooks, 5, 3000, 0);
	        animateBooks(allBooks, 6, 3000, 6000);
	    }

	    runAnimation();

	    setInterval(function() {
	        runAnimation();
	    }, maxDuration);

	    collageScroll = new ScrollMagic.Scene({
			triggerElement: '.h-collage', 
			triggerHook: 'onEnter',
			duration: 500,
    		offset: 200
		})
		.on('enter', function() {
			runAnimateStrokes();
			setTimeout(function(){
	        	strokeEl.animate({width:500}, 1500, mina.easeinout);
	    	}, 2000);
		})
		.addTo(controller);

	});
})(jQuery);