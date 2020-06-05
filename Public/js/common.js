// setTimeout(function() {
//     var data = {
//         code: '200',
//         data: {
//             total: "1",
//             rows: [
//                 { rm_des: "祝贺静宇娴风学子喜获剑桥大学录取", rm_image: "./Public/img/banner.png" },
//                 { rm_des: "祝贺静宇娴风学子喜获剑桥大学录取", rm_image: "./Public/img/banner.png" }
//             ]
//         }
//     }
//     var bannerImgStr = ""
//     var bannerTitStr = ""
//     if (data && data.data && data.data.rows && data.data.rows.length) {
//         data.data.rows.forEach(item => {
//             bannerImgStr += '<div class="child" style="background-image: url(' + item.rm_image + ');"></div>'
//             bannerTitStr += '<div class="div"><div class="p">' + item.rm_des + '</div><i></i></div>'
//         });
//     }
//     $("#bannerImg").append(bannerImgStr)
//     $("#bannerTit").append(bannerTitStr)
//     $(function() {
//         $(".home1 .focus .frame").mScroll({
//             auto: 1, //自动开始
//             direction: "h", //滚动方向,h横向,v纵向
//             dtype: "left", //正反方向
//             isfocus: 1, //是否作为焦点图
//             minsize: 1, //最小数量
//             speed: 500, //滚动速度
//             easing: "", //缓冲类型
//             delay: 5000, //自动滚动间隔
//             nav: ".home1 .cont .div", //导航按钮
//             event: "click", //导航按钮事件类型
//             scrollnav: 0, //导航滚动
//             nav_direction: "h", //导航方向,h横向,v纵向
//             arrow: 1, //是否反转
//             cycle: 1, //是否循环
//             mousestop: 1, //鼠标划入停止
//             mousewheel: 0, //开启滚轮事件
//             touch: 0, //开启触摸事件
//             callback: function(idx) {} //回调函数
//         });

//         $(".home1_phone .slick").slick({
//             autoplay: true,
//             infinite: true,
//             speed: 500,
//             touchMove: false,
//             dots: true
//         });
//     });

//     var data1 = {
//         code: "200",
//         msg: "ok ",
//         data: {
//             total: '4',
//             rows: [{
//                 a_id: 1, //活动ID
//                 a_name: '的是非得失活动时的是非得失活动时间活动时间活动时间活动时间的是非得失活动时间活动时间活动时间活动时间间活动时间活动时间活动时间',
//                 a_image: '/Public/img/banner.png', //图片字段
//                 activity_time: "2020.04", //活动时间 年.月
//                 activity_day: '13', //活动时间 日
//                 a_des: "活动时间 年.月活动活动时间 年.月活动时间 年.月活动时活动时间 年.月活动时间 年.月活动时时间 年.月活动时间 年.月活动时间 年.月"
//             }, {
//                 a_id: 1, //活动ID
//                 a_name: '2312',
//                 a_image: '/Public/img/banner.png', //图片字段
//                 activity_time: "2020.04", //活动时间 年.月
//                 activity_day: '13', //活动时间 日
//                 a_des: "活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日"
//             }, {
//                 a_id: 1, //活动ID
//                 a_name: '2312',
//                 a_image: '/Public/img/banner.png', //图片字段
//                 activity_time: "2020.04", //活动时间 年.月
//                 activity_day: '13', //活动时间 日
//                 a_des: "活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日"
//             }, {
//                 a_id: 1, //活动ID
//                 a_name: '2312',
//                 a_image: '/Public/img/banner.png', //图片字段
//                 activity_time: "2020.04", //活动时间 年.月
//                 activity_day: '13', //活动时间 日
//                 a_des: "活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日"
//             }]
//         }
//     }
//     var newStr = ""
//     if (data1 && data1.data && data1.data.rows && data1.data.rows.length) {
//         for (var i = 0; i < data1.data.rows.length; i++) {
//             var item = data1.data.rows[i]
//             newStr += '<div class="item ">' +
//                 '<div class="img">' +
//                 '<a href="/xwzx/' + item.a_id + '.html" target="_blank"><img src="' + getImgeAdd(item.a_image) + '" alt="" title="" /></a>' +
//                 '</div>' +
//                 '<div class="padd">' +
//                 '<div class="t1"><span>' + item.activity_day + '</span>' + item.activity_time + '</div>' +
//                 '<div class="t2">' +
//                 '<a href="/xwzx/' + item.a_id + '.html" target="_blank">' + myOverflow(28, item.a_name) + '</a>' +
//                 '</div>' +
//                 '<div class="p">' + myOverflow(36, item.a_des) + '</div>' +
//                 '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank" class="more">查看详情</a>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>'
//         }
//     }

