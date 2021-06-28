$(document).ready(function(){
  var $scroller = $('html,body'),
      // cache slides and their offset.top's
      $slides = $('.parallax-group').each(function(idx){
        var target = $(this);
        target.data('y', target.offset().top);
        console.log(target.data('y'));
      }),
      $scrollPrev = $('.scroll-prev'),
      $scrollNext = $('.scroll-next'),
      slideName = '#group';

  $scrollPrev.click(function(e){
    e.preventDefault();
    scrollIt(-1);
  });
  $scrollNext.click(function(e){
    e.preventDefault();
    if (!$scrollNext.data('disabled'))
      scrollIt(1);
  });
  $('a[href^="#"]').on('click', function(event) {
    if (this.hash.replace(/\d+$/, '') === slideName) {
        var target = $(this.hash);
        if( target.length > 0 ) {
          event.preventDefault();
          scrollTop(parseInt(this.hash), target.offset().top);
        }
    }
  });

  // $('body').scrollspy({ target: '#navbar', offset: 30 });
  
  function scrollTop(idx, y) {
    $scroller.animate({scrollTop:y},1000, function(){
      if (idx >= $slides.length){
        $scrollNext.find('a').animate({opacity:.1}, 500);
        $scrollNext.data('disabled', true);
      }else{
        $scrollNext.find('a').animate({opacity:1}, 500);
        $scrollNext.data('disabled', false);
      }
    });
  }
  function scrollIt(dir) {
    var idx = getSlideIndex(dir),
        slide = $(slideName+idx),
        toPos = (slide.length > 0 && slide.offset().top)||0;

    scrollTop(idx, toPos);
  }
  function getSlideIndex(dir) {
    var pagePos = $(window).scrollTop(), prevTop = 0, currIdx = -1.
        len = $slides.length;
    for (var i = 1; i <= len; i++) {
      var curr = $(slideName+i),
          next = $(slideName+(i+1)),
          prev = $(slideName+(i-1)),
          nextPos = (next.length > 0 && next.offset().top),
          prevPos = (prev.length > 0 && prev.offset().top),
          currPos = curr.offset().top;

      if (currIdx < 0) { // next
        if (currPos >= pagePos && (
            (nextPos && currPos <= nextPos) || 
            (prevPos && currPos >= prevPos) ) ) {
          currIdx = i;
          break;
        }
      }
    }
    return currIdx + (dir||0)
  }
});

