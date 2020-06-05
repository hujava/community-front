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
int id = 0;

if(obj!=null){
	SecurityContextImpl securityContextImpl = (SecurityContextImpl) request.getSession()
				.getAttribute("SPRING_SECURITY_CONTEXT");
	if (securityContextImpl != null && securityContextImpl.getAuthentication() != null
		&& securityContextImpl.getAuthentication().getPrincipal() != null) {
		UserEntity userDetails = (UserEntity) securityContextImpl.getAuthentication().getPrincipal();
        userName = userDetails.getUsername();
	}
}

%>
<!DOCTYPE html>
<html>

<head>
    <title>合创家</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=9,10,11">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noarchive">

    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/swiper/swiper.css">

    <style>
        *,
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: "微软雅黑";
            font-size: 16px;
        }

        .HolyGrail {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }

        .main {
            line-height: 128px;
        }

        /* swiper轮播 */
        .swiper-container {
            clear: both;
            width: 100%;
            min-height: 100px;
            position: relative;
            top: 0;
        }

        .swiper-slide img {
            width: 100%;
            height: 100%;
        }

        .lbt {
            width: 100%;
        }

        /* 热门活动 */
        .hot-activity {
            background: url('images/hot_back.png') no-repeat;
            background-size: 100%;
            width: 1238px;
            position: relative;
            z-index: 10;
            margin-left: -18px;
        }

        .hot-left {
            width: 460px;
            min-height: 150px;
            padding: 40px 38px 50px 56px;
        }

        .hot-title {
            color: #3bcd80;
            font-size: 36px;
            font-weight: bold;
            width: 150px;
            float: left;
            padding-top: 10px;
        }

        .hot-desc {
            width: 200px;
            float: right;
            color: #555;
            font-size: 15px;
            padding-top: 12px;
        }

        .hot-right {
            width: 610px;
            float: right;
            margin-right: 65px;
            margin-top: -105px;
        }

        .hot-right a {
            color: #222;
        }

        .hot-right>div {
            display: inline-block;
            margin-left: 56px;
            width: 104px;
            height: 30px;
            cursor: pointer;
        }

        .hot-right>div:nth-of-type(1) {
            margin-left: 0px;
        }

        .hot-right>div:nth-of-type(5) {
            margin-left: 0px;
        }

        .hot_act {
            margin-top: 50px;
        }

        p {
            margin: 0px;
        }

        .hot_mk>div {
            width: 279px;
            height: 345px;
            float: left;
            margin-left: 28px;
            border-radius: 7px;
            border: 1px solid #ececec;
            position: relative;
        }

        .hot_mk>div:nth-of-type(1) {
            margin-left: 0px;
        }

        .hot_mk>div>div:nth-of-type(1) {
            width: 96px;
            height: 25px;
            background: black;
            opacity: 0.3;
            position: absolute;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            color: #fff;
        }

        .hot_mk>div>div:nth-of-type(2) {
            width: 96px;
            height: 22px;
            position: absolute;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            text-align: center;
            color: #fff;
            font-size: 14px;
        }


        .hot_mk>div>img {
            width: 100%;
            height: 190px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
        }

        .hot_mk>div>p:nth-of-type(1) {
            padding: 16px 12px 0px;
            color: #222;
            height: 64px;
            overflow: hidden;
        }

        .hot_mk>div>p:nth-of-type(2) {
            padding: 0px 12px 8px 12px;
            color: #555;
            margin-top: 10px;
        }

        .hot_mk>div>p:nth-of-type(3) {
            padding: 0px 12px 16px 12px;
            color: #888;
        }

        .hot_mk>div>p:nth-of-type(3)>span {
            margin-left: 8px;
            display: inline-block;
            width: 45px;
        }

        .hot_mk>div>p:nth-of-type(3)>img:nth-of-type(2) {
            margin-left: 10px;
        }

        .hot_mk>div>p:nth-of-type(3)>span:nth-of-type(3) {
            display: inline-block;
            width: 90px;
            height: 30px;
            background: #3bcd80;
            color: #fff;
            text-align: center;
            padding-top: 3px;
            border-radius: 7px;
            font-size: 15px;
        }

        /* 最新资讯 */
        .new_consult {
            margin-top: 55px;
        }

        .title-consult {
            font-size: 30px;
            color: #555;
            width: 100%;
            text-align: center;
            font-weight: bold;
        }

        .title-consult {
            margin-bottom: 28px;
        }

        .new_consult>div {
            width: 410px;
            height: 387px;
            float: left;
            margin-left: 28px;
        }

        .new_consult>div:nth-of-type(1) {
            margin-left: 0px;
        }

        .new_consult>div:nth-of-type(3) {
            width: 324px;
        }

        /* 最新资讯 ==> 模块一 */
        .new_consult>div>img {
            width: 410px;
            height: 270px;
            cursor: pointer;
            border-radius: 7px;
        }

        .new_consult>div>p:nth-of-type(1) {
            font-size: 16px;
            color: #555;
            margin-top: 18px;
            cursor: pointer;
            display: inline-block;
            border-bottom: 1px solid #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 400px;
        }

        .new_consult>div>p:nth-of-type(2) {
            font-size: 16px;
            color: #888;
            margin-top: 6px;
            cursor: pointer;
        }

        .new_consult>div>p:nth-of-type(3) {
            font-size: 14px;
            color: #888;
            margin-top: 6px;
            height: 40px;
            overflow: hidden;
            cursor: pointer;
        }

        .new_consult>div:nth-of-type(1)>p:nth-of-type(1):hover {
            color: #3bcd80;
            border-bottom: 1px solid #3bcd80;
        }

        /* 最新资讯 ==> 模块二 */
        .new_consult>div:nth-of-type(2)>div>img {
            width: 410px;
            height: 273px;
            cursor: pointer;
        }

        .new_consult>div:nth-of-type(2)>div>p:nth-of-type(1) {
            font-size: 16px;
            color: #555;
            cursor: pointer;
            border-bottom: 1px solid #fff;
            height: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .new_consult>div:nth-of-type(2)>div>p:nth-of-type(2) {
            font-size: 16px;
            color: #888;
            margin-top: 6px;
            cursor: pointer;
        }

        .new_consult>div:nth-of-type(2)>div>p:nth-of-type(3) {
            font-size: 14px;
            color: #888;
            margin-top: 6px;
            height: 40px;
            overflow: hidden;
            cursor: pointer;
        }

        .new_consult>div>div {
            border-bottom: 1px solid #ececec;
            padding-bottom: 23px;
        }

        .new_consult>div>div:nth-of-type(3) {
            border-bottom: none;
        }

        .new_consult>div>div:nth-of-type(2),
        .new_consult>div>div:nth-of-type(3) {
            padding-top: 23px
        }

        .new_consult>div:nth-of-type(2)>div>p:nth-of-type(1):hover {
            color: #3bcd80;
            border-bottom: 1px solid #3bcd80;
        }

        /* 模块三 */
        .new_consult>div:nth-of-type(3) {
            border: 3px solid #3bcd80;
            border-radius: 7px;
            background: #fff;
        }

        .title_info {
            padding: 18px 0px 0px 37px;
            text-align: center;
            margin-bottom: 8px;
            margin-top: 5px;
        }

        .title_info>p:nth-of-type(1) {
            background: url("images/info.png");
            color: #fff;
        }

        .new_consult>div:nth-of-type(3)>div>p {
            width: 122px;
            height: 32px;
            float: left;
            padding-top: 3px;
            cursor: pointer;
            color: #555;
        }

        .title_acl {
            padding: 0px 18px;
        }

        .title_acl>div>div:nth-of-type(1) {
            border-radius: 50%;
            background: #3bcd80;
            width: 5px;
            height: 5px;
            float: left;
            margin-top: 6px;
        }

        .title_acl>div>div:nth-of-type(2) {
            width: 240px;
            height: 20px;
            color: #555;
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 14px;
            margin-bottom: 5px;
        }

        .title_acl>div>div:nth-of-type(3) {
            width: 248px;
            height: 20px;
            color: #888;
            font-size: 14px;
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 19px;
        }

        .title_acl>div {
            margin-bottom: 15px;
        }

        #call {
            color: #fff;
        }

        /* 积分排排行 */
        .ranking {
            width: 100%;
            height: 470px;
            margin: 0 auto;
            margin-top: 58px;
            background: url('images/ranking.png') no-repeat;
            background-position: center;
        }

        .title_ranking {
            font-size: 30px;
            color: #3bcd80;
            width: 260px;
            text-align: center;
            margin-top: 50px;
            margin-left: 40px;
            float: left;
            cursor: default;
        }

        .ranking_content {
            width: 1200px;
            height: 470px;
            margin: 0 auto;
        }

        .eco-school {
            width: 860px;
            height: 470px;
            float: left;
            margin-left: 40px;
        }

        .eco-school>div:nth-of-type(1) {
            margin-left: 380px;
        }

        .cril {
            border-radius: 50%;
            background: #fff;
            width: 8px;
            height: 8px;
            float: left;
            margin-top: 50px;
        }

        .eco-grade {
            color: #fff;
            font-size: 30px;
            float: left;
            margin-top: 30px;
            margin-left: 10px;
            margin-right: 10px;
        }

        .top_draw {
            height: 1px;
            width: 805px;
            background: #fff;
            margin-top: 87px;
            margin-left: 55px;
        }

        .top_draws {
            height: 1px;
            width: 805px;
            background: #fff;
            margin-top: 48px;
            margin-left: 55px;
        }

        .detail {
            margin-top: 15px;
            margin-left: 250px;
            color: #fff;
            cursor: default;
        }

        .queryAll {
            color: #fff;
            text-decoration: underline;
            cursor: pointer;
        }

        .allSchool {
            width: 760px;
            height: 240px;
            margin-left: 50px;
            margin-top: 15px;
        }

        .school-el {
            width: 200px;
            height: 250px;
            float: left;
            margin-left: 50px;
            display: none;
        }

        .school-el p,
        .school-el div {
            cursor: default;
        }

        .school-el>div:nth-of-type(1) {
            border-radius: 7px;
            color: #fff;
            text-align: center;
            padding-top: 2px;
            margin-left: 45px;
            font-size: 18px;
        }

        .school-el>div:nth-of-type(2) {
            overflow: hidden;
        }

        .school-el>div:nth-of-type(2)>div,
        .school-el>div:nth-of-type(3)>div,
        .school-el>div:nth-of-type(4)>div {
            width: 24px;
            height: 24px;
            margin-left: -52px;
            margin-top: 23px;
            padding: 1px;
            border-radius: 50px;
            background: #fff;
            display: inline-block;
        }

        .school-el>div:nth-of-type(2)>div>div,
        .school-el>div:nth-of-type(3)>div>div,
        .school-el>div:nth-of-type(4)>div>div {
            width: 22px;
            height: 22px;
            border-radius: 50px;
            background: #3bcd80;
            display: inline-block;
            padding-left: 6px;
            color: #fff;
        }

        .school-el>div:nth-of-type(2)>img:nth-of-type(1) {
            width: 24px;
            height: 24px;
            margin-left: -52px;
            margin-top: 23px;
        }


        .school-el>div:nth-of-type(2)>img:nth-of-type(2) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 40px;
            margin-top: 28px;
            float: left;
        }

        .pri_school>div>img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 40px;
            margin-top: 28px;
            float: left;
        }

        .mid_school>div:nth-of-type(2)>img:nth-of-type(1) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 40px;
            margin-top: 28px;
            float: left;
        }

        .pri_school>div:nth-of-type(2)>img:nth-of-type(1) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 40px;
            margin-top: 28px;
            float: left;
        }



        .school-el>div:nth-of-type(2)>p {
            width: 90px;
            height: 50px;
            overflow: hidden;
            color: #fff;
            float: right;
            margin-top: 40px;
            margin-right: 5px;
        }

        .school-el>div:nth-of-type(3) {
            overflow: hidden;
        }

        .school-el>div:nth-of-type(3)>img:nth-of-type(1) {
            width: 24px;
            height: 24px;
            margin-left: -52px;
            margin-top: 23px;
        }

        .school-el>div:nth-of-type(3)>img:nth-of-type(2) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 30px;
            margin-top: 28px;
            float: left;
        }

        .school-el>div:nth-of-type(3)>p {
            width: 90px;
            height: 50px;
            overflow: hidden;
            color: #fff;
            float: right;
            margin-top: 40px;
            margin-right: 15px;
        }

        .school-el>div:nth-of-type(4) {
            overflow: hidden;
        }

        .school-el>div:nth-of-type(4)>img:nth-of-type(1) {
            width: 24px;
            height: 24px;
            margin-left: -52px;
            margin-top: 23px;
        }

        .school-el>div:nth-of-type(4)>img:nth-of-type(2) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 20px;
            margin-top: 28px;
            float: left;
        }

        .school-el>div:nth-of-type(4)>p {
            width: 90px;
            height: 50px;
            overflow: hidden;
            color: #fff;
            float: right;
            margin-top: 40px;
            margin-right: 25px;
        }

        /* 垃圾分类小课堂 */
        .eco-class {
            margin-top: 55px;
        }

        .eco_mk>a {
            width: 279px;
            height: 190px;
            border-radius: 7px;
            margin-left: 28px;
            float: left;
            margin-bottom: 30px;
            cursor: pointer;
        }

        .eco_mk>a:nth-of-type(1),
        .eco_mk>a:nth-of-type(5) {
            margin-left: 0px;
        }

        .eco_mk>a>div {
            position: relative;
        }

        .eco_mk>a>div>img:nth-of-type(1) {
            width: 280px;
            height: 190px;
            border-radius: 7px;
        }

        .eco_mk>a>div>div:nth-of-type(1) {
            width: 239px;
            height: 32px;
            color: #222;
            background: #fff;
            font-size: 16px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            margin-left: 20px;
            margin-top: -31px;
            text-align: center;
            padding-top: 5px;
            position: relative;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 5px 10px;
        }

        .eco_mk>a>div>div:nth-of-type(2) {
            position: absolute;
            width: 96px;
            height: 25px;
            background: black;
            opacity: 0.3;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            color: #fff;
            top: 0;
        }
        .eco_mk>a>div>div:nth-of-type(3) {
            position: absolute;
            width: 96px;
            height: 25px;
            text-align: center;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            color: #fff;
            top: 0;
        }

        .eco_mk>a {
            margin-left: 28px;
        }

        .dzNum,
        .insView {
            cursor: pointer;
        }

        .hoverplay {
            width: 60px;
            height: 60px;
            top: 65px;
            position: absolute;
            margin-left: 106px;
            display: none;
        }

        /* 隐藏轮播图小点 */
        .swiper-pagination-bullets {
            display: none;
        }

        .title_acl div {
            cursor: pointer;
        }

        .title_acl>div>div:nth-of-type(2):hover {
            color: #3bcd80;
            cursor: pointer;
        }

        .hot_mk>div>p:nth-of-type(3)>span:nth-of-type(1),
        .hot_mk>div>p:nth-of-type(3)>span:nth-of-type(2) {
            font-size: 14px;
        }

        /* 小知识 */
        .title-zs {
            font-size: 30px;
            color: #555;
            width: 100%;
            text-align: center;
            font-weight: bold;
            padding-top: 20px;
            padding-bottom: 23px;
            margin-top: 30px;
        }

        /* 小知识 */
        .title-zs {
            font-size: 30px;
            color: #555;
            width: 100%;
            text-align: center;
            font-weight: bold;
            padding-top: 20px;
            padding-bottom: 23px;
            margin-top: 30px;
        }

        .classified_list {
            overflow: hidden;
        }

        .classified_list>div {
            float: left;
            width: 336px;
            height: 150px;
            ;
            margin-left: 96px;
            margin-top: 15px;
        }

        .classified_list>div:nth-of-type(3n+1) {
            margin-left: 0px;
        }

        .list_mk>p:nth-of-type(1) {
            width: 336px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 18px;
            color: #555;
            letter-spacing: 2px;
            cursor: pointer;
        }

        .list_mk>p:nth-of-type(2) {
            width: 50px;
            border-bottom: 1px solid #3bcd80;
            padding: 6px 0px;
        }

        .list_mk>p:nth-of-type(3) {
            width: 100%;
            color: #888;
            font-size: 14px;
            letter-spacing: 1px;
            height: 60px;
            overflow: hidden;
            margin-top: 15px;
            cursor: pointer;
        }

        /* 查看更多 */
        .eco_query_more,
        .cli_query_more {
            width: 192px;
            height: 60px;
            border: 2px solid #ececec;
            color: #555;
            font-size: 16px;
            border-radius: 7px;
            text-align: center;
            padding-top: 16px;
            margin: 0 auto;
            margin-top: 10px;
            margin-bottom: 40px;
            cursor: pointer;
        }

        .pri_school>div:nth-of-type(3)>img:nth-of-type(1) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 30px;
            margin-top: 28px;
            float: left;
        }

        .mid_school>div:nth-of-type(3)>img:nth-of-type(1) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 30px;
            margin-top: 28px;
            float: left;
        }

        .pri_school>div:nth-of-type(4)>img:nth-of-type(1) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 20px;
            margin-top: 28px;
            float: left;
        }

        .mid_school>div:nth-of-type(4)>img:nth-of-type(1) {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 20px;
            margin-top: 28px;
            float: left;
        }


        /* 导航栏单独调整 */
        ul li a {
            font-size: 14px;
        }
    </style>
