/*jslint browser: true*/
/*global $, document, setTimeout, clearTimeout*/

(function () {
    this.Slide = function () {
        this.objName = null;
        this.targetName = null;
        this.$frame = null;
        this.$container = null;
        this.$items = null;
        this.first_idx = 0;
        this.last_idx = null;
        this.current_idx = 0;
        this.active_idx = 0;

        var defaults = {
            objName: ".slide-list"
        };

        this.options = defaults;

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        this.objName = this.options.objName;
        this.targetName = $(this.objName).attr("show-target");;
        this.$frame = $(this.objName + " .slide-frame");
        this.$container = $(this.objName + " .slide-container");
        this.$items = this.$container.children("li");
        this.last_idx = this.$items.lastAvailableIndex(this.$frame);

        init.call(this);
    }

    //Public Methods
    Slide.prototype.updateImage = function (img_name) {
        var _this = this;
        var idx = _this.$items.active().index(); //current active item's index

        $(_this.targetName).css("background-image", img_name);
        $(_this.targetName).attr("alt", idx);
    }

    Slide.prototype.updateWidth = function () {
        update_width.call(this);
    }
    function update_width () {
        var _this = this;
        _this.$items = _this.$container.children("li");
        _this.$container.css("width", _this.$items.totalWidth()+"px");
        _this.last_idx = _this.$items.lastAvailableIndex(_this.$frame);
        return true;
    }
    // Private Methods
    // jQuery Methods
    $.fn.index = function () {
        return this.prevAll().length;
    };
    $.fn.marginWidth = function () {
        var ml = parseInt((this.css("margin-left")).replace("px", ""));
        var mr = parseInt((this.css("margin-right")).replace("px", ""));

        return ml+mr+this.outerWidth();
    }
    $.fn.totalWidth = function () {
        var t = 0;
        this.each(function() {
            t += $(this).marginWidth();
        });
        return t;
    }
    $.fn.active = function () {
        if(this.is(".active")) {
            return this.siblings(".active");
        } else {
            return false;
        }
    }
    $.fn.containedItems = function ($obj) {
        var c = $obj.outerWidth(), i = 0, _idx = 0;
        this.each(function (idx) {
            i += $(this).marginWidth();
            if (i < c) {
                _idx = idx;
            }
        });
        return _idx + 1;
    }
    $.fn.lastAvailableIndex = function ($obj) {
        var c = this.containedItems($obj);
        if(this.length > c) {
            return this.length - c;
        } else {
            return 0;
        }
    }
    function move_left () {
        var _this = this, img_name;

        if (_this.current_idx > _this.first_idx) {
            var $old = _this.$items.eq(_this.current_idx);
            var $new = _this.$items.eq(_this.current_idx - 1);
            _this.current_idx -= 1;
            refresh_disp.call(_this, $old, $new);
        }
    }
    function move_right () {
        var _this = this, img_name;
        if (_this.current_idx < _this.last_idx) {
            var $old = _this.$items.eq(_this.current_idx);
            var $new = _this.$items.eq(_this.current_idx + 1);
            _this.current_idx += 1;
            refresh_disp.call(_this, $old, $new);
        }
    }
    function refresh_disp ($old, $new) {
        var _this = this;
        var position = ($new.position().left < (_this.$items.totalWidth() - _this.$frame.width())) ? $new.position().left : _this.$items.totalWidth() - _this.$frame.width();

        _this.$container.stop();
        _this.$container.animate({"margin-left": (position * -1) + "px"}, 200);

    }
    function init() {
        var _this = this;

        if(_this.$container.css("position") !== "absolute") {
            _this.$container.css("position", "relative");
            _this.$container.css("width", _this.$items.totalWidth()+"px");
        }

        $(window).on("resize", function () {
            _this.last_idx = _this.$items.lastAvailableIndex(_this.$frame);
            if (_this.current_idx >= _this.last_idx) {
                var $old = _this.$items.eq(_this.current_idx);
                var $new = _this.$items.eq(_this.last_idx);
                // refresh_disp.call(_this, $old, $new);
            }
        });

        $(document).on("click", _this.objName + " .sleft", function () {
            move_left.call(_this);
        });

        $(document).on("click", _this.objName + " .sright", function () {
            move_right.call(_this);
        });

        $(document).on("click", _this.objName + " .slide-list-item", function () {
            var img_name = "";
            $(this).siblings("li").removeClass("active");
            $(this).addClass("active");
            _this.active_idx = $(this).index();
            img_name = $(this).children(".img-box").css("background-image");
        });
    }
    function update() {
        var _this = this;

        if(_this.$container.css("position") !== "absolute") {
            _this.$container.css("position", "relative");
            _this.$container.css("width", _this.$items.totalWidth()+"px");
        }

        $(window).on("resize", function () {
            _this.last_idx = _this.$items.lastAvailableIndex(_this.$frame);
            if (_this.current_idx >= _this.last_idx) {
                var $old = _this.$items.eq(_this.current_idx);
                var $new = _this.$items.eq(_this.last_idx);
                refresh_disp.call(_this, $old, $new);
            }
        });

        $(document).on("click", __this.objName + " .sleft", function () {
            move_left.call(_this);
        });

        $(document).on("click", _this.objName + " .sright", function () {
            move_right.call(_this);
        });

    }
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
}());