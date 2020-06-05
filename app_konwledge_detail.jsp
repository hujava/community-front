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
    <title>小知识详情</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=0,maximum-scale=1.0" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/swiper/swiper.min.css">


    <style>
        *,
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: "微软雅黑";
        }

        .content_tit h5 {
            font-weight: bold;
            font-size: 16px;
            line-height: 26px;
        }
        .content_tit{
            padding: 20px;
            overflow: hidden;
            margin-top: 30px;
        }
        .content_tit,.nav_content{
            padding: 0px 10px;
        }
        .list_nav{overflow: hidden;}
        .list_nav>p:nth-of-type(1){
            color: #3bcd80;
            width: 50%;
            float: left;
            font-size: 14px;
            padding-left: 20px;
        }
        .list_nav>p:nth-of-type(2){
            color: #888;
            width: 49%;
            float: left;;
            text-align: right;
            font-size: 14px;
        }
        .nav_content>p{font-size: 14px;color: #555;}
        .nav_content>img{margin-bottom: 20px;}

        .list_ck{
            width: 70%;
            height: 50px;
            margin-top: 10px;
            text-align: right
            
        }
        .list_dz{
            width: 24%;
            height: 50px;
            margin-top: 10px;
            margin-left: 14px
        }
        .list_dz span,.list_ck span{margin-left: 6px;color: #888;font-size: 12px;}
        .list_ck{margin-right: 6px;}
        .list_dck{overflow: hidden;}
        .list_dck>div{float: left;}
        .list_ck>img,.list_dz>img{width: 16px;height: 16px;}

    </style>
</head>

<body>
    <div class="container">
        <!-- header -->
        <header class="content_tit">
            <h5></h5>
            <div class="list_nav">
                <p>生态校园平台</p>
                <p>2019-08-05</p>
            </div>
        </header>
        <!-- content -->
        <nav class="nav_content">
        </nav>
        <div class="list_dck">
            <div class="list_ck"><img src="images/act_g.png"><span></span></div>
            <div class="list_dz"><img src="images/act_k.png"><span></span></div>
        </div>
    </div>

</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/swiper//swiper.min.js"></script>
<script src="js/app_knowledge_detail.js"></script>

</html>