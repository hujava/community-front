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
var a_id = GetQueryString("a_id"); //社区ID
if (a_id != null && a_id.toString().length > 1) {
    var a_id = a_id;
}

var fl_id = GetQueryString("fl_id"); //社区ID
if (fl_id != null && fl_id.toString().length > 1) {
    var fl_id = fl_id;
}
//获取字符串长度（汉字算两个字符，字母数字算一个）
var len = 0;

function getByteLen(val) {
    len = 0;
    if (val != undefined) {
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
        }
    }
    return len;
}

// Init初始化
var info_id = "";
var l_type = "";
var map1 = {};

var random = Math.random();
$(document).ready(function () {
    //获取活动分类
    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?obj_type=999&pc=1&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code = 200) {
                var json = data.data.rows;
                for (let i = 0; i < json.length; i++) {
                    map1[json[i].obj_id] = json[i].obj_name;
                }
            }
        }
    });

    // 导航初始化
    dh();
    //初始化
    know_list(l_type);

});

function dh() {
    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?obj_type=999&pc=1&random=" + random,
        dataType: "json",
        success: function (data) {
            if (data.code = 200) {
                var str = "";
                var json = data.data.rows;
                str += " <span value=\"0\">全部</span>";
                var map = {};

                for (let i = 0; i < json.length; i++) {
                    map[json[i].obj_id] = json[i].obj_name;
                    str += " <span class=\"fl_id" + json[i].obj_id + "\" value=\"" + json[i].obj_id + "\">" + json[i].obj_name + "</span>";
                }
                $(".fl_lbxx").html(str);
                // 分类菜单点击切换
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
                    know_list(l_type);
                });
                //
                $(".fl_id" + fl_id + "").css({
                    "background": "#3bcd80",
                    "color": "#fff"
                }).siblings().css({
                    "background": "#fff",
                    "color": "#555"
                });
            }
        }
    });
}

// 
function know_list(l_type) {
    var htp = "";
    if (l_type != null && l_type != undefined && l_type != "") {
        htp = httpXhr + "activityController/activityList.do?pc=1&a_id=" + a_id + "&a_typeClass=" + l_type + "&random=" + random;
    } else if (fl_id != null && fl_id != undefined && fl_id != "") {
        htp = httpXhr + "activityController/activityList.do?pc=1&a_id=" + a_id + "&a_typeClass=" + fl_id + "&random=" + random;
    } else {
        htp = httpXhr + "activityController/activityList.do?pc=1&a_id=" + a_id + "&random=" + random;
    }
    $.ajax({
        type: "post",
        url: htp,
        dataType: "json",
        success: function (data) {
            $(".hot_mk").html("");
            if (data.code == "200") {
                var str = "";
                var json = data.data.rows;
                for (var i = 0; i < json.length; i++) {
                    var img = encodeURI(encodeURI(json[i].a_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "";
                    str += "<div class=\"list_mk\" a_name=\"" + json[i].a_typeClass + "\" a_id=\"" + json[i].a_id + "\">";
                    str += "<div><img src=\"images/crile.png\"><span>" + json[i].a_startTime.substring(0, 4) + "年</span><span>" + json[i].a_startTime.substring(5, 7) + "月" + json[i].a_startTime.substring(8, 10) + "号</span></div>";
                    str += "<div><img src=\"" + fileUrl + "\"></div>";
                    str += "<p>" + json[i].a_name + "</p>";
                    getByteLen(data.data.rows[i].a_des);
                    if (len > 200) {
                        str += "<p>" + json[i].a_des.substring(0, 100) + " ...</p>";
                    } else if (len == 0) {
                        str += "<p></p>";
                    } else {
                        str += "<p>" + json[i].a_des + "</p>";
                    }
                    str += "<p>负责人：<span>" + json[i].a_manager + "</span></p>";
                    str += "<div class=\"lian\"><img src=\"images/lian.png\"><span>" + json[i].lookNum + "</span></div></div>";


                }
                $(".hot_mk").html(str);
                var scrollH = $(window).height() - 132 - $(".scrollH").height() - $(".foot").height()
                if (scrollH > 0) {
                    $(".foot").css("margin-top", scrollH);
                }
                /* 小知识详情 */
                $(".list_mk").on("click", function () {
                    var a_id = $(this).attr("a_id");
                    var a_name = $(this).attr("a_name");
                    location.href = "activity_detail.jsp?" + "aid=" + encodeURI(a_id) + "&index=6&titName=" + encodeURI(encodeURI(map1[a_name]));
                });
            }else{
                if ($(".hot_mk").height() == 0) {
                    $(".foot").css({"position":"absolute","bottom":"0px"});
                }
            }
        }
    })

}