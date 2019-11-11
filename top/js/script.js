(function($) {
  $(function() {
      $('.js-locationBtn').click(function () {
        let mParent = $(this).parent();
        mParent.toggleClass('Menu-branch-search-loaction--active');
      });
      $('.js-locationOption').click(function(){
        let mLocation = $(this).find('span').text();
        let mBtn = $('.js-locationBtn');
        mBtn.text(mLocation);
        mBtn.parent().removeClass('Menu-branch-search-loaction--active');
      });
  });
})(jQuery);
