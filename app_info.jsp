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
    <title>个人信息</title>
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
            /* background: #fafafa; */
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
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
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
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
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


        .log_name {
            position: absolute;
            top: 0rem;
            color: #fff;
            font-size: 0.48rem;
            top: 1.6rem;
            left: 3.8rem;
        }

        .log_sq {
            position: absolute;
            top: 0rem;
            color: #fff;
            font-size: 0.46rem;
            top: 2.4rem;
            left: 3.8rem;
        }

        .log_sq>div {
            width: 3.5rem;
            display: inline-block;
            font-size: 0.5rem;
            text-align: left;
            background: #fff;
        }

        .log_sq>img {
            height: 0.3rem;
            width: 0.15rem;
            vertical-align: unset;
            margin-left: -0.2rem;
            position: absolute;
            top: 0.2rem;
            background: #fff;
        }

        .log_jf {
            position: absolute;
            width: 2.8rem;
            height: 0.9rem;
            border-radius: 10px;
            background: #89E5D3;
            color: #fff;
            font-size: 0.5rem;
            top: 2rem;
            left: 7.3rem;
            text-align: center;
            padding-top: 0.1rem;
        }

        .log_qr {
            background: #fff;
            width: 9rem;
            height: 9rem;
            /* margin: 0.6rem 1rem; */
            border-radius: 7px;
            border: 1px solid #f8f8f8;
            border-radius: 7px;
            display: inline-block;
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

        .add_community {
            background: #fff;
            position: fixed;
            z-index: 10;
            bottom: 0rem;
            width: 100%;
            height: 13rem;
            display: none;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .add_tit {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
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

        .add_tit {
            font-size: 0.4rem;
            font-weight: bold;
            padding: 0.3rem 0.5rem;
            border-bottom: 1px solid #eee;
            background: #fff;
        }

        .add_tit>span {
            background: #fff;
        }

        .add_tit>img {
            /* margin-left: 6.5rem; */
            position: absolute;
            right: 0.5rem;
        }

        .add_xy {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0rem;
            background: #fff;
            display: none;
        }

        .comm_list {
            padding: 0.2rem 0.5rem;
            height: 11.5rem;
            list-style: none;
            overflow-y: scroll;
            background: #fff;
        }

        .comm_list>li {
            background: #fff;
            font-size: 0.4rem;
            line-height: 1.4rem;
            overflow: scroll;
        }

        .comm_list>li>span {
            border-bottom: 2px solid #fff;
            background: #fff;
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
        }

        .comm_model>span {
            font-size: 0.5rem;
            color: #3bcd80;
            display: inline-block;
            width: 100%;
            text-align: center;
            height: 1.2rem;
            padding-top: 0.2rem;
        }

        input {
            outline: none
        }

        .log_jf>span:nth-of-type(2)>span {
            background: #fff;
        }

        .log_img {
            position: absolute;
            top: 1rem;
            height: 2.6rem;
            width: 2.6rem;
            border-radius: 50%;
            background: #89E5D3;
            margin-left: 0.6rem;
        }

        .log_img>img {
            width: 2.3rem;
            height: 2.3rem;
            border-radius: 50%;
            margin: 0.15rem;
        }

        .info_con {
            position: relative;
        }

        .info_bg {
            width: 100%;
            margin-bottom: 1rem;
        }
        .log_qrstyle{
            width: 100%;
            text-align: center;
            margin: 0rem auto;
        }
        .containers{
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="containers">
        <div class="info_con">
            <img class="info_bg" src="images/info_bg.png">
            <div class="log_img">
                <img src="images/aa.png">
            </div>
            <div class="log_name">
            </div>
            <div class="log_sq">
            </div>
            <div class="log_jf">
                <span></span>积分
            </div>
        </div>
        <div class="log_qrstyle">
            <span class="log_qr" id="log_qr">
                <img src="images/info_er.png">
                <div>二维码用于垃圾投递时出示</div>
            </span>
        </div>
    </div>
    <!-- 社区 -->
    <!-- <div class="add_community">
        <div class="add_tit">
            <span>请选择所在社区</span>
            <img class="clone" src="images/clear.png">
        </div>
        <ul class="comm_list">
        </ul>
    </div> -->
    <!-- <div class="add_background"></div>
    <div class="comm_model">
        <div>发送成功！</div>
        <span>确定</span>
    </div> -->

</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/swiper//swiper.min.js"></script>
<script src="js/app_info.js"></script>

</html>