(function($) {
    $.fn.bgdraggable = function(opts) {
        var options = {};
        $.extend(options, $.fn.bgdraggable.defaults);
        $.extend(options, opts);
        return this.each(function() {
            var bgpos;
            $(this).mousecapture({
                down: function(e) {
                    var resizable = $(this).data('resizable');
                    if (resizable) {
                        if ($(e.target).hasClass('ui-resizable-handle')) return false;
                    }
                    bgpos = $(this).css('background-position');
                    bgpos = bgpos.split(" ");
                    bgpos[0] = parseInt(bgpos[0]);
                    bgpos[1] = parseInt(bgpos[1]);
                    bgpos = {
                        x: bgpos[0],
                        y: bgpos[1]
                    };
                    $(this).data('bgdragging', true);
                    $(this).data('bgdraglast', {
                        x: e.pageX,
                        y: e.pageY
                    });
                    $(this).data('predrag-css', {
                        border: $(this).css('border')
                    });
                    $(this).css('border', '1px solid #aaa');
                },
                up: function(e) {
                    $(this).data('bgdragging', false);
                    $(this).removeData('bgdraglast');
                    $(this).css($(this).data('predrag-css'));
                },
                move: function(e) {
                    var cur = {
                        x: e.pageX,
                        y: e.pageY
                    };
                    var last = $(this).data('bgdraglast');
                    bgpos.x += (cur.x - last.x);
                    bgpos.y += (cur.y - last.y);
                    $(this).data('bgdraglast', cur);
                    $(this).css('background-position', bgpos.x + 'px ' + bgpos.y + 'px');
                }
            });
            return this;
        });
    }
    $.fn.isbgdragging = function() {
        $.each(this, function(i, o) {
            if (!$(o).data('bgdragging')) return false;
        });
        return true;
    };
    $.fn.bgdraggable.defaults = {};
})(window.jQuery);
