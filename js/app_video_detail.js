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
$(function () {
    // 轮播图
    banner();
    // 单个活动详情
    $.ajax({
        type: "get",
        url: httpXhr + "activityController/appselectActivity.do?tj=1&a_id=" + aid,
        dataType: "jsonp",
        jsonp:"jsonpCallback",
        success: function (data) {
            var json = data.activity;
            // 活动介绍
            $(".act_content").append(data.activity.a_html);
            $(".act_content img").css("width", "100%");

            console.log(data)
        }
    });


    // 移动端文字适配
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');
    dpr = window.devicePixelRatio || 1;
    rem = docEl.clientWidth * dpr / 10;
    scale = 1 / dpr;
    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);
    // 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function (v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function (v) {
        v = parseFloat(v);
        return v / rem;
    };
    window.dpr = dpr;
    window.rem = rem;

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
        url: httpXhr + 'roundMapController/approundMapList.do?type=1&tj=1',
        success: function (data) {
            if (data.total != 0) { //请求成功
                var con = data.rows; //
                var len = data.rows.length;
                var sort = con.sort; //排序
                //---------------循环图片（轮播图）-----
                $.each(con, function (k, v) {
                    var img = encodeURI(encodeURI(con[k].rm_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    var src = con[k].rm_image; //图片地址
                    var imgId = con[k].id; //图片id
                    var sort = con[k].px; //排序
                    var imgurl = con[k].id; //商品id
                    var t = "<div class='swiper-slide'><a href='javascript:void(0)' imgId=" + imgId + " onclick='goDetails(" + imgId + "," + imgurl + ")'  imgurl=" + imgurl + " > <img src=" + fileUrl + "  imgurl=" + imgurl + "  /></a></div>";
                    $('.swiper-wrapper').append(t)
                });
            };
            if (len <= 1) {
                //swiper插件实现轮播图
                var mySwiper = new Swiper('.swiper-container', {
                    //autoplay: false, //可选选项，自动滑动
                    loop: false,
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