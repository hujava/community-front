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
var sou_value = GetQueryString("sou_value"); //课程ID
if (sou_value != null && sou_value.toString().length > 1) {
    var sou_value = sou_value;
}

// Init初始化
var class_xd = "";
var class_fl = "";
var class_hb = "";
$(document).ready(function () {
    //初始化+近期热点
    init_rd();
    // 综合，评分数切换
    zhpfs();
});

//初始化+近期热点
function init_rd() {
    $.ajax({
        type: "post",
        url: httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1",
        dataType: "json",
        data:{
            c_name:decodeURI(decodeURI(sou_value))
        },
        success: function (data) {
            if (data.code == 200&&sou_value!="") {
                var str = "";
                var dataJson = data.data.rows;
                for (var i = 0; i < dataJson.length; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].c_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += " <div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                    str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p>";
                    str += "<p><img src=\"images/act-s.png\"><span>" + dataJson[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + dataJson[i].dzNum + "</span></p></div>";
                }
                $(".class_list").append(str);
                /* 点击课程，查询详细信息 */
                $(".class_list").on("click", 'div', function () {
                    var aid = $(this).attr("aid");
                    location.href = "class_detail.jsp?" + "aid=" + encodeURI(encodeURI(aid)) + "&index=1";
                });
            }
        }
    });
    // 近期热点
    $.ajax({
        type: "post",
        url: httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&sort=course_upNum",
        dataType: "json",
        success: function (data) {
            if (data.code== 200) {
                var str = "";
                var dataJson = data.data.rows;
                var inx = "";
                if (dataJson.length > 4) {
                    inx = 4;
                } else {
                    inx = dataJson.length;
                }
                for (var i = 0; i < inx; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].c_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                    str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p></div>";
                }
                $("._right_img").html(str);
                /* 点击课程，查询详细信息 */
                $("._right_img").on("click", 'div', function () {
                    var aid = $(this).attr("aid");
                    location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=1";
                });
            }
        }
    });
}

// 综合，评分数切换
function zhpfs() {
    $(".con_titlen > div").click(function () {
        $(this).css({
            "background": "#3bcd80",
            "color": "#fff"
        }).siblings().css({
            "background": "#f9f9f9",
            "color": "#555"
        });
        var httpdouble = "";
        if ($(this).attr("value") == "1") {
            httpdouble = httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1";
        } else {
            httpdouble = httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&sort=course_upNum";
        }
        $.ajax({
            type: "post",
            url: httpdouble,
            dataType: "json",
            data:{
                c_name:decodeURI(decodeURI(sou_value))
            },
            success: function (data) {
                if (data.code== 200) {
                    var str = "";
                    var dataJson = data.data.rows;
                    for (var i = 0; i < dataJson.length; i++) {
                        var img = encodeURI(encodeURI(dataJson[i].c_image));
                        var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                        str += " <div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                        str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p>";
                        str += "<p><img src=\"images/act-s.png\"><span>" + dataJson[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + dataJson[i].dzNum + "</span></p></div>";
                    }
                    $(".class_list").html(str);
                    /* 点击课程，查询详细信息 */
                    $(".class_list").on("click", 'div', function () {
                        var aid = $(this).attr("aid");
                        location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=1";
                    });
                }
            }
        });

    });
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