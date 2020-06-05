// setTimeout(function() {
//     var data3 = {
//         code: "200",
//         msg: "ok ",
//         more: 1,
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
//     if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
//         for (var i = 0; i < data3.data.rows.length; i++) {
//             var item = data3.data.rows[i]
//             newStr += '<div class="item ">' +
//                 '<div class="img">' +
//                 '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank"><img src="' + getImgeAdd(item.a_image) + '" alt="" title="" /></a>' +
//                 '</div>' +
//                 '<div class="padd">' +

//                 '<div class="t2">' +
//                 '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank">' + myOverflow(28, item.a_name) + '</a>' +
//                 '</div>' +
//                 '<div class="t1">' + item.activity_time + '.' + item.activity_day + '</div>' +
//                 '<div class="p">' + myOverflow(36, item.a_des) + '</div>' +
//                 '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank" class="more">查看详情</a>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>'
//         }
//     }

//     wmWrap.append(newStr)
//     wmWrap.imagesLoaded(function() {
//         wmWrap.wookmarkInstance.initItems();
//         wmWrap.wookmarkInstance.layout(true);
//         wmWrap.trigger('refreshWookmark');
//     });
//     if (!data3.more) {
//         $("#moreStudent").hide();
//     } else {
//         params.page++;
//     }
// }, 500)

function renderStudent(params) {
    $.post(httpXhr + "/activityController/activityList.do", params, function(data3) {
        if (data3["code"] == "200") {
            var newStr = ""
            if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
                for (var i = 0; i < data3.data.rows.length; i++) {
                    var item = data3.data.rows[i]
                    newStr += '<div class="item ">' +
                        '<div class="img">' +
                        '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank"><img src="' + getImgeAdd(item.a_image) + '" alt="" title="" /></a>' +
                        '</div>' +
                        '<div class="padd">' +

                        '<div class="t2">' +
                        '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank">' + myOverflow(28, item.a_name) + '</a>' +
                        '</div>' +
                        '<div class="t1">' + item.activity_time + '.' + item.activity_day + '</div>' +
                        '<div class="p">' + myOverflow(36, item.a_des) + '</div>' +
                        '<a href="./newsdetail.html?id=' + item.a_id + '" target="_blank" class="more">查看详情</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
            }

            wmWrap.append(newStr)
            wmWrap.imagesLoaded(function() {
                wmWrap.wookmarkInstance.initItems();
                wmWrap.wookmarkInstance.layout(true);
                wmWrap.trigger('refreshWookmark');
            });
            if (!data3.more) {
                $("#moreStudent").hide();
            } else {
                params.page++;
            }
        } else {
            my_alert(data3["msg"]);
            $("#my_ok").click(function() {
                myalert_hide();
            });
        }
    }, "json");
}