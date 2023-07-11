/**
 * Created by developkim on 2013. 11. 11..
 */

(function($){

    //plugin definition
    $.fn.gnb = function(options){

        //extend default option with custom options
        var options = $.extend({}, $.fn.gnb.defaults, options);

        return this.each(function(){
            var obj = $(this),
                items = $(options.anchor, obj);

            if(options.exception){
                items =$(items).not(options.exception);
            }

            $.fn.gnb.bindingAnchor(items, options);
            if(options.bindingwindow){
                $.fn.gnb.bindingWindow(items, options);
            }
        });
    };

    $.fn.gnb.defaults =  {
        easing       : 'swing',
        duration     : 1000,
        anchor       : 'li a',
        exception    : null,
        activeclass  : 'active',
        wrapper      : null,
        bindingwindow: true,
        correction   : null
    };

    $.fn.gnb.bindingAnchor = function(items, options){

        $(items).bind('click', function(event){
            event.preventDefault();
            var $anchor = $(this),
                scrollVal = parseInt($($anchor.attr('href')).offset().top);
            if(options.correction){
                var correction_val = _get_correction_value(options.correction, scrollVal, $anchor);
                scrollVal += correction_val;
            }
            $('html, body').stop().animate({
                scrollTop: scrollVal
            }, options.duration, options.easing);
        });
    };

    $.fn.gnb.bindingWindow = function(items, options){

        $(window).scroll(function(){
            var scrollTop = $(this).scrollTop();
            if(options.wrapper){
                scrollTop += parseInt($(options.wrapper).outerHeight());
            }

            if(options.correction != 0){
                scrollTop += options.correction;
            }

            _set_section_position(items, $(this).scrollTop(), options.activeclass, options.correction);
        });

    }

    var _get_correction_value = function(correction_option , scrollVal,  oAnchor){
        var correction_type = typeof correction_option;

        if(correction_type == 'number'){
            return parseInt(scrollVal + correction_option);

        }else if(correction_type== 'object'){
            var str_hash = $(oAnchor).attr('href');
            var return_correction_val = correction_option[str_hash] == undefined ? 0 : correction_option[str_hash];
            return return_correction_val;
        }else{
            console.warn('not defined type');
            return;
        }

    }

    var _set_section_position = function(items, scrollTop, activeclass, correction){
        scrollTop += 1;
        //네비게이션 링크들을 반복 조회
        $(items).each(function(idx, el){
            var sectionNo = $(el).attr('href').replace('#', ''),
                oSectionTop = $('#' + sectionNo).offset().top;
            //href 값으로 검증할 section을 지정
            if(correction != null && correction['#' + sectionNo]){
                oSectionTop += correction['#' + sectionNo];
            }

            if(idx == (items.length - 1) && ( scrollTop > oSectionTop )){
                //배열의 마지막 이면 스크롤 값이 큰지만 확인한다.
                $(items).parents('li').removeClass(activeclass);
                $(this).parents('li').addClass(activeclass);
            }else if(idx != (items.length - 1)){
                //마지막이 아닌 경우는 현재 와 다음 section 의 높이를 같이 구해서 비교한다.
                var nextNo = $(items[idx + 1]).attr('href').replace('#', ''),
                    oNextTop = $('#' + nextNo).offset().top;
                if(scrollTop > oSectionTop && scrollTop <= oNextTop){
                    $(items).parents('li').removeClass(activeclass);
                    $(this).parents('li').addClass(activeclass);
                }
            }

        });

    }
})(jQuery);