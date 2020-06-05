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
var aid = GetQueryString("aid"); //课程ID
if (aid != null && aid.toString().length > 1) {
    var aid = aid;
}

// Init初始化
var info_id = "";
var random = Math.random();
$(document).ready(function () {
    // 小知识详情
    $.ajax({
        type: "post",
        url: httpXhr + "littleKnowledgeController/selectLittleKnowledge.do?pc=1&l_id=" + aid,
        dataType: "json",
        success: function (data) {
            console.log(data);
            //导航
            // var dh = "";
            // if (data.data.sv_type == "1") {
            //     dh = "生物多样性";
            // } else if (data.data.l_type == "2") {
            //     dh = "垃圾分类";
            // } else if (data.data.l_type == "3") {
            //     dh = "能源";
            // } else if (data.data.l_type == "4") {
            //     dh = "水资源";
            // } else if (data.data.l_type == "5") {
            //     dh = "自然与艺术";
            // } else if (data.data.l_type == "6") {
            //     dh = "科普环保";
            // }
            // $(".title_lx>a:nth-of-type(3)>span").html(dh);
            // 标题
            $(".sv_title").html(data.data.l_title);
            // 查看人数
            $(".info_detail>span:nth-of-type(1)").html(data.data.lookNum);
            // 时间
            $(".info_detail>span:nth-of-type(2)").html(data.data.l_date);
            // 来源
            if (data.data.l_source != "" && data.data.l_source != undefined && data.data.l_source != null) {
                $(".info_detail>span:nth-of-type(3)").html("来源：" + data.data.l_source);
            }
            // 视频介绍
            $(".video_info>p").html(data.data.l_centent);
            $(".video_info img").css({
                "width": "620px","margin":"0px 90px 0px 70px"
            });
        }
    });

    // 热点
    $.ajax({
        type: "post",
        url: httpXhr + "littleKnowledgeController/littleKnowledgeList.do?tj=1&pc=1" + "&random=" + random,
        dataType: "json",
        success: function (data) {
            console.log(data)
            var str = "";
            var href_url = "";
            for (var i = 0; i < data.data.rows.length; i++) {
                str += "<div>";
                str += "<p><a sv_id=\"" + data.data.rows[i].l_id + "\">" + data.data.rows[i].l_title + "</a></p>";
                str += "<p><span>" + data.data.rows[i].l_date.substring(0, 10) + "</span></p>";
                str += "</div>";
            }
            $("._right_img").append(str);
            $("._right_img").on("click", 'a', function () {
                var sv_id = $(this).attr("sv_id");
                $(this).attr("href", httpXhr + "know_detail.jsp?index=2&" + "aid=" + encodeURI(sv_id))
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