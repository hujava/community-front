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
    <title>活动详情</title>
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

        .content_tit {
            padding: 0.6rem 0.4rem 0rem 0.4rem;
            overflow: hidden;
        }

        .content_tit>div:nth-of-type(1) {
            overflow: hidden;
        }

        .content_tit>div:nth-of-type(1)>div {
            float: left;
        }

        .content_tit>div:nth-of-type(1)>div:nth-of-type(1) {
            font-size: 0.48rem;
            width: 6.6rem;
            font-weight: bold;
            margin-right: 0.2rem;
        }

        .content_tit>div:nth-of-type(1)>div:nth-of-type(2) {
            width: 1.6rem;
            height: 0.5rem;
            margin-top: 0.1rem;
        }

        .content_tit>div:nth-of-type(1)>div:nth-of-type(3) {
            width: 1.6rem;
            height: 0.5rem;
            margin-top: 0.1rem;
        }

        .content_tit span {
            margin-left: 0.15rem;
        }

        .content_tit>div:nth-of-type(8) {
            border-bottom: none;
        }

        .nav_content {
            padding: 20px;
        }

        .acvitity_info {
            background: #fff;
            width: 100%;
            margin-bottom: 1.6rem;
        }

        .acvitity_name {
            color: #555;
            font-size: 0.46rem;
            margin-bottom: 0.6rem;
            margin-top: 0.6rem;
        }

        .head_lx,
        .head_lxs {
            overflow: hidden;
            border-bottom: 1px solid #ebebeb;
            height: 1.7rem;
            padding-top: 0.6rem;
        }

        .head_lx>div:nth-of-type(1),
        .head_lxs>div:nth-of-type(1) {
            width: 2rem;
        }

        .list_lx {
            color: #F24954;
        }

        .head_lx>div,
        .head_lxs>div {
            font-size: 0.42rem;
            color: #888;
            float: left;
        }

        .head_lxs>div:nth-of-type(1) {
            width: 2rem;
        }

        .head_lx>div:nth-of-type(2) {
            font-size: 0.42rem;
            margin-left: 0.4rem;
            float: left;
            background: #FFF5F6;
            text-align: center;
            border-radius: 50px;
            padding: 2px 30px;
            color: #F25462;
        }

        .head_lxs>div:nth-of-type(2) {
            font-size: 0.42rem;
            color: #888;
            margin-left: 0.4rem;
            float: left;
        }


        .head_lxs p {
            font-size: 0.42rem;
            margin: 0px;
        }

        .head_time {
            height: 2.5rem;
        }

        .head_bg {
            width: 100%;
            height: 0.2rem;
            background: #fafafa;
        }

        .act_pl {
            font-size: 0.42rem;
        }

        .act_pllist {
            overflow: hidden;
            padding: 10px 0px;
        }

        .act_pllist>div {
            float: left;
            padding-bottom: 20px;
        }

        .act_pllist>div>img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
        }

        .act_con {
            margin-left: 20px;
            border-bottom: 1px solid #ebebeb;
            width: 8.3rem;
        }

        .act_con>p:nth-of-type(1),
        .act_con>p:nth-of-type(3) {
            color: #888;
        }

        .act_con>p:nth-of-type(2) {
            color: #222;
            width: 8.3rem;
        }

        .content_tit {
            cursor: default;
        }

        .list_ck>img,
        .list_dz>img {
            width: 16px;
            height: 16px;
        }

        .list_ck>span,
        .list_dz>span {
            font-size: 0.42rem;
            color: #888;
        }

        .containers {
            margin-left: 0px;
            margin-right: 0px;
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
            padding: 0.3rem 0rem 0.6rem;
            padding-left: 20px;
            box-shadow: inset 0px 2px 0px rgba(0, 0, 0, 0.075);
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
        .containers{
            position: relative;
            z-index: 1;
        }
        .head_time>div:nth-of-type(4){
            margin-left: 0.74rem;margin-top: 0.2rem;
        }
        .head_time>div:nth-of-type(3){
            margin-top: 0.2rem;
        }
    
        .list_hd1,.list_hd2{
            width:72%;
            font-size: 0.42rem;
        }
    </style>
</head>

<body>
    <div class="containers">
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
                <div class="a_name"></div>
                <div class="list_ck"><img src="images/act_g.png"><span></span></div>
                <div class="list_dz"><img src="images/act_k.png"><span></span></div>
            </div>
            <div class="head_lx">
                <div>活动类型</div>
                <div class="list_lx"></div>
            </div>
            <div class="head_lxs">
                <div>负责人</div>
                <div class="list_fz"></div>
            </div>
            <div class="head_lxs">
                <div>联系电话</div>
                <div class="list_tl"></div>
            </div>
            <div class="head_lxs">
                <div>联系邮箱</div>
                <div class="list_em"></div>
            </div>
            <div class="head_lxs">
                <div>报名截止</div>
                <div class="list_jz"></div>
            </div>
            <div class="head_lxs head_time">
                <div>活动开始</div>
                <div class="list_hd1">
                    <p></p>
                </div>
                <div>活动结束</div>
                <div class="list_hd2">
                    <p></p>
                </div>
            </div>
            <div class="head_lxs">
                <div>活动地点</div>
                <div class="list_ds"></div>
            </div>
        </header>
        <div class="head_bg"></div>
        <!-- content -->
        <nav class="nav_content">
            <div class="acvitity_info">
                <div class="acvitity_name">活动详情</div>
                <div class="act_content"></div>
            </div>
        </nav>
        <div class="en_content">
            <img class="en_tell" src="images/tellphone.png" />
            <input class="enroll_phone" type="text">
            <div class="submit_info">我要报名</div>
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
<script src="js/app_activity_detail.js?v=2.0"></script>

</html>