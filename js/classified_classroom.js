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
var sv_id = GetQueryString("sv_id"); //课程ID
if (sv_id != null && sv_id.toString().length > 1) {
    var sv_id = sv_id;
}

var fi = GetQueryString("fi");
if (fi != null && fi.toString().length > 1) {
    var fi = fi;
}

var ins = 0;

// Init初始化
var class_xd = "";
var class_fl = "";
var class_hb = "";
$(document).ready(function () {
    // 学科分类
    subject_fl();
    //环保
    subject_hb();
    //初始化+近期热点
    init_rd(1);
    // 综合，评分数切换
    zhpfs(1);
    loadpage();

    // 分页
    function exeData(num, type) {
        loadData(num);
        loadpage();
    }

    function loadpage() {
        var myPageCount = parseInt($("#PageCount").val());
        var myPageSize = parseInt($("#PageSize").val());
        var countindex = myPageCount % myPageSize > 0 ? (myPageCount / myPageSize) + 1 : (myPageCount / myPageSize);
        $("#countindex").val(countindex);

        $.jqPaginator('#pagination', {
            totalPages: parseInt($("#countindex").val()),
            visiblePages: parseInt($("#visiblePages").val()),
            currentPage: 1,
            first: '<li class="first"><a href="javascript:;">首页</a></li>',
            prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
            next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
            last: '<li class="last"><a href="javascript:;">末页</a></li>',
            page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
            onPageChange: function (num, type) {
                if (type == "change") {
                    exeData(num, type);
                }
            }
        });
    }

    $(".nav_tab>ul>li").click(function () {
        var tab_id = $(this).attr("value");
        if (tab_id == "1") {
            location.href = "classified_classroom.jsp?index=2";
        } else if (tab_id == "2") {
            location.href = "classified.jsp?index=2";
        } else if (tab_id == "3") {
            location.href = "video_list.jsp?index=2";
        } else if (tab_id == "4") {
            location.href = "know_list.jsp?index=2";
        }

    });

    // 背景图
    $.ajax({
        type: "post",
        dataType: 'json',
        url: httpXhr + 'roundMapController/roundMapList.do?type=2&tj=1&pc_type=1' + "&random=" + random,
        success: function (data) {
            console.log(data);
            if (data.code == '200') {
                var img = encodeURI(encodeURI(data.data.rows[0].rm_image));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                $(".adposition_banner").css("background", "url('" + fileUrl + "') no-repeat");
            }
        }
    });
});
//学科分类
function subject_fl() {
    $.ajax({
        type: "post",
        url: httpXhr + "subjectController/subjectListJson.do?pc=1&s_grade=2",
        dataType: "json",
        success: function (data) {
            if (data.data.tree != []) {
                var str = "";
                var dataJson = data.data;
                str += "<span value=\"\">全部</span>";
                for (var i = 0; i < dataJson.length; i++) {
                    str += "<span value=\"" + dataJson[i].id + "\">" + dataJson[i].text + "</span>";
                }
                $(".fl_pj").append(str);
                // 分类 ==》点击联查 
                $(".fl_pj>span").click(function () {
                    if ($(this).parent().prev().html() == "分类：") {
                        class_fl = $(this).attr("value"); //分类Val
                    }
                    $.ajax({
                        type: "post",
                        url: httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&typeObj=1",
                        dataType: "json",
                        data: {
                            age_list: class_xd,
                            hb_type: class_hb,
                            sub_id: class_fl
                        },
                        success: function (data) {
                            $(".class_list").html("");
                            if (data.code== 200) {
                                var str = "";
                                var dataJson = data.data.rows;
                                for (var i = 0; i < dataJson.length; i++) {
                                    var img = encodeURI(encodeURI(dataJson[i].c_image));
                                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                                    str += " <div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                                    str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p>";
                                    str += "<p><img src=\"images/act-s.png\"><span>" + dataJson[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + dataJson[i].dzNum + "</span></p></div>";
                                }
                                $(".class_list").html(str);
                                /* 点击课程，查询详细信息 */
                                $(".class_list").on("click", 'div', function () {
                                    var aid = $(this).attr("aid");
                                    location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=2";
                                });
                            }else{
                                $(".log_text").hide();
                            }
                        }
                    });
                });
                // 分类菜单点击切换
                $(".fl_lbx>span,.fl_lbxx>span").click(function () {
                    $(this).css({
                        "background": "#3bcd80",
                        "color": "#fff"
                    }).siblings().css({
                        "background": "#fff",
                        "color": "#555"
                    });
                });
            }
        }
    });
}
// 环保
function subject_hb() {
    $.ajax({
        type: "post",
        url: httpXhr + "objTypeController/objTypeList.do?pc=1",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var str = "";
                var dataJson = data.data.rows;
                str += "<span value=\"\">全部</span>";
                for (var i = 0; i < dataJson.length; i++) {
                    str += "<span value=\"" + dataJson[i].obj_id + "\">" + dataJson[i].obj_name + "</span>";
                }
                $(".list_data").append(str);
                // 分类 ==》点击联查 
                $(".list_data>span").click(function () {
                    if ($(this).parent().prev().html() == "环保：") {
                        class_hb = $(this).attr("value"); //分类Val
                    }
                    $.ajax({
                        type: "post",
                        url: httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&typeObj=1",
                        dataType: "json",
                        data: {
                            age_list: class_xd,
                            hb_type: class_hb,
                            sub_id: class_fl
                        },
                        success: function (data) {
                            $(".class_list").html("");
                            if (data.code == 200) {
                                $(".log_text").show();
                                var str = "";
                                var dataJson = data.data.rows;
                                for (var i = 0; i < dataJson.length; i++) {
                                    var img = encodeURI(encodeURI(dataJson[i].c_image));
                                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                                    str += " <div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                                    str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p>";
                                    str += "<p><img src=\"images/act-s.png\"><span>" + dataJson[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + dataJson[i].dzNum + "</span></p></div>";
                                }
                                $(".class_list").html(str);
                                /* 点击课程，查询详细信息 */
                                $(".class_list").on("click", 'div', function () {
                                    var aid = $(this).attr("aid");
                                    location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=2";
                                });
                            }else{
                                $(".log_text").hide();
                            }
                        }
                    });
                });
                // 分类菜单点击切换
                $(".fl_lbx>span,.fl_lbxx>span").click(function () {
                    $(this).css({
                        "background": "#3bcd80",
                        "color": "#fff"
                    }).siblings().css({
                        "background": "#fff",
                        "color": "#555"
                    });
                });
            }
        }
    });
}
//初始化+近期热点
function init_rd(num) {
    $.ajax({
        type: "post",
        url: httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&typeObj=1&rows=12&page="+num,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code == 200) {
                $("#PageCount").val(data.data.total);
                $(".log_text").show();
                var str = "";
                var dataJson = data.data.rows;
                for (var i = 0; i < dataJson.length; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].c_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += " <div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                    str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p>";
                    str += "<p><img src=\"images/act-s.png\"><span>" + dataJson[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + dataJson[i].dzNum + "</span></p></div>";
                }
                $(".class_list").html(str);
                /* 点击课程，查询详细信息 */
                $(".class_list").on("click", 'div', function () {
                    var aid = $(this).attr("aid");
                    location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=2";
                });
            }else{
                $(".log_text").hide();
            }
        }
    });
    // 近期热点
    $.ajax({
        type: "post",
        url: httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&sort=course_upNum&typeObj=1",
        dataType: "json",
        success: function (data) {
            if (data.data.rows.length != 0) {
                var str = "";
                var dataJson = data.data.rows;
                var inx = "";
                if (dataJson.length > 3) {
                    inx = 3;
                } else {
                    inx = dataJson.length;
                }
                for (var i = 0; i < inx; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].c_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                    str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p></div>";
                }
                $("._right_img").html(str);
                /* 点击课程，查询详细信息 */
                $("._right_img").on("click", 'div', function () {
                    var aid = $(this).attr("aid");
                    location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=2";
                });
            }
        }
    });
}

