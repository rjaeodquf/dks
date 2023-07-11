/*jslint browser: true*/
/*global $, document*/

(function () {
  
  // Private BEHAVIOR Methods what to do when the box is exposed
  function fadein($obj, exp_ratio) {
    if (exp_ratio > 0) {
      $obj.animate({opacity: "1"}, 500);
    }
  }
  function animate($obj, exp_ratio) {
    var frame = 0, max_frame = parseInt($obj.attr("frames"), 10);
    
    $obj.find(".anim_img").css("background-size", (max_frame * 100) + "% 100%");
  
//    frame = parseInt((exp_ratio * (max_frame - 1) - ((max_frame - 1) / 2)) * 2);
    frame = Math.round((exp_ratio * (max_frame - 1)));
  
    if (frame > max_frame - 1) {
      frame = max_frame - 1;
    } else if (frame < 0) {
      frame = 0;
    }
    $obj.find(".anim_img").css("opacity", (frame / (max_frame / 3)));
    $obj.find(".anim_img").css("background-position", (frame * (100 / (max_frame - 1))) + "% 0");
  }
  function fademenu($obj, scroll_top) {
    var start = parseInt($obj.attr("startopaq"), 10), $target = $obj.find("."+$obj.attr("targetobj")), $base = $obj.find("."+$obj.attr("baseobj")), height = parseInt($base.css("height").replace("px", ""), 10), ratio;
    ratio = scroll_top / height * 0.6 + start / 100;
    if(ratio > 1) {
      ratio = 1;
    }
    // console.log($target+","+ratio);
    $target.css("background-color", "rgba(0,0,0,"+ratio+")");
  }
  
  // Private Methods detects the showing box and its exposing ratio
  function proceed() {
    var $_this, scrolltop = $("html").scrollTop(), scrolltop_start, scrolltop_end, html_height = $("html").height(), exposed_ratio = 0;
    $(".scroll-interact").each(function () {
      var thisbox_top = $(this).position().top, thisbox_height = $(this).outerHeight();
      scrolltop_start = thisbox_top - html_height;
      scrolltop_end = thisbox_top + thisbox_height;
      if (scrolltop >= scrolltop_start && scrolltop <= scrolltop_end) {
        $_this = $(this);
        exposed_ratio = (scrolltop - scrolltop_start) / thisbox_height;
        if (exposed_ratio > 1) {
          exposed_ratio = 1;
        }
      }
    });

    // behaviors
    if($_this != undefined) {
      if ($_this.hasClass("fading-box")) {
        fadein($_this, exposed_ratio);
      }
      if ($_this.hasClass("animating-box")) {
        animate($_this, exposed_ratio);
      }
      if ($_this.hasClass("fading-menu")) {
        fademenu($_this, scrolltop);
      }
    }
  }
  
  // Initiate the function
  function init() {
    var this_l = this;
    $(document).scroll(function () {
      proceed.call(this_l);
    });
  }
  
  this.scrInt = function () {
    init.call(this);
  };
}());