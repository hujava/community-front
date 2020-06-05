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
var sv_id = GetQueryString("sv_id"); //课程ID
if (sv_id != null && sv_id.toString().length > 1) {
    var sv_id = sv_id;
}

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
    var currentdate = year + seperator1 + month + seperator1 + strDate + "  " + date.getHours() + ":" + date.getMinutes();
    $(".sys_time").html(currentdate);

    // Init初始化   
    $.ajax({
        type: "post",
        url: httpXhr + "schoolController/schoolList.do?pc=1",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.total != 0 || data.msg != "no") {
                var str = "";
                var strr = "";
                var ix = 4;
                var dataJson = data.rows;
                for (var i = 0; i < dataJson.length; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].s_url));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    if (i == 0) {
                        str += "<div class=\"three_list\">";
                        str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_1.png\"></div>";
                        str += "<div><div title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                    } else if (i == 1) {
                        str += "<div class=\"three_list\">";
                        str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_2.png\"></div>";
                        str += "<div><div title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                    } else if (i == 2) {
                        str += "<div class=\"three_list\">";
                        str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_3.png\"></div>";
                        str += "<div><div title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                    } else {
                        ++ix;
                        strr += "<div class=\"row_list\">";
                        strr += "<div><div>" + ix + "</div>";
                        strr += " <div><img src=\"" + fileUrl + "\"><span title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</span></div>";
                        strr += "<div><img src=\"images/grade2.png\"><span>" + dataJson[i].jf + "</span></div>";
                        strr += "</div><div></div><div>";
                        strr += "<div>" + (++ix) + "</div>";
                        strr += "<div><img src=\"" + fileUrl + "\"><span title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</span></div>";
                        strr += "<div><img src=\"images/grade2.png\"><span>" + dataJson[i].jf + "</span></div></div></div>";
                    }
                }
                $(".list_three").html(str);
                $(".listData").html(strr);
            }
        }
    });


    // 分类课程 == 分类课堂切换
    $(".nav_tab>ul>li").click(function () {
        $(this).css("color", "#3bcd80").siblings().css("color", "#888");
        var a_typeClass = $(this).attr("value");
        if (a_typeClass == 1) {
            $(".list_three").html("");
            $(".listData").html("");
            // Init初始化   
            $.ajax({
                type: "post",
                url: httpXhr + "schoolController/schoolList.do?pc=1",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.total != 0 || data.msg != "no") {
                        var str = "";
                        var strr = "";
                        var ix = 4;
                        var dataJson = data.rows;
                        for (var i = 0; i < dataJson.length; i++) {
                            var img = encodeURI(encodeURI(dataJson[i].s_url));
                            var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                            if (i == 0) {
                                str += "<div class=\"three_list\">";
                                str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_1.png\"></div>";
                                str += "<div><div title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                            } else if (i == 1) {
                                str += "<div class=\"three_list\">";
                                str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_2.png\"></div>";
                                str += "<div><div title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                            } else if (i == 2) {
                                str += "<div class=\"three_list\">";
                                str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_3.png\"></div>";
                                str += "<div><div title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                            } else {
                                ++ix;
                                strr += "<div class=\"row_list\">";
                                strr += "<div><div>" + ix + "</div>";
                                strr += " <div><img src=\"" + fileUrl + "\"><span title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</span></div>";
                                strr += "<div><img src=\"images/grade2.png\"><span>" + dataJson[i].jf + "</span></div>";
                                strr += "</div><div></div><div>";
                                strr += "<div>" + (++ix) + "</div>";
                                strr += "<div><img src=\"" + fileUrl + "\"><span title=\"" + dataJson[i].s_name + "\">" + dataJson[i].s_name + "</span></div>";
                                strr += "<div><img src=\"images/grade2.png\"><span>" + dataJson[i].jf + "</span></div></div></div>";
                            }
                        }
                        $(".list_three").html(str);
                        $(".listData").html(strr);
                    }
                }
            });
        } else if (a_typeClass == 2) {
            $(".list_three").html("");
            $(".listData").html("");
        } else if (a_typeClass == 3) {
            $(".list_three").html("");
            $(".listData").html("");
            // Init初始化   
            $.ajax({
                type: "post",
                url: httpXhr + "userController/usersList.do?pc=1",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.total != 0 || data.msg != "no") {
                        var str = "";
                        var strr = "";
                        var ix = 4;
                        var dataJson = data.rows;
                        for (var i = 0; i < dataJson.length; i++) {
                            var img = encodeURI(encodeURI(dataJson[i].u_url));
                            var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                            if (i == 0) {
                                str += "<div class=\"three_list\">";
                                str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_1.png\"></div>";
                                str += "<div><div title=\"" + dataJson[i].a_name + "\">" + dataJson[i].a_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                            } else if (i == 1) {
                                str += "<div class=\"three_list\">";
                                str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_2.png\"></div>";
                                str += "<div><div title=\"" + dataJson[i].a_name + "\">" + dataJson[i].a_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                            } else if (i == 2) {
                                str += "<div class=\"three_list\">";
                                str += "<div><img src=\"" + fileUrl + "\"><img src=\"images/m_3.png\"></div>";
                                str += "<div><div title=\"" + dataJson[i].a_name + "\">" + dataJson[i].a_name + "</div><img src=\"images/grade1.png\"><span>" + dataJson[i].jf + "</span></div></div>";
                            } else {
                                ++ix;
                                strr += "<div class=\"row_list\">";
                                strr += "<div><div>" + ix + "</div>";
                                strr += " <div><img src=\"" + fileUrl + "\"><span title=\"" + dataJson[i].a_name + "\">" + dataJson[i].a_name + "</span></div>";
                                strr += "<div><img src=\"images/grade2.png\"><span>" + dataJson[i].jf + "</span></div>";
                                strr += "</div><div></div><div>";
                                strr += "<div>" + (++ix) + "</div>";
                                strr += "<div><img src=\"" + fileUrl + "\"><span title=\"" + dataJson[i].a_name + "\">" + dataJson[i].a_name + "</span></div>";
                                strr += "<div><img src=\"images/grade2.png\"><span>" + dataJson[i].jf + "</span></div></div></div>";
                            }
                        }
                        $(".list_three").html(str);
                        $(".listData").html(strr);
                    }
                }
            });
        }

    });
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