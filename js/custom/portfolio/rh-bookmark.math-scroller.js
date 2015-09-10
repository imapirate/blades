;(function($) {

  var $rhScrollItems = $('.rh__js--scroll-item'),

  controller = new ScrollMagic.Controller(),
  rhInView;

  $(document).ready(function(){
        // Add class when item is in view
    $rhScrollItems.each(function(i){
      rhInView = new ScrollMagic.Scene({
        triggerElement: $rhScrollItems[i],
        triggerHook: 0.66
      })
      .on('enter', function() {
        var $this = $(this.triggerElement());
        var element = $this.prop('nodeName');
        if ( element == 'g' || element == 'path' ) {
          $this.attr('class', 'rh__js--scroll-item rh__js--is-in-view');
        } else {
          $this.addClass('rh__js--is-in-view');
        }
      })    
      .addTo(controller);
    });
    

  });

})(jQuery);