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
var random = Math.random();
var inde = 0;

// Init初始化
var info_id = "";
var random = Math.random();
$(document).ready(function () {
    // 分页
    function exeData(num, type) {
        maker_list(num);
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

    //初始化
    window.setTimeout(function () {
        maker_list(1);
        loadpage();
    }, 100)

    $(".closeJf").click(function () {
        $(".jf_model,.jf_background").hide();
    });


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
});

// 背景图
$.ajax({
    type: "post",
    dataType: 'json',
    url: httpXhr + 'roundMapController/roundMapList.do?type=6&tj=1&pc_type=1' + "&random=" + random,
    success: function (data) {
        if (data.code == '200') {
            var img = encodeURI(encodeURI(data.data.rows[0].rm_image));
            var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
            $(".adposition_banner").css("background", "url('" + fileUrl + "') no-repeat");
        }
    }
});

function maker_list(num) {
    var userid = $(".adposition_title").attr("value");
    var allforse = "";
    if (userid == "0") {
        allforse = httpXhr + "commodityController/commodityList.do?pc=1&rows=8&page=" + num ;
    } else {
        allforse = httpXhr + "commodityController/commodityList.do?pc=1&rows=8&page=" + num + "&user_id=" + userid;
    }
    //初始化
    $.ajax({
        type: "post",
        url: allforse,
        dataType: "json",
        async: false,
        success: function (data) {
            $(".list_mk").html("");
            if (data.code == 200) {
                $("#PageCount").val(data.data.total);
                $(".log_text").show();
                var str = "";
                var json = data.data.rows;
                for (var index = 0; index < json.length; index++) {
                    var img = encodeURI(encodeURI(json[index].c_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div><img com_id=\"" + json[index].id + "\" src=\"" + fileUrl + "\">";
                    str += "<ul class=\"list_ul\"><li>" + json[index].cmd_name + "</li><li><img src=\"images/tree.png\"> = <span>" + json[index].cmd_price + "</span>叶子</li><p>供应商：" + json[index].s_name + "</p>";
                    str += "<li><div class=\"iwant\" id=\"" + json[index].id + "\"><img src=\"images/iwant1.png\">&nbsp;&nbsp;我想要</div></li>";
                    str += "<li><div class=\"exchange\" id=\"" + json[index].id + "\" jf=\"" + json[index].cmd_price + "\">立即兑换</div></li>";
                    str += "<li><span class=\"iwantr" + json[index].id + "\">" + json[index].dz + "</span>人想要</li></ul></div>";
                }
                $(".list_mk").html(str);
                // 详情
                $(".list_mk>div>img").on("click", function () {
                    var com_id = $(this).attr("com_id");
                    location.href = "shopInfo.jsp?" + "com_id=" + com_id + "&index=4" + "&uid=" + userid;
                });
                // 我想要
                $(".iwant").click(function () {
                    // if (inde != 0) {
                    //     return false;
                    // }
                    // inde++;
                    debugger
                    var user_id = $(".adposition_title").attr("value");
                    if (user_id == "0") {
                        $(".jf_model,.jf_background").show();
                        $(".model_title>span:nth-of-type(2)").html("我想要");
                        $(".s_jf>div").html("请先登录");
                        return false;
                    }
                    $(this).css({
                        "background": "#FD4F4F",
                        "color": "#fff"
                    });
                    $(this).find("img").attr("src", "images/iwant2.png");
                    var id = $(this).attr("id");
                    $.ajax({
                        type: "post",
                        url: httpXhr + "commodityController/updateCommodity.do?pc=1",
                        data: {
                            id: id, //商品ID
                            //mac: 10 ,//机器标识码
                            user_id: user_id //用户ID
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.code == 200) {
                                var iwantr = $(".iwantr" + id + "").html();
                                $(".iwantr" + id + "").html(++iwantr);
                            } else {
                                $(".jf_model,.jf_background").show();
                                $(".model_title>span:nth-of-type(2)").html("我想要");
                                $(".s_jf>div").html(data.msg);

                            }
                        }
                    });

                });
                //立即兑换
                $(".exchange").click(function () {
                    var cmd_id = $(this).attr("id");
                    var user_id = $(".adposition_title").attr("value");
                    var cmd_price = $(this).attr("jf");
                    if (user_id == "0") {
                        $(".jf_model,.jf_background").show();
                        $(".model_title>span:nth-of-type(2)").html("立即兑换");
                        $(".s_jf>div").html("请先登录");
                        return false;
                    }
                    $.ajax({
                        type: "post",
                        url: httpXhr + "userController/changeCommodity.do",
                        data: {
                            cmd_id: cmd_id, //商品ID
                            user_id: user_id, //用户ID
                            pc: "1"
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.code == 200) {
                                $.ajax({
                                    type: "post",
                                    url: httpXhr + "userController/exchangeCommodity.do",
                                    data: {
                                        cmd_id: cmd_id, //商品ID
                                        user_id: user_id, //用户ID
                                        cmd_price: cmd_price, //商品需要的积分
                                        pc: "1"
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        if (data.code == 200) {
                                            $(".jf_model,.jf_background").show();
                                            $(".model_title>span:nth-of-type(2)").html("立即兑换");
                                            $(".s_jf>img").attr("src", "images/forest_r.png");
                                            $(".s_jf>div").html("兑换成功，兑换码已发送至注册手机，请注意查收");
                                        } else {
                                            $(".jf_model,.jf_background").show();
                                            $(".s_jf>img").attr("src", "images/forest_r.png");
                                            $(".s_jf>div").html(data.msg);
                                        }
                                    }
                                });
                            } else {
                                $(".jf_model,.jf_background").show();
                                $(".model_title>span:nth-of-type(2)").html("立即兑换");
                                $(".s_jf>img").attr("src", "images/forest_r.png");
                                $(".s_jf>div").html("积分不足，兑换失败");
                            }
                        }
                    });

                });
            } else {
                $("#PageCount").val(10);
                $(".log_text").hide();
                if ($(".hot_mk").height() == 0 || $(".hot_mk").height() == null) {
                    $(".foot").css({
                        "position": "absolute",
                        "bottom": "0px"
                    });
                }
            }
        }
    });
}