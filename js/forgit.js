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

$(function () {

    // 发送验证码
    $(".log_yzm>div:nth-of-type(2)").click(function () {
        var usernamef = $(".log_phone>input").val();
        if (usernamef == "" || usernamef == null || usernamef == undefined) {
            alert("请输入手机号");
            return false;
        }
        // 手机号验证
        if (!(/^1[3456789]\d{9}$/.test(usernamef))) {
            alert("手机号码有误");
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
                    $(".log_yzm>div:nth-of-type(2)").html("重新发送" + "(" + hlong + ")")
                } else {
                    $(".log_yzm>div:nth-of-type(2)").css({
                        "border": "1px solid #3bcd80",
                        "color": "#3bcd80"
                    })
                    $(".log_yzm>div:nth-of-type(2)").html("发送验证码");
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

                }
            });
        }
    });

    // 注册
    $(".submit").click(function () {
        var log_phone = $(".log_phone>input").val(); //手机号
        var login_yzm = $(".log_yzm>input").val(); //验证码
        var password = $(".log_password>input").val(); //密码
        var passwords = $(".log_passwords>input").val(); //确认密码
        // 手机号验证
        if (!(/^1[3456789]\d{9}$/.test(log_phone))) {
            alert("手机号码有误，请重填!")
            return false;
        }
        // 密码
        if (password == "") {
            alert("请输入密码！")
            return;
        }
        debugger
        // 确认密码
        if (password != passwords) {
            alert("密码不一致！")
            return;
        }

        $.ajax({
            type: "post",
            url: httpXhr + "userController/updateCodeUser.do",
            data: {
                u_name: log_phone, //手机号
                p_word: password, //密码
                code: login_yzm, //验证码
            },
            dataType: "json",
            success: function (data) {
                debugger
                if (data.code == "200") {
                    $(".undline2").css("background","#3bcd80")
                    $(".undline2>img").attr("src","images/init1.png").css("margin-top","-12px")
                    $(".con_list1").show();
                    $(".con_list").hide();
                } else{
                    alert(data.msg)
                }
            }
        });
    });

    $(".login_li").click(function(){
        location.href = "login.jsp";
    });

});