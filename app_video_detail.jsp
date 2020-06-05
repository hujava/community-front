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
    <title>九色鹿蒙学苑</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=0,maximum-scale=1.0"/>
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/swiper/swiper.min.css">


    <style>
        *,
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: "微软雅黑";
            font-size: 62.5%;
        }

        .toobar {
            width: 990px;
            height: 50px;
            border: 1px solid #ececec;
            margin-top: 30px;
        }

        .courseinfoPic {
            width: 990px;
            min-height: 100px;
            box-shadow: 0px 0px 10px 10px #f0f0f0;
            padding: 20px;
            margin-top: 30px;
        }

        .courseinfoPic img {
            width: 100%;
            background-size: contain;
        }

        .targetResultPic {
            width: 990px;
            min-height: 100px;
            margin-top: 30px;
        }

        ul,
        ol {
            padding: 0px 40px;
        }

        /* 轮播图  */
        .lbt {
            width: 100%;
        }

        .swiper-container {
            clear: both;
            width: 100%;
            min-height: 100px;
            position: relative;
            top: 0;
        }

        .swiper-slide img {
            width: 100%;
            background-size: contain;
        }

        /* 搜索条件 */
        .content_tit {margin-top: 20px;padding: 20px;}
        .nav_content{padding: 20px;}
        .acvitity_info{background: #fff;width: 100%;}

        .acvitity_name{color: #222;font-size: 23px;margin-bottom: 20px;}
    </style>
</head>

<body>
    <div class="container">
        <!-- 轮播图 -->
        <div class="lbt">
            <div class="swiper-container">
                <div class="swiper-wrapper"></div>
                <div class="swiper-pagination "></div>
            </div>
        </div>
        <!-- header -->
        <header class="content_tit">
            <div>
                <div>创意节水器</div>
                <div><img src="images/act-s.png"><span>1187</span></div>
                <div><img src="images/act-s.png"><span>1187</span></div> 
            </div>
        </header>
        <!-- content -->
        <nav class="nav_content">
            <div class="acvitity_info"> 
                <div class="acvitity_name">小视频详情</div>
                <div class="act_content"></div>
            </div>
        </nav>
    </div>

</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/swiper//swiper.min.js"></script>
<script src="js/app_activity_detail.js"></script>

</html>