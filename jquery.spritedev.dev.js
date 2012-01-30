(function ($) {
  $.fn.spriteDev = function (spriteExp) {
    return this.each(function () {
      var bgimg = $(this).css('background-image');
      if(spriteExp.test(bgimg)) {
        $(this).bgdraggable();
        $(this).resizable({
          autoHide: true,
          start: function (e, u) {
            var presize = {
              border: $(this).css('border')
            };
            $(this).data('presize-css', presize);
            $(this).css({
              border: '1px solid #aaa'
            });
          },
          stop: function (e, u) {
            $(this).css($(this).data('presiz    e-css'));
          }
        });
        $(this).find('*, :submit').andSelf().removeAttr('href').click(function (e) {
          e.preventDefault();
          return false
        });
      }
    });
  }
})(window.jQuery);
