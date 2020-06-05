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
<html class="m-navlist">

<head>
    <title>生成二维码</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
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
            -webkit-overflow-scrolling: touch;
            background: #fafafa;
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


        .en_tell {
            font-size: 0.5rem;
            width: 0.8rem;
            height: 0.8rem;
        }

        .submit_info {
            background: #3bcd80;
            color: #fff;
            font-size: 0.5rem;
            display: inline-block;
            padding: 0.15rem 0.4rem;
            border-radius: 0.1rem;
            margin-left: 0.4rem;
            height: 1rem;
            width: 7rem;
            text-align: center;
            border-radius: 25px;
        }

        .enroll_phone {
            border-radius: 0.1rem;
            height: 0.8rem;
            background: #F2F3F4;
            border: none;
            color: #222;
            width: 5rem;
            height: 1rem;
            margin-left: 0.4rem;
            text-indent: 0.3rem;
            font-size: 0.4rem;
        }

        .enroll_phone:focus {
            border: none;
        }

        .en_content {
            position: fixed;
            background: #fff;
            bottom: 0rem;
            width: 100%;
            padding: 0.8rem 0.4rem 1rem;
            padding-left: 20px;
            box-shadow: inset 0px 2px 0px rgba(0, 0, 0, 0.075);
            text-align: center;
        }

        .comm_model {
            position: fixed;
            left: 0rem;
            right: 0rem;
            margin: 0 auto;
            z-index: 10;
            width: 6rem;
            background: #fff;
            border-radius: 10px;
            top: 5rem;
            margin-left: 2.4rem;
            display: none;
        }

        .comm_model>div {
            width: 100%;
            font-size: 0.5rem;
            color: #222;
            border-bottom: 1px solid #eee;
            padding: 0.5rem;
            text-align: center;
            margin-bottom: 0.2rem;
            background: #fff;
        }

        .comm_model>span {
            font-size: 0.5rem;
            color: #3bcd80;
            display: inline-block;
            width: 100%;
            text-align: center;
            height: 1.2rem;
            padding-top: 0.2rem;
            background: #fff;
        }

        .add_background {
            width: 100%;
            height: 100%;
            display: none;
            background: black;
            opacity: 0.6;
            position: fixed;
            top: 0rem;
            z-index: 9;
        }

        .business_pic {
            width: 100%;
        }

        .log_phone {
            height: 2rem;
            background: #fff;
            width: 100%;
            padding: 0rem 0.4rem;
        }

        .log_phone>div {
            display: inline-block;
            font-size: 0.42rem;
            background: #fff;
            margin-top: 0.7rem;
        }

        .log_phone>input {
            background: #fff;
            height: 0.8rem;
            width: 76%;
            margin-left: 0.8rem;
            border: none;
            text-align: right;
        }

        .log_phone>input:focus {
            border: none;
        }

        .log_qr {
            background: #fff;
            width: 10rem;
            height: 10rem;
            margin: 0.6rem 0.4rem;
            border-radius: 7px;
        }

        .log_qr>img {
            width: 100%;
            background: #fff;
            border-radius: 7px;
            padding: 1.4rem;
            border: 0;
        }

        .log_qr>div {
            font-size: 0.5rem;
            text-align: center;
            color: #888;
            margin-top: -1.6rem;
            display: none;
        }
        input{
            outline: none;
        }
    </style>
</head>

<body>
    <div class="containers">
        <div class="log_phone">
            <div>手机号</div>
            <input type="tel" maxlength="11" placeholder="请输入手机号">
        </div>
        <div class="log_qr">
            <img src="images/qr.png">
            <div>二维码用于垃圾投递时出示</div>
        </div>
        <div class="en_content">
            <div class="submit_info">提交</div>
        </div>
        <div class="add_background"></div>
        <div class="comm_model">
            <div>发送成功！</div>
            <span>确定</span>
        </div>
    </div>

</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/swiper//swiper.min.js"></script>
<script src="js/app_qr.js"></script>

</html>