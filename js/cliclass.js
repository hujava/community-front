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
var qas_id = GetQueryString("qas_id"); //课程ID
if (qas_id != null && qas_id.toString().length > 1) {
    var qas_id = qas_id;
}
var index = "";//题量
var answerVal=new Array();

// Init初始化
var info_id = "";
var random = Math.random();
var complete="";  //判断是否禁用radio

$(document).ready(function () {
    //知识详情
    $.ajax({
        type: "post",
        url: httpXhr + "questionAndAnswerController/questionAndAnswerList.do?pc=1&user_id=1&random=" + random,
        dataType: "json",
        success: function (data) {
            if (data.code == "200") {
                for (let i = 0; i < data.data.rows.length; i++) {
                    if (data.data.rows[i].qas_id == qas_id) {
                        complete=data.data.rows[i].complete;
                        var img = encodeURI(encodeURI(data.data.rows[i].qas_url));
                        var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                        $(".content_video>video").attr("src", fileUrl);
                    }
                }
                // 知识问答
                $.ajax({
                    type: "post",
                    url: httpXhr + "questionsController/questionsList.do?pc=1&qas_id=" + qas_id,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.code == "200") {
                            var str = "";
                            var json = data.data.rows;
                            if (json.length > 10) {
                                index = 5;
                            } else {
                                index = json.length;
                            }
                            for (let i = 0; i < index; i++) {
                                str += "<div class=\"answer\">";
                                str += "<div>(" + (i + 1) + ") " + json[i].que_name + "</div>";
                                str += "<div class=\"qas_answer\">";
                               if(json[i].answersVos.length=="4"){
                                str += "<div><span><label><input value=\"1\" type=\"radio\" name=\"bd" + i + "\"><span class=\"error error"+(i+1)+"1\"></span></label><span class=\".coi\">A.</span><span class=\".coi\">" + json[i].answersVos[0].answers_name + "</span></span><span><label><input value=\"2\" type=\"radio\" name=\"bd" + i + "\"><span class=\"error error"+(i+1)+"2\"></span></label><span>B.</span><span>" + json[i].answersVos[1].answers_name + "</span></span></div>";
                                str += "<div><span><label><input value=\"3\" type=\"radio\" name=\"bd" + i + "\"><span class=\"error error"+(i+1)+"3\"></span></label><span class=\".coi\">C.</span><span class=\".coi\">" + json[i].answersVos[2].answers_name + "</span></span><span><label><input value=\"4\" type=\"radio\" name=\"bd" + i + "\"><span class=\"error error"+(i+1)+"4\"></span></label><span>D.</span><span>" + json[i].answersVos[3].answers_name + "</span></span></div></div>";
                               }else{
                                str += "<div><span><label><input value=\"1\" type=\"radio\" name=\"bd" + i + "\"><span class=\"error error"+(i+1)+"1\"></span></label><span class=\".coi\">A.</span><span class=\".coi\">" + json[i].answersVos[0].answers_name + "</span></span><span><label><input value=\"2\" type=\"radio\" name=\"bd" + i + "\"><span class=\"error error"+(i+1)+"2\"></span></label><span>B.</span><span>" + json[i].answersVos[1].answers_name + "</span></span></div>";
                                str += "<div><span><label><input value=\"3\" type=\"radio\" name=\"bd" + i + "\"><span class=\"error error"+(i+1)+"3\"></span></label><span class=\".coi\">C.</span><span class=\".coi\">" + json[i].answersVos[2].answers_name + "</span></span></div></div>";
                               }
                                
                                for(let j=0;j<json[i].answersVos.length;j++){
                                     if(json[i].answersVos[j].answers_type=="2"){
                                        answerVal.push(json[i].answersVos[j].answers_px);
                                         if(json[i].answersVos[j].answers_px==1){
                                            str += "<div class=\"erroranswer erroranswer"+i+"\"><span>正确答案</span><span>A</span></div></div>";
                                         }else if(json[i].answersVos[j].answers_px==2){
                                            str += "<div class=\"erroranswer erroranswer"+i+"\"><span>正确答案</span><span>B</span></div></div>";
                                         }else if(json[i].answersVos[j].answers_px==3){
                                            str += "<div class=\"erroranswer erroranswer"+i+"\"><span>正确答案</span><span>C</span></div></div>";
                                         }else if(json[i].answersVos[j].answers_px==4){
                                            str += "<div class=\"erroranswer erroranswer"+i+"\"><span>正确答案</span><span>D</span></div></div>";
                                         }
                                    }
                                }
                            }
                            $(".qas_mk").html(str);
                            // 判断是否禁用radio
                            if(complete=="1"){
                                $(".error").css("background-position","0px 0px");
                            }
                        }
                    }
                });
            }
        }
    });

    // 热点
    $.ajax({
        type: "post",
        url: httpXhr + "questionAndAnswerController/questionAndAnswerList.do?pc=1&user_id=1&tj=1",
        dataType: "json",
        success: function (data) {
            var str = "";
            var href_url = "";
            for (var i = 0; i < data.data.rows.length; i++) {
                str += "<div>";
                str += "<p><a sv_id=\"" + data.data.rows[i].qas_id + "\">" + data.data.rows[i].qas_title + "</a></p>";
                str += "<p><span>" + data.data.rows[i].qas_date.substring(0, 10) + "</span></p></div>";
            }
            $("._right_img").html(str);
            $("._right_img").on("click", 'a', function () {
                var sv_id = $(this).attr("sv_id");
                $(this).attr("href", httpXhr + "cliclass_detail.jsp?" + "qas_id=" + encodeURI(sv_id) + "&index=1")
            });
        }
    });
    //获取字符串长度（汉字算两个字符，字母数字算一个）
    var len = 0;

    function getByteLen(val) {
        len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
        }
        return len;
    }
})

