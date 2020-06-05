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
var cli = getRootPath();
/* 地址栏参数截取 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

/* 获取参数开始 */
var com_id = GetQueryString("com_id"); //商品ID
if (com_id != null && com_id.toString().length > 1) {
    var com_id = com_id;
}

/* 获取参数开始 */
var wxcode = GetQueryString("code"); //商品ID
if (wxcode != null && wxcode.toString().length > 1) {
    var wxcode = wxcode;
}

/* 获取参数开始 */
var user_id = GetQueryString("user_id"); //商品ID
if (user_id != null && user_id.toString().length > 1) {
    var user_id = user_id;
}


var cId = ""; //预约点击课程ID
var htpxhr = ""; //获取本机地址

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
/* 初始化 */
$(function () {
    //换算
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10.8 + 'px';
    $('.add_background,.comm_model').bind("touchmove", function (e) {
        e.preventDefault();
    });
    if (window.plus) {
        plusReady();
    } else {
        document.addEventListener('plusready', plusReady, false);
    }

    function plusReady() {
        plus.cache.clear(function () {
            callback();
        });
    }

    // 轮播
    cId = com_id;
    var httpXhr = getRootPath();
    htpxhr = httpXhr;
    $.ajax({
        type: "post",
        url: httpXhr + "commodityController/selectCommodity.do?id=" + com_id,
        dataType: "json",
        /* async:false,*/
        success: function (data) {
            var shopInfo = data.commodity;
            console.log(shopInfo);

            $(".a_name").html(shopInfo.cmd_name);
            $(".csyleDes").html(shopInfo.cmd_des);

            //课程图片
            var img = encodeURI(encodeURI(shopInfo.c_image));
            $(".lbt img").attr("src", httpXhr + "getFileController/getFile.do?fileName=" + img);

            //积分
            $(".list_lx").html(shopInfo.cmd_price + "积分")
            $(".submit_info").attr("id", shopInfo.id);
            $(".submit_info").attr("jf", shopInfo.cmd_price);
            $(".list_sname").html(shopInfo.supplierVo.s_name);

            //图片二维码
            //var img=encodeURI(encodeURI(shopInfo.c_image));
            //$(".hourLen>img").attr("src",httpXhr+"getFileController/getFile.do?fileName="+img);
        }
    })
    //商品详情
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
                $(".act_content").html(strr);
                $(".act_content img").css({
                    "width": "100%",
                    "margin-bottom": "0.3rem"
                });
            }

        }
    });

});


//  立即兑换
$(".submit_info").click(function () {
    var cmd_id = $(this).attr("id");
    var cmd_price = $(this).attr("jf");
    $(".confirm").show();
    $(".s_jf>img").hide();
    $(".s_jf>div").html("是否兑换商品。");
    $(".jf_model,.jf_background").show();
    $(".confirm>div:nth-of-type(1)").click(function () {
        $(".jf_model,.jf_background").hide();
        $.ajax({
            type: "post",
            url: cli + "userController/wxexchangeCommodity.do",
            data: {
                cmd_id: cmd_id, //商品ID
                user_id: user_id, //用户ID
                cmd_price: cmd_price, //商品需要的积分
                pc: "1"
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    $(".confirm").hide();
                    $(".jf_model,.jf_background").show();
                    $(".model_title>span:nth-of-type(2)").html("立即兑换");
                    $(".s_jf>img").attr("src", "images/forest_r.png");
                    $(".s_jf>div").html(data.msg);
                    $(".closeJf").click(function () {
                        if (typeof WeixinJSBridge == "undefined") {
                            if (document.addEventListener) {
                                document.addEventListener('WeixinJSBridgeReady', weixin_ClosePage, false);
                            } else if (document.attachEvent) {
                                document.attachEvent('WeixinJSBridgeReady', weixin_ClosePage);
                                document.attachEvent('onWeixinJSBridgeReady', weixin_ClosePage);
                            }
                        } else {
                            WeixinJSBridge.call('closeWindow');
                        }
                    })
                } else {
                    $(".confirm").hide();
                    $(".s_jf>img").show();
                    $(".jf_model,.jf_background").show();
                    $(".model_title>span:nth-of-type(2)").html("立即兑换");
                    $(".s_jf>img").attr("src", "images/forest_e.png");
                    $(".s_jf>div").html(data.msg);
                }
            }
        });
    });
    $(".confirm>div:nth-of-type(2)").click(function () {
        $(".jf_model,.jf_background").hide();
        $(".s_jf>img").show();
        $(".s_jf>div").css("margin-top", "0rem");
        return false;
    });
});

// 弹框关闭
$(".closeJf").click(function () {
    $(".jf_model,.jf_background").hide();
    $(".confirm").show();
    $(".s_jf>div").css("margin-top", "0rem");
});

/* 初始化及屏幕缩放计算*/
window.onload = window.onresize = function () {
    var body1 = $(".teacherPhoto").height() + 70;
    var body2 = $(".teacherDes").height();
    $(".courseBookTool").css("margin-top", body1 + body2 + "px");
};