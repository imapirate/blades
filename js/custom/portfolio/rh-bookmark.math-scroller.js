;(function($) {

  var $rhScrollItems = $('.rh__js--scroll-item'),
      $rhTotalPermutations = $('#rh-perm-num tspan'),
      $numberContainer = $('.number-total-wrapper'),
      controller = new ScrollMagic.Controller(),
      number = "27,371,520",
      charset = "0123456789",
      shuffled = [],
      rhInView;
 
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
        if ( $this[0] === $numberContainer[0] ) {
          shuffle();
          setInterval(unshuffle, 100);
        }
      })    
      .addTo(controller);
  });

  var shuffle = function () {
    var str = '';
    for (var i = 0; i < number.length; i++) {
      if (number[i] === ',') {
        str += ',';
      } else {
        str += charset.charAt(Math.floor(Math.random() * charset.length));
      }  
    }
    shuffled.push(str.split(''));
  }

  var unshuffle = function () {
    for(var i = 0; i < number.length; i++) {
      if(shuffled[0][i] !== number[i]) {
        shuffled[0][i] = charset[(charset.indexOf(shuffled[0][i]) + 1)%charset.length];
      }
    display();
    }
  }

  function display() {
    $rhTotalPermutations.text(shuffled[0].join(''));
  }
    
})(jQuery);