</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <!-- 轮播图 -->
    <div class="lbt">
        <div class="swiper-container">
            <div class="swiper-wrapper"></div>
            <div class="swiper-pagination "></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>

    <!-- 热门活动 -->
    <div class="container hot_act">
        <!-- 热门活动模块 -->
        <p class="title-consult">热门活动</p>
        <div class="hot_mk">
        </div>
    </div>

    <!-- 最新资讯 -->
    <div class="container new_consult">
        <p class="title-consult">最新资讯</p>
        <!-- 模块一 -->
        <div class="eco_news_i">
        </div>
        <!-- 模块二 -->
        <div class="eco_news">
        </div>
        <!-- 模块三 -->
        <div>
            <div class="title_info" style="border: none;">
                <p id="call">通知</p>
                <p>公告</p>
            </div>
            <div class="title_acl" style="border: none;">
            </div>
        </div>
    </div>

    <!-- 积分排行 -->
    <div class="ranking">
        <div class="ranking_content">
            <div class="title_ranking">保护地球，从你我身边开始！</div>
            <div class="eco-school">
                <div>
                    <div class="cril"></div>
                    <p class="eco-grade">荣誉之星</p>
                    <div class="cril"></div>
                </div>
                <div class="top_draw"></div>
                <div class="detail">我们列出了个人荣誉排名前9位，您也可以到详情页<a class="queryAll">查看全部排名</a></div>
                <div class="allSchool">
                    <div class="school-el sma_school">
                    </div>
                    <div class="school-el pri_school">
                    </div>
                    <div class="school-el mid_school">
                    </div>
                </div>
                <div class="top_draws"></div>
            </div>
        </div>
    </div>
    <!-- 垃圾分类小课堂 -->
    <div class="container eco-class">
        <p class="title-consult">小视频</p>
        <!-- 模块一 -->
        <div class="eco_mk">
        </div>
    </div>
    <div class="eco_query_more">查看更多</div>
    <!-- 小知识 -->
    <div class="container list_cli">
        <p class="title-zs">小知识</p>
        <div class="classified_list">
        </div>
        <div class="cli_query_more">查看更多</div>
    </div>

    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />

</body>
<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/swiper/swiper.min.js"></script>
<script src="js/main.js"></script>

<script type="text/javascript">
    $(document).ready(function () {
        var msg = '<%=id%>';
    });
</script>

</html>