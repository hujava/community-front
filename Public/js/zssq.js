$('#form_scusess .close').on('click', function() {
    $('#form_scusess').hide();
});

$('#sig_muqian').on('click', function() {
    // var fdi = $('#sig_muqian option:selected').val();
    // if(fdi != ''){
    $('#xainzai').show();
    // }
})

function verify(obj, type) {
    var v = $(obj).val();
    if (type == 'name') {
        if ($.trim(v) == "") {
            my_alert('请输入姓名');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }
    }
    if (type == 'sex') {

        if ($.trim(v) == "") {
            my_alert('请选择性别');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }
    }
    if (type == 'riqi') {
        var regs = /^([\.0-9_-])/;
        if ($.trim(v) == "") {
            my_alert('请填写出生日期');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }
        if (regs.test(v) === false) {
            my_alert('请填写正确日期');

            $('#my_ok').click(function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }
    }
    if (type == 'contact') {
        if ($.trim(v) == "") {
            my_alert('请填写联系人姓名');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }

    }
    if (type == 'guanxi') {

        if ($.trim(v) == "") {
            my_alert('请填写您的微信');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }
        var si1 = document.getElementById("sig_guanxi").value.length;
        if (si1 > 20) {
            my_alert('请输入少于20个字');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })
            return false;
        };
    }
    if (type == 'muqian') {

        if ($.trim(v) == "") {
            my_alert('请填写当前年级');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }
    }
    if (type == 'shenqing') {
        if ($.trim(v) == "") {
            my_alert('请填写所要申请年级');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }
    }
    if (type == 'school') {
        if ($.trim(v) == "") {
            my_alert('请填写现学校名称');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })

            return false;
        }
    }
    if (type == 'tel') {
        var reg = /^1[34578]{1}[0-9]{9}$/;
        if ($.trim(v) == "") {
            my_alert('请输入手机号');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })
            return false;
        };
        if (reg.test(v) === false) {
            my_alert('请输入正确手机');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })
            return false;
        };
    }
    if (type == 'email') {
        if ($.trim(v) == "") {
            my_alert('请填写方便联系您的时间');
            $('#my_ok').one('click', function() {
                myalert_hide();
                $(obj).focus();
            })
            return false;
        }
    }

    return true;
}

$('#advbut').click(function() {
    if (!verify('#sig_name', 'name')) {
        return false
    };
    if (!verify('#sig_sex', 'sex')) {
        return false
    };

    if (!verify('#sig_riqi', 'riqi')) {
        return false
    };

    if (!verify('#sig_contact', 'contact')) {
        return false
    };
    if (!verify('#sig_shenqing', 'shenqing')) {
        return false
    };

    if (!verify('#sig_tel', 'tel')) {
        return false
    };

    if (!verify('#sig_email', 'email')) {
        return false
    };
    var data = $('#suggest_forms').serialize();

    $.post(httpXhr + "/admissionController/addAdmission.do", data, function(data) {
        if (data['status'] == '200') {
            $('#form_scusess').show();
            $('#form_scusess .close').on('click', function() {
                $('#suggest_forms')[0].reset();
            })
        } else {
            my_alert(data['error']);
            $('#my_ok').click(function() {
                myalert_hide();
            })
        }
    }, "json");
})

// var data1 = { code: "200", "data": { "total": "2", "rows": [{ "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里22?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区22。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }, { "p_name": "请问贵学校地址在哪里?", "p_des": "A：家长您好！静宇娴风幼儿园坐落于北京市昌平区白各庄新村绿洲水乡南区。" }] }, msg: "ok" }
// var questionStr = ""
// if (data1 && data1.data && data1.data.rows && data1.data.rows.length) {
//     for (var i = 0; i < data1.data.rows.length; i++) {
//         var item = data1.data.rows[i]
//         questionStr += '<div class="line ">' +
//             '<div class="arr"></div>' +
//             '<div class="q"><i>Q</i>' +
//             '<div class="s1">' + item.p_name + '</div>' +
//             '</div>' +
//             '<div class="a"><i>A</i>' +
//             '<div class="s1">' + item.p_des + '</div>' +
//             '</div>' +
//             '</div>'
//     }
// }

// $('#questionWrapper').append(questionStr)

