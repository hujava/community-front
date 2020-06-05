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
var sq_id = GetQueryString("sq_id"); //社区ID
if (sq_id != null && sq_id.toString().length > 1) {
    var sq_id = sq_id;
}

var move_name = GetQueryString("move_name"); //社区名称
if (move_name != null && move_name.toString().length > 1) {
    var move_name = move_name;
}

var map = {};

// Init初始化
var random = Math.random();
$(document).ready(function () {
    $(".tit_name").html(decodeURI(decodeURI(move_name)) + "社区");
    $(".map").css("background", " url('images/map_yx/" + sq_id + ".jpg') no-repeat")
    // 轮播图
    banner();
    //init Chart 圆环图
    higtChart_cril(sq_id);
    //init Chart 柱状图
    higtChart_z(sq_id);
    //荣誉之星
    ryzx(sq_id);
    //督导员
    ddy(sq_id);

    // 选择月份
    $(".month_count").click(function () {
        if ($(".month_count_list").css("display") == "block") {
            $(".month_count_list").hide();
        } else {
            $(".month_count_list").show();
        }
    });
    $(".month_count_list>span").click(function () {
        var month_id = $(this).attr("value");
        var month_name = $(this).html();
        $(".month_count>span").html(month_name);
        $(".month_count_list").hide();
        //init Chart 柱状图
        higtChart_month(month_id);
    });

    //获取活动分类
    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?obj_type=999&pc=1&random=" + random,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code = 200) {
                var json = data.data.rows;
                var str = "";
                for (let i = 0; i < json.length; i++) {
                    map[json[i].obj_id] = json[i].obj_name;
                }
            }
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
})