// 综合，评分数切换
function zhpfs(num) {
    $(".con_titlen > div").click(function () {
        $(this).css({
            "background": "#3bcd80",
            "color": "#fff"
        }).siblings().css({
            "background": "#f9f9f9",
            "color": "#555"
        });
        var httpdouble = "";
        if ($(this).attr("value") == "1") {
            httpdouble = httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&typeObj=1&rows=12&page="+num;
        } else {
            httpdouble = httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&sort=course_upNum&typeObj=1&rows=12&page="+num;
        }
        $.ajax({
            type: "post",
            url: httpdouble,
            dataType: "json",
            data: {
                age_list: class_xd,
                hb_type: class_hb,
                sub_id: class_fl
            },
            async: false,
            success: function (data) {
                if (data.cede== 200) {
                    $("#PageCount").val(data.data.total);
                    $(".log_text").show();
                    var str = "";
                    var dataJson = data.data.rows;
                    for (var i = 0; i < dataJson.length; i++) {
                        var img = encodeURI(encodeURI(dataJson[i].c_image));
                        var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                        str += " <div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                        str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p>";
                        str += "<p><img src=\"images/act-s.png\"><span>" + dataJson[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + dataJson[i].dzNum + "</span></p></div>";
                    }
                    $(".class_list").html(str);
                    /* 点击课程，查询详细信息 */
                    $(".class_list").on("click", 'div', function () {
                        var aid = $(this).attr("aid");
                        location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=2";
                    });
                }else{
                    $(".log_text").hide();
                }
            }
        });

    });
}




$(".list_data>span").click(function () {
    if ($(this).parent().prev().html() == "学段：") {
        class_xd = $(this).attr("value"); //学段Val
    }
    if ($(this).parent().prev().html() == "环保：") {
        class_hb = $(this).attr("value"); //环保Val
    }
    // 科目联查
    $.ajax({
        type: "post",
        url: httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&typeObj=1",
        dataType: "json",
        data: {
            age_list: class_xd,
            hb_type: class_hb,
            sub_id: class_fl
        },
        success: function (data) {
            if (data.code== 200) {
                $(".log_text").show();
                var str = "";
                var dataJson = data.data.rows;
                for (var i = 0; i < dataJson.length; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].c_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += " <div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                    str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_des + "</p>";
                    str += "<p><img src=\"images/act-s.png\"><span>" + dataJson[i].lookNum + "</span><img src=\"images/act-z.png\"><span>" + dataJson[i].dzNum + "</span></p></div>";
                }
                $(".class_list").html(str);
                /* 点击课程，查询详细信息 */
                $(".class_list").on("click", 'div', function () {
                    var aid = $(this).attr("aid");
                    location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=2";
                });

            }else{
                $(".log_text").hide();
            }
        }
    });

});

