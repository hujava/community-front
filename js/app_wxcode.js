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

var param1 = GetQueryString("cs_id"); //
if (param1 != null && param1.toString().length > 1) {
    var param1 = param1;
}
var param2 = GetQueryString("cs_code"); //
if (param2 != null && param1.toString().length > 1) {
    var param2 = param2;
}

var wxcode = GetQueryString("code"); //
if (wxcode != null && wxcode.toString().length > 1) {
    var wxcode = wxcode;
}


var code = "";
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

// 活动报名 
$(".submit_info").click(function () {
    var u_name = $(".enroll_phone").val();
    if (u_name == "" || u_name == null || u_name == undefined) {
        $(".comm_model>div").html("请输入手机号")
        $(".comm_model,.add_background").show();
        return false;
    }
    // 手机号验证
    if (!(/^1[3456789]\d{9}$/.test(u_name))) {
        $(".comm_model>div").html("手机号码有误")
        $(".comm_model,.add_background").show();
        return false;
    }
    $.ajax({
        type: "post",
        url: httpXhr + "userController/updateWXCode.do",
        data: {
            phone: u_name,
            wxcode: wxcode
        },
        dataType: "json",
        success: function (data) {
            code = data.code;
            if (data.code == "403") {
                $(".comm_model>div").html(data.msg)
                $(".comm_model,.add_background").show();
            } else if (data.code == "200") {
                $(".comm_model>div").html(data.msg)
                $(".comm_model,.add_background").show();
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
                $(".comm_model>div").html(data.msg)
                $(".comm_model,.add_background").show();
            }

        }
    });
})
//跳转
$(".comm_model").click(function () {
    // if (code == "200") {
    //     $(".comm_model,.add_background").hide();
    //     if (typeof WeixinJSBridge == "undefined") {
    //         if (document.addEventListener) {
    //             document.addEventListener('WeixinJSBridgeReady', weixin_ClosePage, false);
    //         } else if (document.attachEvent) {
    //             document.attachEvent('WeixinJSBridgeReady', weixin_ClosePage);
    //             document.attachEvent('onWeixinJSBridgeReady', weixin_ClosePage);
    //         }
    //     } else {
    //         WeixinJSBridge.call('closeWindow');
    //     }
    // } else {
    $(".comm_model,.add_background").hide();
    // }
});