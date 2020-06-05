    // var data1 = { code: "200", "activity": { "a_name": "新闻标题", "activity_time": "2020.04.18", "activity_html": "带格式的新闻内容" }, msg: "ok" }
    // var newStr = ''
    // if (data1 && data1.activity) {
    //     newStr += '<div class="tit-wrapper">' +
    //         '<div class="tit">' +
    //         '<div class="fst">' + data1.activity.a_name + '</div>' +
    //         '<div class="sec"><span class="date">' + data1.activity.activity_time + '</span><span>来自：静宇娴风教育</span></div>' +
    //         '</div>' +
    //         '</div>' +
    //         '<div class="wrap">' + data1.activity.activity_html + '</div>'
    // }

    // $('#newsContent').append(newStr)


    var id = location.search.substring(1).split('=')[1]

    function renderContent() {
        $.post(httpXhr + "/activityController/selectActivity.do", {
            a_id: id
        }, function(data1) {
            if (data1["code"] == "200") {
                var newStr = ''
                if (data1 && data1.activity) {
                    newStr += '<div class="tit-wrapper">' +
                        '<div class="tit">' +
                        '<div class="fst">' + data1.activity.a_name + '</div>' +
                        '<div class="sec"><span class="date">' + data1.activity.activity_time + '</span><span>来自：静宇娴风教育</span></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="wrap">' + data1.activity.activity_html + '</div>'
                }

                $('#newsContent').append(newStr)
            } else {
                my_alert(data1["msg"]);
                $("#my_ok").click(function() {
                    myalert_hide();
                });
            }
        }, "json");
    }