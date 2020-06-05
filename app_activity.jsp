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
    <title>活动</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=0,maximum-scale=1.0" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">

    <style>
        *,
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: "微软雅黑";
        }

        @media screen and (max-width:321px) {
            .m-navlist {
                font-size: 15px
            }
        }

        @media screen and (min-width:321px) and (max-width:400px) {
            .m-navlist {
                font-size: 16px
            }
        }

        @media screen and (min-width:400px) {
            .m-navlist {
                font-size: 18px
            }
        }

        /* tab导航 */
        .tit_tab {
            padding: 0.5rem;
            height: 1.8rem;
            width: 100%;
            display: inline;
            white-space: nowrap;
            overflow-x: scroll;
            float: left;
            overflow-y: hidden
        }

        .tit_tab>div {
            color: #888;
            height: 100%;
            font-size: 0.42rem;
            padding: 0rem 0.34rem;
            text-align: center;
            display: inline-block;
            border: 2px solid #fff;
            overflow-x: scroll;
        }

        .tit_tab>div:nth-of-type(1) {
            color: #222;
        }

        .tit_tab>div>span {
            display: inline-block;
            border-bottom: 2px solid #fff;
        }

        .tit_tab>div:nth-of-type(1)>span {
            font-weight: bold;
            display: inline-block;
            border-bottom: 2px solid #3bcd80;
        }

        /* content */
        .content {
            padding: 0.2rem 0.5rem;
            width: 100%;
            height: 3rem;
        }

        .content_list {
            overflow: hidden;
            margin-bottom: 0.5rem;
        }

        .content_list>img {
            width: 3.3rem;
            height: 2.3rem;
            border-radius: 7px;
            float: left;
        }

        .content_list>p:nth-of-type(1) {
            color: #222;
            float: right;
            width: 6rem;
            height: 0.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin: 0 0 2px;
        }

        .content_list>p:nth-of-type(2),
        .content_list>p:nth-of-type(3) {
            color: #888;
            float: right;
            width: 6rem;
            height: 0.5rem;
            font-size: 0.35rem;
            margin: 0rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
        }

        .content_list>p:nth-of-type(4) {
            color: #888;
            float: right;
            width: 6rem;
            height: 0.5rem;
            font-size: 0.2rem;
        }

        .content_list>p:nth-of-type(4)>img {
            width: 0.5rem;
            margin-top: -0.08rem;
        }

        .content_list>p:nth-of-type(4)>img:nth-of-type(2) {
            margin-left: 0.2rem;
            width: 0.3rem;
        }

        .content_list>p:nth-of-type(4)>span {
            margin-left: 0.1rem;
            width: 1.5rem;
            display: inline-block;
            font-size: 0.4rem;
        }

        .content_list>p:nth-of-type(4)>span:nth-of-type(2) {
            font-size: 0.3rem;
            margin-left: 2.1rem;
        }

        .nowa {
            display: inline-block;
            width: 1.5rem;
            height: 0.65rem;
            font-size: 0.1rem;
            background: #3bcd80;
            color: #fff;
            border-radius: 50px;
            padding: 0.12rem;
            text-align: center;
            margin-left: 0.6rem;
        }

        .enda {
            display: inline-block;
            width: 1.5rem;
            height: 0.65rem;
            font-size: 0.1rem;
            background: #eee;
            color: #888;
            border-radius: 50px;
            padding: 0.12rem;
            text-align: center;
            margin-left: 0.6rem;
        }
    </style>
</head>

<body>
    <!-- header -->
    <div style="overflow:hidden;">
        <div class="tit_tab">

        </div>
    </div>
    <!-- content -->
    <div class="content">
    </div>
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/app_activity.js"></script>

</html>