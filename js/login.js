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
var log_info = "";
var val = 1;


$(function () {
    $(".input_ss,.navi>li").remove();
    $(".return_m>span").css("display", "block");
    var scrollH = $(window).height() - 132 - $(".scrollH").height() - $(".foot").height()
    if (scrollH > 0) {
        $(".foot").css("margin-top", scrollH);
    }

})

// 登录
$(".log_login").click(function () {
    var username = $(".log_username>input").val();
    var password = $(".log_password>input").val();
    var usernamef = $(".logf_username>input").val();
    var passwordf = $(".logf_password>input").val();
    if (val == 1) { //账号登录
        $.ajax({
            type: "post",
            url: httpXhr + "login.do",
            data: {
                username: username,
                password: password,
                mac: ""
            },
            dataType: "json",
            success: function (data) {
                if (data.code == "200") {
                    location.href = "main.jsp";
                } else {
                    $(".comm_model>div").html("密码错误")
                    $(".comm_model,.add_background").show();
                }
            }
        });
    } else { //手机号登录
        $.ajax({
            type: "post",
            url: httpXhr + "sms/loginMobile.do",
            data: {
                mobile: usernamef,
                smsCode: passwordf,
                mac: ""
            },
            dataType: "json",
            success: function (data) {
                if (data.code == "200") {
                    location.href = "main.jsp";
                } else {
                    $(".comm_model>div").html("密码错误")
                    $(".comm_model,.add_background").show();
                }
            }
        });
    }


});
// 发送验证码
$(".log_yzm").click(function () {
    $(this).css({
        "border": "1px solid #eee",
        "color": "#888"
    })
    var hlong = 60;
    var t = setInterval(function () {
        if (hlong > 0) {
            $(".log_yzm").html(--hlong + "秒后重新发送")
        } else {
            $(".log_yzm").css({
                "border": "1px solid #3bcd80",
                "color": "#3bcd80"
            })
            $(".log_yzm").html("发送验证码");
            clearInterval(t);
        }
    }, 1000);

    //
    var usernamef = $(".logf_username>input").val();
    $.ajax({
        type: "post",
        url: httpXhr + "userController/fscode.do",
        data: {
            mobile: usernamef
        },
        dataType: "json",
        success: function (data) {
            if (data.code == "200") {
                alert("发送成功！")
                //     location.href = "main.jsp"; // + "log=" + data;
                // } else {

            }
        }
    });
});

// 账号，手机切换
$(".log_tit>div").click(function () {
    $(this).css({
        "color": "#222",
        "border-bottom": "2px solid #3bcd80"
    }).siblings().css({
        "color": "#555",
        "border-bottom": "2px solid #eee"
    });
    val = $(this).attr("value");
    if (val == "1") {
        $(".logf_username,.logf_password").css("display", "none");
        $(".log_username,.log_password").css("display", "block");
    } else {
        $(".logf_username,.logf_password").css("display", "block");
        $(".log_username,.log_password").css("display", "none");

    }
});

//立即注册
$(".log_resg>span").click(function () {
    location.href = "register.jsp";
})

// 忘记密码
$(".log_forget").click(function () {
    location.href = "forget.jsp";
});