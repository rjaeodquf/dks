(function(){
  
   function Floater(el, opt) {
        this.el = el;
        this.$el = $(el);
        opt = opt||{};
        this.init();
    };

    Floater.prototype.init = function() {
        
        console.info('Init');

        var _this = this;
        
        this.targetClass = this.$el.data('target')||'.float-header';
        
        // if ( ! this.targetClass)
        // {
        //     this.targetClass = ;
        // }

        this.$target = $(this.targetClass, this.$el);

        this.cloneHeader = this.$target.clone()
            .css("width", this.$target.width())
            .addClass("floatingHeader");

        this.$target
            .before(this.cloneHeader);

        $(window).scroll(function() {
            var offset         = _this.$el.offset(),
                scrollTop      = $(this).scrollTop(),
                floatingHeader = _this.cloneHeader;

            if ((scrollTop > offset.top) && (scrollTop < offset.top + _this.$el.height())) {
                floatingHeader.css({"visibility": "visible"});
            } else {
                floatingHeader.css({"visibility": "hidden"});
            };
        }).trigger("scroll");

    };

    $.fn.floatHead = function(options) {
        return this.each(function () {
            var $this = $(this),
                data  = $this.data('floater')
            if (!data) $this.data('floater', (data = new Floater(this, options)))
            if (typeof option == 'string') data[option].call($this)
        })
    };
});