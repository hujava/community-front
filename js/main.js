//js获取项目根路径，如： http://localhost:8083/uimcardprj
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
var map = {};

$(function () {
    //获取活动分类
    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?obj_type=999&pc=1&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code = 200) {
                var json = data.data.rows;
                for (let i = 0; i < json.length; i++) {
                    map[json[i].obj_id] = json[i].obj_name;
                }
            }
        }
    });
    // 轮播图
    banner();
    // 热门活动四模块
    hot_mk();
    // 最资讯-新闻
    info_new();
    // 最资讯-通知
    info_inform();
    // 校园公益
    school_pubGood();
    // 垃圾分类小视频
    eco_video();
    // 小知识
    list_xzs();


    // 热门活动点击跳转
    $(".hot-right>div>a").click(function () {
        var vl = $(this).attr("value");
        location.href = "e_password.jsp?index=4&" + "vl=" + encodeURI(vl);
    });
    $(".queryAll").click(function () {
        location.href = "sc_wl.jsp?index=7";
    });

    // 通知、公告切换
    $(".title_info>p").click(function () {
        $(this).css({
            "color": "#fff",
            "background": "url('images/info.png')"
        });
        $(this).siblings().css({
            "color": "#555",
            "background": "url('')"
        });
        if ($(this).text() == "通知") {
            info_inform();
        } else { //公告
            info_notice();
        }
    })

})

// 轮播图
function banner() {
    //----------------banner图轮播-------------
    $.ajax({
        type: "post",
        dataType: 'json',
        url: httpXhr + 'roundMapController/roundMapList.do?type=1&pc_type=1' + "&random=" + random,
        success: function (data) {
            if (data.total != 0) { //请求成功
                var con = data.data.rows; //
                var len = data.data.rows.length;
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
                    prevButton: ".swiper-button-prev", //实现上一页的点击
                    nextButton: ".swiper-button-next", //实现下一页的点击
                    //effect:"flip"//可以实现3D效果的轮播
                });
            }
            $(".swiper-button-prev,.swiper-container-rtl,.swiper-button-next").css("background-image", "images/sy_zjtc.png");
            $(".swiper-button-next,.swiper-container-rtl,.swiper-button-prev").css("background-image", "images/sy_yjtc.png");
        }
    });
}

// 热门活动四模块
function hot_mk() {
    $.ajax({
        type: "post",
        url: httpXhr + "activityController/activityList.do?page=1&rows=4&tj=1&pc=1" + "&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            var str = "";
            for (var i = 0; i < data.data.rows.length; i++) {
                var img = encodeURI(encodeURI(data.data.rows[i].a_image));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                var a_typeClass = data.data.rows[i].a_typeClass;
                //1:绿色环保2:生态健康3:人文建设
                str += "<div><div></div><div>" + map[a_typeClass] + "</div>";
                str += "<img class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\" src=\"" + fileUrl + "\">";
                str += "<p class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\">" + data.data.rows[i].a_name + "</p>";
                str += "<p>截止：<span>" + data.data.rows[i].a_endTime + "</span></p>";
                str += "<p><img src=\"images/act-s.png\"><span>" + data.data.rows[i].lookNum + "</span>";
                str += "<img src=\"images/act-z.png\" class=\"dzNum\" a_id=\"" + data.data.rows[i].a_id + "\"><span>" + data.data.rows[i].dzNum + "</span><span class=\"insView\" aid=\"" + data.data.rows[i].a_id + "\">立即查看</span></p></div>";
            }
            $(".hot_mk").html(str);
            /* 点击活动，查询详细信息 */
            $(".hot_mk").on("click", '.insView', function () {
                var aid = $(this).attr("aid");
                var titName = $(this).prev().html();
                location.href = "activity_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=3&list=1&titName=" + encodeURI(encodeURI(titName));
            });


        }
    })
}


