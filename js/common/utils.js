$.utils = {
    fileDownloadForm : function(url){
        var $iframe = $("#fileDownloadFrame");
        if ( $iframe.length == 0) {
            $iframe = $('<iframe src="javascript:false;" id="fileDownloadFrame" name="fileDownloadFrame" style="display:none;"></iframe>');
            $('body').append($iframe);
        }
        $iframe.empty();
        $iframe.attr("src",url);
    },
    loadingBar: function (isShow) {
        if (isShow) {
            $(".loadingWrap").show();
        } else {
            $(".loadingWrap").fadeOut(800);
        }
    },
    convertDuration: function (durationTime) {
        var nSec = Math.floor(durationTime);
        var nMin = Math.floor(nSec / 60);
        nSec -= nMin * 60;
        var nHour = Math.floor(nMin / 60);
        nMin -= nHour * 60;
        return nHour + ":" + ((nMin < 10) ? "0" : "") + nMin + ":" + ((nSec < 10) ? "0" : "") + nSec;
    },
    getBrowser : function(){
        var agent = navigator.userAgent.toLowerCase();
        var browser = "";
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if(agent.indexOf("chrome") > -1 && !isMobile){
            browser = "chrome";
        }else if(agent.indexOf("edge") > -1){
            browser = "edge";
        }else{
            browser = "ie"
        }
        return browser;
    },
    downloadBar: function (isShow) {
        if (isShow) {
            $(".downloadWrap").show();
        } else {
            $(".downloadWrap").fadeOut(800);
        }
    }
}


$.gmPaginationCallFuntion = {
    isInstall: false,
    opts: {},
    show: function (options) {
        this.opts = $.extend({}, $.gmPaginationCallFuntion.defaults, options);
        this.install();
    },
    install: function () {
        if (!this.isInstall) {
            var m_totPgCnt = Math.ceil(this.opts.totCntNum / this.opts.dpLiCnt); 	// 전체페이지 수
            var m_totSet = Math.ceil(m_totPgCnt / this.opts.dpPgCnt); 				// 전체세트 수
            var m_curSet = Math.ceil(this.opts.curPgNum / this.opts.dpPgCnt); 			// 현재세트
            if (m_curSet == 0) m_curSet = 1;
            var hasPrev = m_curSet > 1;
            var hasNext = m_curSet < m_totSet;
            var setStartPg = (m_curSet - 1) * this.opts.dpPgCnt + 1;
            var setLastPg = (m_curSet) * this.opts.dpPgCnt;
            this.opts.lastPgNum = m_totPgCnt;
            if (setLastPg > m_totPgCnt) setLastPg = m_totPgCnt;

            var rHtml = '';

            if (hasPrev){
                rHtml += '<a href="#" class="prevest" data-pg="1"></a>';
                rHtml += '<a href="#" class="prev" data-pg="' + (setStartPg - 1) + '"></a>';
            }
            else{
                rHtml += '<a href="#" class="prevest disable"></a>';
                rHtml += '<a href="#" class="prev disable"></a>';
            }
            for (i = setStartPg; i <= setLastPg; i++) {
                if (i == this.opts.curPgNum) {
                    rHtml += '<a href="#" class="active" data-pg="' + i + '">' + i + '</a>';
                } else {
                    rHtml += '<a href="#" data-pg="' + i + '">' + i + '</a>';
                }
            }
            if (hasNext){
                rHtml += '<a href="#" class="next" data-pg="' + (setLastPg + 1) + '"></a>';
                rHtml += '<a href="#" class="nextest" data-pg="' + m_totPgCnt + '"></a>';
            }
            else{
                rHtml += '<a href="#" class="next disable"></a>';
                rHtml += '<a href="#" class="nextest disable"></a>';
            }

            $(this.opts.displayObj).html(rHtml);

            $(this.opts.displayObj + ' a').on('click', function (e) {
                e.preventDefault();
                if ($(this).attr('data-pg')) $.gmPaginationCallFuntion.showPage($(this).attr('data-pg'));
            });
        }
    },
    showPage: function (_num) {
        $('input[name=' + this.opts.pageParameterName + ']').val(_num);
        eval(this.opts.callback + '');
    },
    update: function (options) {
        this.opts = $.extend({}, this.opts, options);
        this.isInstall = false;
        this.install();
    },
    defaults: {
        dpLiCnt: 5,	// 한페이지에 보일 리스트 수
        dpPgCnt: 5,   // 한페이지에 보일 페이지 수
        curPgNum: 1,	// 현재 선택한 페이지
        lastPgNum: 1,	// 마지막 페이지
        totCntNum: 0, // 전체 리스트 수
        displayObj: '#paging', // 보여줄 타겟
        callback: '',	// 호출할 펑션
        pageParameterName: 'cpage'		// 페이지 파라메터이름
    }
};


//파일 다운로드 처리[s]
$.gmContentFileDownload = function (downloadFileList) {

    console.log('downloadFileList : ', downloadFileList);

    let gmDownloadForm = $("#gm-download-form");
    // if ( gmDownloadForm.length > 0) gmDownloadForm.empty();

    if ( gmDownloadForm.length > 0) {
        $("#gm-download-form").remove();
    }

    // var downloadFormHtml = '<form id="gm-download-form" method="post" action="' + $.utils.convertURLPath("/file-manage/gm-content-file-download") + '">'
    let downloadFormHtml = '<form id="gm-download-form" method="post" action="' + contextPath + '/web/file-manage/gm-content-file-download">'
    for (let i = 0; i < downloadFileList.length; i++) {
        downloadFormHtml += '<input type="hidden" name="downloadFileList" value="' + downloadFileList[i] + '" />'
    }
    downloadFormHtml += '</form>';
    $("body").append(downloadFormHtml);
    $("#gm-download-form").submit();

}
//파일 다운로드 처리[e]