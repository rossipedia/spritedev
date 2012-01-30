(function($) {
    $.fn.mousecapture = function(params) {
        var $doc = $(document);
        this.each(function() {
            var $this = $(this);
            var sharedData = {};
            $this.mousedown(function(e) {
                var downcall = params.down.call($this, e, sharedData);
                if (downcall === false) return false;
                var moveHandler;
                if (params.move) {
                    moveHandler = function(e) {
                        params.move.call($this, e, sharedData);
                    };
                    $doc.mousemove(moveHandler);
                }
                var upHandler;
                var unbind = function() {
                        if (params.move) $doc.unbind("mousemove", moveHandler);
                        $doc.unbind("mouseup", upHandler);
                    };
                if (params.up) {
                    upHandler = function(e) {
                        unbind();
                        return params.up.call($this, e, sharedData);
                    };
                } else {
                    upHandler = unbind;
                }
                $doc.mouseup(upHandler);
                return downcall;
            });
        });
        return this;
    };
})(jQuery);
