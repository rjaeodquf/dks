$(document).ready(function(){

    $("body").delegate("#faq-accordion > li > a", "click", function (e) {
    if($(this).parent().has("ul")) {
      e.preventDefault();
    }
    
    if(!$(this).hasClass("open")) {
      // hide any open menus and remove all other classes
      $("#faq-accordion li ul").slideUp(350);
      $("#faq-accordion li a").removeClass("open");
      
      // open our new menu and add the open class
      $(this).next("ul").slideDown(350);
      $(this).addClass("open");
    }
    
    else if($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).next("ul").slideUp(350);
    }
  });
});