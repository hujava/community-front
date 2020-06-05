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
    <title>课程详情</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1, minimum-scale=1">
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/swiper/swiper.min.css">


    <style>
        *,
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: "微软雅黑";
            /* -webkit-overflow-scrolling: touch; */
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

        /* 搜索条件 */
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
            width: 6.8rem;
            font-weight: bold;
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

        .content_tit>div:nth-of-type(4) {
            border-bottom: none;
        }

        .nav_content {
            padding: 10px;
        }

        .acvitity_info {
            background: #fff;
            width: 100%;
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

        .head_lx>div,
        .head_lxs>div {
            font-size: 0.42rem;
            color: #888;
            float: left;
        }

        .head_lx>div:nth-of-type(2) {
            color: #F25462;
        }

        .head_lxs>div:nth-of-type(1) {
            width: 2rem;
        }

        .list_lx {
            font-size: 24px;
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
            font-size: 23px;
        }

        .head_time {
            height: 120px;
        }

        .head_bg {
            width: 100%;
            height: 0.2rem;
            background: #fafafa;
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

        .act_pl {
            font-size: 0.42rem;
        }

        .list_ck>img,
        .list_dz>img {
            width: 16px;
            height: 16px;
        }

        .list_ck>span,
        .list_dz>span {
            font-size: 0.2rem;
            color: #888;
        }

        .containers {
            margin-left: 0px;
            margin-right: 0px;
        }

        .list_fz>span:nth-of-type(1) {
            margin-left: 0rem;
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
                <div>学段</div>
                <!-- <div class="list_lx">小学</div>                
                <div class="list_lx">中学</div> -->
            </div>
            <div class="head_lxs">
                <div>课时</div>
                <div class="list_fz"></div>
            </div>
            <div class="head_lxs">
                <div>区域</div>
                <div class="list_ds"></div>
            </div>
        </header>
        <div class="head_bg"></div>
        <!-- content -->
        <nav class="nav_content">
            <div class="acvitity_info">
                <div class="acvitity_name">课程详情</div>
                <div class="act_content"></div>
            </div>
        </nav>
        <div class="head_bg"></div>
        <nav class="nav_content">
            <div class="acvitity_info">
                <div class="acvitity_name">课程评论</div>
                <hr>
                <div class="act_pl">
                    <!-- <div class="act_pllist">
                        <div><img src="images/login.jpg"></div>
                        <div class="act_con"><p>张小雪</p><p>评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容</p><p>2019-8-20</p></div>
                    </div>
                    <div class="act_pllist">
                        <div><img src="images/login.jpg"></div>
                        <div class="act_con"><p>张小雪</p><p>评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容</p><p>2019-8-20</p></div>
                    </div>
                    <div class="act_pllist">
                        <div><img src="images/login.jpg"></div>
                        <div class="act_con"><p>张小雪</p><p>评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容评论内容，评论内容</p><p>2019-8-20</p></div>
                    </div> -->
                </div>
            </div>
        </nav>
    </div>

</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/swiper//swiper.min.js"></script>
<script src="js/app_class_detail.js"></script>

</html>