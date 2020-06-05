
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

/* 获取参数开始 */
var com_id = GetQueryString("com_id"); //商品ID
if (com_id != null && com_id.toString().length > 1) {
    var com_id = com_id;
}

/* 获取参数开始 */
var uid = GetQueryString("uid"); //商品ID
if (uid != null && uid.toString().length > 1) {
    var uid = uid;
}

var cmd_price = "";

// Init初始化
var info_id = "";
var random = Math.random();
$(function () {
    // 导航栏
    $('.tabsholder').cardTabs({
        theme: 'graygreen'
    });
    /* 吸顶效果*/
    $(".tabsholder>div:nth-of-type(1)").attr("id", "wrap");
    var obj = document.getElementById("wrap");
    var ot = obj.offsetTop;
    document.onscroll = function () {
        var st = document.body.scrollTop || document.documentElement.scrollTop;
        obj.setAttribute("data-fixed", st >= 610 ? "fixed" : "");
    }

    /*
     * 封装吸顶函数，需结合css实现。
     * 也可以直接用js改变样式，可以自行修改。
     */
    function ceiling(obj) {
        var ot = obj.offsetTop;
        document.onscroll = function () {
            var st = document.body.scrollTop || document.documentElement.scrollTop;
            /*
             * 在这里我给obj添加一个自定义属性。className可能会影响原有的class
             * 三元运算使代码更简洁
             */
            obj.setAttribute("data-fixed", st >= 610 ? "fixed" : "");
            // $("#wrap[data-fixed=\"fixed\"]").css("margin-left","0px;");
        }
    }
    window.onload = function () {
        /*获取导航对象*/
        var wrap = document.getElementById("wrap");
        ceiling(wrap) /*调用吸顶函数  */
    };
    // 活动详情
    $.ajax({
        type: "post",
        url: httpXhr + "commodityController/selectCommodity.do?id=" + com_id,
        dataType: "json",
        /* async:false,*/
        success: function (data) {
            var shopInfo = data.commodity;

            $(".info_content>h4").html(shopInfo.cmd_name);
            $(".csyleDes").html(shopInfo.cmd_des);

            cmd_price = shopInfo.cmd_price;
            //课程图片
            var img = encodeURI(encodeURI(shopInfo.c_image));
            $(".info_img>img").attr("src", httpXhr + "getFileController/getFile.do?fileName=" + img);

            // 我想要人数
            $(".iwantr").find("span").html(shopInfo.dz);
        }
    })
    //商品首图
    $.ajax({
        type: "post",
        url: httpXhr + "commodityController/commodityResultList.do?com_id=" + com_id,
        dataType: "json",
        success: function (dt) {
            var strr = "";
            if (dt.rows != null && dt.rows.length > 0) {
                //$(".courseAct").html(dt.rows[0].act.a_des);
                for (var i = 0; i < dt.rows.length; i++) {
                    var img = encodeURI(encodeURI(dt.rows[i].f_address));
                    strr += "<img src=\"" + httpXhr + "getFileController/getFile.do?fileName=" + img + "\">";
                }
                $(".courseinfoPic").html(strr);
            }

        }
    });


    // 推荐活动
    $.ajax({
        type: "post",
        url: httpXhr + "commodityController/commodityList.do?pc=1&user_id=" + uid,
        dataType: "json",
        success: function (data) {
            var str = "";
            var dataJson = data.data.rows;
            var inx = "";
            if (dataJson.length > 3) {
                inx = 3;
            } else {
                inx = dataJson.length;
            }
            for (var i = 0; i < inx; i++) {
                var img = encodeURI(encodeURI(dataJson[i].c_image));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                str += "<div aid=" + dataJson[i].id + "><img src=\"" + fileUrl + "\">";
                str += "<p title=\"" + dataJson[i].cmd_name + "\">" + dataJson[i].cmd_name + "</p></div>";
            }
            $("._right_img").html(str);
            /* 点击课程，查询详细信息 */
            $("._right_img").on("click", 'div', function () {
                var aid = $(this).attr("aid");
                location.href = "shopInfo.jsp?" + "com_id=" + aid + "&index=4"+"&uid="+uid;
            });
        }
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

// 我想要
$(".iwant").click(function () {
    // inde++;
    // var user_id = $(".adposition_title").attr("value");
    // if (user_id == "0") {
    //     $(".jf_model,.jf_background").show();
    //     $(".model_title>span:nth-of-type(2)").html("我想要");
    //     $(".s_jf>div").html("请先登录");
    //     return false;
    // }
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
            id: com_id, //商品ID
            //mac: 10 ,//机器标识码
            user_id: uid //用户ID
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var iwantr = $(".iwantr").find("span").html();
                $(".iwantr").find("span").html(++iwantr);
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
    $.ajax({
        type: "post",
        url: httpXhr + "userController/changeCommodity.do",
        data: {
            cmd_id: com_id, //商品ID
            user_id: uid, //用户ID
            pc: "1"
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                $.ajax({
                    type: "post",
                    url: httpXhr + "userController/exchangeCommodity.do",
                    data: {
                        cmd_id: com_id, //商品ID
                        user_id: uid, //用户ID
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

// 关闭提示框
$(".closeJf").click(function () {
    $(".jf_model,.jf_background").hide();
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