//init Chart
function higtChart_cril(move_list) {
    var htp = "";
    htp = httpXhr + "areasController/selectZXL.do?pc=1&a_id=" + sq_id;
    // 知晓率
    $.ajax({
        type: "post",
        url: htp,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var json = data.data;
                var zxl_num = new Array();
                $(".cfrs>span:nth-of-type(2)").html(json.cfrs);

                for (let index = 0; index < 2; index++) {
                    var zxl = [];
                    if (index == 0) {
                        zxl[0] = "已知晓";
                        zxl[1] = json.yzrs - 0;
                        zxl_num.push(zxl);

                    } else {
                        zxl[0] = "未知晓";
                        zxl[1] = json.cfrs - json.yzrs;
                        zxl_num.push(zxl);
                    }

                }

                var chart = Highcharts.chart('konwperson_chart', {

                    chart: {
                        spacing: [40, 0, 40, 0]
                    },
                    title: {
                        floating: true,
                        text: ''
                    },
                    colors: ['#2ACDC4', '#C7C7C7'],
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            point: {
                                events: {
                                    mouseOver: function (e) { // 鼠标滑过时动态更新标题
                                    }
                                }
                            },
                        }
                    },
                    series: [{
                        type: 'pie',
                        innerSize: '80%',
                        name: '',
                        data: zxl_num
                    }]
                }, function (c) { // 图表初始化完毕后的会掉函数
                    // 环形图圆心
                    var centerY = c.series[0].center[1],
                        titleHeight = parseInt(c.title.styles.fontSize);
                    // 动态设置标题位置
                    c.setTitle({
                        y: centerY + titleHeight / 2
                    });
                });
            } else {
                $(".cfrs_activity>span:nth-of-type(1)>span").html("");
                $(".cfrs_activity>span:nth-of-type(2)>span").html("");
                $(".acvitity_chart").html("");
            }

        }
    });
}
//init 柱状图
function higtChart_z(move_list) {
    var htp = "";
    htp = httpXhr + "activityController/activityCount.do?pc=1&a_id=" + sq_id;
    // 知晓率
    $.ajax({
        type: "post",
        url: htp,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var json = data.data;
                var list_name = [];
                var list_value = [];
                var a_list = 0;
                var a_list2 = 0;
                var valL = "";
                if (json.length > 5) {
                    valL = 5;
                } else {
                    valL = json.length;
                }
                for (let i = 0; i < valL; i++) {
                    list_name.push(json[i].name);
                    var s = {};
                    s.id = map[json[i].name];
                    s.y = json[i].num;
                    list_value.push(s);
                    a_list += json[i].num;
                    a_list2 += json[i].num2;

                }
                $(".cfrs_activity>span:nth-of-type(1)>span").html(a_list);
                $(".cfrs_activity>span:nth-of-type(2)>span").html(a_list2);
            }
        }
    })

    // 柱状图
    $.ajax({
        type: "post",
        url: httpXhr + "activityController/activityTypeClassCount.do?pc=1&a_id=" + sq_id,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var json = data.data;
                var list_name = [];
                var list_value = [];
                var valL = "";
                if (json.length > 5) {
                    valL = 5;
                } else {
                    valL = json.length;
                }
                for (let i = 0; i < valL; i++) {
                    list_name.push(json[i].name);
                    var s = {};
                    s.id = json[i].id;
                    s.y = json[i].num;
                    list_value.push(s);
                }
                var chart = Highcharts.chart('acvitity_chart', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '活动统计'
                    },
                    // subtitle: {
                    //     text: ''
                    // },
                    xAxis: {
                        categories: list_name,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '活动数量 (次)'
                        }
                    },
                    colors: ['#FFC100', '#9ABD60', '#57BDDE', '#FA8564', '#FA7DB8'],
                    tooltip: {
                        // head + 每个 point + footer 拼接成完整的 table
                        headerFormat: '<span style="font-size:10px"></span><table>',
                        pointFormat: '<tr>' +
                            '<td style="padding:0">活动次数：<b>{point.y:1f} 次</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            colorByPoint: true,
                            borderWidth: 0,
                            cursor: 'pointer',
                            events: {

                                click: function (e) {
                                    location.href = "tjfx_list.jsp?a_id=" + sq_id + "&index=6&list=6" + "&fl_id=" + e.point.id;
                                }

                            },
                        }
                    },
                    series: [{
                        data: list_value
                    }]
                });
            } else {
                $(".cfrs_activity>span:nth-of-type(1)>span").html("");
                $(".cfrs_activity>span:nth-of-type(2)>span").html("");
                zw();
            }
        }
    });
}
//init 按月份柱状图
function higtChart_month(month_id) {
    if (month_id == "all") {
        month_id = "";
    }
    // 
    $.ajax({
        type: "post",
        url: htp = httpXhr + "activityController/activityCount.do?pc=1&a_id=" + sq_id + "&month=" + month_id,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var json = data.data;
                var list_name = [];
                var list_value = [];
                var a_list = 0;
                var a_list2 = 0;
                var valL = "";
                if (json.length > 5) {
                    valL = 5;
                } else {
                    valL = json.length;
                }
                for (let i = 0; i < valL; i++) {
                    list_name.push(json[i].name);
                    var s = {};
                    s.id = json[i].id;
                    s.y = json[i].num;
                    list_value.push(s);
                    a_list += json[i].num;
                    a_list2 += json[i].num2;

                }
                $(".cfrs_activity>span:nth-of-type(1)>span").html(a_list);
                $(".cfrs_activity>span:nth-of-type(2)>span").html(a_list2);
            } else {
                $(".cfrs_activity>span:nth-of-type(1)>span").html("0");
                $(".cfrs_activity>span:nth-of-type(2)>span").html("0");
            }

        }
    })
    // 柱状图
    $.ajax({
        type: "post",
        url: httpXhr + "activityController/activityTypeClassCount.do?pc=1&a_id=" + sq_id + "&month=" + month_id,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var json = data.data;
                var list_name = [];
                var list_value = [];
                var valL = "";
                if (json.length > 5) {
                    valL = 5;
                } else {
                    valL = json.length;
                }
                for (let i = 0; i < valL; i++) {
                    list_name.push(json[i].name);
                    var s = {};
                    s.id = json[i].id;
                    s.y = json[i].num;
                    list_value.push(s);
                }
                var chart = Highcharts.chart('acvitity_chart', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '活动统计'
                    },
                    // subtitle: {
                    //     text: ''
                    // },
                    xAxis: {
                        categories: list_name,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '活动数量 (次)'
                        }
                    },
                    colors: ['#FFC100', '#9ABD60', '#57BDDE', '#FA8564', '#FA7DB8'],
                    tooltip: {
                        // head + 每个 point + footer 拼接成完整的 table
                        headerFormat: '<span style="font-size:10px"></span><table>',
                        pointFormat: '<tr>' +
                            '<td style="padding:0">活动次数：<b>{point.y:1f} 次</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            colorByPoint: true,
                            borderWidth: 0,
                            cursor: 'pointer',
                            events: {

                                click: function (e) {
                                    location.href = "tjfx_list.jsp?a_id=" + sq_id + "&index=6&list=6" + "&fl_id=" + e.point.id;
                                }

                            },
                        }
                    },
                    series: [{
                        data: list_value
                    }]
                });
            } else {
                zw();
            }
        }
    });

}

