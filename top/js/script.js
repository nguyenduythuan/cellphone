(function($) {
  $(function() {
    $(".js-locationBtn").click(function() {
      let mParent = $(this).parent(); //lay cha cua the click
      mParent.toggleClass("Menu-branch-search-loaction--active"); //them class neu chua co xoa classneu co roi
    });

    $(".js-locationOption").click(function() {
      let mLocation = $(this)
        .find("span") //tim tat ca cac the span
        .text();
      let mBtn = $(".js-locationBtn");
      mBtn.text(mLocation);
      mBtn.parent().removeClass("Menu-branch-search-loaction--active");
    });

    $(".js-navHamberger").click(function() {
      let mNav = $(".js-nav");
      mNav.toggleClass("Nav--active");
      if (mNav.hasClass("Nav--active")) {
        $("body").addClass("Noscroll");
      } else {
        $("body").removeClass("Noscroll");
      }
    });

    $(window).on("load resize", function() {
      let mWidth = $(".js-carousel").width(); //lay chieu rong
      let mHeight = mWidth / 2.665;
      $(".js-carouselCtx").height(mHeight); // set chieu cao
    });

    var carouselNavItem = 1;
    var itemLength = $('.js-carouselList .Carousel-content-item').length; //tim trong cha cac phan tu con
    var isScrolling = false;

    $('.js-carouselNavItem').click(function() {
      if($(this).hasClass('Carousel-nav-item--active')){
        return;
      }
      let index = $(this).attr('data-index');
      carouselNavItem = index;
      scrollCarousel(carouselNavItem);
    });

    $('.js-carouselBtn').click(function() {
      if($(this).hasClass('Carousel-content__btn--right')){
        //Event for right
        carouselNavItem++;
      }else {
        carouselNavItem--;
      }
      if (carouselNavItem > itemLength) {
        carouselNavItem = 1;
      } else if(carouselNavItem < 1) {
        carouselNavItem = itemLength;
      }
      scrollCarousel(carouselNavItem);
    });

    function scrollCarousel(index) {
      if (isScrolling) {
        return;
      }
      isScrolling = true;
      let carouselItem = $('#carousel' + index);
      $('.Carousel-nav-item--active').removeClass('Carousel-nav-item--active');
      $('.js-carouselNavItem[data-index='+index+']').addClass('Carousel-nav-item--active');
      $('.js-carouselList').animate({
        'left': 0-carouselItem.position().left
      }, 300, function(){
        isScrolling = false;
      });
    }
  });
})(jQuery);