//     $('#dd1').append(newStr)

//     var data2 = {
//         code: '200',
//         more: 1,
//         data: {
//             total: '4',
//             'rows': [{
//                 'sv_id': '1',
//                 'sv_title': '活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日',
//                 'sv_image': './Public/img/bj_7.png',
//                 'sv_url': 'http://www.aidi.edu.cn/Uploads/Media/2018/03/16/m5aab3411b2b47.mp4'
//             }, {
//                 'sv_id': '2',
//                 'sv_title': '活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日',
//                 'sv_image': './Public/img/bj_8.png',
//                 'sv_url': 'http://www.aidi.edu.cn/Uploads/Media/2018/03/16/m5aab3411b2b47.mp4'
//             }, {
//                 'sv_id': '2',
//                 'sv_title': '活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日',
//                 'sv_image': './Public/img/bj_8.png',
//                 'sv_url': 'http://www.aidi.edu.cn/Uploads/Media/2018/03/16/m5aab3411b2b47.mp4'
//             }, {
//                 'sv_id': '2',
//                 'sv_title': '活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日',
//                 'sv_image': './Public/img/bj_8.png',
//                 'sv_url': 'http://www.aidi.edu.cn/Uploads/Media/2018/03/16/m5aab3411b2b47.mp4'
//             }]
//         },
//         msg: 'ok'
//     }
//     var superStr = ''
//     if (data2 && data2.data && data2.data.rows && data2.data.rows.length) {
//         data2.data.rows.forEach((item) => {
//             superStr += '<div class="item">' +
//                 '<div class="img actClick" id="' + item.sv_id + '" data="' +
//                 item.sv_url + '">' +
//                 '<a href="javascript:;" "><i></i><img src="' + item.sv_image + '" alt="" title="" /></a>' +
//                 '</div>' +
//                 '<div class="padd">' +
//                 '<div class="t2">' + item.sv_title + '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>'
//         });
//     }

//     $('#dd11').append(superStr)
//     if (!data2.more) {
//         $("#moreVideo").hide()
//         params.page++
//     }
//     addListen();


//     var data3 = { code: "200", "data": { "total": "4", "rows": [{ "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "s_image": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "s_image": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "s_image": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "s_image": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }] }, msg: "ok" }

//     var personStr = ""
//     if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
//         var classStr = ''
//         data3.data.rows.forEach((item, i) => {
//             if (i % 2 === 1) {
//                 classStr = "d2"
//             } else {
//                 classStr = "d1"
//             }
//             personStr += '<div class="div ' + classStr + '">' +
//                 '<div class="con">' +
//                 '<a href="/uxbys_content/488.html">' +
//                 '<div class="img video">' +
//                 '<img src="' + item.s_image + '" / >' +
//                 '</div>' +
//                 '<div class="text">' +
//                 '<div class="t1">' + item.s_name + '</div>' +
//                 '<div class="p">' + item.s_des + '</div>' +
//                 '</div>' +
//                 '<div class="mask">' +
//                 '<div class="padd">' +
//                 '<div class="t1">' + item.s_name + '</div>' +
//                 '</div>' +
//                 '</div></a>' +
//                 '</div>' +
//                 '</div> '
//         });
//     }

