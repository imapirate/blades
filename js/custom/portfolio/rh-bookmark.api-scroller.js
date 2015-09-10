;(function($) {

  function pathPrepare ($el) {
    var lineLength;
    $el.each(function(){
      lineLength = this.getTotalLength()
      $(this).css("stroke-dasharray", lineLength);
      $(this).css("stroke-dashoffset", lineLength);
    })
  }

  var $knot = $(".knot-line");
  var $page = $(".page-line");
  var $book = $(".book-line");
  var $down = $(".downward-line");
  // prepare SVG
  pathPrepare($knot);
  pathPrepare($page);
  pathPrepare($book);  
  pathPrepare($down);


  var $knotOffset = $('#api-p-intro').offset().top;
  
  $(document).scroll(function() {
  
    var $scrollHeight = $(window).scrollTop();

    if ($scrollHeight >= $knotOffset) {
      $knot.css({
        'stroke-dashoffset': 0
      })
    };
  

  });



  // init controller
  var controller = new ScrollMagic.Controller();

  // build tween

  // var tween0 = new TimelineMax()
  //   .add(TweenMax.to($knot, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
    
  // // build scene
  // var scene = new ScrollMagic.Scene({triggerElement: "#knot", duration: 400, tweenChanges: true})
  //         .setTween(tween0)
  //         .addIndicators() // add indicators (requires plugin)
  //         .addTo(controller);

  var tween1 = new TimelineMax()
    .add(TweenMax.to($page, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
    
  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: "#page-lines", duration: 400, tweenChanges: true})
          .setTween(tween1)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(controller);

  var tween2 = new TimelineMax()
    .add(TweenMax.to($book, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
    
  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: "#api-p-one", duration: 400, tweenChanges: true})
          .setTween(tween2)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(controller);

  var tween3 = new TimelineMax()
    .add(TweenMax.to($down, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
    
  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: "#downward-lines", duration: 400, tweenChanges: true})
          .setTween(tween3)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(controller);

})(jQuery);