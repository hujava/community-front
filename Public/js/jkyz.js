var STATICDAY = {
    '1': {
        en: 'Monday',
        cn: '星期一'
    },
    '2': {
        en: 'Tuesday',
        cn: '星期二'
    },
    '3': {
        en: 'Wednesday',
        cn: '星期三'
    },
    '4': {
        en: 'Thursday',
        cn: '星期四'
    },
    '5': {
        en: 'Friday',
        cn: '星期五'
    }
}

// setTimeout(function() {
//     var data = { code: "200", "data": { "total": "5", "rows": [{ "f_breakfast": "小米粥,小米粥", "f_snack": "苹果", "f_lunch": "大米饭,馒头,小米粥,小米粥", "f_snack2": "水果", "f_dinner": "小米粥,小米粥,小米粥,小米粥", "f_week": 1 }, { "f_breakfast": "小米粥", "f_snack": "苹果", "f_lunch": "大米饭,馒头", "f_snack2": "水果,蔬菜", "f_dinner": "小米粥", "f_week": 2 }, { "f_breakfast": "小米粥", "f_snack": "苹果", "f_lunch": "大米饭,馒头", "f_snack2": "水果,蔬菜", "f_dinner": "小米粥", "f_week": 3 }, { "f_breakfast": "小米粥", "f_snack": "苹果", "f_lunch": "大米饭,馒头", "f_snack2": "水果,蔬菜", "f_dinner": "小米粥", "f_week": 4 }, { "f_breakfast": "小米粥", "f_snack": "苹果", "f_lunch": "大米饭,馒头", "f_snack2": "水果,蔬菜", "f_dinner": "小米粥", "f_week": 5 }] }, msg: "ok" };
//     var mealStr = ""
//     if (data && data.data && data.data.rows && data.data.rows.length) {
//         for (var i = 0; i < data.data.rows.length; i++) {
//             var item = data.data.rows[i]
//             var key = String(item.f_week)
//             var breakfastArr = item.f_breakfast.split(','),
//                 breakfastStr = '',
//                 lunchArr = item.f_lunch.split(','),
//                 lunchStr = '',
//                 dinnerArr = item.f_dinner.split(','),
//                 dinnerStr = '';
//             for (var j = 0; j < breakfastArr.length; j++) {
//                 breakfastStr += '<div>' + breakfastArr[j] + '</div>'
//             }
//             for (var k = 0; k < lunchArr.length; k++) {
//                 lunchStr += '<div>' + lunchArr[k] + '</div>'
//             }
//             for (var l = 0; l < dinnerArr.length; l++) {
//                 dinnerStr += '<div>' + dinnerArr[l] + '</div>'
//             }

//             mealStr += '<div class="div">' +
//                 '<div class="padd">' +
//                 '<div class="content">' +
//                 '<div class="tit-english">' + STATICDAY[key].en + '</div>' +
//                 '<div class="tit-chinese">' + STATICDAY[key].cn + '</div>' +
//                 '<div class="item">' +
//                 '<div class="meal">早餐 </div>' +
//                 '<div class="del">' + breakfastStr +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="item">' +
//                 '<div class="meal">加餐</div>' +
//                 '<div class="del">' +
//                 '<div>' + item.f_snack + '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="item">' +
//                 '<div class="meal">午餐</div>' +
//                 '<div class="del">' + lunchStr +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="item">' +
//                 '<div class="meal">加餐</div>' +
//                 '<div class="del">' +
//                 '<div>' + item.f_snack2 + '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="item no-border">' +
//                 '<div class="meal">晚餐</div>' +
//                 '<div class="del">' + dinnerStr +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>'
//         }
//     }

//     $('#mealWrapper').append(mealStr)

//     $(function() {
//         size1 = 3;
//         if ($(window).width() <= 750) {
//             size1 = 1;
//         }
//         $(".home6 .one-time").slick({
//             infinite: false,
//             speed: 500,
//             slidesToShow: size1,
//             touchMove: false,
//             slidesToScroll: 1
//         });
//     });

