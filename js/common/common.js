/*/ 모바일 메뉴*/
$(document).ready(function(){


	$(".mo_btn").click(function(e){
		e.preventDefault();
		if($("body").hasClass('mOpen')){
			m_menu_close();
		}else{
			m_menu_open();
		}
	}),
		$(".mo_close_btn").click(function(e){
			e.preventDefault(),
				m_menu_close();
		}),
		$("#mo_nav .c_button").click(function(e){
			e.preventDefault();
			var $depth1 = $(this).parent().parent(),
				$child = $(this).parent().next('.mo_suv');
			if($child.is(":animated")){
				return;
			}
			if($depth1.hasClass('open')){
				$(this).removeClass('open'),
					$depth1.removeClass('open'),
					$child.slideUp(350);
			}else{
				var idx = $depth1.index();
				$("#mo_nav .mnavi > li:not(:eq("+idx+"))").children('.mo_suv').slideUp(350);
				$("#mo_nav ul.mnavi > li.open").removeClass('open'),
					$(this).addClass('open'),
					$depth1.addClass('open'),
					$child.slideDown(350);
			}
		});
	$("#mo_nav_list > li").each(function(){
		if($(this).hasClass('act') && $(this).hasClass('list_tx')){
			$(this).addClass('open');
			$(this).children('.mo_suv').show();
		}
	});

	function m_menu_open(){
		$("body").addClass("o-hd"),
			$("body").addClass("mOpen"),
			pop_open("mo_nav");
	}
	function m_menu_close(){
		$("body").removeClass("o-hd"),
			$("body").removeClass("mOpen"),
			pop_close("mo_nav");
	}


	/**/

	function pop_open(id){
		$("#"+id).addClass('show'),
			$("#mask").addClass('show').attr("data-open", id);
	}
	function pop_close(id){
		$("#"+id).removeClass('show'),
			$("#mask").removeClass('show').attr("data-open", "");
	}
	$("#mask").click(function(e){
		e.preventDefault();
		var id = $(this).attr('data-open');
		if(id == 'mo_nav'){
			$("body").removeClass("o-hd"),
				$("#main_wrap").removeClass("mOpen");
			pop_close(id);
		}else if(id){
			pop_close(id);
		}
		return;
	});


});