//     $('#personInfo').append(personStr)
//     $(function() {
//         var size = 4;

//         if ($(window).width() <= 750) {
//             size = 2;
//         }

//         $(".home5 .one-time").slick({
//             infinite: false,
//             speed: 500,
//             slidesToShow: size,
//             touchMove: false,
//             slidesToScroll: 1
//         });
//     });
// }, 500)

//添加方法
function myOverflow(len, str) {
    var reg = /[\u4e00-\u9fa5]/g, //专业匹配中文
        slice = str.substring(0, len),
        chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
        realen = slice.length * 2 - chineseCharNum;
    return str.substr(0, realen) + (realen < str.length ? "..." : "");
}

function renderBanner() {
    $.post(httpXhr + "/roundMapController/roundMapList.do", {
        type: 1, //1代表首页轮播 
        pc_type: 1 //1代表PC端
    }, function(data) {
        if (data["code"] == "200") {
            var bannerImgStr = ""
            var bannerTitStr = ""
            if (data && data.data && data.data.rows && data.data.rows.length) {
                for (var i = 0; i < data.data.rows.length; i++) {
                    var item = data.data.rows[i]
                    bannerImgStr += '<div class="child" style="background-image: url(' + getImgeAdd(item.rm_image) + ');"></div>'
                    bannerTitStr += '<div class="div"><div class="p">' + item.rm_des + '</div><i></i></div>'
                }
            }
            $("#bannerImg").append(bannerImgStr)
            $("#bannerTit").append(bannerTitStr)
            $(function() {
                $(".home1 .focus .frame").mScroll({
                    auto: 1, //自动开始
                    direction: "h", //滚动方向,h横向,v纵向
                    dtype: "left", //正反方向
                    isfocus: 1, //是否作为焦点图
                    minsize: 1, //最小数量
                    speed: 500, //滚动速度
                    easing: "", //缓冲类型
                    delay: 5000, //自动滚动间隔
                    nav: ".home1 .cont .div", //导航按钮
                    event: "click", //导航按钮事件类型
                    scrollnav: 0, //导航滚动
                    nav_direction: "h", //导航方向,h横向,v纵向
                    arrow: 1, //是否反转
                    cycle: 1, //是否循环
                    mousestop: 1, //鼠标划入停止
                    mousewheel: 0, //开启滚轮事件
                    touch: 0, //开启触摸事件
                    callback: function(idx) {} //回调函数
                });

                $(".home1_phone .slick").slick({
                    autoplay: true,
                    infinite: true,
                    speed: 500,
                    touchMove: false,
                    dots: true
                });
            });
        } else {
            my_alert(data["msg"]);
            $("#my_ok").click(function() {
                myalert_hide();
            });
        }
    }, "json");
}

