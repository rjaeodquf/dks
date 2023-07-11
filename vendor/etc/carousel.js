/*jslint browser: true*/
/*global $, document, setTimeout, clearTimeout*/

(function () {  // Private Methods
  $.fn.index = function () {
    return this.prevAll().length;
  };
  function settime() {
    var $_this = this;
    this.timer_val = setTimeout(function () {
      $($_this.objName).find("li").removeClass("active");
      $_this.current_idx = $_this.current_idx + 1;
      if ($_this.current_idx > $($_this.objName).find("li").length - 1) {
        $_this.current_idx = 0;
      }
      $($_this.objName).find("li").eq($_this.current_idx).addClass("active");
      $_this.move($_this.current_idx);
    }, $_this.interval);
  }
  function stoptime() {
    var $_this = this;
    clearTimeout($_this.timer_val);
  }
  function toggle_btns(option) {
    var $_this = this;
    switch (option) {
    case "enable":
      $($_this.objName + " .arrow-left").removeClass("disabled");
      $($_this.objName + " .arrow-right").removeClass("disabled");
      if (!$($_this.objName).hasClass("cursor-over")) {
        stoptime.call($_this);
        settime.call($_this);
      }
      
      break;
    case "disable":
      $($_this.objName + " .arrow-left").addClass("disabled");
      $($_this.objName + " .arrow-right").addClass("disabled");
      stoptime.call($_this);
      break;
    }
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
  
  function sin(value, max) {
    // 0 -> 1 -> 0
    return Math.sin(value / max * Math.PI).toFixed(3);
    
  }
  function sin_half(value, max, ratio) {
    return Math.sin((value / max - 0.5) * Math.PI).toFixed(3) * ratio;
  }
  function tan(value, max) {
    //-1 ~ 1
    return Math.tan((value / max * 0.5 - 0.25) * Math.PI).toFixed(3);
  }
  
  function reposition() {
    var $_this = this, $carousel = $($_this.objName), i = 0, sin_half1 = 0;
    for (i = 0; i < this.items_in_window + 2; i = i + 1) {
      sin_half1 = sin_half(i, this.items_in_window + 1, 0.4);
      $_this.points[i] = sin_half1 * $carousel.width();
    }
  }
  function calc_width(idx, items_in_window) {
    var $_this = this, s = parseFloat(sin(idx, items_in_window)), a_width = parseInt($_this.active_item_width);
    if (a_width > $($_this.objName).width()) {
      a_width = $($_this.objName).width();
    }
    return a_width * $_this.shrink_ratio * (s + 100 / $_this.shrink_ratio - 1) / 100;
  }
  
  function init() {
    var $_this = this, $carousel = $($_this.objName), $items = $carousel.find("li"), i, cal_width = 0, sin1 = 0, sin_half1 = 0;
    
    reposition.call($_this);
    
    for (i = 0; i < ((Math.ceil(($_this.items_in_window + 2) / $items.length) - 1) * $items.length); i = i + 1) {
      $items.eq(i).clone().appendTo($_this.objName + ">.frame");
    }
    
    $items = $carousel.find("li");
    
    $items.css("width", "0");

    $items.eq(0).addClass("active");
    
    $_this.draw(0);
    settime.call($_this);
    
//     Events
    $(document).on("click", $_this.objName + " .arrow-left > .btn", function () {
      if (!$(this).parents($_this.objName + " .arrow-left").hasClass("disabled")) {
        toggle_btns.call($_this, "disable");
        
        $($_this.objName).find("li").removeClass("active");
        $_this.current_idx = $_this.current_idx - 1;
        if ($_this.current_idx < 0) {
          $_this.current_idx = $($_this.objName).find("li").length - 1;
        }
        
        $($_this.objName).find("li").eq($_this.current_idx).addClass("active");
        $_this.move($_this.current_idx);
      }
    });
    $(document).on("click", $_this.objName + " .arrow-right > .btn", function () {
      if (!$(this).parents($_this.objName + " .arrow-right").hasClass("disabled")) {
        toggle_btns.call($_this, "disable");
        
        $($_this.objName).find("li").removeClass("active");
        $_this.current_idx = $_this.current_idx + 1;
        if ($_this.current_idx > $($_this.objName).find("li").length - 1) {
          $_this.current_idx = 0;
        }
        
        $($_this.objName).find("li").eq($_this.current_idx).addClass("active");
        $_this.move($_this.current_idx);
      }
    });
    $(document).on("mouseenter", $_this.objName, function () {
      $($_this.objName).addClass("cursor-over");
      stoptime.call($_this);
    });
    $(document).on("mouseleave", $_this.objName, function () {
      $($_this.objName).removeClass("cursor-over");
      settime.call($_this);
    });
    $(window).on("resize", function () {
      reposition.call(this);
      $_this.draw($_this.current_idx);
    });
  }
  
  this.Carousel = function () {
    this.objName = null;
    this.timer_val = 0;
    this.interval = null;
    this.duration = null;
    this.space = null;
    this.active_item_width = null;
    this.points = [];
    this.items_in_window = 5;
    this.shrink_ratio = 40;
    this.current_idx = 0;
    
    var defaults = {
      objName: ".carousel",
      duration: 800,
      interval: 3500,
      arrows: true,
      dots: true,
      space: 300,
      active_item_width: 1920
    };
    
    this.options = defaults;
    
    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }
    
    this.objName = this.options.objName;
    this.duration = this.options.duration;
    this.interval = this.options.interval;
    this.space = this.options.space;
    this.active_item_width = this.options.active_item_width;
    
    init.call(this);
  };
  
  // Public Methods
  Carousel.prototype.move = function (start_idx) {
    var $_this = this, $carousel = $($_this.objName), $items = $carousel.find("li"), sin1 = 0, i = 0, cal_width = 0, si = 0, $_start_idx = start_idx - Math.floor(($_this.items_in_window + 2) / 2), count = 0;
    
    if ($_start_idx < 0) {
      $_start_idx = $_start_idx + $_this.items_in_window + 3;
    }
    
    for (i = 0; i < $_this.items_in_window + 2; i = i + 1) {
      
      si = i + $_start_idx;
      
      if (si > $items.length - 1) {
        si = si - $items.length;
      }
      
      sin1 = sin(i, $_this.items_in_window + 1);
      
      cal_width = calc_width.call($_this, i, $_this.items_in_window + 1);
      
      if (i === 0 || i === $_this.items_in_window + 1) {
        $items.eq(si).css("width", cal_width + "px");
        $items.eq(si).css("top", ((1 - sin1) * $_this.shrink_ratio / 2) + "%");
        $items.eq(si).css("height", (100 - (1 - sin1) * $_this.shrink_ratio) + "%");
        $items.eq(si).css("left", ($_this.points[i] - cal_width / 2 + $($_this.objName).width() / 2) + "px");
        $items.eq(si).css("z-index", Math.floor(sin1 * 10 + 1));
        
      } else {
        $items.eq(si).css("z-index", Math.floor(sin1 * 10 + 1));
        $items.eq(si).animate({
          width: cal_width + "px",
          top: ((1 - sin1) * $_this.shrink_ratio / 2) + "%",
          height: (100 - (1 - sin1) * $_this.shrink_ratio) + "%",
          left: ($_this.points[i] - cal_width / 2 + $($_this.objName).width() / 2) + "px"
        }, 500, function () {
          count ++;
          if (count === $_this.items_in_window) {
            // console.log("set timer");
            toggle_btns.call($_this, "enable");
          }
        });
      }
    }
    
  };
  
  Carousel.prototype.draw = function (start_idx) {
    var $_this = this, $carousel = $($_this.objName), $items = $carousel.find("li"), sin1 = 0, i = 0, cal_width = 0, si = 0, $_start_idx = start_idx - Math.floor(($_this.items_in_window + 2) / 2);
    
    if ($_start_idx < 0) {
      $_start_idx = $_start_idx + $_this.items_in_window + 3;
    }
    
    for (i = 0; i < $_this.items_in_window + 2; i = i + 1) {
      
      si = i + $_start_idx;
      
      if (si > $items.length - 1) {
        si = si - $items.length;
      }
      
      sin1 = sin(i, $_this.items_in_window + 1);
      
      cal_width = calc_width.call($_this, i, $_this.items_in_window + 1);
      
      $items.eq(si).css("width", cal_width + "px");
      $items.eq(si).css("top", ((1 - sin1) * $_this.shrink_ratio / 2) + "%");
      $items.eq(si).css("height", (100 - (1 - sin1) * $_this.shrink_ratio) + "%");
      $items.eq(si).css("left", ($_this.points[i] - cal_width / 2 + $($_this.objName).width() / 2) + "px");
      $items.eq(si).css("z-index", Math.floor(sin1 * 10 + 1));
//      $items.eq(si).find(".img-box").css("opacity", sin1);
        
    }
  };
  
  // push isn't available for this carousel
//  Carousel.prototype.push = function (url, text) {
//    
//  }
  
}());