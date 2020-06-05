<%@page import="org.springframework.security.core.GrantedAuthority"%>
<%@page import="org.community.model.UserEntity"%>
<%@page import="org.springframework.security.core.context.SecurityContextImpl"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Object obj=request.getSession()
				.getAttribute("SPRING_SECURITY_CONTEXT");
String userName = "";
String userIt = "";
String userImage = "";
if(obj!=null){
	SecurityContextImpl securityContextImpl = (SecurityContextImpl) request.getSession()
				.getAttribute("SPRING_SECURITY_CONTEXT");
	if (securityContextImpl != null && securityContextImpl.getAuthentication() != null
		&& securityContextImpl.getAuthentication().getPrincipal() != null) {
		UserEntity userDetails = (UserEntity) securityContextImpl.getAuthentication().getPrincipal();
        userName = userDetails.getUsername();
        userIt=userDetails.getAlias_name();
        userImage=userDetails.getUserUrl();
	}
}

%>
<!DOCTYPE html>
<html>

<head>
    <title>小视频详情</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/tab/jquery.cardtabs.css">
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/pagination/pagination.css">

    <style>
        *,
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: "微软雅黑";
        }

        .HolyGrail {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }

        .title_lx {
            font-size: 13px;
            margin-top: 9px;
            margin-left: 20px;
            width: 820px;
        }

        .title_lx a span {
            font-size: 13px;
            padding: 0px 6px;
            color: #666;
            cursor: pointer;
        }

        .title_lx a span:hover {
            color: #3bcd80;
        }

        .title_lx>span {
            color: darkgrey;
            cursor: default;
        }

        .title_lx>a>img {
            width: 15px;
            height: 15px;
            margin-top: -5px;
            cursor: pointer;
        }

        .info_detail {
            /* overflow: hidden;
            margin-left: 10px; */
            margin-top: 16px;
            width: 820px;
        }

        .info_detail>span {
            font-size: 14px;
            color: #888;
            margin-left: 6px;
        }

        .info_detail>span:nth-of-type(1) {
            display: inline-block;
            width: 60px;
        }

        .info_detail>span:nth-of-type(3) {
            margin-left: 20px;
        }

        hr {
            border-top: 2px solid #eee;
            margin-top: -2px;
            margin-left: 64px;
        }

        .content_video {
            margin-top: 20px;
            width: 820px;
        }

        .content_video>video {
            border-radius: 7px;
            width: 820px;
            margin-top: 16px;
        }

        .video_info {
            margin-top: 10px;
            width: 820px;
        }

        .video_info>div:nth-of-type(1) {
            color: #555;
            font-size: 18px;
            overflow: hidden;
            font-weight: bold;
        }

        .video_info>div:nth-of-type(2) {
            color: #555;
            font-size: 16px;
            margin-top: 10px;
            margin-bottom: 25px;
        }

        .video_info>div:nth-of-type(1)>div {
            float: left;
        }

        .video_info>div:nth-of-type(2)>div {
            float: left;
        }

        .video_info>div:nth-of-type(1)>div:nth-of-type(1) {
            height: 20px;
            width: 5px;
            background: #3bcd80;
            border-radius: 4px;
        }

        .video_info>div:nth-of-type(1)>div:nth-of-type(2) {
            margin-left: 10px;
            margin-top: -3px;
        }



        ._left {
            float: left;
            margin-left: 185px;
        }

        ._right {
            width: 250px;
            height: 300px;
            float: right;
            margin-top: 55px;
        }

        ._right_title {
            color: #3bcd80;
            border-bottom: 2px solid #3bcd80;
            font-size: 16px;
            width: 65px;
            height: 36px;
        }

        ._right_img {
            overflow: hidden;
        }

        ._right_img>div {
            height: 40px;
            ;
            margin-top: 14px;
        }

        ._right_img>div>img {
            width: 144px;
            height: 98px;
            border-radius: 7px;
            float: left;
        }

        ._right_img>div>p {
            color: #555;
            font-size: 14px;
            margin-left: 6px;
            float: left;
            width: 100%;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin-bottom: 0px;
        }

        ._right_img>div>p:nth-of-type(1):hover {
            color: #3bcd80;
            cursor: pointer;
        }

        ._right_img>div>p:nth-of-type(1):focus {
            color: #555;
        }

        ._right_img>div>p:nth-of-type(2)>span {
            font-size: 12px;
            color: #888;
        }

        ._right_img a {
            color: #555;
        }


        hr {
            margin-top: -2px;
            margin-left: 0px;
            border: 1px solid #eee;
            margin-bottom: 0px;
            margin-left: 65px;
        }

        .video_info>hr {
            margin-top: 14px;
            margin-left: 0px;
        }

        .tit_name {
            color: #3bcd80;
            font-size: 24px;
            width: 600px;
            float: left;
            margin-top: 5px
        }

        .sv_title {
            font-size: 30px;
            text-align: center;
            color: #555;
            margin: 30px 0px;
            width: 820px;
        }

        .tit_btn {
            padding: 10px 30px;
            background: #3bcd80;
            color: #fff;
            font-size: 18px;
            border-radius: 35px;
            width: 168px;
            float: left;
            cursor: pointer;
        }

        .tit_con {
            clear: both;
        }

        /* 答题 */
        .qas_list {
            width: 820px;
            padding: 30px 40px;
            background: #fbfbfb;
            margin-top: 15px;
        }

        .qas_tit {
            font-size: 16px;
            font-weight: bold;
            color: #222;
        }

        .answer {
            font-weight: bold;
            margin-top: 22px;
        }

        .qas_answer img {
            margin-right: 15px;
            margin-top: -2px;
            cursor: pointer;
        }

        .qas_answer>div {
            margin-top: 35px;
            margin-left: 10px;
        }

        .qas_answer>div>span:nth-of-type(2) {
            /* margin-left: 50px; */
            cursor: default;
        }

        .answer>div:nth-of-type(3) {
            background: #fff;
            width: 710px;
            padding: 25px 20px;
            color: #222;
            font-size: 16px;
            margin-top: 10px;
            font-weight: normal;
        }

        .answer>div:nth-of-type(3)>span:nth-of-type(2) {
            border-radius: 50%;
            margin-left: 10px;
            background: #3bcd80;
            color: #fff;
            padding: 6px 10px;
        }

        .erroranswer {
            display: none;
        }


        .answery {
            color: #3bcd80;
        }

        .answern {
            color: red;
        }

        /*单选框的美化CSS*/
        input[type="radio"] {
            appearance: none;
            -webkit-appearance: none;
            outline: none;
            display: none
        }

        label {
            display: inline-block;
            cursor: pointer;
            margin-right: 15px;
        }

        label input[type="radio"]+span {
            width: 14px;
            height: 14px;
            display: inline-block;
            background: url("images/radio.png") no-repeat;
        }

        label input[type="radio"]:checked+span {
            background-position: -18px 0;
            color: #3bcd80;
        }

        .submit_css {
            font-size: 18px;
            color: #fff;
            background: #3bcd80;
            border-radius: 20px;
            width: 140px;
            height: 36px;
            padding: 3px 50px;
            cursor: pointer;
            margin-top: 20PX;
            margin-left: 300px;
        }