//     var data3 = { code: "200", more: 1, "data": { "total": "4", "rows": [{ "s_id": "1", "f_name": "张晓婉", "c_time": "小班班长", "f_address": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "c_time": "小班班长", "f_address": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "f_address": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }, { "s_id": "1", "s_name": "张晓婉", "s_des": "小班班长", "f_address": "./Uploads/Picture/2019/07/03/s5d1c23630bc4f_900_1060_0_0.jpg" }] }, msg: "ok" }
//     var personStr = ""
//     if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
//         data3.data.rows.forEach((item, i) => {
//             personStr += '<li data-wookmark-id="' + item.s_id + '" data-wookmark-height="493" data-wookmark-top="0" style="position: absolute; top: 0px; left: 312px;">' +
//                 '<div class="img"><img src="' + item.f_address + '" alt="" title=""></div>' +
//                 '<div class="cont cont1">' +
//                 '<div class="h16">' + item.f_name + '</div>' +
//                 '<div class="p">发布时间：' + item.c_time + '</div>' +
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

function renderMeal(params) {
    $.post(httpXhr + "/foodsController/foodsList.do", params, function(data) {
        if (data["code"] == "200") {
            var mealStr = ""
            if (data && data.data && data.data.rows && data.data.rows.length) {
                for (var i = 0; i < data.data.rows.length; i++) {
                    var item = data.data.rows[i]
                    var key = String(item.f_week)
                    var breakfastArr = item.f_breakfast.split(','),
                        breakfastStr = '',
                        lunchArr = item.f_lunch.split(','),
                        lunchStr = '',
                        dinnerArr = item.f_dinner.split(','),
                        dinnerStr = '';
                    for (var j = 0; j < breakfastArr.length; j++) {
                        breakfastStr += '<div>' + breakfastArr[j] + '</div>'
                    }
                    for (var k = 0; k < lunchArr.length; k++) {
                        lunchStr += '<div>' + lunchArr[k] + '</div>'
                    }
                    for (var l = 0; l < dinnerArr.length; l++) {
                        dinnerStr += '<div>' + dinnerArr[l] + '</div>'
                    }

                    mealStr += '<div class="div">' +
                        '<div class="padd">' +
                        '<div class="content">' +
                        '<div class="tit-english">' + STATICDAY[key].en + '</div>' +
                        '<div class="tit-chinese">' + STATICDAY[key].cn + '</div>' +
                        '<div class="item">' +
                        '<div class="meal">早餐 </div>' +
                        '<div class="del">' + breakfastStr +
                        '</div>' +
                        '</div>' +
                        '<div class="item">' +
                        '<div class="meal">加餐</div>' +
                        '<div class="del">' +
                        '<div>' + item.f_snack + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="item">' +
                        '<div class="meal">午餐</div>' +
                        '<div class="del">' + lunchStr +
                        '</div>' +
                        '</div>' +
                        '<div class="item">' +
                        '<div class="meal">加餐</div>' +
                        '<div class="del">' +
                        '<div>' + item.f_snack2 + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="item no-border">' +
                        '<div class="meal">晚餐</div>' +
                        '<div class="del">' + dinnerStr +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
            }

            $('#mealWrapper').append(mealStr)

            $(function() {
                size1 = 3;
                if ($(window).width() <= 750) {
                    size1 = 1;
                }
                $(".home6 .one-time").slick({
                    infinite: false,
                    speed: 500,
                    slidesToShow: size1,
                    touchMove: false,
                    slidesToScroll: 1
                });
            });
        } else {
            my_alert(data["msg"]);
            $("#my_ok").click(function() {
                myalert_hide();
            });
        }
    }, "json");
}

function renderStudent(params) {
    $.post(httpXhr + "/foodsController/foodsResultList.do", params, function(data3) {
        if (data3["code"] == "200") {
            var personStr = ""
            if (data3 && data3.data && data3.data.rows && data3.data.rows.length) {
                for (var i = 0; i < data3.data.rows.length; i++) {
                    var item = data3.data.rows[i]
                    personStr += '<li data-wookmark-id="' + item.s_id + '" data-wookmark-height="493" data-wookmark-top="0" style="position: absolute; top: 0px; left: 312px;">' +
                        '<div class="img"><img src="' + getImgeAdd(item.f_address) + '" alt="" title=""></div>' +
                        '<div class="cont cont1">' +
                        '<div class="h16">' + item.f_name + '</div>' +
                        '<div class="p">发布时间：' + item.c_time + '</div>' +
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