// 提交数据
$(".submit").click(function () {
    if(complete=="1"){
        return;
    }
    var arrVal=new Array();
    var errorCount=0;
    for(let i=0;i<index;i++){
        var value = $("input:radio[name=\"bd"+i+"\"]:checked").val();
        arrVal.push(value);
    }
    for(let i=0;i<index;i++){
        if(answerVal[i]!=arrVal[i]){ //判断是否答错
            ++errorCount;
            $(".erroranswer"+i+"").show();
            $(".error"+(i+1)+""+arrVal[i]+"").css("background-position","-36px 0px")//.parent().siblings().css("color","red");
        }
    }
    // $("label input[type=\"radio\"]:checked + span").css({"background-position":"-18px 0px","color": "#3bcd80"});
    if(errorCount=="0"){
        alert("恭喜你全部答对！");
    }else{
        alert("抱歉，您有"+errorCount+"道题目答错")
    }

    // 问答反馈  
    $.ajax({
        type: "post",
        url: httpXhr + "questionAndAnswerController/updateQuestionsAndUser.do?pc=1&user_id=1&qas_id=" + qas_id,
        dataType: "json",
        success: function (data) {
            console.log(data);
        }
    });

});

// 查看完成详情
$(".tit_btn").click(function(){
    $.ajax({
        type: "post",
        url: httpXhr + "questionAndAnswerController/questionAndAnswerList.do?pc=1&ch_school=302&grade=1&Cla=1",
        dataType: "json",
        success: function (data) {
            if(data.code=="200"){
                var json=data.data.rows;
                var str="";
                for (let i = 0; i < json.length; i++) {
                    var img = encodeURI(encodeURI(json[i].u_url));
                    var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
                    str+="<div><div>"+(i+1)+"</div>";
                    str+="<div><img src=\"images/sy_yjtc.png\"></div>";
                    str+="<div>"+json[i].a_name+"</div>";
                    if(json[i].complete=="0"){
                        str+="<div><img src=\"images/fin.png\"></div>";
                    }else{
                        str+="<div><img src=\"images/ens.png\"></div>";
                    }
                    str+="</div>";
                }
                $(".mod_list").html(str);
            }
        }
    });
});