// setTimeout(function() {
//     var data3 = { code: "200", more: 1, "data": { "total": "2", "rows": [{ "address": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg", "grade": "中班", "h_name": "希望的田野", "h_time": "2020-04-10", "s_name": "张小碗" }, { "address": "teacher/upload/1586506887442.jpg", "grade": "中班", "h_name": "希望的田野2", "h_time": "2020-04-11", "s_name": "张小往" }] }, msg: "ok" }
//     var personStr = ""
//     if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
//         data3.data.rows.forEach((item, i) => {
//             personStr += '<li>' +
//                 '<div class="img">' +
//                 '<img src="' + item.address + '" alt="" title="">' +
//                 '</div>' +
//                 '<div class="cont">' +
//                 '<div class="h16">' + item.h_name + ' </div>' +
//                 '<p class="date">' + item.h_time + '</p>' +
//                 '<p class="p">' + item.grade + '</p>' +
//                 '</div>' +
//                 '</li>'
//         });
//     }
//     wmWrap.append(personStr)
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
    $.post(httpXhr + "/studentController/studentAndHonorList.do", params, function(data3) {
        if (data3["code"] == "200") {
            var personStr = ""
            if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
                for (var i = 0; i < data3.data.rows.length; i++) {
                    var item = data3.data.rows[i]
                    personStr += '<li>' +
                        '<div class="img">' +
                        '<img src="' + getImgeAdd(item.address) + '" alt="" title="">' +
                        '</div>' +
                        '<div class="cont">' +
                        '<div class="h16">' + item.h_name + ' </div>' +
                        '<p class="date">' + item.h_time + '</p>' +
                        '<p class="p">' + item.grade + '</p>' +
                        '</div>' +
                        '</li>'
                }
            }

            wmWrap.append(personStr)
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