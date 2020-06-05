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

var phone = GetQueryString("phone"); //课程ID
if (phone != null && phone.toString().length > 1) {
    var phone = phone;
}

var code = "";
var timer = ""; //定时器
var map = {};
var a_deadline = "";

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
    //判断是否在前面加0
    function getNow(s) {
        return s < 10 ? '0' + s : s;
    }
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取当前年
    var month = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    var currentdate = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);

    // document.documentElement.style.fontSize = document.documentElement.clientWidth / 10.8 + 'px';
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

    if (phone != "" || phone != null || phone != undefined) {
        $(".enroll_phone").val(phone);
    }


    //获取活动分类
    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?obj_type=2&pc=1&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code = 200) {
                var json = data.data.rows;
                var str = "";
                str += "<li  value=\"0\">全部</li>"
                for (let i = 0; i < json.length; i++) {
                    str += "<li class=\"class_" + (i + 1) + "\" value=\"" + json[i].obj_id + "\">" + json[i].obj_name + "</li>";
                    map[json[i].obj_id] = json[i].obj_name;
                }
                $(".nav_tab>ul").html(str);
            }
        }
    });
    //input失去焦点
    $("input").on("blur", function () {
        //定时器
        if (timer != "") {
            clearTimeout(timer);
        }
        // timer = setTimeout(() => {
        //     window.scrollTo(0, 0)
        // }, 10);
        function go() {
            window.scrollTo(0, 0);
        }
        timer = window.setTimeout(function () {
            go()
        }, 10);

        var e = event.currentTarget;
        // window.setTimeout(() => {
        //     e.scrollIntoView({
        //         block: 'end',
        //         behavior: 'smooth'
        //     });
        // }, 300);
        function go1() {
            e.scrollIntoView({
                block: 'end',
                behavior: 'smooth'
            });
        }
        window.setTimeout(function () {
            go1()
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
        // timer = setTimeout(() => {
        //     document.body.scrollTop = 0;
        //     window.pageXOffset = 0;
        //     document.documentElement.scrollTop = 0;
        // }, 100);
        function go2() {
            document.body.scrollTop = 0;
            window.pageXOffset = 0;
            document.documentElement.scrollTop = 0;
        }
        timer = window.setTimeout(function () {
            go2()
        }, 100);


    });

    // 轮播图
    banner();
    // 单个活动详情
    $.ajax({
        type: "get",
        url: httpXhr + "activityController/appselectActivity.do?tj=1&a_id=" + aid + "&time=" + new Date().getTime(),
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        async: false,
        success: function (data) {
            if (data.code == "200") {
                var json = data.data;
                // 活动介绍
                $(".act_content").append(json.a_html);
                $(".act_content img").css("width", "100%");

                // title
                $(".a_name").html(json.a_name);
                // $(".a_name").attr("title",data.activity.a_name);
                // 查看人数
                $(".list_ck>span").html(json.lookNum);
                // 点赞人数
                $(".list_dz>span").html(json.dzNum);
                // 活动类型
                var str = "";
                var a_typeClass = json.a_typeClass;
                str += "<div><div></div><div>" + map[a_typeClass] + "</div>";

                $(".list_lx").html(str);
                // 负责人
                $(".list_fz").html(json.a_manager);
                // 电话
                $(".list_tl").html(json.a_phone);
                // 邮箱
                $(".list_em").html(json.a_emall);
                // 截止时间
                a_deadline = json.a_deadline;
                if (currentdate > a_deadline) {
                    $(".submit_info").css({
                        "background": "#F2F3F4",
                        "color": "gray",
                        "cursor": "not-allowed"
                    })
                } else {
                    $(".submit_info").addClass("submit_save");
                    // 活动报名 
                    $(".submit_save").click(function () {
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
                            url: httpXhr + "registrationActivityController/addActivityGZH.do",
                            data: {
                                a_id: aid,
                                u_name: u_name
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
                                } else {
                                    $(".comm_model>div").html(data.msg)
                                    $(".comm_model,.add_background").show();
                                }

                            }
                        });
                    })
                }
                $(".list_jz").html(json.a_deadline);
                // 活动时间
                $(".list_hd1>p").html(json.a_startTime);
                $(".list_hd2>p").html(json.a_endTime);
                // 活动地点
                $(".list_ds").html(json.a_place);
                // 点赞
                $(".list_dz").attr("a_id", json.a_id);
                // 内容点赞
                $(".list_dz").click(function () {
                    if ($(this).attr("src") == "images/act_k.png") {
                        var dzNum = $(this).next().text();
                        $(this).next().text(++dzNum);
                        $(this).attr("src", "images/dz_d.png");
                        var a_id = $(this).attr("a_id");
                        $.ajax({
                            type: "post",
                            dataType: 'json',
                            url: httpXhr + 'activityController/updateActivity.do?a_id=' + a_id + "&random=" + random,
                            success: function (data) {
                                if (data.msg == "ok") {
                                    //alert("点赞成功！");
                                }
                            }
                        });
                    }
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
// 跳转
$(".comm_model").click(function () {
    if (code == "403") {
        $(".comm_model,.add_background").hide();
        location.href = "app_login.jsp?a_id=" + aid;
    } else if (code == "200") {
        $(".comm_model,.add_background").hide();
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
    } else {
        $(".comm_model,.add_background").hide();
    }
});

// 轮播图
function banner() {
    //----------------banner图轮播-------------
    $.ajax({
        type: "post",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        url: httpXhr + "activityController/appselectActivity.do?tj=1&a_id=" + aid,
        success: function (data) {
            if (data.code == 200) { //请求成功
                var con = data.data; //
                var len = 1;
                var sort = con.sort; //排序
                //---------------循环图片（轮播图）-----
                // $.each(con, function (k, v) {
                var img = encodeURI(encodeURI(con.a_image2));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                var src = con.a_image; //图片地址
                var imgId = con.a_id; //图片id
                var imgurl = con.a_id; //商品id
                var t = "<div class='swiper-slide'><a href='javascript:void(0)' imgId=" + imgId + " onclick='goDetails(" + imgId + "," + imgurl + ")'  imgurl=" + imgurl + " > <img src=" + fileUrl + "  imgurl=" + imgurl + "  /></a></div>";
                $('.swiper-wrapper').append(t)
            };
            if (len <= 1) {
                //swiper插件实现轮播图
                var mySwiper = new Swiper('.swiper-container', {
                    //autoplay: false, //可选选项，自动滑动
                    loop: false,
                    autoplay: 4000, //每秒中轮播一次
                    pagination: '.swiper-pagination',
                    paginationType: 'custom', //这里分页器类型必须设置为custom,即采用用户自定义配置
                    //navigation: { nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev'}, // 如果需要前进后退按钮
                    paginationCustomRender: function (swiper, current, total) {
                        var customPaginationHtml = "";
                        for (var i = 0; i < total; i++) {
                            //判断哪个分页器此刻应该被激活  
                            if (i == (current - 1)) {
                                customPaginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
                            } else {
                                customPaginationHtml += '<span class="swiper-pagination-customs"></span>';
                            }
                        }
                        return customPaginationHtml;
                    }
                });
            } else {
                //swiper插件实现轮播图
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: 3000, //每秒中轮播一次
                    loop: true, //可以让图片循环轮播
                    autoplayDisableOnInteraction: false, //在点击之后可以继续实现轮播
                    pagination: ".swiper-pagination", //让小圆点显示
                    paginationClickable: true, //实现小圆点点击
                    // prevButton: ".swiper-button-prev", //实现上一页的点击
                    // nextButton: ".swiper-button-next", //实现下一页的点击
                    //effect:"flip"//可以实现3D效果的轮播
                });
            }
            // $(".swiper-button-prev,.swiper-container-rtl,.swiper-button-next").css("background-image", "images/sy_zjtc.png");
            // $(".swiper-button-next,.swiper-container-rtl,.swiper-button-prev").css("background-image", "images/sy_yjtc.png");
        }
    });
}