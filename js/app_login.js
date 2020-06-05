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
var aid = GetQueryString("aid");
if (aid != null && aid.toString().length > 1) {
    var aid = aid;
}

var a_id = GetQueryString("a_id");
if (a_id != null && a_id.toString().length > 1) {
    var a_id = a_id;
}

var code = GetQueryString("code");
if (code != null && code.toString().length > 1) {
    var code = code;
}


var role = 0;
var comm_name = ""; //名称
var comm_val = "" //valu值
var canScroll = false; //底层是否滚动
var hlong = 60; //定时器
var timer = "";
var random = Math.random();

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
$(function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10.8 + 'px';

    $('.add_background,.comm_model').bind("touchmove", function (e) {
        e.preventDefault();
    });

    // 监听手机号码
    $(".logf_username>input").on("input", function () {
        var logf_username = $(this).val();
        if (logf_username != "") {
            $(".h_yzm").css({
                "border": "1px solid #3bcd80",
                "color": "#3bcd80",
                "background": "#fff"
            })
        } else {
            $(".h_yzm").css({
                "border": "none",
                "color": "#ececec",
                "background": "#d5d5d5"
            })
        }
    });
    /* 社区 select下拉 */
    $.ajax({
        type: "post",
        url: httpXhr + "areasController/areasList.do?a_level=5",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var str = "";
                for (var i = 0; i < data.data.rows.length; i++) {
                    str += "<li><span value='" + data.data.rows[i].a_id + "'>" + data.data.rows[i].a_name + "</span></li>";
                }
                $(".comm_list").html(str);
                // 社区点击事件
                $(".comm_list>li").click(function () {
                    $(this).find("span").css("border-bottom", "2px solid #3bcd80").parents().siblings().find("span").css("border-bottom", "2px solid #fff");
                    comm_name = $(this).find("span").text(); //名称
                    $(".add_community,.add_background").hide();
                    $(".logf_sq>div").html(comm_name).css("color", "#222");
                    comm_val = $(this).find("span").attr("value"); //value值
                });
            }
        }
    });


    // 用户协议切换
    // $(".ynxy img").click(function () {
    //     var ynxy = $(".ynxy img").attr("src");
    //     if (ynxy == "images/nxy.png") {
    //         $(".ynxy img").attr("src", "images/yxy.png");
    //         role = 1;
    //     } else {
    //         $(".ynxy img").attr("src", "images/nxy.png");
    //         role = 0;
    //     }
    // })
    //input失去焦点
    $("input").on("blur", function () {
        //定时器
        if (timer != "") {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            window.scrollTo(0, 0)
        }, 10);

        var e = event.currentTarget;
        setTimeout(function () {
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
        timer = setTimeout(function () {
            document.body.scrollTop = 0;
            window.pageXOffset = 0;
            document.documentElement.scrollTop = 0;
        }, 100);

    });

    // 注册
    $(".log_register").click(function () {
        var log_phone = $(".logf_username>input").val(); //手机号
        var log_name = $(".logf_name>input").val(); //昵称
        var password = $(".logf_password>input").val(); //密码
        var passwords = $(".logf_passwords>input").val(); //确认密码
        var login_yzm = $(".logf_yzm>input").val(); //验证码

        // 手机号验证
        if (!(/^1[3456789]\d{9}$/.test(log_phone))) {
            $(".comm_model>div").html("手机号码有误，请重填!")
            $(".comm_model,.add_background").show();
            return false;
        }
        // 判断是否同意协议
        if (password == "") {
            $(".comm_model>div").html("请输入密码！")
            $(".comm_model,.add_background").show();
            return;
        }
        // // 社区不能为空
        if (comm_val == undefined || comm_val == null || comm_val == "") {
            $(".comm_model>div").html("社区不能为空")
            $(".comm_model,.add_background").show();
            return;
        }
        // 判读确认密码是否一致
        if (password != passwords) {
            $(".comm_model>div").html("密码不一致！")
            $(".comm_model,.add_background").show();
            return;
        }
        //昵称非空验证
        if (log_name == undefined || log_name == null || log_name == "") {
            $(".comm_model>div").html("昵称不能为空！")
            $(".comm_model,.add_background").show();
            return;
        }
        var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if (log_name.match(regRule)) {
            log_name = log_name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            $(".comm_model>div").html("不支持表情!")
            $(".comm_model,.add_background").show();
            return false;
        }


        // 注册数据提交
        $.ajax({
            type: "post",
            url: httpXhr + "userController/regPhoneUser.do?random=" + random,
            data: {
                u_name: log_phone, //手机号
                a_name: log_name, //昵称
                p_word: password, //密码
                js: "2",
                code: login_yzm, //验证码
                areas_sq: comm_val, //社区ID
                wxcode: code
            },
            dataType: "json",
            success: function (data) {
                if (data.code == "200") {
                    $(".comm_model>div").html("注册成功！")
                    $(".comm_model,.add_background").show();
                    $(".comm_model").click(function () {
                        if (a_id != "" && a_id != null && a_id != undefined) {
                            location.href = "app_activity_detail.jsp?aid=" + a_id + "&phone=" + log_phone;
                        } else {
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
                        }
                    })
                } else {
                    $(".comm_model>div").html(data.msg);
                    $(".comm_model,.add_background").show();
                    //定时器
                    if (timer != "") {
                        clearTimeout(timer);
                    }
                    this.timer = setTimeout(function () {
                        window.scrollTo(0, 0)
                    }, 10);

                    let e = event.currentTarget;
                    setTimeout(function () {
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
                    this.timer = setTimeout(function () {
                        document.body.scrollTop = 0;
                        window.pageXOffset = 0;
                        document.documentElement.scrollTop = 0;
                    }, 100);

                }
            }
        });
    });

    // 选择社区点击事件
    $(".logf_sq>div").click(function () {
        $(".add_community,.add_background").show();
    });

    // 关闭
    $(".clone").click(function () {
        $(".add_community,.add_background").hide();
    });

    $(".comm_model").click(function () {
        $(".comm_model,.add_background").hide();
    });

    // 发送验证码
    $(".h_yzm").on("click", function () {
        var usernamef = $(".logf_username>input").val();
        if (usernamef == "" || usernamef == null || usernamef == undefined) {
            $(".comm_model>div").html("请输入手机号")
            $(".comm_model,.add_background").show();
            return false;
        }
        // 手机号验证
        if (!(/^1[3456789]\d{9}$/.test(usernamef))) {
            $(".comm_model>div").html("手机号码有误")
            $(".comm_model,.add_background").show();
            return false;
        }
        $(this).css({
            "border": "1px solid #eee",
            "color": "#888"
        })
        if (hlong < 60) {
            return false;
        } else {
            //定时器
            var t = window.setInterval(function () {
                if (hlong > 0) {
                    hlong = --hlong;
                    $(".h_yzm").html("重新发送" + "(" + hlong + ")")
                } else {
                    $(".h_yzm").css({
                        "border": "1px solid #3bcd80",
                        "color": "#3bcd80"
                    })
                    $(".h_yzm").html("发送验证码");
                    hlong = 60;
                    window.clearInterval(t);
                }
            }, 1000);
            $.ajax({
                type: "post",
                url: httpXhr + "userController/fscode.do",
                data: {
                    mobile: usernamef
                },
                dataType: "json",
                success: function (data) {}
            });
        }

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