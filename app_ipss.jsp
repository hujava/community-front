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
    <title>积分系统</title>
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

        .en_content>div {
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
            background: #fff;
            bottom: 0rem;
            width: 100%;
            padding: 1rem;
            padding-left: 20px;
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

        .log_title {
            height: 1.6rem;
            background: #fff;
            width: 100%;
            padding: 0.5rem 0.4rem;
            font-size: 16px;
        }

        .log_phone {
            height: 2rem;
            background: #fff;
            width: 100%;
            padding: 0rem 0.4rem;
            border-bottom: 1px solid #eee;

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
            width: 66%;
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
            height: 100%;
            background: #fff;
            border-radius: 7px;
            padding: 1.4rem;
        }

        .log_qr>div {
            font-size: 0.5rem;
            text-align: center;
            color: #888;
            margin-top: -38px;
            display: none;
        }

        .log_ipss {
            width: 100%;
        }

        /*  */
        .tree_list {
            padding: 18px;
            overflow: hidden;
            background: #fafafa;
            text-align: center;
        }

        .tree_list>div {
            position: relative;
            width: 4.0rem;
            height: 1.3rem;
            color: #555;
            background: #fff;
            border: 1px solid #eee;
            text-align: center;
            /* float: left; */
            display: inline-block;
            border-radius: 7px;
            font-size: 0.5rem;
            padding-top: 0.3rem;
            margin-bottom: 0.3rem;
            margin-right: 0.4rem;
        }

        .tree_list>div:nth-of-type(2n) {
            margin-right: 0rem;
        }

        .tree_list>div>img:nth-of-type(2) {
            width: 0.6rem;
            height: 0.6rem;
            position: absolute;
            bottom: 0rem;
            right: 0px;
            border-bottom-right-radius: 7px;
        }

        .tree_list>div>img:nth-of-type(2) {
            display: none;
        }

        .tree_list>div>img:nth-of-type(1) {
            width: 0.6rem;
        }

        .tree_list>div:nth-of-type(1) {
            border: 1px solid #3bcd80;
            color: #3bcd80;
        }

        .tree_list>div:nth-of-type(1)>img:nth-of-type(2) {
            display: block;
        }

        input {
            outline: none;
        }
    </style>
</head>

<body>
    <div class="containers">
        <img class="log_ipss" src="images/ipss.jpg">
        <div class="log_title">选择积分</div>
        <div class="tree_list">
            <div value="1"><img src="images/ipss_jfs.png"> 1积分<img src="images/ipss_jfc.png"></div>
            <div value="2"><img src="images/ipss_jf.png"> 2积分<img src="images/ipss_jfc.png"></div>
            <div value="3"><img src="images/ipss_jf.png"> 3积分<img src="images/ipss_jfc.png"></div>
            <div value="4"><img src="images/ipss_jf.png"> 4积分<img src="images/ipss_jfc.png"></div>
            <div value="5"><img src="images/ipss_jf.png"> 5积分<img src="images/ipss_jfc.png"></div>
            <div value="6"><img src="images/ipss_jf.png"> 6积分<img src="images/ipss_jfc.png"></div>
            <div value="7"><img src="images/ipss_jf.png"> 7积分<img src="images/ipss_jfc.png"></div>
            <div value="8"><img src="images/ipss_jf.png">8积分<img src="images/ipss_jfc.png"></div>
            <div value="9"><img src="images/ipss_jf.png">9积分<img src="images/ipss_jfc.png"></div>
            <div value="10"><img src="images/ipss_jf.png">10积分<img src="images/ipss_jfc.png"></div>
        </div>
        <div class="log_phone">
            <div>督导员密码</div>
            <input type="tel" maxlength="6" placeholder="请输入督导员密码">
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
<script src="js/app_ipss.js"></script>

</html>