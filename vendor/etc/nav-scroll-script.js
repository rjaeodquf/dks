$(document).ready(function () {
    gnbAreaInit();
    gnb(); //gnb navigation
    allMenu(); //all menu
    //autoComplete();
    //tab(); //layer tab
    //tooltip(); //tooltip
    //accordian(); //accordian
    //closeWin();
    //addInterest();
    //datepicker(); //datepicker
    //Datecalendar();
    //toggle();
    //goTop();
    //topBannerH();
    //allPro()
});
$(window).scroll(function () {
    gnbAreaInit();
    //goTop();
});
window.onload = function () {
    //topBanner();
}


/* gnb navigation */
function gnbAreaInit() {
    if ($(window).scrollTop() > 100) {
        $('.menu-top').addClass('scrolled');
    } else {
        //if (!$('body').hasClass('modal-open')) {
        $('.menu-top').removeClass('scrolled');
        //}
    }

}

function gnb() {
    var selector = $('.menu-list > li > a');
    var selectorOut = $('#gnb');
    var selectorLast = $('#gnb .menu-list li').last().children('a');
    selector.on('mouseenter focus', function () {
        $(this).parent().addClass('active');
        $(this).parent().siblings('li').removeClass('active');
    });
    selectorOut.on('mouseleave', function () {
        $(this).find('.menu-list').children('li').removeClass('active');
    });
    selectorLast.on('blur', function () {
        $(this).closest('#gnb').find('.menu-list').children('li').removeClass('active');
    });

}

/* all menu */
function allMenu() {
    var selector = $('#header-area .allMenuOpen .menu');
    selector.on('click', function () {
        $('#all-menu').addClass('active').slideDown('350').attr('aria-hidden', false);
    });

    var selClose = $('#all-menu .close');
    selClose.on('click', function () {
        $('#all-menu').slideUp('350').attr('aria-hidden', true);
        setTimeout(function () {
            $('#all-menu').removeClass('active');
        }, 350);
        selector.focus();
    });
}