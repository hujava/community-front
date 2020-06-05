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

    function verifysk(obj, type) {
        var v = $(obj).val();
        if (type == "nametop") {
            if ($.trim(v) == "") {
                my_alert("请输入学生姓名");
                $("#my_ok").one("click", function() {
                    myalert_hide();
                    $(obj).focus();
                });

                return false;
            }
        }
        if (type == "jiaztop") {
            if ($.trim(v) == "") {
                my_alert("请填写家长称呼");
                $("#my_ok").one("click", function() {
                    myalert_hide();
                    $(obj).focus();
                });

                return false;
            }
        }

        if (type == "jiudunjtop") {
            if ($.trim(v) == "") {
                my_alert("请填写就读年级");
                $("#my_ok").one("click", function() {
                    myalert_hide();
                    $(obj).focus();
                });

                return false;
            }
        }

        if (type == "lxfstop") {
            var reg = /^1[34578]{1}[0-9]{9}$/;
            if ($.trim(v) == "") {
                my_alert("请输入联系方式");
                $("#my_ok").one("click", function() {
                    myalert_hide();
                    $(obj).focus();
                });
                return false;
            }
            if (reg.test(v) === false) {
                my_alert("请输入正确联系方式");
                $("#my_ok").one("click", function() {
                    myalert_hide();
                    $(obj).focus();
                });
                return false;
            }
        }
        return true;
    }

    $("#topbut").click(function() {

        if (!verifysk("#sig_nametop", "nametop")) {
            return false;
        }
        if (!verifysk("#sig_jiaztop", "jiaztop")) {
            return false;
        }
        if (!verifysk("#sig_jiudunjtop", "jiudunjtop")) {
            return false;
        }
        if (!verifysk("#sig_lxfstop", "lxfstop")) {
            return false;
        }
        if (!verifysk("#tuyzmtop", "tuyzmtop")) {
            return false;
        }
        var data = $("#forms").serialize();
        $.post(httpXhr + "/reservationController/addReservation.do", data, function(data) {
            if (data["code"] == "200") {
                $("#cgtc").show();
                $("#tankuang").hide();

                $("#my_ok").one("click", function() {
                    $("#forms")[0].reset();
                });
            } else {
                my_alert(data["msg"]);
                $("#my_ok").click(function() {
                    myalert_hide();
                });
            }
        }, "json");
    });