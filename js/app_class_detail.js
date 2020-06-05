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
    // 轮播图
    banner();
    // 单个课程详情
    $.ajax({
        type: "post",
        url: httpXhr + "courseController/appselectCourse.do?c_id=" + aid + "&random=" + random,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        success: function (data) {
            console.log(data)
            if (data.code == "200") {
                var json = data.data;
                // 标题
                $(".a_name").html(json.c_name);
                // 查看人数
                $(".list_ck>span").html(json.lookNum);
                // 点赞人数
                $(".list_dz>span").html(json.dzNum);
                // 学段
                var json_ai = [];
                json_ai = json.c_ageInterval;
                if (json_ai.indexOf("13") > -1 || json_ai.indexOf("14") > -1 || json_ai.indexOf("15") > -1) {
                    $(".head_lx").append(" <div class=\"list_lx\">幼儿园</div>  ");
                } else if (json_ai.indexOf("1") > -1 || json_ai.indexOf("2") > -1 || json_ai.indexOf("3") > -1 || json_ai.indexOf("4") > -1 || json_ai.indexOf("5") > -1 || json_ai.indexOf("6") > -1) {
                    $(".head_lx").append(" <div class=\"list_lx\">小学</div> ");
                } else if (json_ai.indexOf("7") > -1 || json_ai.indexOf("8") > -1 || json_ai.indexOf("9") > -1) {
                    $(".head_lx").append(" <div class=\"list_lx\">初中</div> ");
                } else if (json_ai.indexOf("10") > -1 || json_ai.indexOf("11") > -1 || json_ai.indexOf("12") > -1) {
                    $(".head_lx").append(" <div class=\"list_lx\">高中</div> ");
                }
                // 课时
                $(".list_fz").html("<span>[" + json.c_totalHours + "课时]</span><span>" + json.c_duration + "分钟</span><span>" + json.c_methods + "</span>");
                // 区域
                $(".list_ds").html(json.c_address);
            }
        }
    });
    // 课程介绍 
    $.ajax({
        type: "post",
        url: httpXhr + "courseAndResultController/appcourseAndResultList.do?c_id=" + aid + "&random=" + random,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        success: function (data) {
            var str = "";
            if (data.code == "200") {
                for (let index = 0; index < data.rows.length; index++) {
                    var img = encodeURI(encodeURI(data.rows[index].address));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<img src=\"" + fileUrl + "\">";
                }
                $(".act_content").append(str);
                $(".act_content img").css({
                    "width": "100%"
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


// 轮播图
function banner() {
    //----------------banner图轮播-------------
    $.ajax({
        type: "post",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        // url: httpXhr + 'roundMapController/approundMapList.do?type=1&tj=1',
        url: httpXhr + "courseController/appselectCourse.do?c_id=" + aid + "&random=" + random,
        success: function (data) {
            if (data.code == 200) { //请求成功
                var con = data.data; //
                var len = 1;
                var sort = con.sort; //排序
                //---------------循环图片（轮播图）-----
                // $.each(con, function (k, v) {
                //1
                var img = encodeURI(encodeURI(con.c_image));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                var src = con.c_image; //图片地址
                var imgId = con.c_id; //图片id
                var imgurl = con.c_id; //商品id
                var t = "<div class='swiper-slide'><a href='javascript:void(0)' imgId=" + imgId + " onclick='goDetails(" + imgId + "," + imgurl + ")'  imgurl=" + imgurl + " > <img src=" + fileUrl + "  imgurl=" + imgurl + "  /></a></div>";
                $('.swiper-wrapper').append(t)
                //2
                var img = encodeURI(encodeURI(con.c_image2));
                if (img != "") {
                    ++len;
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    var src = con.c_image2; //图片地址
                    var imgId = con.c_id; //图片id
                    var imgurl = con.c_id; //商品id
                    var t = "<div class='swiper-slide'><a href='javascript:void(0)' imgId=" + imgId + " onclick='goDetails(" + imgId + "," + imgurl + ")'  imgurl=" + imgurl + " > <img src=" + fileUrl + "  imgurl=" + imgurl + "  /></a></div>";
                    $('.swiper-wrapper').append(t)
                }
                //3
                var img = encodeURI(encodeURI(con.c_image3));
                if (img != "") {
                    ++len;

                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    var src = con.c_image3; //图片地址
                    var imgId = con.c_id; //图片id
                    var imgurl = con.c_id; //商品id
                    var t = "<div class='swiper-slide'><a href='javascript:void(0)' imgId=" + imgId + " onclick='goDetails(" + imgId + "," + imgurl + ")'  imgurl=" + imgurl + " > <img src=" + fileUrl + "  imgurl=" + imgurl + "  /></a></div>";
                    $('.swiper-wrapper').append(t)
                }
                //4
                var img = encodeURI(encodeURI(con.c_image4));
                if (img != "") {
                    ++len;
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    var src = con.c_image4; //图片地址
                    var imgId = con.c_id; //图片id
                    var imgurl = con.c_id; //商品id
                    var t = "<div class='swiper-slide'><a href='javascript:void(0)' imgId=" + imgId + " onclick='goDetails(" + imgId + "," + imgurl + ")'  imgurl=" + imgurl + " > <img src=" + fileUrl + "  imgurl=" + imgurl + "  /></a></div>";
                    $('.swiper-wrapper').append(t)
                }
                // });
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
                    autoplay: 4000, //每秒中轮播一次
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