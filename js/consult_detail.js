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

var list = GetQueryString("list"); //课程ID
if (list != null && list.toString().length > 1) {
    var list = list;
}


// Init初始化
var info_id = "";
var random = Math.random();
$(document).ready(function () {
    // 小视频详情
    $.ajax({
        type: "post",
        url: httpXhr + "informationController/selectInformation.do?pc=1&f_id=" + fid + "&random=" + random,
        dataType: "json",
        success: function (data) {
            // 导航
            var dh = "";
            if (data.information.f_type == "1") {
                dh = "新闻";
            } else if (data.information.f_type == "2") {
                dh = "通知";
            } else if (data.information.f_type == "3") {
                dh = "公告";
            }
            $(".title_lx>a:nth-of-type(3)>span").html(dh);
            // 标题
            $(".sv_title").html(data.information.f_name);
            // 查看人数
            $(".info_detail>span:nth-of-type(1)").html(data.information.lookNum);
            // 时间
            $(".info_detail>span:nth-of-type(2)").html(data.information.c_date);
            // 来源
            if (data.information.f_source != "" && data.information.f_source != undefined && data.information.f_source != null) {
                $(".info_detail>span:nth-of-type(3)").html("来源：" + data.information.f_source);
            }
            // 图文
            $(".video_info>p").html(data.information.f_des);
            $(".video_info img").css({
                "width": "620px",
                "margin-left": "72px"
            });
            // $(".video_info img").parents().css("margin-left","100px");
        }
    });

    // 热点
    $.ajax({
        type: "post",
        url: httpXhr + "informationController/informationList.do?f_type=" + list + "&tj=1&pc=1" + "&random=" + random,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var str = "";
                var href_url = "";
                for (var i = 0; i < data.data.rows.length; i++) {
                    var img = encodeURI(encodeURI(data.data.rows[i].sv_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div>";
                    str += "<p><a sv_id=\"" + data.data.rows[i].f_id + "\">" + data.data.rows[i].f_name + "</a></p>";
                    str += "<p><span>" + data.data.rows[i].c_date.substring(0, 10) + "</span></p></div>";
                }
                $("._right_img").append(str);
                $("._right_img").on("click", 'a', function () {
                    var sv_id = $(this).attr("sv_id");
                    $(this).attr("href", httpXhr + "consult_detail.jsp?index=1&list="+list+"&" + "fid=" + encodeURI(sv_id))
                });
            }

        }
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
})