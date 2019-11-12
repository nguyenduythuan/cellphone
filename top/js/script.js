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
  });
})(jQuery);
