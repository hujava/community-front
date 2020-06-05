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
var aid = GetQueryString("aid"); //课程ID
if (aid != null && aid.toString().length > 1) {
    var aid = aid;
}

// Init初始化
var info_id = "";
var random = Math.random();
$(document).ready(function () {
    // 导航栏
    $('.tabsholder').cardTabs({
        theme: 'graygreen'
    });
    /* 吸顶效果*/
    $(".tabsholder>div:nth-of-type(1)").attr("id", "wrap");
    var obj = document.getElementById("wrap");
    var ot = obj.offsetTop;
    document.onscroll = function () {
        var st = document.body.scrollTop || document.documentElement.scrollTop;
        obj.setAttribute("data-fixed", st >= 610 ? "fixed" : "");
    }

    /*
     * 封装吸顶函数，需结合css实现。
     * 也可以直接用js改变样式，可以自行修改。
     */
    function ceiling(obj) {
        var ot = obj.offsetTop;
        document.onscroll = function () {
            var st = document.body.scrollTop || document.documentElement.scrollTop;
            /*
             * 在这里我给obj添加一个自定义属性。className可能会影响原有的class
             * 三元运算使代码更简洁
             */
            obj.setAttribute("data-fixed", st >= 610 ? "fixed" : "");
            // $("#wrap[data-fixed=\"fixed\"]").css("margin-left","0px;");
        }
    }
    window.onload = function () {
        /*获取导航对象*/
        var wrap = document.getElementById("wrap");
        ceiling(wrap) /*调用吸顶函数  */
    };
    //此demo通过Ajax加载分页元素
    var num_entries = "";
    var initPagination = function () {
        num_entries = $("#hiddenresult div.result").length;
        // 创建分页
        $("#Pagination").pagination(num_entries, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 3, //主体页数
            callback: pageselectCallback,
            items_per_page: 4, //每页显示1项  
            prev_text: "前一页",
            next_text: "后一页"
        });
    };

    function pageselectCallback(page_index, jq) {
        $("#Searchresult").children().remove();
        var new_content = "";
        var page_index = page_index + 1;
        var index = "";
        if (page_index * 4 > num_entries) {
            index = num_entries;
        } else {
            index = page_index * 4
        }
        for (var i = (page_index - 1) * 4; i < index; i++) {
            new_content = $("#hiddenresult div.result:eq(" + i + ")").clone();
            $("#Searchresult").append(new_content); //装载对应分页的内容
        }
        return false;
    }
    //ajax加载
    $("#hiddenresult").load("load.jsp", null, initPagination);
    // 标题点赞
    // 点赞
    $(".title_dzmk>img").click(function () {
        if ($(this).attr("src") == "images/act-z.png") {
            var dzNum = $(this).next().next().text();
            $(this).next().next().text(++dzNum);
            $(this).attr("src", "images/act_l.png");
            $.ajax({
                type: "post",
                dataType: 'json',
                url: httpXhr + 'courseController/updateCourse.do?pc=1&c_id=' + aid + "&random=" + random,
                success: function (data) {
                    if (data.msg == "ok") {
                        //alert("点赞成功！");
                    }
                }
            });
        }
    })
    // 单个课程详情
    $.ajax({
        type: "post",
        url: httpXhr + "courseController/selectCourse.do?pc=1&c_id=" + aid + "&random=" + random,
        dataType: "json",
        success: function (data) {
            var json = data.course;
            // 详情图
            var img = encodeURI(encodeURI(json.c_image));
            var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
            $(".info_img>img").attr("src", fileUrl)
            // 活动名称
            $(".info_content h4").html(json.c_name);
            // 编号
            $("._content>div:nth-of-type(1)>span:nth-of-type(2)").html(json.c_id);
            // 授课区域
            $("._content>div:nth-of-type(2)>span:nth-of-type(2)").html(json.c_address);
            // 学段
            var json_ai = [];
            json_ai = json.c_ageInterval;
            if (json_ai.indexOf("13") > -1 || json_ai.indexOf("14") > -1 || json_ai.indexOf("15") > -1) {
                $("._content>div:nth-of-type(3)>span:nth-of-type(2)").append("<span class=\"sc_ch\">幼儿园</span>");
            } else if (json_ai.indexOf("1") > -1 || json_ai.indexOf("2") > -1 || json_ai.indexOf("3") > -1 || json_ai.indexOf("4") > -1 || json_ai.indexOf("5") > -1 || json_ai.indexOf("6") > -1) {
                $("._content>div:nth-of-type(3)>span:nth-of-type(2)").append("<span class=\"sc_sm\">小学</span>");
            } else if (json_ai.indexOf("7") > -1 || json_ai.indexOf("8") > -1 || json_ai.indexOf("9") > -1) {
                $("._content>div:nth-of-type(3)>span:nth-of-type(2)").append("<span class=\"sc_pri\">初中</span>");
            } else if (json_ai.indexOf("10") > -1 || json_ai.indexOf("11") > -1 || json_ai.indexOf("12") > -1) {
                $("._content>div:nth-of-type(3)>span:nth-of-type(2)").append("<span class=\"sc_mid\">高中</span>");
            }
            // 课时
            $("._content>div:nth-of-type(4)>span:nth-of-type(2)").html("<span>" + json.c_totalHours + "课时</span><span>" + json.c_duration + "分钟</span><span>" + json.c_methods + "</span>");
            // 浏览量
            $(".content_bom>div:nth-of-type(1)>span:nth-of-type(2)").html(json.lookNum);
            // 点赞
            $(".content_bom>div:nth-of-type(2)>span:nth-of-type(2),.dzmk>div").html(json.dzNum);
            // 课程介绍
            // $(".courseinfoPic").append(data.activity.a_html);
            // $(".courseinfoPic img").css({
            //     "width": "620px"
            // });
            info_id = json.c_id;
            $(".dzmk>img,.title_dzmk>img").attr("a_id", json.c_id)
        }
    });

    // 课程介绍 
    $.ajax({
        type: "post",
        url: httpXhr + "courseAndResultController/courseAndResultList.do?pc=1&c_id=" + aid + "&random=" + random,
        dataType: "json",
        success: function (data) {
            var str = "";
            str += "<div style=\"position: relative;margin-bottom:15px;\">";
            str += "<div style=\"border: 3px solid #3bcd80;width: 6px;height: 18px;display: inline-block;margin-top: 3px;\"></div>";
            str += "<div style=\"font-size: 16px;display: inline-block;margin-left: 10px;position: absolute;\">课程介绍</div></div>";
            for (let index = 0; index < data.rows.length; index++) {
                var img = encodeURI(encodeURI(data.rows[index].address));
                var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                str += "<img src=\"" + fileUrl + "\">";
            }

            $(".courseinfoPic").append(str);
        }
    });

    /* 课程大纲 */
    $.ajax({
        type: 'POST',
        url: httpXhr + 'courseAndChapterController/courseAndChapterList.do?c_id=' + aid,
        dataType: 'json',
        success: function (dt) {
            var str = "";
            var csi = "";
            if (dt.total != 0) {
                if (dt.rows.length > 5) {
                    csi = 5;
                } else {
                    csi = dt.rows.length;
                }
                str += "<span style=\"position: relative;margin-bottom:15px;display:inline-block\">";
                str += "<div style=\"border: 3px solid #3bcd80;width: 6px;height: 18px;display: inline-block;margin-top: 3px;\"></div>";
                str += "<div style=\"font-size: 16px;display: inline-block;margin-left: 10px;position: absolute;width:100px;\">课程大纲</div></span>";
                for (var i = 0; i < csi; i++) {
                    str += "<div><div>" + (i + 1) + "</div>";
                    str += "<p>" + dt.rows[i].c_name + "</p>";
                    str += "<p>" + dt.rows[i].c_des + "</p> </div>";
                }
                $(".coursedg").append(str);
            }
            /* 课程大纲悬浮变色 */
            $(".coursedg>div").hover(function () {
                $(this).css({
                    "border": "1px solid #3BCD86",
                    "background": "#F5FCF9"
                });
                $(this).find("div").css({
                    "color": "#3BCD86",
                    "background": "#D5F2E4"
                });
            }, function () {
                $(this).css({
                    "border": "1px solid transparent",
                    "background": "#FBFBFB"
                });
                $(this).find("div").css({
                    "color": "#5a5a5a",
                    "background": "#E1E1E1"
                });
            });

        }
    });
    // 推荐课程
    $.ajax({
        type: "post",
        url: httpXhr + "courseAndSubjectController/selectCourseAndSubject.do?pc=1&tj=1&rows=3&page=1",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var str = "";
                var dataJson = data.data.rows;
                for (var i = 0; i < dataJson.length; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].c_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div aid=" + dataJson[i].c_id + "><img src=\"" + fileUrl + "\">";
                    str += "<p>" + dataJson[i].c_name + "</p><p>" + dataJson[i].c_name + "</p></div>";
                }
                $("._right_img").html(str);
                /* 点击课程，查询详细信息 */
                $("._right_img").on("click", 'div', function () {
                    var aid = $(this).attr("aid");
                    location.href = "class_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=2";
                });
            }
        }
    });


    // 发布
    $(".release").click(function () {
        var re_val = $(".release").attr("value");
        if (re_val == "") {
            alert("请先登录！");
            return;
        }
        var comment_content = $(".comment_content").val();
        if (comment_content == undefined || comment_content == "" || comment_content == null) {
            alert("留言内容不能为空！");
            return;
        }
        $.ajax({
            type: "post", //内容ID             //留言内容                      //用户ID
            url: httpXhr + "messageTableController/addMessageTable.do?pc=1&w_id=" + info_id + "&mt_type=3&" + "user_id=1" + "&random=" + random,
            dataType: "json",
            data: {
                mt_des: comment_content
            },
            success: function (data) {
                if (data.msg == "ok") {
                    alert("发布成功！");
                } else {
                    alert("发布失败！");
                }
            }
        })
    });

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