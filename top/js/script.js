(function($) {
  $(function() {
    var Carousel = {
      list: $(".js-carouselList"),
      itemLength: $(".js-carouselList .Carousel-content-item").length,
      run: 0,
      currentX: 0,
      start: 0,
      carouselNavItem: 1,
      isScrolling: false,
      isNeedToBack: false,
    };

    $(window).on("load resize", function() {
      let mWidth = $(".js-carousel").width(); //lay chieu rong
      let mHeight = mWidth / 2.665;
      $(".js-carouselCtx").height(mHeight); // set chieu cao
    });

    $(".js-carouselList").on("mousedown", function(e) {
      Carousel.currentX = e.pageX;
      Carousel.start = Carousel.currentX;
      window.addEventListener("mousemove", carouselGrabbing);
      window.addEventListener("mouseup", carouselStop);
    });

    function setUpCarousel() {
      var realFirstItem = Carousel.list.find(".Carousel-content-item").first();
      var firstItem = realFirstItem.clone();
      var firstDataIndex = Carousel.itemLength + 1;
      firstItem.attr("id", "carousel" + firstDataIndex);
      firstItem.addClass("Clone");

      var lastItem = Carousel.list
        .find(".Carousel-content-item")
        .last()
        .clone();
      var lastDataIndex = 0;
      lastItem.attr("id", "carousel" + lastDataIndex);
      lastItem.addClass("Clone");

      Carousel.list.append(firstItem);
      Carousel.list.prepend(lastItem);
      Carousel.list.css("left", 0 - realFirstItem.position().left);
      // console.log(acc);
    }

    function runCarouselGrabbing(a, b) {
      if (a - b >= 100) {
        Carousel.isNeedToBack = false;
        Carousel.carouselNavItem--;
        carouselStop();
        scrollCarousel(Carousel.carouselNavItem);
      } else if (b - a >= 100) {
        Carousel.isNeedToBack = false;
        Carousel.carouselNavItem++;
        carouselStop();
        scrollCarousel(Carousel.carouselNavItem);
      }
    }

    function carouselGrabbing(e) {
      Carousel.isNeedToBack = true;
      clearTimeout(Carousel.run);
      var distanceX = e.pageX - Carousel.currentX;
      Carousel.currentX = e.pageX;
      $(".js-carouselList").css({
        left: $(".js-carouselList").position().left + distanceX
      });
      runCarouselGrabbing(e.pageX, Carousel.start);
    }

    function carouselStop() {
      clearTimeout(Carousel.run);
      window.removeEventListener("mousemove", carouselGrabbing);
      window.removeEventListener("mouseup", carouselStop);
      if(Carousel.isNeedToBack) {
        let carouselItem = $("#carousel" + Carousel.carouselNavItem);
        Carousel.list.animate(
          {
            left: 0 - carouselItem.position().left
          },
          300,
          function() {
            Carousel.isScrolling = false;
          }
        );
      }
      scrollCarousel(Carousel.carouselNavItem);
    }

    function scrollCarousel(index) {
      Carousel.isScrolling = true;
      let carouselItem = $("#carousel" + index);
      if (carouselItem.length == 0) {
        Carousel.isScrolling = false;
        return;
      }
      if (carouselItem.hasClass("Clone")) {
        index = carouselItem.attr("data-index");
        var realItem = $("#carousel" + index);
        Carousel.carouselNavItem = index;
      }
      $(".Carousel-nav-item--active").removeClass("Carousel-nav-item--active");
      $(".js-carouselNavItem[data-index=" + index + "]").addClass(
        "Carousel-nav-item--active"
      );
      Carousel.list.animate(
        {
          left: 0 - carouselItem.position().left
        },
        300,
        function() {
          if (carouselItem.hasClass("Clone")) {
            Carousel.list.css("left", 0 - realItem.position().left);
          }
          Carousel.isScrolling = false;
        }
      );
      Carousel.carouselNavItem = index;
      index++;
      Carousel.run = setTimeout(scrollCarousel.bind(null, index), 3000);
    }

    scrollCarousel(Carousel.carouselNavItem);
    setUpCarousel();

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

    $(".js-carouselList img").on("mousedown", function(e) {
      e.preventDefault();
    });

    $(".js-carouselNavItem").click(function() {
      if ($(this).hasClass("Carousel-nav-item--active")) {
        return;
      }
      let index = $(this).attr("data-index");
      Carousel.carouselNavItem = index;
      clearTimeout(Carousel.run);
      scrollCarousel(Carousel.carouselNavItem);
    });

    $(".js-carouselBtn").click(function() {
      if (Carousel.isScrolling) {
        return;
      }
      if ($(this).hasClass("Carousel-content__btn--right")) {
        //Event for right
        Carousel.carouselNavItem++;
      } else {
        Carousel.carouselNavItem--;
      }
      clearTimeout(Carousel.run);
      scrollCarousel(Carousel.carouselNavItem);
    });

    console.log(window.history); 

  });
})(jQuery);
