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
var map = {}; //社区list

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

    $('.add_background,.comm_model').bind("touchmove", function (e) {
        e.preventDefault();
    });
    // 下拉·刷新
    // window.onload = function () {
    //     //1.获取到列表的dom，刷新显示部分的dom，列表父容器的dom
    //     let container = document.querySelector('#log_qr');
    //     let refreshText = document.querySelector('.info_con');
    //     let parent = document.querySelector('.containers');
    //     //2.定义一些需要常用的变量
    //     let startY = 0; //手指触摸最开始的Y坐标
    //     let endY = 0; //手指结束触摸时的Y坐标
    //     //3.给列表dom监听touchstart事件,得到起始位置的Y坐标
    //     parent.addEventListener('touchstart', function (e) {
    //         startY = e.touches[0].pageY;
    //     });
    //     //4.给列表dom监听touchmove事件，当移动到一定程度需要显示上面的文字
    //     parent.addEventListener('touchmove', function (e) {
    //         if (isTop() && (e.touches[0].pageY - startY) > 0) {

    //             refreshText.style.height = "50px";
    //             parent.style.transform = "translateY(50px)";
    //             parent.style.transition = "all ease 0.5s";
    //             window.location.reload();
    //         }
    //     });
    //     //5.给列表dom监听touchend事件，此时说明用户已经松开了手指，应该进行异步操作了
    //     parent.addEventListener('touchend', function (e) {
    //         if (isTop()) {
    //             window.location.reload();
    //             setTimeout(function () {
    //                 parent.style.transform = "translateY(0)";
    //             }, 2000)
    //         }
    //         return;
    //     })
    //     function isTop() {
    //         var t = document.documentElement.scrollTop || document.body.scrollTop;
    //         return t === 0 ? true : false;
    //     }
    // }


    //
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
                    map[data.data.rows[i].a_id] = data.data.rows[i].a_name;
                }
                $(".comm_list").html(str);
                // 获取个人信息  
                $.ajax({
                    type: "post",
                    url: httpXhr + "userController/selectWXCode.do?wxcode=" + wxcode + "&random=" + random,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        if (data.code == "200") {
                            var json = data.data;
                            var u_name = json.u_name;
                            var img = encodeURI(encodeURI(json.u_url));
                            var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                            $(".log_img>img").attr("src", fileUrl);
                            $(".log_name").html(json.a_name);
                            $(".log_sq").html(map[json.areas_sq]);
                            $(".log_jf>span").html(json.jf);
                            //二维码
                            $.ajax({
                                type: "post",
                                url: httpXhr + "userController/selectUser.do?pc=1&u_name=" + u_name + "&random=" + random,
                                dataType: "json",
                                success: function (data) {
                                    if (data.code == "200") {
                                        $(".log_qr>div").show();
                                        var fileUrl = httpXhr + "getFileController/getQRFile.do?phone=" + u_name;
                                        $(".log_qr>img").attr("src", fileUrl);
                                    }
                                }
                            });
                        } else {
                            $(".comm_model>div").html(data.msg)
                            $(".comm_model,.add_background").show();
                        }
                    }
                });
                // 社区点击事件
                $(".comm_list>li").click(function () {
                    $(this).find("span").css("border-bottom", "2px solid #3bcd80").parents().siblings().find("span").css("border-bottom", "2px solid #fff");
                    comm_name = $(this).find("span").text(); //名称
                    $(".log_sq>div").html(comm_name);
                    $(".add_community,.add_background").hide();
                    $(".logf_sq>div").html(comm_name).css("color", "#222");
                    comm_val = $(this).find("span").attr("value"); //value值
                });
            }
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

// 选择社区点击事件
$(".log_sq>div").click(function () {
    $(".add_community,.add_background").show();
});

// 关闭
$(".clone").click(function () {
    $(".add_community,.add_background").hide();
});

$(".comm_model").click(function () {
    $(".comm_model,.add_background").hide();
});

//跳转
$(".comm_model").click(function () {
    $(".comm_model,.add_background").hide();
});

window.onload = function () {
    var userSettingRatio = parseFloat(window.getComputedStyle(document.documentElement).fontSize) / parseInt(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')); //获取比例
    document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientWidth / 10.8 / userSettingRatio + 'px'; //wFsize 是我们根据页面宽度计算得rem，根据比例重新计算rem的大小。

}