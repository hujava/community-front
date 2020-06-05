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
    <title>资讯详情</title>
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
            /* width: 820px; */
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

        h2 {
            color: #555;
            margin-top: 30px;
            width: 820px;
        }

        .content_video {
            margin-top: 20px;
        }

        .content_video>video {
            border-radius: 7px;
            width: 820px;
        }

        .video_info {
            margin-top: 34px;
            width: 820px;
        }

        .video_info>span {
            margin-left: 6px;
            font-size: 16px;
            color: #555;
        }

        .video_info>p {
            margin-top: 24px;
            width: 820px;
            color: #555;
            text-indent: 28px;
        }

        ._left {
            float: left;
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
            height: 40px;;
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
        ._right_img>div>p:nth-of-type(1):focus{
            color: #555;
        }

        ._right_img>div>p:nth-of-type(2)>span {
            font-size: 12px;
            color: #888;
        }
        ._right_img a{color: #555;}
        hr{margin-top: -2px;margin-left: 65px;border: 1px solid #eee;margin-bottom: 0px;}
        .video_info>hr{margin-top: 14px;margin-left: 0px;}
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
                <a><span>资讯</span></a>
                <span>/</span>
                <a><span>新闻</span></a>
            </div>
            <h2 class="sv_title"></h2>
            <div class="info_detail">
                <img src="images/icon_browse.png">
                <span></span>
                <img src="images/icon_time.png">
                <span></span>
                <span></span>
            </div>
            <!-- <div class="content_video">
                <video autoplay controls src=""></video>
            </div> -->
            <div class="video_info">
                <!-- <img src="images/video_info.png"> -->
                <!-- <span>视频介绍</span> -->
                <hr>
                <p></p>
            </div>
        </div>
        <!-- 近期热点 -->
        <div class="_right">
            <div class="_right_title">近期热点</div>


            <hr>
            <div class="_right_img">
                <!-- <div>
                    <img src="images/login.jpg">
                    <p>测试测试测试测试测试</p>
                    <p><img src="images/icon_time.png"><span>2019.01.05</span></p>
                </div>
                <div>
                    <img src="images/login.jpg">
                    <p>测试测试测试测试测试</p>
                    <p><img src="images/icon_time.png"><span>2019.01.05</span></p>
                </div>
                <div>
                    <img src="images/login.jpg">
                    <p>测试测试测试测试测试</p>
                    <p><img src="images/icon_time.png"><span>2019.01.05</span></p>
                </div>
                <div>
                    <img src="images/login.jpg">
                    <p>测试测试测试测试测试</p>
                    <p><img src="images/icon_time.png"><span>2019.01.05</span></p>
                </div> -->

            </div>
        </div>

    </div>


    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="js/pagination/jquery.pagination.js"></script>
<script src="js/consult_detail.js"></script>

</html>