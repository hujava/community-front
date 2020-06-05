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
    <title>荣誉之星</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

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

        .nav_tab {
            width: 100%;
            height: 50px;
            background: #EBFAF3;
            font-size: 18px;
            cursor: pointer;
        }

        .nav_tab>ul {
            text-align: center;
        }

        .nav_tab>ul>li {
            color: #888;
            list-style: none;
            width: 150px;
            display: inline-block;
            line-height: 50px;
        }

        .nav_tab>ul>li:nth-of-type(1) {
            color: #3bcd86;
            list-style: none;
            width: 150px;
            display: inline-block;
            line-height: 50px;
        }

        /* 学习课堂 */
        .adposition_banner {
            width: 100%;
            margin: 0 auto;
            /* background-image: linear-gradient(90deg, #3bcd86, #FFFFFF, #3bcd86); */
            position: relative;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            overflow: hidden;
            text-align: center;
            color: #fff;
            height: 225px;
        }

        .adposition_banner>img {
            width: 100%;
            min-width: 1100px;
            /* height: 220px; */
            display: block;
            object-fit: cover;
        }

        .adposition_title {
            width: 100%;
            height: 220px;
            line-height: 220px;
            font-size: 38px;
            text-align: center;
            font-family: "宋体";
            font-weight: bold;
            position: absolute;
            color: #fff;
            top: 0;
            left: 0;
            margin-top: 10px;
        }

        .line-left {
            width: 40px;
            border-bottom: 2px solid #fff;
            margin-right: 5px;
            display: inline-block;
            margin-bottom: 14px;
        }

        .line-right {
            width: 40px;
            border-bottom: 2px solid #fff;
            margin-left: 5px;
            display: inline-block;
            margin-bottom: 14px;
        }

        .wl_time {
            margin-top: 20px;
            color: #3bcd80;
            font-size: 14px;
            overflow: hidden;
        }

        .wl_time>div {
            float: left;
            width: 50%;
            padding: 0px 10px;
        }

        .wl_time>div:nth-of-type(2) {
            text-align: right;
        }

         a {
            /* text-decoration: underline; */
            color: #3bcd86;
            cursor: pointer;
        }

        /* 主体内容 */
        .list_three {
            overflow: hidden;
            margin-top: 18px;
        }

        .list_three>div {
            width: 386px;
            height: 192px;
            border-radius: 7px;
            border: 1px solid #ececec;
            margin-left: 21px;
            float: left;
        }

        .list_three>div:nth-of-type(1) {
            margin-left: 0px;
        }

        .three_list {
            overflow: hidden;
        }

        .three_list>div {
            height: 100%;
            float: left;
            cursor: default;
        }

        .three_list>div:nth-of-type(1) {
            height: 100%;
            width: 170px;
            padding: 40px 0px 0px 50px;
        }

        .three_list>div:nth-of-type(2) {
            height: 100%;
            width: 55%;
            font-size: 18px;
            color: #555;
            margin-top: 14px;
        }

        .three_list>div:nth-of-type(2)>div:nth-of-type(1) {
            margin-top: 40px;
            margin-left: 2px;
            width: 180px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .three_list>div:nth-of-type(2)>div:nth-of-type(2) {
            margin-top: 6px;
            margin-left: 2px;
            width: 180px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .three_list>div:nth-of-type(2)>img {
            padding-left: 3px;
        }


        .three_list>div:nth-of-type(2)>span {
            color: #3bcd86;
            font-size: 16px;
            margin-left: 10px;
            margin-top: 6px;
            display: inline-block;
        }

        .three_list>div:nth-of-type(1)>img:nth-of-type(1) {
            border-radius: 50%;
            width: 110px;
            height: 110px;
            margin-top: 10px;
        }

        .three_list>div:nth-of-type(1)>img:nth-of-type(2) {
            margin-top: -205px;
        }

        /* 排名样式*/
        .row_list {
            overflow: hidden;
            color: #555;
        }

        .row_list>div:nth-of-type(1) {
            width: 560px;
            /* height: 52px;
            border-bottom: 1px solid #ececec; */
            float: left;
        }

        .row_list>div:nth-of-type(3) {
            width: 560px;
            /* border-bottom: 1px solid #ececec; */
            float: right;
        }

        .row_list>div:nth-of-type(2) {
            height: 40px;
            width: 1px;
            /* border-left: 1px solid #ececec; */
            float: left;
            margin-left: 40px;
        }

        .row_list>div {
            overflow: hidden;
            padding-top: 10px;
        }

        .row_list>div>div {
            float: left;
            text-align: center;
        }
        .row_list>div>div:nth-of-type(1) {
            width: 12%;
            height: 50px;
            padding-top: 15px;
            border-top:1px solid #eee;
            border-left:1px solid #eee;
        }
        .row_list>div>div:nth-of-type(2) {
            width: 40%;
            height: 50px;
            padding-top: 15px;
            border-top:1px solid #eee;
            border-left:1px solid #eee;
        }
        .row_list>div>div:nth-of-type(3) {
            width: 28%;
            height: 50px;
            padding-top: 15px;
            border-top:1px solid #eee;
            border-left:1px solid #eee;
        }
        .row_list>div>div:nth-of-type(4) {
            width: 20%;
            height: 50px;
            padding-top: 15px;
            border:1px solid #eee;
            border-bottom: none;
        }
        /* .row_list>div>div:nth-of-type(1),
        .row_list>div>div:nth-of-type(2),
        .row_list>div>div:nth-of-type(3),
        .row_list>div>div:nth-of-type(4)
        {
            border-top: 1px solid #eee;
        } */
        .listData>div:last-child>div{
            border-bottom: 1px solid #eee;
        }
        .row_list>div>div:nth-of-type(4)>span{
            margin-left: 6px;
        }
        .row_list>div>div:nth-of-type(2) {
            text-align: left;
            padding-left: 10px;
        }

        .row_list>div>div:nth-of-type(2)>span {
            width: 160px;
            height: 20px;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .row_list>div>div:nth-of-type(2)>img {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            margin-top: -14px;
            margin-right: 10px;
        }

        .row_list>div>div:nth-of-type(3)>span {
            margin-left: 10px;
        }

        .row_list {
            margin-top: -10px;
        }

        .row_list:nth-of-type(1) {
            margin-top: 0px;
        }

        .listData>div:nth-of-type(9)>div:nth-of-type(3){
            border-bottom: 1px solid #eee;
        }
        .listData{
            margin-top: 10px;
        }
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="adposition_banner">
        <div class="adposition_title">
            <div class="line-left"></div>
            荣誉之星
            <div class="line-right"></div>
        </div>
    </div>
    <!-- 导航条 -->
    <div class="container">
        <div class="wl_time">
            <div>排名更新时间：<span class="sys_time"></span></div>
            <div><a>能量规则？</a></div>
        </div>
        <div class="list_three">
        </div>
        <div class="listData">
        </div>

    </div>
    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="js/sc_wl.js"></script>

</html>