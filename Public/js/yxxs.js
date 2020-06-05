// setTimeout(function() {
//     var data3 = { code: "200", more: 1, "data": { "total": "4", "rows": [{ "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "s_image": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "s_image": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "s_image": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "s_image": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }] }, msg: "ok" }
//     var personStr = ""
//     if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
//         data3.data.rows.forEach((item, i) => {
//             personStr += '<li data-wookmark-id="' + item.s_id + '" data-wookmark-height="493" data-wookmark-top="0" style="position: absolute; top: 0px; left: 312px;">' +
//                 '<div class="img"><img src="' + item.s_image + '" alt="" title=""></div>' +
//                 '<div class="cont cont1">' +
//                 '<div class="h16">' + item.s_name + '</div>' +
//                 '<div class="p">' + item.s_des + '</div>' +
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
    $.post(httpXhr + "/studentController/studentList.do", params, function(data3) {
        if (data3["code"] == "200") {
            var personStr = ""
            if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
                for (var i = 0; i < data3.data.rows.length; i++) {
                    var item = data3.data.rows[i]
                    personStr += '<li data-wookmark-id="' + item.s_id + '" data-wookmark-height="493" data-wookmark-top="0" style="position: absolute; top: 0px; left: 312px;">' +
                        '<div class="img"><img src="' + getImgeAdd(item.s_image) + '" alt="" title=""></div>' +
                        '<div class="cont cont1">' +
                        '<div class="h16">' + item.s_name + '</div>' +
                        '<div class="p">' + item.s_des + '</div>' +
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