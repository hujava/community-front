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
var random=Math.random();
$(document).ready(function () {
    // 小视频详情
    $.ajax({
        type: "post",
        url: httpXhr + "/smallVideoController/selectSmallVideo.do?pc=1&sv_id=" + sv_id+"&random="+random,
        dataType: "json",
        success: function (data) {
            // 导航
            var dh = "";
            if (data.data.sv_type == "1") {
                dh = "生物多样性";
            } else if (data.data.sv_type == "2") {
                dh = "垃圾分类";
            } else if (data.data.sv_type == "3") {
                dh = "能源";
            } else if (data.data.sv_type == "4") {
                dh = "水资源";
            } else if (data.data.sv_type == "5") {
                dh = "自然与艺术";
            } else if (data.data.sv_type == "6") {
                dh = "科普环保";
            }
            $(".title_lx>a:nth-of-type(3)>span").html(dh);
            // 标题
            $(".sv_title").html(data.data.sv_title);
            // 查看人数
            $(".info_detail>span:nth-of-type(1)").html(data.data.lookNum);
            // 时间
            $(".info_detail>span:nth-of-type(2)").html(data.data.sv_date);
            // 来源
            if (data.data.sv_source != "" && data.data.sv_source != undefined && data.data.sv_source != null) {
                $(".info_detail>span:nth-of-type(3)").html("来源：" + data.data.sv_source);
            }
            // 视频介绍
            $(".video_info>p").html(data.data.sv_des);

            var img = encodeURI(encodeURI(data.data.sv_url));
            var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
            $(".content_video>video").attr("src", fileUrl);
        }
    });

    // 热点
    $.ajax({
        type: "post",
        url: httpXhr + "smallVideoController/smallVideoList.do?pc=1&tj=1"+"&random="+random,
        dataType: "json",
        success: function (data) {
            var str = "";
            var href_url="";
            var jsonL="";
            if(data.data.rows.length>5){
                jsonL=4;
            }else{
                jsonL=data.data.rows.lengthl;
            }
            for (var i = 0; i < jsonL; i++) {
                var img = encodeURI(encodeURI(data.data.rows[i].sv_image));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                str += "<div><img src=\"" + fileUrl + "\">";

                if(data.data.rows[i].sv_wurl!=""){
                    var href = encodeURI(encodeURI(data.data.rows[i].sv_wurl));
                    if(href.substring(href.lastIndexOf(".")+1)=="shtml"){
                        href_url =href;
                    }else{
                        href_url="";
                    }
                }else{
                    href_url="";
                }
                getByteLen(data.data.rows[i].sv_title);
                if (len > 28) {
                    str += "<p><a sv_id=\""+data.data.rows[i].sv_id+"\"  href=\"" + href_url + "\" target=\"_blank\">" + data.data.rows[i].sv_title.substring(0,13) + "...</a></p>";
                } else {
                    str += "<p><a sv_id=\""+data.data.rows[i].sv_id+"\"  href=\"" + href_url + "\" target=\"_blank\">" + data.data.rows[i].sv_title + "</a></p>";

                }
                str += "<p><img src=\"images/icon_time.png\"><span>" + data.data.rows[i].sv_date.substring(0, 10) + "</span></p></div>";
            }
            $("._right_img").append(str);
            $("._right_img").on("click", 'a', function () {
                if($(this).attr("href")==""){
                    var sv_id = $(this).attr("sv_id");
                    $(this).attr("href",httpXhr+"video_detail.jsp?index=2&" + "sv_id=" + encodeURI(sv_id))
                }
            });
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