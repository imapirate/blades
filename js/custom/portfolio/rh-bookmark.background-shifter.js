var backgroundTextureShifter;

 ;(function($) {
  // $(document).ready(function() {
  //   setInterval(changeBackground, 3000);
  // });

  function BackgroundShifter( jQueryObject ) {
    this.imageArray = new Array();
    this.$ = $(jQueryObject);
    this.currentIndex = 0;
  }

  BackgroundShifter.prototype.addImage = function( path ) {
    this.imageArray.push( path );
  };

  BackgroundShifter.prototype.cycleImages = function( time ) {
    var THIS = this;
    setInterval(function(){
      THIS.nextImage();}
    , time);
  };

  BackgroundShifter.prototype.nextImage = function() {
    var nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.imageArray.length) {
      nextIndex = 0;
    }
    this.goTo(nextIndex);
  };

  BackgroundShifter.prototype.goTo = function( i ) {
    this.$.css("background-image","url('"+ this.imageArray[i] +"')");
    this.currentIndex = i;
  }

  backgroundTextureShifter = new BackgroundShifter('.bg-img-wide');
  backgroundTextureShifter.addImage("/wp-content/themes/blades/images/portfolio/rh-bookmark/bg-img-texture-1.png")
  backgroundTextureShifter.addImage("/wp-content/themes/blades/images/portfolio/rh-bookmark/bg-img-texture-3.png")
  backgroundTextureShifter.addImage("/wp-content/themes/blades/images/portfolio/rh-bookmark/bg-img-texture-4.png")

  backgroundTextureShifter.cycleImages(3000);
  
})(jQuery);