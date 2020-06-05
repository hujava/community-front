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
    <title>积分兑换</title>
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

        /* @media screen and (max-width:321px) {
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
        } */

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

        .list_mk {
            margin-top: 34px;
            overflow: hidden;
            width: 100%;
            /* padding:0rem 0.4rem; */
            text-align: center;
        }

        .list_mk>div {
            width: 4.6rem;
            /* margin-left: 0.5rem; */
            /* float: left; */
            display: inline-block;
        }

        .list_mk>div:nth-of-type(2n) {
            margin-left: 0.3rem;
        }

        .list_mk>div>img {
            height: 3.16rem;
            width: 100%;
            border-top-right-radius: 7px;
            border-top-left-radius: 7px;
        }

        .list_ul {
            padding: 0.2rem 0.2rem 0rem;
            overflow: hidden;
            font-size: 16px;
            border: 1px solid #e4e4e4;
            border-bottom-left-radius: 7px;
            border-bottom-right-radius: 7px;
        }

        .list_ul>li {
            width: 50%;
            float: left;
            list-style: none;
            height: 0.5rem;
            margin-bottom: 0.16rem;
        }

        .list_ul>li:nth-of-type(1) {
            color: #555;
            font-size: 0.36rem;
            overflow: hidden;
        }

        .list_ul>li:nth-of-type(2) {
            color: #3bcd80;
            font-size: 0.36rem;
        }

        .list_ul>li:nth-of-type(2),
        .list_ul>li:nth-of-type(4) {
            text-align: right;
        }

        .list_ul>li:nth-of-type(3) {
            height: 1.2rem;
        }

        .list_ul>p {
            color: #888;
            font-size: 0.3rem;
        }

        .jf_model {
            width: 8rem;
            position: fixed;
            left: 0rem;
            right: 0rem;
            margin: 0 auto;
            z-index: 1001;
            background: #fff;
            border-radius: 10px;
            top: 40%;
            display: none;
        }

        .jf_background {
            background: #000;
            opacity: 0.2;
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0rem;
            right: 0rem;
            top: 0px;
            z-index: 1000;
            display: none;
        }

        .model_title {
            height: 0.8rem;
            margin: 0.3rem 0.5rem;
            border-bottom: 1px solid #eee;
        }

        .model_title>span:nth-of-type(1) {
            display: inline-block;
            height: 0.4rem;
            border-left: 2px solid #3bcd80;
        }

        .model_title>span:nth-of-type(2) {
            display: inline-block;
            color: #555;
            font-size: 0.43rem;
            margin-top: -0.1rem;
            margin-left: 0.1rem;
        }

        .model_title>img {
            float: right;
            width: 0.4rem;
        }

        .s_jf {
            margin-top: 0.5rem;
            text-align: center;
        }

        .s_jf>img {
            width: 2rem;
        }

        .s_jf>div {
            color: #222;
            font-size: 0.5rem;
            padding: 0.5rem 1rem;
        }

        .exchange {
            width: 4.3rem;
            height: 1rem;
            background: #3bcd80;
            color: #fff;
            text-align: center;
            border-radius: 20px;
            cursor: pointer;
            padding-top: 0.15rem;
        }

        .list_mk>div>img {
            cursor: pointer;
        }

        .confirm {
            padding-bottom: 0.5rem;
            text-align: center;
        }

        .confirm>div {
            display: inline-block;
            width: 2.6rem;
            height: 0.8rem;
            color: #fff;
            background: #3bcd80;
            border-radius: 0.4rem;
            padding: 0.12rem 0rem;
            text-align: center;
        }
        .confirm>div:nth-of-type(2) {
            color: #888;
            border: 1px solid rgb(150, 143, 143);
            background: #fff;
        }

        .list_mk>div>img{
            border: 1px solid #e4e4e4;
            border-bottom: 0px solid #fff;
        }
    </style>
</head>

<body>
    <div class="containers">
        <div class="list_mk">
        </div>
        <div class="jf_background"></div>
        <div class="jf_model">
            <div class="model_title">
                <span></span>
                <span>立即兑换</span>
                <img class="closeJf" src="images/close.png" />
            </div>
            <div class="s_jf">
                <img src="" />
                <div></div>
            </div>
            <div class="confirm">
                <div>确认</div>
                <div>取消</div>
            </div>
        </div>
    </div>

</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/swiper//swiper.min.js"></script>
<script src="js/app_forest_houseList.js"></script>

</html>