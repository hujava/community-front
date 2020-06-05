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
var u_id = GetQueryString("u_id"); //
if (u_id != null && u_id.toString().length > 1) {
    var u_id = u_id;
}

var user_id = GetQueryString("user_id"); //
if (user_id != null && user_id.toString().length > 1) {
    var user_id = user_id;
}


var timer = ""; //定时器

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
$(document).ready(function () {
    // document.documentElement.style.fontSize = document.documentElement.clientWidth / 10.8 + 'px';

    // var userSettingRatio = parseFloat(window.getComputedStyle(document.documentElement).fontSize) / parseInt(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')); //获取比例
    // document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientWidth / 10.8 / userSettingRatio + 'px'; //wFsize 是我们根据页面宽度计算得rem，根据比例重新计算rem的大小。

    // // 计算出放大后的字体
    // var scaledFontSize = document.documentElement.clientWidth / 10.8;
    // // 计算原字体和放大后字体的比例
    // var scaleFactor = 16 / scaledFontSize;
    // // 取 html 元素的字体大小
    // var originRootFontSize = parseInt(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size'));
    // // 由于设置 font-size 后实际会变大，故 font-size 需设置为更小一级
    // document.documentElement.style.fontSize = originRootFontSize / scaleFactor + 'px';

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
    //input失去焦点
    $(".enroll_phone,input").on("blur", function () {
        //定时器
        if (timer != "") {
            clearTimeout(timer);
        }
        this.timer = setTimeout(() => {
            window.scrollTo(0, 0)
        }, 10);

        let e = event.currentTarget;
        setTimeout(() => {
            e.scrollIntoView({
                block: 'end',
                behavior: 'smooth'
            });
        }, 300);
        window.scrollTo(0, 0);
        //解决键盘弹出后挡表单的问题
        window.addEventListener('resize', function () {
            if (
                document.activeElement.tagName === 'INPUT' ||
                document.activeElement.tagName === 'TEXTAREA'
            ) {
                window.setTimeout(function () {
                    if ('scrollIntoView' in document.activeElement) {
                        document.activeElement.scrollIntoView();
                    } else {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }
                }, 0);
            }
        });
        this.timer = setTimeout(() => {
            document.body.scrollTop = 0;
            window.pageXOffset = 0;
            document.documentElement.scrollTop = 0;
        }, 100);

    });

    //初始化

    $.ajax({
        type: "post",
        url: httpXhr + "commodityController/wxcommodityList.do?pc=1&user_id=" + user_id+"&random="+random,
        dataType: "json",
        success: function (data) {
            $(".list_mk").html("");
            if (data.code == 200) {
                $(".log_text").show();
                var str = "";
                var json = data.data.rows;
                for (var index = 0; index < json.length; index++) {
                    var img = encodeURI(encodeURI(json[index].c_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div><img com_id=\"" + json[index].id + "\" src=\"" + fileUrl + "\">";
                    str += "<ul class=\"list_ul\"><li>" + json[index].cmd_name + "</li><li><span>" + json[index].cmd_price + "</span>积分</li><p>供应商：" + json[index].s_name + "</p>";
                    str += "<li><div class=\"exchange\" id=\"" + json[index].id + "\" jf=\"" + json[index].cmd_price + "\">立即兑换</div></li></ul></div>";
                }
                $(".list_mk").html(str);
                $(".list_mk>div").on("click", 'img', function () {
                    var com_id = $(this).attr("com_id");
                    location.href = "app_shopInfo.jsp?" + "com_id=" + com_id + "&user_id=" + user_id;
                });
                //立即兑换
                $(".exchange").click(function () {
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
                            url: httpXhr + "userController/wxexchangeCommodity.do?random="+random,
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
                                    $(".comm_model").click(function () {
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
                                    $(".s_jf>div").css("margin-top", "0rem");
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
            } else {
                $(".log_text").hide();
            }
        }
    });


    // 弹框关闭
    $(".closeJf").click(function () {
        $(".jf_model,.jf_background").hide();
        $(".confirm").show();
        $(".s_jf>div").css("margin-top", "0rem");
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

//跳转
$(".comm_model").click(function () {
    $(".comm_model,.add_background").hide();
});

window.onload = function () {
    var userSettingRatio = parseFloat(window.getComputedStyle(document.documentElement).fontSize) / parseInt(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')); //获取比例
    document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientWidth / 10.8 / userSettingRatio + 'px'; //wFsize 是我们根据页面宽度计算得rem，根据比例重新计算rem的大小。

}