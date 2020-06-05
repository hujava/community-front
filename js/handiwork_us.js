/* 获取当前服务器地址 */
function getRootPath() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName + "/");
}
var httpXhr = getRootPath();

$(document).ready(function () {
    var random = Math.random();
    // 背景图
    $.ajax({
        type: "post",
        dataType: 'json',
        url: httpXhr + 'roundMapController/roundMapList.do?type=7&tj=1&pc_type=1' + "&random=" + random,
        success: function (data) {
            console.log(data);
            if (data.code == '200') {
                var img = encodeURI(encodeURI(data.data.rows[0].rm_image));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    $(".adposition_banner").css("background", "url('"+fileUrl+"') no-repeat");
            }
        }
    });
});