// var data1 = {
//     code: "200",
//     msg: "ok ",
//     data: {
//         total: '4',
//         rows: [{
//             a_id: 1, //活动ID
//             a_name: '的是非得失活动时的是非得失活动时间活动时间活动时间活动时间的是非得失活动时间活动时间活动时间活动时间间活动时间活动时间活动时间',
//             a_image: '/Public/img/banner.png', //图片字段
//             activity_time: "2020.04", //活动时间 年.月
//             activity_day: '13', //活动时间 日
//             a_des: "活动时间 年.月活动活动时间 年.月活动时间 年.月活动时活动时间 年.月活动时间 年.月活动时时间 年.月活动时间 年.月活动时间 年.月"
//         }, {
//             a_id: 1, //活动ID
//             a_name: '2312',
//             a_image: '/Public/img/banner.png', //图片字段
//             activity_time: "2020.04", //活动时间 年.月
//             activity_day: '13', //活动时间 日
//             a_des: "活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日"
//         }, {
//             a_id: 1, //活动ID
//             a_name: '2312',
//             a_image: '/Public/img/banner.png', //图片字段
//             activity_time: "2020.04", //活动时间 年.月
//             activity_day: '13', //活动时间 日
//             a_des: "活动时间 日活动时间 日活动时间 日活动时间 日活动时间 日"
//         }]
//     }
// }
// var newStr = ""
// if (data1 && data1.data && data1.data.rows && data1.data.rows.length) {
//     for (var i = 0; i < data1.data.rows.length; i++) {
//         var item = data1.data.rows[i]
//         newStr += '<div class="div">' +
//             '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank">' +
//             '<div class="img"><img src="' + item.a_image + '" alt="" title=""></div>' +
//             '<div class="mask">' + item.a_name + '</div>' +
//             '</a>' +
//             '</div>'
//     }
// }
// newStr += '<div class="div div1"><a href="/xwyhd.html" class="more">查看更多</a></div>'
// $('#newestActivity').append(newStr)

function renderQuestions() {
    $.post(httpXhr + "/activityController/activityList.do", {
        tj: 1, //是否推荐 0不推荐 1推荐 全部不用填写
        page: 1, //页码
        rows: 4, //每页显示的行数
        pc: 1
    }, function(data1) {
        if (data1["code"] == "200") {
            var questionStr = ""
            if (data1 && data1.data && data1.data.rows && data1.data.rows.length) {
                for (var i = 0; i < data1.data.rows.length; i++) {
                    var item = data1.data.rows[i]
                    questionStr += '<div class="line ">' +
                        '<div class="arr"></div>' +
                        '<div class="q"><i>Q</i>' +
                        '<div class="s1">' + item.p_name + '</div>' +
                        '</div>' +
                        '<div class="a"><i>A</i>' +
                        '<div class="s1">' + item.p_des + '</div>' +
                        '</div>' +
                        '</div>'
                }
            }

            $('#questionWrapper').append(questionStr)
        } else {
            my_alert(data1["msg"]);
            $("#my_ok").click(function() {
                myalert_hide();
            });
        }
    }, "json");
}

function renderNewestActivity() {
    $.post(httpXhr + "/activityController/activityList.do", {
        tj: 1, //是否推荐 0不推荐 1推荐 全部不用填写
        page: 1, //页码
        rows: 3, //每页显示的行数
        pc: 1
    }, function(data1) {
        if (data1["code"] == "200") {
            var newStr = ""
            if (data1 && data1.data && data1.data.rows && data1.data.rows.length) {
                for (var i = 0; i < data1.data.rows.length; i++) {
                    var item = data1.data.rows[i]
                    newStr += '<div class="div">' +
                        '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank">' +
                        '<div class="img"><img src="' + getImgeAdd(item.a_image) + '" alt="" title=""></div>' +
                        '<div class="mask">' + item.a_name + '</div>' +
                        '</a>' +
                        '</div>'
                }
            }
            newStr += '<div class="div div1"><a href="/xwyhd.html" class="more">查看更多</a></div>'
            $('#newestActivity').append(newStr)
        } else {
            my_alert(data1["msg"]);
            $("#my_ok").click(function() {
                myalert_hide();
            });
        }
    }, "json");
}