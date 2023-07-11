/*jslint browser: true*/
/*global $, document, window*/

jQuery.ajaxSettings.traditional = true;

// toggle menu show
(function () {
  'use strict';
  $(document).on("click", ".toggle", function () {
    var target = $(this).attr("toggle-target"), option_class = "show", target_idv = $(this).attr("toggle-idv");
    if (target.substr(0, 1) === "." || target.substr(0, 1) === "#") {
      if (target_idv !== "true") {
        $(".toggle").each(function () {
          var $_t = $(this).attr("toggle-target"), $_ti = $(this).attr("toggle-idv");
          if ($_ti !== "true") {
            if (($_t.substr(0, 1) === "." || $_t.substr(0, 1) === "#") && target !== $_t) {
              $($_t).slideUp("fast").removeClass(option_class);
            }
          }
        });
      }
    }
    if (target.substr(0, 1) === "." || target.substr(0, 1) === "#") {
      // If the target is class or id
      $(target).slideToggle("fast").toggleClass(option_class);
    } else {
      // If the target is not class or id
      switch (target) {
      case "submenu":
        $(this).toggleClass(option_class);
        $(this).find("ul").slideToggle("fast");
        break;
      }
    }
  });
    
  $(document).on("click", ".toggle-slide", function () {
    var $_t = $(this), target = $(this).attr("toggle-target"), $target = $(target), option_class = "show", target_idv = $(this).attr("toggle-idv");
    $target.toggleClass(option_class);
  });
  
  // Initiate when browser's being resized
  $(window).on("resize", function () {
    var option_class = "show";
    
    $(".toggle").each(function () {
      var $_t = $(this).attr("toggle-target"), $_ta = $(this).attr("toggle-auto");
      
      if (($_ta !== "false") && ($_t.substr(0, 1) !== "." || $_t.substr(0, 1) !== "#")) {
        // If the target is class or id
        $($_t).removeClass(option_class);
        $($_t).css("display", "");
      } else {
        // If the target is not class or id
        switch ($_t) {
        case "submenu":
          $(this).removeClass(option_class);
          $(this).find("ul").css("display", "");
          break;
        }
      }
    });
    
    $(".toggle-slide").each(function () {
      var target = $(this).attr("toggle-target"), $target = $(target);
      $target.removeClass("show");
    });
  });
}());