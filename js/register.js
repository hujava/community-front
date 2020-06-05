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
var hlong = 60; //定时器
var select_id = ""; //社区ID
var role = 0;
var dacode = "";

$(function () {

    $(".input_ss,.navi>li").remove();
    $(".return_m>span").css("display", "block");
    // 社区点击
    $(".log_sq>input").click(function () {
        $(".log_select").show();
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
                    str += "<span sq_id='" + data.data.rows[i].a_id + "'>" + data.data.rows[i].a_name + "</span>";
                }
                $(".log_select").html(str);
                // 社区点击事件
                $(".log_select>span").click(function () {
                    var select_val = $(this).text();
                    select_id = $(this).attr("sq_id");
                    $(".log_sq>input").val(select_val);
                    $(".log_select").hide();
                });

            }
        }
    });



})

// 用户协议切换
$(".ynxy img").click(function () {
    var ynxy = $(".ynxy img").attr("src");
    if (ynxy == "images/nxy.png") {
        $(".ynxy img").attr("src", "images/yxy.png");
        role = 1;
    } else {
        $(".ynxy img").attr("src", "images/nxy.png");
        role = 0;
    }
})

// 注册
$(".log_login").click(function () {
    var log_phone = $(".log_phone>input").val(); //手机号
    var log_name = $(".log_name>input").val(); //昵称
    var password = $(".log_password>input").val(); //密码
    var passwords = $(".log_password2>input").val(); //确认密码
    var login_yzm = $(".login_yzm>input").val(); //验证码
    // 手机号验证
    if (!(/^1[3456789]\d{9}$/.test(log_phone))) {
        $(".comm_model>div").html("手机号码有误，请重填!")
        $(".comm_model,.add_background").show();
        canScroll = true;
        return false;
    }
    // 密码
    if (password == "") {
        $(".comm_model>div").html("请输入密码！")
        $(".comm_model,.add_background").show();
        return;
    }
    // 判断是否同意协议
    if (role == 0) {
        $(".comm_model>div").html("请同意协议内容！")
        $(".comm_model,.add_background").show();
        return;
    }
    // 判读确认密码是否一致
    if (password != passwords) {
        $(".comm_model>div").html("密码不一致！")
        $(".comm_model,.add_background").show();
        return;
    }
    //昵称非空验证
    if (log_name == undefined || log_name == null || log_name == "") {
        $(".comm_model>div").html("昵称不能为空！")
        $(".comm_model,.add_background").show();
        return;
    }
    $.ajax({
        type: "post",
        url: httpXhr + "userController/regPhoneUser.do",
        data: {
            u_name: log_phone, //手机号
            a_name: log_name, //昵称
            p_word: password, //密码
            js: "2",
            code: login_yzm, //验证码
            areas_sq: select_id //社区ID
        },
        dataType: "json",
        success: function (data) {
            dacode = data.code;
            if (data.code == "200") {
                $(".comm_model>div").html("注册成功！")
                $(".comm_model,.add_background").show();
            } else {
                $(".comm_model>div").html(data.msg);
                $(".comm_model,.add_background").show();
            }
        }
    });

});
// 发送验证码
$(".log_yzm").click(function () {
    var usernamef = $(".log_phone>input").val();
    if (usernamef == "" || usernamef == null || usernamef == undefined) {
        $(".comm_model>div").html("请输入手机号")
        $(".comm_model,.add_background").show();
        return false;
    }
    // 手机号验证
    if (!(/^1[3456789]\d{9}$/.test(usernamef))) {
        $(".comm_model>div").html("手机号码有误")
        $(".comm_model,.add_background").show();
        return false;
    }
    $(this).css({
        "border": "1px solid #eee",
        "color": "#888"
    })
    if (hlong < 60) {
        return false;
    } else {
        //定时器
        var t = window.setInterval(function () {
            if (hlong > 0) {
                hlong = --hlong;
                $(".log_yzm").html("重新发送" + "(" + hlong + ")")
            } else {
                $(".log_yzm").css({
                    "border": "1px solid #3bcd80",
                    "color": "#3bcd80"
                })
                $(".log_yzm").html("发送验证码");
                hlong = 60;
                window.clearInterval(t);
            }
        }, 1000);
        $.ajax({
            type: "post",
            url: httpXhr + "userController/fscode.do",
            data: {
                mobile: usernamef
            },
            dataType: "json",
            success: function (data) {
                debugger
            }
        });
    }
});

$(".comm_model>span").click(function () {
    $(".comm_model,.add_background").hide();
    if(dacode=='200'){
        location.href = "login.jsp";
    }
});