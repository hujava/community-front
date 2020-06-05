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
var lx = GetQueryString("lx"); //课程ID
if (lx != null && lx.toString().length > 1) {
    var lx = lx;
}
var map = {};
var currentdate = ""; //当前时间
var select_id = ""; //社区ID
var user_id = "";


$(document).ready(function () {
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
    currentdate = year + seperator1 + month + seperator1 + strDate;

    // 社区点击
    $(".log_sq").click(function () {
        $(".log_select").show();
    });
    /* 社区 select下拉 */
    $.ajax({
        type: "post",
        url: httpXhr + "areasController/areasList.do?a_level=5",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var str = "";
                for (var i = 0; i < data.data.rows.length; i++) {
                    str += "<span sq_id='" + data.data.rows[i].a_id + "'>" + data.data.rows[i].a_name + "</span>";
                }
                $(".log_select").html(str);
                // 社区点击事件
                $(".log_select>span").click(function () {
                    var select_val = $(this).text();
                    select_id = $(this).attr("sq_id");
                    $(".log_sq").val(select_val);
                    $(".log_select").hide();
                });

            }
        }
    });



    if (lx == "2") { //我的信息
        $(".log_list>p:nth-of-type(1)>span").css("color", "#3bcd80");
        $(".log_list>p:nth-of-type(1)>img").attr("src", "images/per2.png");
        $(".listMenu,.hot_mk,.lg_tit").hide();
        $(".myInfo,.lg_tit2").show();

    } else {

        $(".log_list>p:nth-of-type(2)>span").css("color", "#3bcd80");
        $(".log_list>p:nth-of-type(2)>img").attr("src", "images/xin2.png");
        $(".listMenu,.hot_mk,.lg_tit").show();
        $(".myInfo,.lg_tit2").hide();
        myInfo();
    }
    // 
    $(".log_list>p:nth-of-type(1)").click(function () {
        $(".log_list>p:nth-of-type(1)>span").css("color", "#3bcd80");
        $(".log_list>p:nth-of-type(1)>img").attr("src", "images/per2.png");
        $(".log_list>p:nth-of-type(2)>span").css("color", "#555");
        $(".log_list>p:nth-of-type(2)>img").attr("src", "images/xin1.png");
        $(".listMenu,.hot_mk,.lg_tit").hide();
        $(".myInfo,.lg_tit2").show();

    });
    $(".log_list>p:nth-of-type(2)").click(function () {
        $(".log_list>p:nth-of-type(1)>span").css("color", "#555");
        $(".log_list>p:nth-of-type(1)>img").attr("src", "images/per1.png");
        $(".log_list>p:nth-of-type(2)>span").css("color", "#3bcd80");
        $(".log_list>p:nth-of-type(2)>img").attr("src", "images/xin2.png");
        $(".listMenu,.hot_mk,.lg_tit").show();
        $(".myInfo,.lg_tit2").hide();
        myInfo();


    });

});

//我的信息
function myInfo() {
    //获取活动分类
    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?obj_type=999&pc=1&random=" + random,
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
            }
        }
    });

    //定时器
    var htp = "";
    var a_typeClass = "";

    var t = window.setTimeout(function () {
        user_id = $(".HolyGrail").attr("value");
        if (user_id == 0) {
            location.href = "login.jsp?index=9";
        }
        // Init初始化   
        $(".fl_lbxx>span").click(function () {
            a_typeClass = $(this).attr("value");
            $(this).css({
                "background": "#3bcd80",
                "color": "#fff"
            }).siblings().css({
                "background": "#fff",
                "color": "#555"
            });
            $.ajax({
                type: "post",
                url: httpXhr + "registrationActivityController/registrationActivityList.do?pc=1&a_typeClass=" + a_typeClass + "&user_id=" + user_id,
                dataType: "json",
                success: function (data) {
                    $(".hot_mk").html("");
                    if (data.code == "200") {
                        var str = "";
                        var dataJson = data.data.rows;
                        for (var i = 0; i < dataJson.length; i++) {
                            var img = encodeURI(encodeURI(dataJson[i].a_image));
                            var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                            str += "<div><div></div>";
                            var a_typeClass = data.data.rows[i].a_typeClass;
                            str += "<div>" + map[a_typeClass] + "</div>";
                            str += "<img class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\" src=\"" + fileUrl + "\">";
                            str += "<p class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\">" + dataJson[i].a_name + "</p>";
                            str += "<p><span>" + dataJson[i].a_startTime.substring(0, 10).replace(/-/g, ".") + "-" + dataJson[i].a_endTime.substring(0, 10).replace(/-/g, ".") + " </span>";
                            var ft = dataJson[i].a_endTime.substring(0, 10);
                            if (currentdate < ft) {
                                str += "<span class=\"time_now\"><img src=\"images/acvitity_now.png\"><span>进行中</span>";
                            } else {
                                str += "<span class=\"time_end\"><img src=\"images/acvitity_end.png\"><span>已结束</span>";
                            }
                            str += "</p><p><img src=\"images/act-s.png\"><span>" + data.data.rows[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + data.data.rows[i].dzNum + "</span></p></div>";
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
        });
        $.ajax({
            type: "post",
            url: httpXhr + "registrationActivityController/registrationActivityList.do?pc=1&user_id=" + user_id,
            dataType: "json",
            success: function (data) {
                $(".hot_mk").html("");
                if (data.code == "200") {
                    var str = "";
                    var dataJson = data.data.rows;
                    for (var i = 0; i < dataJson.length; i++) {
                        var img = encodeURI(encodeURI(dataJson[i].a_image));
                        var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                        str += "<div><div></div>";
                        var a_typeClass = data.data.rows[i].a_typeClass;
                        str += "<div>" + map[a_typeClass] + "</div>";
                        str += "<img class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\" src=\"" + fileUrl + "\">";
                        str += "<p class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\">" + dataJson[i].a_name + "</p>";
                        str += "<p><span>" + dataJson[i].a_startTime.substring(0, 10).replace(/-/g, ".") + "-" + dataJson[i].a_endTime.substring(0, 10).replace(/-/g, ".") + " </span>";
                        var ft = dataJson[i].a_endTime.substring(0, 10);
                        if (currentdate < ft) {
                            str += "<span class=\"time_now\"><img src=\"images/acvitity_now.png\"><span>进行中</span>";
                        } else {
                            str += "<span class=\"time_end\"><img src=\"images/acvitity_end.png\"><span>已结束</span>";
                        }
                        str += "</p><p><img src=\"images/act-s.png\"><span>" + data.data.rows[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + data.data.rows[i].dzNum + "</span></p></div>";
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

    }, 100);
}

//我的活动
$(".saveInfo").click(function () {
    var userName = $(".lg_active>div:nth-of-type(2)").html();
    var xname = $(".xname").val();
    // var log_sq = $(".log_sq").val();
    var log_age = $(".log_age").val();
    var log_sex = $("input[name='sex']:checked").val();
    $.ajax({
        type: "post",
        url: httpXhr + "userController/updateUser.do?pc=1",
        data: {
            u_name: userName, //用户账号
            a_name: xname, //用户昵称
            areas_sq: select_id, //社区
            age: log_age, //年龄
            gender: log_sex //1 男 2 女
        },
        dataType: "json",
        success: function (data) {
            if (data.code == "200") {
                window.location.reload();//刷新当前页面
                history.go(0);
                parent.location.reload()
                alert("修改成功！")
            }
        }
    });
});

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