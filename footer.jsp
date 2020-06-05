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
    <title>页脚</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />

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

        .forus {
            overflow: hidden;
        }

        .forus>div {
            font-size: 14px;
            color: #555;
            float: left;
            height: 26px;
        }

        .forus>div:nth-of-type(1) {
            margin-left: 28px;
            margin-top: 66px;
            overflow: hidden;
        }

        .forus>div:nth-of-type(1)>img {
            width: 18px;
            height: 18px;
            float: left;
            margin-top: 2px;
        }

        .forus>div:nth-of-type(1)>p {
            margin-left: 7px;
            float: left;
            font-size: 14px;
        }

        .forus>div:nth-of-type(2) {
            margin-left: 37px;
            margin-top: 66px;
        }

        .forus>div:nth-of-type(2)>img {
            width: 16px;
            height: 16px;
            float: left;
            margin-top: 3px;
        }

        .forus>div:nth-of-type(2)>p {
            margin-left: 7px;
            float: left;
            font-size: 14px;
        }

        .forus>div:nth-of-type(3) {
            margin-left: 37px;
            margin-top: 66px;
        }

        .forus>div:nth-of-type(3)>img {
            width: 16px;
            height: 16px;
            float: left;
            margin-top: 3px;
        }

        .forus>div:nth-of-type(3)>p {
            margin-left: 7px;
            float: left;
            font-size: 14px;
        }

        .forus>div:nth-of-type(4) {
            left: 65%;
            width: 312px;
            height: 86px;
            position: absolute;
            margin-top: 8px
        }

        .bz {
            color: #fff;
            background: #3bcd80;
            height: 42px;
            width: 100%;
            text-align: center;
            font-size: 12px;
        }

        .bz a {
            font-size: 12px;
            color: #fff;
            text-decoration: underline;
        }

        .bz a:hover{
            color: #fff;
        }
    </style>
</head>

<body class="HolyGrail">
    <div class="container forus">
        <div><img src="images/footer_address.png">
            <p>地址：北京市昌平区龙域北街10号楼</p>
        </div>
        <div><img src="images/footer_mail.png">
            <p>邮箱 : XXXXXXXX@qq.com</p>
        </div>
        <div><img src="images/footer_tell.png">
            <p>电话 : 010-XXXXXX</p>
        </div>
        <div><img src="images/footer_tree.png"></div>
    </div>
    <div class="bz">Copyright©2020 合创家社区平台 版权所有<br><a href="http://beian.miit.gov.cn">京ICP备19050144号-1</a> 合创家
        hcjclub.com </div>
</body>

</html>