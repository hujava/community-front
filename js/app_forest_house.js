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
var u_id = GetQueryString("u_id"); //
if (u_id != null && u_id.toString().length > 1) {
    var u_id = u_id;
}

var wxcode = GetQueryString("code"); //
if (wxcode != null && wxcode.toString().length > 1) {
    var wxcode = wxcode;
}


var timer = ""; //定时器


// Init初始化
$(document).ready(function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10.8 + 'px';
    $('.add_background,.comm_model').bind("touchmove", function (e) {
        e.preventDefault();
    });


    if (window.plus) {
        plusReady();
    } else {
        document.addEventListener('plusready', plusReady, false);
    }

    function plusReady() {
        plus.cache.clear(function () {
            callback();
        });
    }
    //input失去焦点
    $(".enroll_phone,input").on("blur", function () {
        //定时器
        if (timer != "") {
            clearTimeout(timer);
        }
        this.timer = setTimeout(() => {
            window.scrollTo(0, 0)
        }, 10);

        let e = event.currentTarget;
        setTimeout(() => {
            e.scrollIntoView({
                block: 'end',
                behavior: 'smooth'
            });
        }, 300);
        window.scrollTo(0, 0);
        //解决键盘弹出后挡表单的问题
        window.addEventListener('resize', function () {
            if (
                document.activeElement.tagName === 'INPUT' ||
                document.activeElement.tagName === 'TEXTAREA'
            ) {
                window.setTimeout(function () {
                    if ('scrollIntoView' in document.activeElement) {
                        document.activeElement.scrollIntoView();
                    } else {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }
                }, 0);
            }
        });
        this.timer = setTimeout(() => {
            document.body.scrollTop = 0;
            window.pageXOffset = 0;
            document.documentElement.scrollTop = 0;
        }, 100);

    });

    //初始化
    $.ajax({
        type: "post",
        url: httpXhr + "commodityController/wxcommodityList.do?pc=1&wxcode=" + wxcode,
        dataType: "json",
        success: function (dt) {
            var userid = dt.data.user_id;
            location.href = "app_forest_houseList.jsp?user_id=" + userid;

        }
    });

    // 弹框关闭
    $(".closeJf").click(function () {
        $(".jf_model,.jf_background").hide();
        $(".confirm").show();
        $(".s_jf>div").css("margin-top", "0rem");
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

//跳转
$(".comm_model").click(function () {
    $(".comm_model,.add_background").hide();
});