//轮播图初始化
function lunbo() {
    $.ajax({
        type: "post",
        url: httpXhr + "questionAndAnswerController/questionAndAnswerList.do?pc=1&user_id=1",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.code == "200") {
                var str = "";
                var json = data.data.rows;
                for (var i = 0; i < json.length; i++) {
                    var img = encodeURI(encodeURI(json[i].qas_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div qas_id=\"" + json[i].qas_id + "\"><img src=\"" + fileUrl + " \">";
                    str += "<div>" + json[i].qas_title + "</div>";
                    str += "</div>";
                }
                $(".slick").html(str);
                // slick初始化
                $('.slick').slick({
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 3,
                    responsive: [{
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 1
                            }
                        }
                    ]
                });
                // $(".slick-current img").css({
                //     "width": "180px",
                //     "height": "180px"
                // });
                $(".slick").on("click", 'div>div>div', function () {
                    var qas_id = $(this).attr("qas_id");
                    location.href = "cliclass_detail.jsp?" + "qas_id=" + encodeURI(qas_id) + "&index=1";
                });
            }
        }
    });
}

//获取字符串长度（汉字算两个字符，字母数字算一个）
var len = 0;

function getByteLen(val) {
    len = 0;
    if (val != undefined) {
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
        }
    }
    return len;
}