/* 
        .btn-primary {
            border: none;
        }

        .btn-primary:focus,
        .btn-primary.focus {
            background: none;
            border: none;
        } */

        .modal-dialog {
            margin-top: 12%;
            width: 600px;
            height: 555px;
        }

        .modal-title {
            overflow: hidden;
        }

        .modal-title>div:nth-of-type(1) {
            width: 3px;
            height: 20px;
            float: left;
            background: #3bcd80;
            border-radius: 20px;
        }

        .modal-title>div:nth-of-type(2) {
            font-size: 16px;
            color: #222;
            display: inline-block;
            float: left;
            margin-left: 6px;
        }

        .mod_tit {
            width: 555px;
            height: 50px;
            background: #f6f6f6;
            font-size: 16px;
        }

        .mod_tit>div {
            width: 130px;
            float: left;
            text-align: center;
            height: 100%;
            padding-top: 14px;
        }

        .modal-body {
            padding-top: 0px;
            height: 455px;
            overflow: auto
        }

        .modal-header {
            border-bottom: none;
        }

        .mod_list>div {
            width: 560px;
            height: 80px;
            border-bottom: 1px solid #ECECEC;
        }

        .mod_list>div>div {
            width: 130px;
            float: left;
            text-align: center;
            height: 100%;
            padding-top: 26px;
            font-size: 16px;
        }

        .mod_list>div>div:nth-of-type(2) {
            padding-top: 10px;
        }

        .mod_list>div>div:nth-of-type(2)>img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }

        .modal-footer {
            padding: 10px;
            border-top: none;
            text-align: center;
        }

        /* .btn-primary {
            display: none;
        } */

        /* .btn {
            padding: 0px;
        } */

        .btn-default {
            color: #fff;
            background: #3bcd80;
            width: 60px;
            height: 26px;
            border-radius: 30px;
            border-color: #3bcd80;
            padding-top: 2px;
        }

        .btn-default:focus,
        .btn-default:hover {
            color: #fff;
            background: #3bcd80;
            border-color: #3bcd80;
        }

        .btn-default:focus,
        .btn-default.focus {
            color: #fff;
            background: #3bcd80;
            border-color: #3bcd80;
        }

        .qas_answer>div>span{display: inline-block;width: 50%;}
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="container">
        <div class="_left">
            <div class="title_lx">
                <a><img src="images/home.png"><span>首页</span></a>
                <span>/</span>
                <a><span>小视频</span></a>
                <!-- <span>/</span>
                <a><span>科技环保</span></a> -->
            </div>
            <h2 class="sv_title">垃圾分类知识问答</h2>
            <!-- <div class="info_detail">
                <img src="images/icon_browse.png">
                <span></span>
                <img src="images/icon_time.png">
                <span></span>
                <span></span>
            </div> -->
            <div class="tit_name">一、观看安全教育短片并对照训练</div>
            <div class="content_video">
                <video autoplay controls src=""></video>
            </div>
            <div class="video_info">
                <div>
                    <div></div>
                    <div>求救电话会拨打</div>
                </div>
                <div>面对灾难和意外，孩子是弱者，需要他人的及时援救。让孩子学会拨打紧急电话是孩子需要掌握的必要安全本领。</div>
            </div>

            <div class="tit_name">二、完成知识测试，全部答对即完成
            </div>
            <div class="tit_btn" data-toggle="modal" data-target="#myModal">查看完成情况</div>
            <div class="tit_con"></div>
            <div class="qas_list">
                <div class="qas_tit">选择题（单选题，共10道）</div>
                <div class="qas_mk">
                    <!-- <div class="answer">
                        <div>(1) 下列不属于可回收物的是什么？</div>
                        <div class="qas_answer">
                            <div><span><label><input type="radio" name="bd0"><span></span></label><span class=".coi">A.</span><span class=".coi">红、黑、绿、蓝</span></span><span><label><input type="radio" name="bd0"><span></span></label><span>B.</span><span>红、黑、绿、蓝</span></span></div>
                            <div><span><label><input type="radio" name="bd0"><span></span></label><span class=".coi">A.</span><span class=".coi">红、黑、绿、蓝</span></span><span><label><input type="radio" name="bd0"><span></span></label><span>B.</span><span>红、黑、绿、蓝</span></span></div>
                        </div>
                        <div class="erroranswer">
                            <span>正确答案</span>
                            <span></span>
                        </div>
                    </div>
                    <div class="answer">
                        <div>(1) 下列不属于可回收物的是什么？</div>
                        <div class="qas_answer">
                            <div><span><label><input type="radio" name="bd1"><span></span></label><span class=".coi">A.</span><span class=".coi">红、黑、绿、蓝</span></span><span><label><input type="radio" name="bd1"><span></span></label><span>B.</span><span>红、黑、绿、蓝</span></span></div>
                            <div><span><label><input type="radio" name="bd1"><span></span></label><span class=".coi">A.</span><span class=".coi">红、黑、绿、蓝</span></span><span><label><input type="radio" name="bd1"><span></span></label><span>B.</span><span>红、黑、绿、蓝</span></span></div>
                        </div>
                    </div> -->
                </div>
                <div class="submit submit_css">提交</div>
            </div>

        </div>
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            <div></div>
                            <div>查看完成情况</div>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="mod_tit">
                            <div>序号</div>
                            <div>头像</div>
                            <div>姓名</div>
                            <div>完成情况</div>
                        </div>
                        <div class="mod_list">
                            <!-- <div>
                                <div>1</div>
                                <div><img src="images/sy_yjtc.png"></div>
                                <div>哈萨克</div>
                                <div>已完成</div>
                            </div> -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">确定</button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <!-- 近期热点 -->
        <!-- <div class="_right">
            <div class="_right_title">近期热点</div>
            <hr>
            <div class="_right_img">
            </div>
        </div> -->

    </div>


    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="js/pagination/jquery.pagination.js"></script>
<script src="js/cliclass.js"></script>

</html>