function zw() {
    var chart = Highcharts.chart('acvitity_chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: '活动统计'
        },
        // subtitle: {
        //     text: ''
        // },
        xAxis: {
            categories: ['0'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '活动数量 (次)'
            }
        },
        colors: ['#FFC100', '#9ABD60', '#57BDDE', '#FA8564', '#FA7DB8'],
        tooltip: {
            // head + 每个 point + footer 拼接成完整的 table
            headerFormat: '<span style="font-size:10px"></span><table>',
            pointFormat: '<tr>' +
                '<td style="padding:0">活动次数：<b>{point.y:1f} 次</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                colorByPoint: true,
                borderWidth: 0,
                cursor: 'pointer'
            }
        },
        series: [{
            // data: [0]
        }]
    });
}
//荣誉之星
function ryzx(move_list) {
    var htp = "";
    htp = httpXhr + "userController/usersList.do?a_id=" + sq_id;
    $.ajax({
        type: "post",
        url: htp,
        data: {
            rows: 3, //显示数量
            page: 1, //页数1
            sort: "jf", //排序字段 jf
            order: "desc", //倒叙desc
            pc: "1"
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var json = data.data.rows;
                let str = "";
                str += "";
                for (let i = 0; i < json.length; i++) {
                    var img = encodeURI(encodeURI(json[i].u_url));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div class=\"know_lists\" list1=\"" + json[i].a_name + "\"  list2=\"" + json[i].sq + "\" list3=\"" + json[i].jf + "\" list4=\"" + fileUrl + "\">";
                    str += "<img src=\"" + fileUrl + "\">";
                    str += "<img src=\"images/m_" + (i + 1) + ".png\">";
                    str += "<p>" + json[i].a_name + "</p>";
                    str += "<p><img src=\"images/tree.png\"><span>" + json[i].jf + "</span></p></div>";
                }
                $(".ryzx1").html(str);
                // 
                $(".know_lists").click(function () {
                    $(".jf_model,.jf_background").show();
                    var list1 = $(this).attr("list1");
                    var list2 = $(this).attr("list2");
                    var list3 = $(this).attr("list3");
                    var list4 = $(this).attr("list4");
                    $(".model_title>span:nth-of-type(2)").html("荣誉之星");
                    $(".s_jf>img").attr("src", list4);
                    $(".s_jf>p:nth-of-type(1)").html(list1);
                    $(".s_jf>p:nth-of-type(2)").html(list2);
                    $(".s_jf>p:nth-of-type(3)").html("<img src=\"images/tree.png\"><span></span>");
                    $(".jf_model").css("height", "420px")
                    $(".s_jf>p:nth-of-type(3)>span").html(list3);
                });
            }
        }
    });
}
//督导员
function ddy(move_list) {
    $(".con_dy1").html("");
    var htp = "";
    htp = httpXhr + "userController/usersList.do?supervisor=1&pc=1&a_id=" + sq_id;
    $.ajax({
        type: "post",
        url: htp,
        data: {
            supervisor: 1,
            rows: 3, //显示数量
            page: 1, //页数1
            pc: "1"
        },
        dataType: "json",
        success: function (data) {
            $(".con_dy1").html("");
            if (data.code == 200) {
                var json = data.data.rows;
                let str = "";
                str += "";
                for (let i = 0; i < json.length; i++) {
                    var img = encodeURI(encodeURI(json[i].u_url));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += " <div class=\"know_list\" list1=\"" + json[i].a_name + "\" list2=\"" + json[i].sq + "\" list3=\"" + fileUrl + "\">";
                    str += "<img src=\"" + fileUrl + "\">";
                    str += "<p>" + json[i].a_name + "</p>";
                    str += "<p>" + json[i].sq + "</p>";
                    str += "</div>";
                }
                $(".con_dy1").html(str);
                // 
                $(".know_list").click(function () {
                    $(".jf_model,.jf_background").show();
                    var list1 = $(this).attr("list1");
                    var list2 = $(this).attr("list2");
                    var list3 = $(this).attr("list3");
                    $(".model_title>span:nth-of-type(2)").html("督导员");
                    $(".s_jf>img").attr("src", list3);
                    $(".s_jf>p:nth-of-type(1)").html(list1);
                    $(".s_jf>p:nth-of-type(2)").html(list2);
                    $(".s_jf>p:nth-of-type(3)").html("");
                    $(".jf_model").css("height", "370px")

                });
            }
        }
    });
}


$(".closeJf").click(function () {
    $(".jf_model,.jf_background").hide();
});



// 轮播图
function banner() {
    //----------------banner图轮播-------------
    $.ajax({
        type: "post",
        dataType: 'json',
        url: httpXhr + 'roundMapController/roundMapList.do?type=8&pc_type=1' + "&random=" + random,
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