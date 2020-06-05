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

// Init初始化
var info_id = "";
var sv_type = "";
var random = Math.random();
$(document).ready(function () {
    // 分页
    function exeData(num, type) {
        video_list(num);
        
        loadpage();
    }
    function exeData2(num, type) {
        video_list(num);
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
                    exeData(num, type);
                }
            }
        });
    }


    //初始化
    video_list(1);
    loadpage();


    // 分类 查询
    $(".fl_lbxx>span").click(function () {
        var class_fl = $(this).attr("value"); //分类Val
        if (class_fl == 0) {
            sv_type = "";
        } else {
            sv_type = class_fl;
        }
        video_list(1);
        loadpage2();
    });
    // 分类菜单点击切换
    $(".fl_lbxx>span").click(function () {
        $(this).css({
            "background": "#3bcd80",
            "color": "#fff"
        }).siblings().css({
            "background": "#fff",
            "color": "#555"
        });
    });
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

    $(".nav_tab>ul>li").click(function () {
        var tab_id = $(this).attr("value");
        if (tab_id == "1") {
            location.href = "classified_classroom.jsp?index=2";
        } else if (tab_id == "2") {
            location.href = "classified.jsp?index=2";
        } else if (tab_id == "3") {
            location.href = "video_list.jsp?index=2";
        } else if (tab_id == "4") {
            location.href = "know_list.jsp?index=2";
        }

    });
    // 背景图
    $.ajax({
        type: "post",
        dataType: 'json',
        url: httpXhr + 'roundMapController/roundMapList.do?type=2&tj=1&pc_type=1' + "&random=" + random,
        success: function (data) {
            console.log(data);
            if (data.code == '200') {
                var img = encodeURI(encodeURI(data.data.rows[0].rm_image));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                $(".adposition_banner").css("background", "url('" + fileUrl + "') no-repeat");
            }
        }
    });
});

// 
function video_list(num) {
    $.ajax({
        type: "post",
        url: httpXhr + "smallVideoController/smallVideoList.do?pc=1&sv_type=" + sv_type+"&rows=12&page="+num + "&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            $(".eco_mk").html("");
            if (data.code == "200") {
                $("#PageCount").val(data.data.total);
                $(".log_text").show();
                var str = "";
                var href_url = "";
                for (var i = 0; i < data.data.rows.length; i++) {
                    var img = encodeURI(encodeURI(data.data.rows[i].sv_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    if (data.data.rows[i].sv_wurl != "") {
                        var href = encodeURI(encodeURI(data.data.rows[i].sv_wurl));
                        if (href.substring(href.lastIndexOf(".") + 1) == "shtml") {
                            href_url = href;
                        } else {
                            href_url = "";
                        }
                    } else {
                        href_url = "";
                    }

                    str += "<a sv_id=\"" + data.data.rows[i].sv_id + "\" href=\"" + href_url + "\" target=\"_blank\"><div><img src=\"" + fileUrl + "\">";
                    str += "<div>" + data.data.rows[i].sv_title + "</div><img class=\"hoverplay\" src=\"images/play.png\"><div></div><div>" + data.data.rows[i].t_length + "</div></div></a>";

                }
                $(".eco_mk").html(str);
                /* 小视频详情 */
                $(".eco_mk").on("click", 'a', function () {
                    if ($(this).attr("href") == "") {
                        var sv_id = $(this).attr("sv_id");
                        $(this).attr("href", httpXhr + "video_detail.jsp?index=2&" + "sv_id=" + encodeURI(sv_id))
                        // location.href = "video_detail.jsp?" + "sv_id=" + encodeURI(sv_id);
                    }
                });

                // 悬浮增加播放图标
                $(".eco_mk>a>div").hover(function () {
                    $(this).find("img:nth-of-type(2)").show();
                }, function () {
                    $(this).find("img:nth-of-type(2)").hide();
                })
            }else{
                $(".log_text").hide();
            }
        }
    })

}