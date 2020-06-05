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
var random = Math.random();

/* 地址栏参数截取 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
var vl = GetQueryString("vl"); //课程ID
if (vl != null && vl.toString().length > 1) {
    var vl = vl;
}

var fi = GetQueryString("fi"); //标识
if (fi != null && fi.toString().length > 1) {
    var fi = fi;
}

var map = {};
var map1 = {};
var fi1 = "";
var param1 = "";

// 获取当前日期
var date = new Date();
var seperator1 = "-";
var year = date.getFullYear();
var month = date.getMonth() + 1;
var strDate = date.getDate();
if (month >= 1 && month <= 9) {
    month = "0" + month;
}
if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
}
var currentdate = year + seperator1 + month + seperator1 + strDate;

$(document).ready(function () {
    // 分页
    function exeData(num, type) {
        init_data(param1, num);
        loadpage();
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


    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?obj_type=999&pc=1&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code = 200) {
                var json = data.data.rows;
                var str = "";
                for (let i = 0; i < json.length; i++) {
                    map1[json[i].obj_id] = json[i].obj_name;
                }
                console.log(map1)
            }
        }
    });

    if (fi == 1 || fi == null) {
        $(".consult_1").css("color", "#3bcd80").siblings().css("color", "#888");
        navi_tab(1);
        init_data(1, 1);
        loadpage();
    } else {
        $(".consult_2").css("color", "#3bcd80").siblings().css("color", "#888");
        navi_tab(2);
        init_data(2, 1);
        loadpage();
    }

    // 分类课程 == 分类课堂切换
    $(".nav_tab>ul>li").click(function () {
        $(this).css("color", "#3bcd80").siblings().css("color", "#888");
        var a_typeClass = $(this).attr("value");
        //获取活动分类
        fi1 = a_typeClass;
        navi_tab(a_typeClass);
        init_data(a_typeClass, 1);
        loadpage();

    });
    // 背景图
    $.ajax({
        type: "post",
        dataType: 'json',
        url: httpXhr + 'roundMapController/roundMapList.do?type=4&tj=1&pc_type=1' + "&random=" + random,
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

// tab页
function navi_tab(a_type) {
    ++a_type;
    //获取活动分类
    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?obj_type=" + a_type + "&pc=1&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code = 200) {
                var json = data.data.rows;
                var str = "";
                str += "<span  value=\"0\">全部</span>"
                for (let i = 0; i < json.length; i++) {
                    str += "<span class=\"class_" + (i + 1) + "\" value=\"" + json[i].obj_id + "\">" + json[i].obj_name + "</span>";
                    map[json[i].obj_id] = json[i].obj_name;
                }
                $(".fl_lbxx").html(str);
                // 分类 查询

                function exeData2(num, type) {
                    fl_data(param1, num);
                    loadpage2();
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
                $(".fl_lbxx>span").click(function () {
                    $(this).css({
                        "background": "#3bcd80",
                        "color": "#fff"
                    }).siblings().css({
                        "background": "#fff",
                        "color": "#555"
                    });
                    var class_fl = $(this).attr("value"); //分类Val
                    if (class_fl == 0) {
                        l_type = "";
                    } else {
                        l_type = class_fl;
                    }
                    fl_data(l_type, 1);
                    loadpage2();
                });
            }
        }
    });
}


// 获取内容
function init_data(a_type, num) {
    param1 = a_type;
    $.ajax({
        type: "post",
        url: httpXhr + "activityController/activityList.do?pc=1&a_type=" + a_type + "&rows=8&page=" + num + "&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            $("#PageCount").val(data.data.total);
            $(".hot_mk").html("");
            if (data.code == "200") {
                var str = "";
                var dataJson = data.data.rows;
                for (var i = 0; i < dataJson.length; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].a_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div><div></div>";
                    var a_typeClass = data.data.rows[i].a_typeClass;
                    str += "<div>" + map1[a_typeClass] + "</div>";
                    str += "<img class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\" src=\"" + fileUrl + "\">";
                    str += "<p class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\">" + dataJson[i].a_name + "</p>";
                    str += "<p><span>开始：" + dataJson[i].a_startTime + "<br>结束：" + dataJson[i].a_endTime + " </span>";
                    str += "</p><p><span><img src=\"images/act-s.png\"><span>" + data.data.rows[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + data.data.rows[i].dzNum + "</span></span>";

                    var ft = dataJson[i].a_endTime.substring(0, 10);
                    if (currentdate < ft) {
                        str += "<span class=\"time_now\"><img src=\"images/acvitity_now.png\"><span>进行中</span>";
                    } else {
                        str += "<span class=\"time_end\"><img src=\"images/acvitity_end.png\"><span>已结束</span>";
                    }

                    str += "</p></div>";
                }
                $(".hot_mk").html(str);
                var scrollH = $(window).height() - 132 - $(".scrollH").height() - $(".foot").height()
                if (scrollH > 0) {
                    $(".foot").css("margin-top", scrollH);
                }
                /* 点击活动，查询详细信息 */
                $(".hot_mk").on("click", '.insView', function () {
                    var aid = $(this).attr("aid");
                    location.href = "activity_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=3&list=1";
                });
            }else{
                if ($(".hot_mk").height() == 0) {
                    $(".foot").css({"position":"absolute","bottom":"0px"});
                }
            }
        }
    });
}

function fl_data(a_typeClass, num) {
    param1 = a_typeClass;
    // Init初始化  
    var htp = "";
    var fia="";
    if(fi1==""){
        fia=fi;
    }else{
        fia=fi1;
    }
    if (a_typeClass == "") {
        htp = httpXhr + "activityController/activityList.do?pc=1&a_type=" + fia + "&rows=8&page=" + num + "&random=" + random;
    } else {
        htp = httpXhr + "activityController/activityList.do?pc=1&a_typeClass=" + a_typeClass + "&a_type=" + fia + "&rows=8&page=" + num + "&random=" + random;
    }
    $.ajax({
        type: "post",
        url: htp,
        dataType: "json",
        async: false,
        success: function (data) {
            $("#PageCount").val(data.data.total);
            $(".hot_mk").html("");
            if (data.code == "200") {
                var str = "";
                var dataJson = data.data.rows;
                for (var i = 0; i < dataJson.length; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].a_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div><div></div>";
                    var a_typeClass = data.data.rows[i].a_typeClass;
                    str += "<div>" + map1[a_typeClass] + "</div>";
                    str += "<img class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\" src=\"" + fileUrl + "\">";
                    str += "<p class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\">" + dataJson[i].a_name + "</p>";
                    str += "<p><span>开始：" + dataJson[i].a_startTime + "<br>结束：" + dataJson[i].a_endTime + " </span>";
                    str += "</p><p><span><img src=\"images/act-s.png\"><span>" + data.data.rows[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + data.data.rows[i].dzNum + "</span></span>";

                    var ft = dataJson[i].a_endTime.substring(0, 10);
                    if (currentdate < ft) {
                        str += "<span class=\"time_now\"><img src=\"images/acvitity_now.png\"><span>进行中</span>";
                    } else {
                        str += "<span class=\"time_end\"><img src=\"images/acvitity_end.png\"><span>已结束</span>";
                    }

                    str += "</p></div>";
                }
                $(".hot_mk").html(str);
                /* 点击活动，查询详细信息 */
                $(".hot_mk").on("click", '.insView', function () {
                    var aid = $(this).attr("aid");
                    location.href = "activity_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=3&list=1";
                });
            }else{
                if ($(".hot_mk").height() == 0) {
                    $(".foot").css({"position":"absolute","bottom":"0px"});
                }
            }
        }
    });
}


//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}