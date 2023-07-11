

$(document).ready(function(){

	// selectbox styling
	$('.serch_select').niceSelect();


//서브메뉴
	$('.btns').mouseenter(function(){				
				$(this).addClass('on')
	});
	$('.btns').mouseleave(function(){
		$(this).removeClass('on')
	});

	//탭
	$('.view_boxs .btn li').click(function(){
		$(this).addClass('active')
		$(this).siblings().removeClass('active')

		var tab = $(this).attr('data-alt')
		$('.view_boxs .tabs div').removeClass('active')
		$('#' + tab).addClass('active')
	})

});