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

/* 地址栏参数截取 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
var fid = GetQueryString("fid"); //课程ID
if (fid != null && fid.toString().length > 1) {
    var fid = fid;
}
var fi = GetQueryString("fi"); //标识
if (fi != null && fi.toString().length > 1) {
    var fi = fi;
}

// Init初始化
var info_id = "1";
var random = Math.random();
var typeClick="";
$(document).ready(function () {
    loadData(1);
    loadpage();

    //分类课程 == 分类课堂切换
    $(".nav_tab>ul>li").click(function () {
        $(this).css("color", "#3bcd80").siblings().css("color", "#888");
        var a_typeClass = $(this).attr("value");
        typeClick=a_typeClass;
        loadData2(1);
        loadpage2();
    });


    // 背景图
    $.ajax({
        type: "post",
        dataType: 'json',
        url: httpXhr + 'roundMapController/roundMapList.do?type=3&tj=1&pc_type=1' + "&random=" + random,
        success: function (data) {
            console.log(data);
            if (data.code == '200') {
                var img = encodeURI(encodeURI(data.data.rows[0].rm_image));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                $(".adposition_banner").css("background", "url('" + fileUrl + "') no-repeat");
            }
        }
    });
})

// 分页
function exeData(num, type) {
    loadData(num);
    loadpage();
}
function exeData2(num, type) {
    loadData2(num);
    loadpage2();
}

function loadpage() {
    var myPageCount = parseInt($("#PageCount").val());
    var myPageSize = parseInt($("#PageSize").val());
    var countindex = myPageCount % myPageSize > 0 ? (myPageCount / myPageSize) + 1 : (myPageCount / myPageSize);
    $("#countindex").val(countindex);

    $.jqPaginator('#pagination', {
        totalPages: parseInt($("#countindex").val()),
        visiblePages: parseInt($("#visiblePages").val()),
        currentPage: 1,
        first: '<li class="first"><a href="javascript:;">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
        last: '<li class="last"><a href="javascript:;">末页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            if (type == "change") {
                exeData(num, type);
            }
        }
    });
}

function loadpage2() {
    var myPageCount = parseInt($("#PageCount").val());
    var myPageSize = parseInt($("#PageSize").val());
    var countindex = myPageCount % myPageSize > 0 ? (myPageCount / myPageSize) + 1 : (myPageCount / myPageSize);
    $("#countindex").val(countindex);

    $.jqPaginator('#pagination', {
        totalPages: parseInt($("#countindex").val()),
        visiblePages: parseInt($("#visiblePages").val()),
        currentPage: 1,
        first: '<li class="first"><a href="javascript:;">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
        last: '<li class="last"><a href="javascript:;">末页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            if (type == "change") {
                exeData2(num, type);
            }
        }
    });
}

function loadData(num) {

    if (fi == 1 || fi == null) {
        //inits
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=1&pc=1&rows=5&page=" + num + "&random=" + random,
            dataType: "json",
            async: false,
            success: function (data) {
                $("#PageCount").val(data.data.total);
                var str = "";
                var json = data.data;
                for (let i = 0; i < json.rows.length; i++) {
                    var img = encodeURI(encodeURI(json.rows[i].f_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div class=\"_content\">";
                    str += "<div class=\"_con_img\" sv_id=\"" + data.data.rows[i].f_id + "\"><img src=\"" + fileUrl + "\"></div>";
                    str += "<div class=\"_con_lit\">";
                    getByteLen(data.data.rows[i].f_center);
                    if (len > 190) {
                        str += "<p sv_id=\"" + data.data.rows[i].f_id.substring(0, 150) + "\">" + json.rows[i].f_name + "...</p>";
                    } else {
                        str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_name + "</p>";
                    }
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_center + "</p>";
                    str += "<div class=\"list_dck\">";
                    str += "<div class=\"list_ck\"><img src=\"images/icon_browse.png\"><span>" + data.data.rows[i].lookNum + "</span></div>";
                    str += "<div class=\"list_dz\"><img src=\"images/icon_time.png\"><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></div></div></div></div>";
                }
                $("._left").html(str);
                $(".consult_1").css("color", "#3bcd80").siblings().css("color", "#888");
                $("._con_lit").on("click", 'p', function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });
                $("._con_img").on("click", function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });
            }
        });
        // 热点
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=1&tj=1&pc=1" + "&random=" + random,
            dataType: "json",
            success: function (data) {
                var str = "";
                var href_url = "";
                for (var i = 0; i < data.data.rows.length; i++) {
                    str += "<div>";
                    str += "<p><a sv_id=\"" + data.data.rows[i].f_id + "\">" + data.data.rows[i].f_name + "</a></p>";
                    str += "<p><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></p></div>";
                }
                $("._right_img").html(str);
                $("._right_img").on("click", 'a', function () {
                    var sv_id = $(this).attr("sv_id");
                    $(this).attr("href", httpXhr + "consult_detail.jsp?index=1&list=1&" + "fid=" + encodeURI(sv_id))
                });
            }
        });
    } else if (fi == 2) {
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=2&pc=1&rows=5&page=" + num + "&random=" + random,
            dataType: "json",
            async: false,
            success: function (data) {
                $("#PageCount").val(data.data.total);
                var str = "";
                var json = data.data;
                for (let i = 0; i < json.rows.length; i++) {
                    var img = encodeURI(encodeURI(json.rows[i].f_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div class=\"_content\">";
                    // str+="<div class=\"_con_img\"><img src=\""+fileUrl+"\"></div>";
                    str += "<div class=\"_con_lit\">";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_name + "</p>";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_center + "</p>";
                    str += "<div class=\"list_dck\">";
                    str += "<div class=\"list_ck\"><img src=\"images/icon_browse.png\"><span>" + data.data.rows[i].lookNum + "</span></div>";
                    str += "<div class=\"list_dz\"><img src=\"images/icon_time.png\"><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></div></div></div></div>";
                }
                $("._left").html(str);
                $(".consult_2").css("color", "#3bcd80").siblings().css("color", "#888");
                $("._content").css("padding-bottom", "0px");
                $("._con_lit").on("click", 'p', function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });
                $("._con_img").on("click", function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });

            }
        });
        // 热点
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=2&tj=1&pc=1" + "&random=" + random,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    var str = "";
                    var href_url = "";
                    for (var i = 0; i < data.data.rows.length; i++) {
                        str += "<div>";
                        str += "<p><a sv_id=\"" + data.data.rows[i].f_id + "\">" + data.data.rows[i].f_name + "</a></p>";
                        str += "<p><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></p></div>";
                    }
                    $("._right_img").html(str);
                    $("._right_img").on("click", 'a', function () {
                        var sv_id = $(this).attr("sv_id");
                        $(this).attr("href", httpXhr + "consult_detail.jsp?index=1&list=2&" + "fid=" + encodeURI(sv_id))
                    });
                }
            }
        });
    } else {
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=3&pc=1&rows=5&page=" + num + "&random=" + random,
            dataType: "json",
            async: false,
            success: function (data) {
                $("#PageCount").val(data.data.total);
                var str = "";
                var json = data.data;
                for (let i = 0; i < json.rows.length; i++) {
                    var img = encodeURI(encodeURI(json.rows[i].f_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div class=\"_content\">";
                    // str+="<div class=\"_con_img\"><img src=\""+fileUrl+"\"></div>";
                    str += "<div class=\"_con_lit\">";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_name + "</p>";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_center + "</p>";
                    str += "<div class=\"list_dck\">";
                    str += "<div class=\"list_ck\"><img src=\"images/icon_browse.png\"><span>" + data.data.rows[i].lookNum + "</span></div>";
                    str += "<div class=\"list_dz\"><img src=\"images/icon_time.png\"><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></div></div></div></div>";
                }
                $("._left").html(str);
                $(".consult_3").css("color", "#3bcd80").siblings().css("color", "#888");
                $("._content").css("padding-bottom", "0px");
                $("._con_lit").on("click", 'p', function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });

            }
        });
        // 热点
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=3&tj=1&pc=1" + "&random=" + random,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    var str = "";
                    var href_url = "";
                    for (var i = 0; i < data.data.rows.length; i++) {
                        str += "<div>";
                        str += "<p><a sv_id=\"" + data.data.rows[i].f_id + "\">" + data.data.rows[i].f_name + "</a></p>";
                        str += "<p><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></p></div>";
                    }
                    $("._right_img").html(str);
                    $("._right_img").on("click", 'a', function () {
                        var sv_id = $(this).attr("sv_id");
                        $(this).attr("href", httpXhr + "consult_detail.jsp?index=1&list=3&" + "fid=" + encodeURI(sv_id))
                    });
                }
            }
        });
    }
};

function loadData2(num){
    if (typeClick == 1) {
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=1&pc=1&rows=5&page=" + num + "&random=" + random,
            dataType: "json",
            async:false,
            success: function (data) {
                $("#PageCount").val(data.data.total);
                var str = "";
                var json = data.data;
                for (let i = 0; i < json.rows.length; i++) {
                    var img = encodeURI(encodeURI(json.rows[i].f_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div class=\"_content\">";
                    str += "<div class=\"_con_img\" sv_id=\"" + data.data.rows[i].f_id + "\"><img src=\"" + fileUrl + "\"></div>";
                    str += "<div class=\"_con_lit\">";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_name + "</p>";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_center + "</p>";
                    str += "<div class=\"list_dck\">";
                    str += "<div class=\"list_ck\"><img src=\"images/icon_browse.png\"><span>" + data.data.rows[i].lookNum + "</span></div>";
                    str += "<div class=\"list_dz\"><img src=\"images/icon_time.png\"><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></div></div></div></div>";
                }
                $("._left").html(str);
                $("._con_lit").on("click", 'p', function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });
                $("._con_img").on("click", function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });
            }
        });
        // 热点
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=1&tj=1&pc=1" + "&random=" + random,
            dataType: "json",
            success: function (data) {
                var str = "";
                var href_url = "";
                for (var i = 0; i < data.data.rows.length; i++) {
                    str += "<div>";
                    str += "<p><a sv_id=\"" + data.data.rows[i].f_id + "\">" + data.data.rows[i].f_name + "</a></p>";
                    str += "<p><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></p></div>";
                }
                $("._right_img").html(str);
                $("._right_img").on("click", 'a', function () {
                    var sv_id = $(this).attr("sv_id");
                    $(this).attr("href", httpXhr + "consult_detail.jsp?index=1&list=1&" + "fid=" + encodeURI(sv_id))
                });
            }
        });
    } else if (typeClick == 2) {
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=2&pc=1&rows=5&page=" + num + "&random=" + random,
            dataType: "json",
            async:false,
            success: function (data) {
                $("#PageCount").val(data.data.total);
                var str = "";
                var json = data.data;
                for (let i = 0; i < json.rows.length; i++) {
                    var img = encodeURI(encodeURI(json.rows[i].f_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div class=\"_content\">";
                    // str+="<div class=\"_con_img\"><img src=\""+fileUrl+"\"></div>";
                    str += "<div class=\"_con_lit\">";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_name + "</p>";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_center + "</p>";
                    str += "<div class=\"list_dck\">";
                    str += "<div class=\"list_ck\"><img src=\"images/icon_browse.png\"><span>" + data.data.rows[i].lookNum + "</span></div>";
                    str += "<div class=\"list_dz\"><img src=\"images/icon_time.png\"><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></div></div></div></div>";
                }
                $("._left").html(str);
                $("._content").css("padding-bottom", "0px");
                $("._con_lit").on("click", 'p', function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });
            }
        });
        // 热点
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=2&tj=1&pc=1" + "&random=" + random,
            dataType: "json",
            success: function (data) {
                var str = "";
                var href_url = "";
                for (var i = 0; i < data.data.rows.length; i++) {
                    str += "<div>";
                    str += "<p><a sv_id=\"" + data.data.rows[i].f_id + "\">" + data.data.rows[i].f_name + "</a></p>";
                    str += "<p><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></p></div>";
                }
                $("._right_img").html(str);
                $("._right_img").on("click", 'a', function () {
                    var sv_id = $(this).attr("sv_id");
                    $(this).attr("href", httpXhr + "consult_detail.jsp?index=1&list=2&" + "fid=" + encodeURI(sv_id))
                });
            }
        });
    } else {
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=3&pc=1&rows=5&page=" + num + "&random=" + random,
            dataType: "json",
            async:false,
            success: function (data) {
                $("#PageCount").val(data.data.total);
                var str = "";
                var json = data.data;
                for (let i = 0; i < json.rows.length; i++) {
                    var img = encodeURI(encodeURI(json.rows[i].f_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div class=\"_content\">";
                    // str+="<div class=\"_con_img\"><img src=\""+fileUrl+"\"></div>";
                    str += "<div class=\"_con_lit\">";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_name + "</p>";
                    str += "<p sv_id=\"" + data.data.rows[i].f_id + "\">" + json.rows[i].f_center + "</p>";
                    str += "<div class=\"list_dck\">";
                    str += "<div class=\"list_ck\"><img src=\"images/icon_browse.png\"><span>" + data.data.rows[i].lookNum + "</span></div>";
                    str += "<div class=\"list_dz\"><img src=\"images/icon_time.png\"><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></div></div></div></div>";
                }
                $("._left").html(str);
                $("._content").css("padding-bottom", "0px");
                $("._con_lit").on("click", 'p', function () {
                    var sv_id = $(this).attr("sv_id");
                    location.href = "consult_detail.jsp?" + "fid=" + sv_id + "&index=1&list=1";
                });

            }
        });
        // 热点
        $.ajax({
            type: "post",
            url: httpXhr + "informationController/informationList.do?f_type=3&tj=1&pc=1" + "&random=" + random,
            dataType: "json",
            success: function (data) {
                var str = "";
                var href_url = "";
                for (var i = 0; i < data.data.rows.length; i++) {
                    str += "<div>";
                    str += "<p><a sv_id=\"" + data.data.rows[i].f_id + "\">" + data.data.rows[i].f_name + "</a></p>";
                    str += "<p><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></p></div>";
                }
                $("._right_img").html(str);
                $("._right_img").on("click", 'a', function () {
                    var sv_id = $(this).attr("sv_id");
                    $(this).attr("href", httpXhr + "consult_detail.jsp?index=1&list=3&" + "fid=" + encodeURI(sv_id))
                });
            }
        });
    }
}
    //获取字符串长度（汉字算两个字符，字母数字算一个）
    var len = 0;
    function getByteLen(val) {
        len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
        }
        return len;
    }