// 最新资讯_新闻
function info_new() {
    $.ajax({
        type: "post",
        url: httpXhr + "informationController/informationList.do?f_type=1&tj=1&pc=1" + "&random=" + random,
        dataType: "json",
        // async: false,
        success: function (data) {
            var str = "";
            var strr = "";
            var jsonL = data.data.rows.length;
            if (jsonL > 4) {
                jsonL = 4;
            } else {
                jsonL = data.data.rows.length;
            }
            for (var i = 0; i < jsonL; i++) {
                if (i == 0) {
                    var img = encodeURI(encodeURI(data.data.rows[i].f_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<img fid=" + data.data.rows[i].f_id + " src=\"" + fileUrl + "\">";
                    str += "<p fid=" + data.data.rows[i].f_id + ">" + data.data.rows[i].f_name + "</p>";
                    str += "<p fid=" + data.data.rows[i].f_id + ">" + data.data.rows[i].c_date + "</p>";
                    getByteLen(data.data.rows[i].f_center);
                    if (len > 58) {
                        str += "<p fid=" + data.data.rows[i].f_id + ">" + data.data.rows[i].f_center.substring(0, 50) + "...</p>";
                    } else {
                        str += "<p fid=" + data.data.rows[i].f_id + ">" + data.data.rows[i].f_center + "</p>";
                    }
                } else {
                    strr += "<div fid=\"" + data.data.rows[i].f_id + "\"><p>" + data.data.rows[i].f_name + "</p>";
                    strr += "<p>" + data.data.rows[i].c_date + "</p>";
                    getByteLen(data.data.rows[i].f_center);
                    if (len > 58) {
                        strr += "<p>" + data.data.rows[i].f_center.substring(0, 100) + "...</p></div>";
                    } else {
                        strr += "<p>" + data.data.rows[i].f_center + "</p></div>";
                    }
                }
            }
            $(".eco_news_i").html(str);
            $(".eco_news").html(strr);
            /* 新闻跳转 */
            $(".eco_news_i").on("click", 'p', function () {
                var fid = $(this).attr("fid");
                location.href = "consult_detail.jsp?" + "fid=" + encodeURI(fid) + "&index=1&list=1";
            });
            $(".eco_news_i").on("click", 'img', function () {
                var fid = $(this).attr("fid");
                location.href = "consult_detail.jsp?" + "fid=" + encodeURI(fid) + "&index=1&list=1";
            });
            $(".eco_news").on("click", 'div', function () {
                var fid = $(this).attr("fid");
                location.href = "consult_detail.jsp?" + "fid=" + fid + "&index=1&list=1";
            });

        }
    })
}

// 最新资讯_通知
function info_inform() {
    $.ajax({
        type: "post",
        url: httpXhr + "informationController/informationList.do?f_type=2&pc=1" + "&random=" + random,
        dataType: "json",
        success: function (data) {
            $(".title_acl").html("");
            if (data.code == 200) {
                var str = "";
                var inx = "";
                if (data.data.rows.length > 5) {
                    inx = 5;
                } else {
                    inx = data.data.rows.length;
                }
                for (var i = 0; i < inx; i++) {
                    str += "<div><div></div>";
                    str += "<div fid=" + data.data.rows[i].f_id + ">" + data.data.rows[i].f_name + "</div>";
                    str += "<div fid=" + data.data.rows[i].f_id + ">" + data.data.rows[i].f_center + "</div></div><div style=\"clear: both;\"></div>";
                }
                $(".title_acl").html(str);
                $(".title_acl").on("click", 'div>div', function () {
                    var fid = $(this).attr("fid");
                    location.href = "consult_detail.jsp?" + "fid=" + encodeURI(fid) + "&index=1&list=2";
                });
            }
        }
    })
}

// 最新资讯_公告
function info_notice() {
    $.ajax({
        type: "post",
        url: httpXhr + "informationController/informationList.do?f_type=3&tj=1&pc=1" + "&random=" + random,
        dataType: "json",
        // async: false,
        success: function (data) {
            $(".title_acl").html("");
            if (data.code == 200) {
                var str = "";
                var inx = "";
                if (data.data.rows.length > 5) {
                    inx = 5;
                } else {
                    inx = data.data.rows.length;
                }
                for (var i = 0; i < inx; i++) {
                    str += "<div><div></div>";
                    str += "<div fid=" + data.data.rows[i].f_id + ">" + data.data.rows[i].f_name + "</div>";
                    str += "<div fid=" + data.data.rows[i].f_id + ">" + data.data.rows[i].f_center + "</div></div><div style=\"clear: both;\"></div>";
                }
                $(".title_acl").html(str);
                $(".title_acl").on("click", 'div>div', function () {
                    var fid = $(this).attr("fid");
                    location.href = "consult_detail.jsp?" + "fid=" + encodeURI(fid) + "&index=1&list=3";
                });
            }
        }
    })
}

// 荣誉之星
function school_pubGood() {
    $.ajax({ //小学
        type: "post",
        url: httpXhr + "userController/usersList.do?pc=1&sort=jf" + "&random=" + random,
        dataType: "json",
        // async: false,
        success: function (data) {
            if (data.code == 200) {
                // 1-3
                $(".sma_school").show();
                var str = "";
                str += " <div></div>";
                for (var i = 0; i < 3; i++) {
                    var img = encodeURI(encodeURI(data.data.rows[i].u_url));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div><img src=\"images/n_" + (i + 1) + ".png\"><img src=\"" + fileUrl + "\">";
                    getByteLen(data.data.rows[i].a_name);
                    if (len > 20) {
                        str += "<p>" + data.data.rows[i].a_name.substring(0, 9) + "...</p>";
                    } else {
                        str += "<p>" + data.data.rows[i].a_name + "</p>";
                    }
                    str += "</div>";

                }
                $(".sma_school").html(str);
                // 4-6
                $(".pri_school").show();
                var str = "";
                str += " <div></div>";
                for (var i = 3; i < 6; i++) {
                    var img = encodeURI(encodeURI(data.data.rows[i].u_url));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div><div><div>" + (i + 1) + "</div></div><img src=\"" + fileUrl + "\"/>";
                    getByteLen(data.data.rows[i].a_name);
                    if (len > 20) {
                        str += "<p>" + data.data.rows[i].a_name.substring(0, 9) + "...</p>";
                    } else {
                        str += "<p>" + data.data.rows[i].a_name + "</p>";
                    }
                    str += "</div>";
                }
                $(".pri_school").html(str);
                // 7-9
                $(".mid_school").show();
                var str = "";
                str += " <div></div>";
                for (var i = 6; i < 9; i++) {
                    var img = encodeURI(encodeURI(data.data.rows[i].u_url));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div><div><div>" + (i + 1) + "</div></div><img src=\"" + fileUrl + "\"/>";
                    getByteLen(data.data.rows[i].a_name);
                    if (len > 20) {
                        str += "<p>" + data.data.rows[i].a_name.substring(0, 9) + "...</p>";
                    } else {
                        str += "<p>" + data.data.rows[i].a_name + "</p>";
                    }
                    str += "</div>";

                }
                $(".mid_school").html(str);

            }
        }
    })
    // $.ajax({
    //     type: "post",
    //     url: httpXhr + "schoolController/schoolList.do?pc=1&s_type=2&tj=1" + "&random=" + random,
    //     dataType: "json",
    //     // async: false,
    //     success: function (data) {
    //         if (data.total != 0) {
    //             $(".pri_school").show();
    //             var str = "";
    //             str += " <div>初中</div>";
    //             var index = 0;
    //             if (data.data.rows.length > 3) {
    //                 index = 3;
    //             } else {
    //                 index = data.data.rows.length;
    //             }
    //             for (var i = 0; i < index; i++) {
    //                 var img = encodeURI(encodeURI(data.data.rows[i].s_url));
    //                 var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
    //                 str += "<div><img src=\"images/n_" + (i + 1) + ".png\"><img src=\"" + fileUrl + "\">";
    //                 getByteLen(data.data.rows[i].s_name);
    //                 if (len > 20) {
    //                     str += "<p>" + data.data.rows[i].s_name.substring(0, 9) + "...</p>";
    //                 } else {
    //                     str += "<p>" + data.data.rows[i].s_name + "</p>";
    //                 }
    //                 str += "</div>";

    //             }
    //             $(".pri_school").html(str);
    //         }
    //     }
    // })
    // $.ajax({
    //     type: "post",
    //     url: httpXhr + "schoolController/schoolList.do?pc=1&s_type=3&tj=1" + "&random=" + random,
    //     dataType: "json",
    //     // async: false,
    //     success: function (data) {
    //         if (data.total != 0) {
    //             $(".mid_school").show();
    //             var str = "";
    //             str += " <div>高中</div>";
    //             if (data.data.rows.length > 3) {
    //                 index = 3;
    //             } else {
    //                 index = data.data.rows.length;
    //             }
    //             for (var i = 0; i < index; i++) {
    //                 var img = encodeURI(encodeURI(data.data.rows[i].s_url));
    //                 var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
    //                 str += "<div><img src=\"images/n_" + (i + 1) + ".png\"><img src=\"" + fileUrl + "\">";
    //                 getByteLen(data.data.rows[i].s_name);
    //                 if (len > 20) {
    //                     str += "<p>" + data.data.rows[i].s_name.substring(0, 9) + "...</p>";
    //                 } else {
    //                     str += "<p>" + data.data.rows[i].s_name + "</p>";
    //                 }
    //                 str += "</div>";

    //             }
    //             $(".mid_school").html(str);
    //         }
    //     }
    // })
}

// 垃圾分类小视频
function eco_video() {
    $.ajax({
        type: "post",
        url: httpXhr + "smallVideoController/smallVideoList.do?pc=1&tj=1" + "&random=" + random,
        dataType: "json",
        // async: false,
        success: function (data) {
            if (data.code == 200) {
                $(".sma_school").show();
                var str = "";
                var href_url = "";
                var jsonL = data.data.rows.length;
                if (jsonL > 8) {
                    jsonL = 8;
                } else {
                    jsonL = data.data.rows.length;
                }
                for (var i = 0; i < jsonL; i++) {
                    var img = encodeURI(encodeURI(data.data.rows[i].sv_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    if (data.data.rows[i].sv_wurl != "") {
                        var href = encodeURI(encodeURI(data.data.rows[i].sv_wurl));
                        if (href.substring(href.lastIndexOf(".") + 1) == "shtml") {
                            href_url = href;
                        } else {
                            href_url = "";
                        }
                    } else {
                        href_url = "";
                    }

                    str += "<a sv_id=\"" + data.data.rows[i].sv_id + "\" href=\"" + href_url + "\" target=\"_blank\"><div><img src=\"" + fileUrl + "\">";
                    str += "<div title=\"" + data.data.rows[i].sv_title + "\">" + data.data.rows[i].sv_title + "</div><img class=\"hoverplay\" src=\"images/play.png\"><div></div><div>" + data.data.rows[i].t_length + "</div></div></a>";

                }
                $(".eco_mk").html(str);
                /* 小视频详情 */
                $(".eco_mk").on("click", 'a', function () {
                    if ($(this).attr("href") == "") {
                        var sv_id = $(this).attr("sv_id");
                        // location.href = "video_detail.jsp?" + "sv_id=" + encodeURI(sv_id) + "&index=2";
                        $(this).attr("href", httpXhr + "video_detail.jsp?index=2&" + "sv_id=" + encodeURI(sv_id));
                        $(this).attr("target", "_self");
                    }
                });

                // 悬浮增加播放图标
                $(".eco_mk>a>div").hover(function () {
                    $(this).find("img:nth-of-type(2)").show();
                }, function () {
                    $(this).find("img:nth-of-type(2)").hide();
                })
            }
        }
    })
}

// 小知识
function list_xzs() {
    $.ajax({
        type: "post",
        url: httpXhr + "littleKnowledgeController/littleKnowledgeList.do?tj=1&pc=1",
        dataType: "json",
        success: function (data) {
            if (data.code == "200") {
                var str = "";
                var json = data.data.rows;
                var jsonL = data.data.rows.length;
                if (jsonL > 6) {
                    jsonL = 6;
                } else {
                    jsonL = data.data.rows.length;
                }
                for (var i = 0; i < jsonL; i++) {
                    var img = encodeURI(encodeURI(json[i].f_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "  <div class=\"list_mk\">";
                    str += "<p aid=\"" + json[i].l_id + "\" title=\"" + json[i].l_title + "\">" + json[i].l_title + "</p>";
                    str += "<p aid=\"" + json[i].l_id + "\"></p>";
                    getByteLen(data.data.rows[i].l_des);
                    if (len > 130) {
                        str += "<p aid=\"" + json[i].l_id + "\">" + json[i].l_des.substring(0, 60) + "...</p></div>";
                    } else if (len == 0) {
                        str += "<p></p></div>";
                    } else {
                        str += "<p aid=\"" + json[i].l_id + "\">" + json[i].l_des + "</p></div>";
                    }
                }
                $(".classified_list").html(str);
                $(".classified_list").on("click", 'p', function () {
                    var aid = $(this).attr("aid");
                    location.href = "know_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=2";
                });
            }
        }
    });
}


// 小视频更多
$(".eco_query_more").on("click", function () {
    location.href = "video_list.jsp?index=2";
});
// 小视频更多
$(".cli_query_more").on("click", function () {
    location.href = "know_list.jsp?index=2";
});

//获取字符串长度（汉字算两个字符，字母数字算一个）
var len = 0;

function getByteLen(val) {
    len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

//全屏显示
function fullScreen() {
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}