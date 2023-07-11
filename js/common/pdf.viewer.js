$(function () {
  var pdfFileURL = $(".pdf-file-url").val();
  var pdfPageNum = $(".pdf-page-num").val();
  PDFViewerApplication.initialBookmark="page="+pdfPageNum;
  //PDFViewerApplication.webViewerLoad();
  PDFViewerApplication.open(pdfFileURL);
})