function renderNews() {
    $.post(httpXhr + "/activityController/activityList.do", {
        tj: 1, //是否推荐 0不推荐 1推荐 全部不用填写
        page: 1, //页码
        rows: 4, //每页显示的行数
        pc: 1
    }, function(data1) {
        if (data1["code"] == "200") {
            var newStr = ""
            if (data1 && data1.data && data1.data.rows && data1.data.rows.length) {
                for (var i = 0; i < data1.data.rows.length; i++) {
                    var item = data1.data.rows[i]
                    newStr += '<div class="item ">' +
                        '<div class="img">' +
                        '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank"><img src="' + getImgeAdd(item.a_image) + '" alt="" title="" /></a>' +
                        '</div>' +
                        '<div class="padd">' +
                        '<div class="t1"><span>' + item.activity_day + '</span>' + item.activity_time + '</div>' +
                        '<div class="t2">' +
                        '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank">' + myOverflow(28, item.a_name) + '</a>' +
                        '</div>' +
                        '<div class="p">' + myOverflow(36, item.a_des) + '</div>' +
                        '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank" class="more">查看详情</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
            }

            $('#dd1').append(newStr)
        } else {
            my_alert(data1["msg"]);
            $("#my_ok").click(function() {
                myalert_hide();
            });
        }
    }, "json");
}

function renderSuper(params) {
    $.post(httpXhr + "/smallVideoController/smallVideoList.do", params, function(data2) {
        if (data2["code"] == "200") {
            var superStr = ''
            if (data2 && data2.data && data2.data.rows && data2.data.rows.length) {
                for (var i = 0; i < data2.data.rows.length; i++) {
                    var item = data2.data.rows[i]
                    superStr += '<div class="item">' +
                        '<div class="img actClick" id="' + item.sv_id + '" data="' +
                        getImgeAdd(item.sv_url) + '">' +
                        '<a href="javascript:;" "><i></i><img src="' + getImgeAdd(item.sv_image) + '" alt="" title="" /></a>' +
                        '</div>' +
                        '<div class="padd">' +
                        '<div class="t2">' + myOverflow(24, item.sv_title) + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
            }

            $('#dd11').append(superStr)
            if (!data2.more) {
                $("#moreVideo").hide();
            } else {
                params.page++;
            }
            addListen();
        } else {
            my_alert(data2["msg"]);
            $("#my_ok").click(function() {
                myalert_hide();
            });
        }
    }, "json");
}

function renderPerson() {
    $.post(httpXhr + "/studentController/studentList.do", {
        page: 1, //页码
        rows: 15, //每页显示行数
    }, function(data3) {
        if (data3["code"] == "200") {
            var personStr = ""
            if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
                var classStr = ''
                for (var i = 0; i < data3.data.rows.length; i++) {
                    if (i % 2 === 1) {
                        classStr = "d2"
                    } else {
                        classStr = "d1"
                    }
                    var item = data3.data.rows[i]
                    personStr += '<div class="div ' + classStr + '">' +
                        '<div class="con">' +
                        '<a href="javascript:;">' +
                        '<div class="img">' +
                        '<img src="' + getImgeAdd(item.s_image) + '" / >' +
                        '</div>' +
                        '<div class="text">' +
                        '<div class="t1">' + item.s_name + '</div>' +
                        '<div class="p">' + item.s_des + '</div>' +
                        '</div>' +
                        '<div class="mask">' +
                        '<div class="padd">' +
                        '<div class="t1">' + item.s_name + '</div>' +
                        '</div>' +
                        '</div></a>' +
                        '</div>' +
                        '</div> '

                }
            }

            $('#personInfo').append(personStr)
            $(function() {
                var size = 4;

                if ($(window).width() <= 750) {
                    size = 2;
                }

                $(".home5 .one-time").slick({
                    infinite: false,
                    speed: 500,
                    slidesToShow: size,
                    touchMove: false,
                    slidesToScroll: 1
                });
            });
        } else {
            my_alert(data3["msg"]);
            $("#my_ok").click(function() {
                myalert_hide();
            });
        }
    }, "json");
}

function getImgeAdd(str) {
    return httpXhr + '/getFileController/getFile.do?fileName=' + str
}

function addListen() {
    var player;
    $(".actClick").click(function(e) {
        var $this = $(e.currentTarget)
        var videoId = 'videoInfo' + $this.attr("id")
        $("#videoWrapper").html('<video id="' + videoId + '" preload="" controls class="video-wrapper video-js  vjs-default-skin" webkit-playsinline="" playsinline="" x5-playsinline="" x-webkit-airplay="allow" style="width:100%;height:100%;" width="100%" height="100%"> ' +
            '<source src="' + $this.attr("data") + '" type="video/mp4">' +
            '</video>')
        player = videojs(videoId);
        $(".video_tc").fadeIn(100)
        player.play();
    });
    $(".video_tc .close").click(function() {
        $(".video_tc").fadeOut(100);
        player.dispose();
    });
}