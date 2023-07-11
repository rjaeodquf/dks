/* 공통 자바스크립드 */

function submit_page(p){
	var frm	= document.searchForm;
	frm.mode.value	= "search";
	frm.target="_self";
	var p = typeof p !== 'undefined' ?  p : 1;

	frm.page.value = p;

	frm.submit();
}


	function setCookie( name, value, expiredays ) {
		var todayDate = new Date();
			todayDate.setDate( todayDate.getDate() + expiredays );
			document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}

	function getCookie(name) {
		var nameStr = name + "=" ;
		var nameLen = nameStr.length;
		var cookieLen = document.cookie.length;  //document.cookie.length >= 45
		var i = 0;
		while( i < cookieLen ) {
			var j = i + nameLen;
			if ( document.cookie.substring(i, j) == nameStr ) {
				var end = document.cookie.indexOf(";", j); //
				if( end == -1) end = document.cookie.length;
				return unescape( document.cookie.substring(j, end) ); //
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if ( i == 0) {
				break;
			}
		}
	}


(function($) {
	$._debug = true,
	$._select_mode = false,

	$.Error=function(e) { if ($._debug) { alert(e+"\n"+e.description); } },
	$.inValid = function(val, frm, msg) {
		if (val!="checked") 	var strValue = frm.value;
		var blnExp = false;

		switch (val) {
			case "id" :
				if (frm.value.match(/[A-Za-z0-9]{5,30}\w*/g)!=strValue){break;}
				blnExp = true;
			case "email" :
				if (frm.value.match(/[\w\-]+\@[\w\-]+(\.[\w\-]+)+/g)!=strValue){break;}
				blnExp = true;
			case "number" :
				if (frm.value.match(/\d+/g)!=strValue){ break;}
				blnExp = true;
			case "phone" :
				if (frm.value.match(/[0-9]{2,3}\-[0-9]{3,4}\-[0-9]{4}/g)!=strValue){break;}
				blnExp = true;
			case "mphone" :
				if (frm.value.match(/01[016789]\-[0-9]{3,4}\-[0-9]{4}/g)!=strValue){ break;}
				blnExp = true;
			case "mhphone" :
				if (frm.value.match(/01[016789][0-9]{3,4}[0-9]{4}/g)!=strValue){ break;}
				blnExp = true;
			case "date" :
				if (frm.value.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/g)!=strValue){break;}
				blnExp = true;
			case "homepage" :
				if (frm.value.match(/\w+:\/\/[^#]*/g)!=strValue){		break;}
				blnExp = true;
			case "checked" :

				if (typeof(frm.length)=="undefined"){ if (frm.checked==true) { blnExp = true; } }
				else{
					for (i = 0 ; i < frm.length; i++){
						if (frm[i].checked==true){	blnExp = true;	}
					}
				}

				break;
			case "selected" :
				if (frm.value==""){ break ;}
				blnExp = true;
			case "idn1" :
				if (frm.value.match(/[0-9]{6}/g)!=strValue){ break; }
				blnExp = true;
			case "idn2" :
				if (frm.value.match(/[0-9]{7}/g)!=strValue){break; }
				blnExp = true;
			case "birthday" :
				if (frm.value.match(/[0-9]{8}/g)!=strValue){ break; }
				blnExp = true;
			case "company" :
				if (frm.value.match(/[0-9]{3}\-[0-9]{2}\-[0-9]{5}/g)!=strValue){break;}
				blnExp = true;
			case "mcompany" :
				if (frm.value.match(/[0-9]{3}[0-9]{2}[0-9]{5}/g)!=strValue){break;}
				blnExp = true;
			default : /*공백체크*/
				if (frm.value.match(/\S/)==null){break;}
				blnExp = true;
		}

		if (!blnExp){ if (msg) alert(msg);if ((val!="checked")&&(val!="selected")){ frm.focus(); };	return false;	}
		else{ return true; }
	},

	$.Lower=function(s) { return s.toLowerCase(); },
	$.Upper=function(s) { return s.toUpperCase(); },

	$.BiznumCheck = function (val) {
		var nNum = val.replace(/[^.01-9-]/g,'');
		return nNum;
	},
	$.IdCheck = function (val) {
		var domain_check = val.replace(/[^a-z01-9_]/g,'');
		return domain_check;
	},
	$.BoardCodeCheck = function (val) {
		var domain_check = val.replace(/[^a-z01-9_]/g,'');
		return domain_check;
	},
	$.DomainCheck = function (val) {
		var domain_check = val.replace(/[^.a-zA-Z01-9-]/g,'');
		return domain_check;
	},
	$.CheckNumLength = function(no, length) {		// 숫자만 입력, 길이제한
		var nNum = String(no).replace(/\..*|[^\d]/g, "");
		if (nNum.length > parseInt(length, 10)) {
			nNum = nNum.substring(0, nNum.length - 1);
		}
		return nNum;
	},

	$.CheckEmail = function(f) {
		if (f.value.length > 0) {
			if (f.value.search(/(\S+)@(\S+)\.(\S+)/)== -1 ) {
				alert("올바른 e-mail형식이 아닙니다.\n다시입력하세요.")
				f.value="";
				f.focus();
				return false;
			}
		}
		return true;
	}

	$.ResetAll = function(frm) {		// 숫자만 입력
		$('#' + frm).each(function(){
			this.reset();
		});
	},

	$.Onlynum = function(val) {		// 숫자만 입력
		var nNum = String(val).replace(/\..*|[^\d]/g, "");
		return nNum;
	},

	$.submit_page = function(f,p) {
		var p = typeof p !== 'undefined' ?  p : 1;
		f.page.value = p;
		f.submit();
	},

	$.selectBoxCheck = function(f) {
		var value;

		if( $._select_mode == false ) {
			value = true;
			$._select_mode = true;
		} else {
			value = false;
			$._select_mode = false;
		}

		for( i=0 ; i < f.elements.length ; i++ ) {
			if( f.elements[i].name == "selectSeqno[]" ) {
				f.elements[i].checked = value;
			}
		}
	},

	$.Url=function(url, t) { if (t=="blank") { this.Open(url, '', '');  } else { window.location.href=url; } }



})(jQuery);