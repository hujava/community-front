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

var titName = GetQueryString("titName"); 
if (titName != null && titName.toString().length > 1) {
    var titName = titName;
}


// Init初始化
var info_id = "";
var random = Math.random();
$(function () {

    $(".title_lx>a:nth-of-type(2)>span").html(decodeURI(decodeURI(titName)));
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
                url: httpXhr + 'activityController/updateActivity.do?pc=1&a_id=' + aid + "&random=" + random,
                success: function (data) {
                    if (data.msg == "ok") {
                        //alert("点赞成功！");
                    }
                }
            });
        }
    })
    // 内容点赞
    $(".dzmk>img").click(function () {
        if ($(this).attr("src") == "images/dz_g.png") {
            var dzNum = $(this).next().text();
            $(this).next().text(++dzNum);
            $(this).attr("src", "images/dz_d.png");
            var a_id = $(this).attr("a_id");
            $.ajax({
                type: "post",
                dataType: 'json',
                url: httpXhr + 'activityController/updateActivity.do?pc=1&a_id=' + a_id + "&random=" + random,
                success: function (data) {
                    if (data.msg == "ok") {
                        //alert("点赞成功！");
                    }
                }
            });
        }
    })

    // 单个活动详情
    $.ajax({
        type: "get",
        url: httpXhr + "activityController/selectActivity.do?pc=1&a_id=" + aid + "&random=" + random,
        dataType: "json",
        success: function (data) {
            var json = data.activity;
            // 详情图
            var img = encodeURI(encodeURI(json.a_image));
            var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
            $(".info_img>img").attr("src", fileUrl)
            // 活动名称
            $(".info_content h4").html(json.a_name);
            // 编号
            $("._content>div:nth-of-type(1)>span:nth-of-type(2)").html(json.a_id);
            // 参与人员
            // $("._content>div:nth-of-type(2)>span:nth-of-type(2)").html(json.a_manager);
            // 活动负责人
            $("._content>div:nth-of-type(2)>span:nth-of-type(2)").html(json.a_manager);
            // 负责人电话
            $("._content>div:nth-of-type(3)>span:nth-of-type(2)").html(json.a_phone);
            // 负责人邮箱：
            $("._content>div:nth-of-type(4)>span:nth-of-type(2)").html(json.a_emall);
            // 报名时间：
            $("._content>div:nth-of-type(5)>span:nth-of-type(2)").html(json.a_deadline);
            // 活动时间
            $("._content>div:nth-of-type(6)>span:nth-of-type(2)").html(json.a_startTime + "~" + json.a_endTime);
            // 活动地点
            $("._content>div:nth-of-type(7)>span:nth-of-type(2)").html(json.a_place);
            // 浏览量
            $(".content_bom>div:nth-of-type(1)>span:nth-of-type(2)").html(json.lookNum);
            // 点赞
            $(".content_bom>div:nth-of-type(2)>span:nth-of-type(2),.dzmk>div").html(json.dzNum);
            // 活动介绍
            var str="";
            str += "<div style=\"position: relative;margin-bottom:15px;\">";
            str += "<div style=\"border: 3px solid #3bcd80;width: 6px;height: 18px;display: inline-block;margin-top: 3px;\"></div>";
            str += "<div style=\"font-size: 16px;display: inline-block;margin-left: 10px;position: absolute;\">活动介绍</div></div>";
            $(".courseinfoPic").append(str);
            $(".courseinfoPic").append(data.activity.a_html);
            // $(".courseinfoPic img").css({
            //     "width": "620px",
            //     "margin": "0px 165px"
            // });
            info_id = json.a_id;
            $(".dzmk>img").attr("a_id", json.a_id)


            // 获取当前日期
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;

            // 名额已满 已结束  我要报名（绿色）
            if (currentdate < json.a_startTime.substring(0, 10)) {
                $(".btns").html("我要报名").css({
                    "cursor": "pointer",
                    "background": "#3bcd80",
                    "color": "#fff"
                }).attr("id", "enroll");
            }
            // 我要报名
            $(".enroll").click(function () {
               var userName= $(".enroll").attr("value");
               if(userName==""){
                   alert("请先登录。");
                   return false;
               }
                $.ajax({
                    type: "post",
                    url: httpXhr + "registrationActivityController/addActivityGZH.do",
                    data: {
                        a_id: aid,
                        u_name: userName
                    },
                    dataType: "json",
                    success: function (data) {
                        alert(data.msg);
                    }
                });
            })


        }
    });

    // 推荐活动
    $.ajax({
        type: "post",
        url: httpXhr + "activityController/activityList.do?tj=1&pc=1",
        dataType: "json",
        success: function (data) {
            console.log(data)
            if (data.data.rows.length != 0) {
                var str = "";
                var dataJson = data.data.rows;
                var inx = "";
                if (dataJson.length > 4) {
                    inx = 4;
                } else {
                    inx = dataJson.length;
                }
                for (var i = 0; i < inx; i++) {
                    var img = encodeURI(encodeURI(dataJson[i].a_image));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str += "<div aid=" + dataJson[i].a_id + "><img src=\"" + fileUrl + "\">";
                    str += "<p title=\"" + dataJson[i].a_name + "\">" + dataJson[i].a_name + "</p></div>";
                }
                $("._right_img").html(str);
                /* 点击课程，查询详细信息 */
                $("._right_img").on("click", 'div', function () {
                    var aid = $(this).attr("aid");
                    location.href = "activity_detail.jsp?" + "aid=" + encodeURI(aid) + "&index=3";
                });
            }
        }
    });

    // 发布
    $(".release").click(function () {
        var comment_content = $(".comment_content").val();
        if (comment_content == undefined || comment_content == "" || comment_content == null) {
            alert("留言内容不能为空！");
            return;
        }
        $.ajax({
            type: "post", //内容ID             //留言内容                      //用户ID
            url: httpXhr + "messageTableController/addMessageTable.do?pc=1&w_id=" + info_id + "&mt_type=1&" + "user_id=1" + "&random=" + random,
            dataType: "json",
            data: {
                mt_des: comment_content
            },
            success: function (data) {
                if (data.msg == "ok") {
                    $(".comment_content").html("");
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
});

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}