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
var aid = GetQueryString("aid"); //活动ID
if (aid != null && aid.toString().length > 1) {
    var aid = aid;
}
var a_type = GetQueryString("a_type"); //活动分类
if (a_type != null && a_type.toString().length > 1) {
    var a_type = a_type;
}


var random = Math.random();
var init = 0;
var map = {};


(function () {
    var $dom = document.createElement('div');
    $dom.style = 'font-size:16px;';
    document.body.appendChild($dom);
    // 计算出放大后的字体
    var scaledFontSize = parseInt(window.getComputedStyle($dom, null).getPropertyValue('font-size'));
    document.body.removeChild($dom);
    // 计算原字体和放大后字体的比例
    var scaleFactor = 16 / scaledFontSize;

    var originRootFontSize = parseInt(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size'));
    document.documentElement.style.fontSize = originRootFontSize * scaleFactor * scaleFactor + 'px';

    //重置微信字体
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }

})();

// Init初始化
$(function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10.8 + 'px';
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


    //获取活动分类
    if (a_type == "1") {
        $.ajax({
            type: "post",
            url: httpXhr + "objTypeController/objTypeList.do?obj_type=2&pc=1&random=" + random,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.code = 200) {
                    var json = data.data.rows;
                    var str = "";
                    str += "<div value=\"0\"><span>全部</span></div>";
                    for (let i = 0; i < json.length; i++) {
                        str += "<div class=\"a_type\" value=\"" + json[i].obj_id + "\"><span>" + json[i].obj_name + "</span></div>";
                        map[json[i].obj_id] = json[i].obj_name;
                    }
                    $(".tit_tab").append(str);
                }
            }
        });
    } else {
        //获取活动分类
        $.ajax({
            type: "post",
            url: httpXhr + "objTypeController/objTypeList.do?obj_type=3&pc=1&random=" + random,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.code = 200) {
                    var json = data.data.rows;
                    var str = "";
                    str += "<div value=\"0\"><span>全部</span></div>";
                    for (let i = 0; i < json.length; i++) {
                        str += "<div class=\"a_types\" value=\"" + json[i].obj_id + "\"><span>" + json[i].obj_name + "</span></div>";
                        map[json[i].obj_id] = json[i].obj_name;
                    }
                    $(".tit_tab").append(str);
                }
            }
        });

    }




    if (a_type == "1") {
        $(".a_types").hide();
    } else {
        $(".a_type").hide();
    }
    $(".tit_tab>div").click(function () {
        $(".content").html("");
        $(this).find("span").css({
            "border-bottom": "2px solid #3bcd80",
            "color": "#222",
            "font-weight": "bold"
        }).parents().siblings().find("span").css({
            "border-bottom": "2px solid #fff",
            "color": "#888",
            "font-weight": "normal"
        });

        var tab_value = $(this).attr("value");
        if (tab_value == "" || tab_value == null || tab_value == undefined) {
            tab_value = "";
        }
        $.ajax({
            type: "post",
            url: httpXhr + "activityController/activityList.do?pc=1&a_typeClass=" + tab_value + "&a_type=" + a_type,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    var str = "";
                    var list_value = data.data.rows;
                    console.log(list_value)
                    for (var i = 0; i < list_value.length; i++) {
                        var img = encodeURI(encodeURI(list_value[i].a_image));
                        var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                        str += "<div class=\"content_list\" a_id=\"" + list_value[i].a_id + "\">";
                        str += " <img src=\"" + fileUrl + "\">";
                        str += "<p>" + list_value[i].a_name + "</p>";
                        str += "<p>开始：<span>" + list_value[i].a_startTime + "</span></p>";
                        str += "<p>结束：<span>" + list_value[i].a_endTime + "</span></p>";
                        var ft = list_value[i].a_endTime.substring(0, 10);
                        if (currentdate < ft) {
                            str += "<p><img class=\"dzNum\" src=\"images/act_g.png\"><span>" + list_value[i].lookNum + "</span><span class=\"nowa\">报名中</span></p></div>";
                        } else {
                            str += "<p><img class=\"dzNum\" src=\"images/act_g.png\"><span>" + list_value[i].lookNum + "</span><span class=\"enda\">已结束</span></p></div>";
                        }
                    }
                    $(".content").html(str);
                    // 活动详情
                    $(".content_list").on("click", function () {
                        var aid = $(this).attr("a_id");
                        location.href = "app_activity_detail.jsp?" + "aid=" + encodeURI(aid);
                    });

                }
            }
        });

    });

    $.ajax({
        type: "post",
        url: httpXhr + "activityController/activityList.do?a_type=" + a_type,
        dataType: "json",
        success: function (data) {
            $(".content").html("");
            if (data.code == 200) {
                var str = "";
                var list_value = data.data.rows;
                console.log(list_value)
                for (var i = 0; i < list_value.length; i++) {
                    var img = encodeURI(encodeURI(list_value[i].a_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div class=\"content_list\" a_id=\"" + list_value[i].a_id + "\">";
                    str += " <img src=\"" + fileUrl + "\">";
                    str += "<p>" + list_value[i].a_name + "</p>";
                    str += "<p>开始时间：<span>" + list_value[i].a_startTime + "</span></p>";
                    str += "<p>结束时间：<span>" + list_value[i].a_endTime + "</span></p>";
                    var ft = list_value[i].a_endTime.substring(0, 10);
                    if (currentdate < ft) {
                        str += "<p><img class=\"dzNum\" src=\"images/act_g.png\"><span>" + list_value[i].lookNum + "</span><span class=\"nowa\">报名中</span></p></div>";
                    } else {
                        str += "<p><img class=\"dzNum\" src=\"images/act_g.png\"><span>" + list_value[i].lookNum + "</span><span class=\"enda\">已结束</span></p></div>";
                    }
                }
                $(".content").html(str);
                // 活动详情
                $(".content_list").on("click", function () {
                    var aid = $(this).attr("a_id");
                    location.href = "app_activity_detail.jsp?" + "aid=" + encodeURI(aid);
                });

            }
        }
    });





    // 兼容IE =》placeholder
    function placeholder(target) {
        $(target).val($(target).attr("datavalue")).addClass("inp");
        $(target).focus(function () {
            if ($(this).val() == $(this).attr("datavalue")) {
                $(this).val("").removeClass("inp");
            }

        })
        $(target).blur(function () {
            if ($(this).val() == "" || $(this).val() == $(this).attr("datavalue")) {
                $(this).val($(target).attr("datavalue")).addClass("inp");
            }
        })
    }
    placeholder(".comment_content");
})


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