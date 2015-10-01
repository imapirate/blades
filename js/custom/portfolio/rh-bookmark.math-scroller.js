;(function($) {

  /*
  * Easing functions
  */
  jQuery.extend( jQuery.easing,
    {
      def: 'swing',
      swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
      },
      easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
      }
    });
  
  var $rhScrollItems = $('.rh__js--scroll-item'),
      $numberContainer = $('.number-total-wrapper'),
      $permutationElementSVG = $('#number-total tspan'),
      controller = new ScrollMagic.Controller(),
      numberInt = 20000000,
      rhInView;

  /*
  * Number Counter constructor
  */    

  function NumberCounter($element, $containerElement) {
    this.jQueryObject = $element;
    this.finalValue = _toNumber($element.text());
    this.startValue = $containerElement.data("start-value") || 20000000;
    this.duration = $containerElement.data("duration") || 1000;
    this.easing = $containerElement.data("easing") || "swing";
    this.delay = $containerElement.data("delay") || 0;
  }

  NumberCounter.prototype.start = function() {
    var THIS = this;

    $({countNum: this.startValue}).animate({countNum: this.finalValue}, {
      duration: THIS.duration,
      easing: THIS.easing, 
      step: function(){

        THIS.jQueryObject.text(_commaSeparateNumber(Math.floor(this.countNum)));
      }, 
      complete: function() {
        THIS.jQueryObject.text(_commaSeparateNumber(this.countNum));
      },
    });
  };

  NumberCounter.prototype.delayStart = function() {
    var THIS = this;
    setTimeout(function() { THIS.start() }, THIS.delay);
  }

  // NumberCounter.prototype.startOption2 = function() {
  //   var THIS = this;

  //   THIS.jQueryObject.text(_commaSeparateNumber(Math.floor(numberInt)));
  //   var timeout = setTimeout(function() {
  //     if(numberInt < 27371520) {
  //       numberInt+=122858.667;
  //       THIS.startOption2();
  //     } else if (numberInt <= 27371520 && numberInt >= 20000001) {
  //       numberInt-=122858.667;
  //       THIS.startOption2();
  //     } else {
  //       clearTimeout(timeout);
  //     }
  //   }, 40);
  // }

  function _toNumber(str) {
    str = str.replace(/,/g, "");
    numberStr = parseInt(str, 10);
    return numberStr;
  }

  function _commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
  }

  // Create number counter object
  var numberCounter = new NumberCounter($permutationElementSVG, $numberContainer);

  // Add class when item is in view
  $rhScrollItems.each(function(i) { 
    rhInView = new ScrollMagic.Scene({ triggerElement: $rhScrollItems[i], triggerHook: 0.66 })
      .on('enter', function() {
        var $this = $(this.triggerElement());
        var element = $this.prop('nodeName');

        if ( element == 'g' || element == 'path' ) {
          $this.attr('class', 'rh__js--scroll-item rh__js--is-in-view');
        } else {
          $this.addClass('rh__js--is-in-view');
        }

        // when you get to the permutations mod do the function
        if ( $this[0] === $numberContainer[0] ) {
          // animate the number counter
          numberCounter.delayStart();
        }
      })    
      .addTo(controller);
  });
    
})(jQuery);