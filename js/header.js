var sou_para = "";
$(function () {
    /* 导航栏 */
    $(".navi>li ul").hide();
    $(".navi>li").hover(function () {
        $(".navi>li").eq($(this).index()).find("ul").show();
        $(".navi>li").eq($(this).index()).find("a>span").eq(0).addClass("fontcolor1");
    }, function () {
        $(".navi>li").eq($(this).index()).find("ul").hide();
        $(".navi>li").eq($(this).index()).find("a>span").eq(0).removeClass("fontcolor1");
        $(".navi>li").eq($(this).index()).find("a>span").eq(0).addClass("class", "fontcolor2");
    }, 1000);
    index = getUrlParam('index');
    if (index == null || index == undefined) {
        index = 0;
    }
    $(".navi>li").eq(index).find("ul").slideDown();
    $(".navi>li").eq(index).find("a>span").eq(0).attr("id", "fontcolor");
    // var str=" <div class=\"bgh\"></div><li  onclick=\"syClick('jslinfo')\"><a  class=\"jslinfo\">九色鹿简介</a></li>\n" +
    //     "                            <li  onclick=\"syClick('usfrom')\"><a class=\"usfrom\">我们来自于哪</a></li>\n" +
    //     "                            <li  onclick=\"syClick('lxxz')\"><a  class=\"lxxz\">联系校长</a></li><div class=\"bgh\"></div>";
    // $(".lihover").append(str);
    $(".lihover").hide();

    /*  登录  */
    $(".loginShow").click(function () {
        $(".bgGrayLogin").show();
    });
    /*  注册  */
    $(".logIn").click(function () {});
    /*  关闭  */
    $(".closeLogin").click(function () {
        $(".bgGrayLogin").hide();
    });

    $(".lg").hover(function () {
        $(".loginhover").css("color", "#ff9812");
    }, function () {
        $(".loginhover").css("color", "#fff");
    })

    $(".lihover>li").click(function () {
        $(this).find("a").css("color", "#3bcd80");
        $(this).siblings().find("a").css("color", "#555");
    });
    $(".jslinfo ").click(function () {
        $(".lihover>li").find("a").css("color", "#555");
    });

})

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
var index = "";

function syClick(data) {
    /*  $("."+data+"").eq($(this).index()).find("ul").slideDown();
      $("."+data+"").eq($(this).index()).find("a").eq(0).css({"color":"pink","border-bottom":"3px solid pink"})*/
    if (data == 'main') {
        $(".main").attr("href", "main.jsp?index=0");
    } else if (data == 'g_school') {
        $(".g_school").attr("href", "g_school.jsp?index=1");
    } else if (data == 'g_school1') {
        $(".g_school1").attr("href", "g_school.jsp?index=1&fi=1");
    } else if (data == 'g_school2') {
        $(".g_school2").attr("href", "g_school.jsp?index=1&fi=2");
    } else if (data == 'g_school3') {
        $(".g_school3").attr("href", "g_school.jsp?index=1&fi=3");
    } else if (data == 'classified_classroom') {
        $(".classified_classroom").attr("href", "classified_classroom.jsp?index=2");
    } else if (data == 'classified_classroom2') {
        $(".classified_classroom2").attr("href", "classified.jsp?index=2");
    } else if (data == 'classified_classroom3') {
        $(".classified_classroom3").attr("href", "video_list.jsp?index=2");
    } else if (data == 'classified_classroom4') {
        $(".classified_classroom4").attr("href", "know_list.jsp?index=2");
    } else if (data == 'e_password') {
        $(".e_password").attr("href", "e_password.jsp?index=3&fi=1");
    } else if (data == 'e_password2') {
        $(".e_password2").attr("href", "e_password.jsp?index=3&fi=2");
    } else if (data == 'forest_house') {
        $(".forest_house").attr("href", "forest_house.jsp?index=4");
    } else if (data == 'zm_zyz') {
        $(".zm_zyz").attr("href", "volunteers.jsp?index=5");
    } else if (data == 'tjfx') {
        $(".tjfx").attr("href", "tjfx.jsp?index=6");
    } else if (data == 'sc_wl') {
        $(".sc_wl").attr("href", "sc_wl.jsp?index=7");
    } else if (data == 'about_us') {
        $(".about_us").attr("href", "about_us.jsp?index=8");
    }
}


//登陆密码框眼睛切换
$(".eyes").click(function () {
    if ($(this).attr("src") == "images/eyez.png") {
        $(".eyez,.intz").hide();
        $(".eyeb,.intb").show();
        $(".intb").val($(".intz").val());
    } else {
        $(".eyez,.intz").show();
        $(".eyeb,.intb").hide();
    }
});

// 课程，活动查询切换
$(".sou_course").click(function () {
    $(".sou_mk").show();
});
$(".sou_mk>li").click(function () {
    $(".sou_mk").hide();
    var sou_val = $(this).text();
    $(".sou_course>span").html(sou_val);
    sou_para = $(this).attr("value"); //课程  OR  活动
});

$(".btn").click(function () {
    var sou_value = $(".form-control").val();
    console.log(sou_value);
    if (sou_para == "1" || sou_para == "") {
        location.href = "sou_detail.jsp?" + "sou_value=" + encodeURI(encodeURI(sou_value)) + "&index=0";
    } else {
        location.href = "sou_activity.jsp?" + "sou_value=" + encodeURI(encodeURI(sou_value)) + "&index=0";
    }
});

// 登录
$(".login").click(function () {
    location.href = "login.jsp?index=0";
});

//注册
$(".registe").click(function () {
    location.href = "register.jsp";
});

$(".log_hover").hover(function(){
    $(".log_return").show();
},function(){
    $(".log_return").hide();
});

$(".return_m").click(function(){
    location.href = "main.jsp?index=0";
});


//我的信息
$(".log_return>div:nth-of-type(2)").click(function () {
    location.href = "personInfo.jsp?index=9&lx=2";
})

//我的活动
$(".log_return>div:nth-of-type(3)").click(function () {
    location.href = "personInfo.jsp?index=9&lx=3";
})

//退出登录
$(".log_return>div:nth-of-type(4)").click(function () {
    $.ajax({
        type: "post",
        url: httpXhr + "logout.do",
        dataType: "json",
        success: function (data) {
            if (data.code == "200") {
                location.href = "main.jsp?index=0";
                $(".registe,.login").show();
                $(".log_end,.log_return").hide();
            }
        }
    });
});