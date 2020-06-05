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
    <title>分类课堂</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/slick-carousel/1.6.0/slick.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/slick-carousel/1.6.0/slick-theme.min.css" rel="stylesheet">


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

        .nav_tab>ul>li:nth-of-type(1) {
            color: #3bcd86;
            list-style: none;
            width: 150px;
            display: inline-block;
            line-height: 50px;
        }

        .nav_tab>ul>li:nth-of-type(2) {
            color: #888;
            list-style: none;
            width: 150px;
            display: inline-block;
            line-height: 50px;
        }

        /* 分类课堂 */
        .fl_title {
            color: #555;
            font-size: 24px;
            margin-top: 24px;
        }

        .fl_lb {
            width: 100%;
            border: 1px solid #ececec;
            height: 152px;
            margin-top: 16px;
            padding: 0px 16px;
        }

        .fl_xd,
        .fl_fs,
        .fl_hb {
            height: 50px;
            width: 100%;
            overflow: hidden;
        }

        .fl_fs,
        .fl_hb {
            border-top: 1px solid #ececec;
        }

        .fl_xd>div:nth-of-type(1),
        .fl_fs>div:nth-of-type(1),
        .fl_hb>div:nth-of-type(1) {
            font-size: 14px;
            color: #222;
            height: 50px;
            width: 60px;
            padding-top: 15px;
        }

        .fl_lbx>span {
            display: inline-block;
            height: 28px;
            border-radius: 3px;
            color: #555;
            text-align: center;
            padding: 0px 6px;
            padding-top: 4px;
            margin-right: 20px;
        }

        .fl_lbxx>span {
            display: inline-block;
            height: 28px;
            border-radius: 3px;
            color: #555;
            text-align: center;
            padding: 0px 6px;
            padding-top: 4px;
            margin-right: 20px;
        }

        .fl_xd div,
        .fl_fs div,
        .fl_hb div {
            float: left;
            padding-top: 10px;
        }

        .con_title {
            width: 960px;
            float: left;
        }

        .con_titlen {
            width: 942px;
            height: 42px;
            background: #f9f9f9;
        }

        .con_titlen>div {
            height: 42px;
            width: 98px;
            float: left;
            padding-left: 22px;
            padding-top: 12px;
        }

        .con_titlen>div:nth-of-type(1) {
            background: #3bcd86;
            color: #fff;
        }

        /* 课程查询List */
        /* .class_list {
             margin-top: 18px; 
        } */


        /* 推荐课程 */
        ._right {
            width: 222px;
            float: right;
            margin-top: 41px;
        }

        ._right_title {
            color: #3bcd80;
            border-bottom: 2px solid #3bcd80;
            font-size: 16px;
            width: 65px;
            height: 36px;
        }

        ._right_img {
            overflow: hidden;
        }

        ._right_img>div {
            height: 234px;
            border-bottom: 1px solid #ececec;
            margin-top: 14px;
        }

        ._right_img>div:last-child {
            border-bottom: none;
        }

        ._right_img>div>img {
            width: 100%;
            height: 172px;
            border-radius: 7px;
            float: left;
            cursor: pointer;
        }

        ._right_img>div>p {
            color: #555;
            font-size: 14px;
            margin-left: 6px;
            float: left;
            width: 100%;
            height: 22px;
            margin-top: 6px;
            cursor: pointer;
        }

        /* ._right_img>div>p:nth-of-type(1):hover {
            color: #3bcd80;
            cursor: pointer;
        } */

        ._right_img>div>p:nth-of-type(1):focus {
            color: #555;
        }

        ._right_img>div>p:nth-of-type(2) {
            color: #555;
        }

        ._right_img>div>p:nth-of-type(2) {
            margin-top: -3px;
            color: #3bcd80;
        }

        ._right_img a {
            color: #555;
        }

        hr {
            margin-top: -2px;
            margin-left: 64px;
            border: 1px solid #eee;
            margin-bottom: 0px;
        }

        i {
            margin-left: 6px;
        }

        p {
            margin: 0px;
        }

        /* 森林小屋 */
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
            line-height: 280px;
        }

        /* 學習課堂 */
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

        /* 学习课堂模块 */
        /* .list_fl {
            display: none;
        } */

        .list_hd {
            position: relative;
            display: none;
        }

        .list_cli {
            display: none;
        }

        .slick {
            width: 1200px;
            height: 300px;
            margin-top: 60px;
        }

        .slick img {
            width: 180px;
            height: 180px;
            margin: 0 auto;
            border-radius: 50%;
        }

        .slick-active img {
            margin-top: 30px;
        }

        .slick-current img {
            width: 260px;
            height: 260px;
            margin: 0px;
            margin-left: 50px;
        }

        /* .slick-arrow::before {
            color: red;
        } */

        .slick-prev::before,
        .slick-next::before {
            content: "";
        }

        .slick-next:focus {
            background: url("");

        }

        .slick-prev:focus {
            background: url("");

        }

        .slick-prev {
            background: url("images/prev_gray.png");
        }

        .slick-next {
            background: url("images/next_gray.png");
        }

        .slick-prev:hover {
            background: url("images/prev_green.png");
        }

        .slick-next:hover {
            background: url("images/next_green.png");
        }

        .slick-next:focus {
            background: url("images/next_green.png");

        }

        .slick-prev:focus {
            background: url("images/prev_green.png");

        }

        .slick-next,
        .slick-prev {
            width: 15px;
            height: 27px;
            top: 30%;
            margin-top: 30px;
        }

        .slick-slide div {
            width: 170px;
            text-align: center;
            margin-left: 98px;
            margin-top: 14px;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            color: #555;
        }

        /*  */
        .nav_consult {
            margin-top: 54px;
            display: none;
        }

        .nav_consult>div {
            float: left;
        }

        .nav_img>img {
            width: 480px;
            height: 290px;
            border-radius: 7px;
        }

        .nav_con {
            height: 200px;
            width: 674px;
            margin-left: 46px;
            margin-top: 50px;
        }

        .list_title {
            color: #555;
            font-size: 24px;
        }

        .list_t_time {
            color: #888;
            font-size: 16px;
        }

        .list_hr {
            width: 52px;
            height: 1px;
            border-bottom: 1px solid #3bcd80;
            margin-top: 26px;
        }

        .list_content {
            font-size: 14px;
            color: #555;
            margin-top: 22px;
            line-height: 26px;
            max-height: 100px;
        }

        /* 小视频 */
        .title-consult {
            font-size: 30px;
            color: #555;
            width: 100%;
            text-align: center;
            font-weight: bold;
            padding-top: 24px;
            padding-bottom: 18px;
        }

        .eco-class {
            margin-top: 60px;
            background: #f9f9f9;
            display: none;
        }

        .eco_mk {
            margin: 0 auto;
            width: 1200px;
            overflow: hidden;
        }

        .eco_mk>a {
            width: 280px;
            height: 190px;
            border-radius: 7px;
            margin-left: 26px;
            float: left;
            margin-bottom: 30px;
            cursor: pointer;
        }

        .eco_mk>a:nth-of-type(1),
        .eco_mk>a:nth-of-type(5) {
            margin-left: 0px;
        }

        .eco_mk>a>div>img:nth-of-type(1) {
            width: 279px;
            height: 190px;
            border-radius: 7px;
        }

        .eco_mk>a>div>div {
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
        }

        .dzNum,
        .insView {
            cursor: pointer;
        }

        .hoverplay {
            width: 60px;
            height: 60px;
            margin-top: -216px;
            margin-left: 106px;
            display: none;
        }

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
        }

        /* 小视频1 */
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

        .eco_mk>a>div>img:nth-of-type(1) {
            width: 280px;
            height: 190px;
            border-radius: 7px;
        }

        .eco_mk>a>div>div {
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
        }

        .eco_mk>a {
            margin-left: 28px;
        }

        .hoverplay {
            width: 60px;
            height: 60px;
            margin-top: -216px;
            margin-left: 106px;
            display: none;
        }


        .list_mk>p {
            cursor: pointer;
        }

        .fl_lbxx>span,
        .fl_lbx>span {
            cursor: pointer;
        }

        .title_lx {
            font-size: 13px;
            margin-top: 22px;
            margin-left: 20px;
        }

        .title_lx a span {
            font-size: 13px;
            padding: 0px 6px;
            color: #666;
            cursor: pointer;
        }

        .title_lx a span:hover {
            color: #3bcd80;
        }

        .title_lx>span {
            color: darkgrey;
            cursor: default;
        }

        .title_lx>a>img {
            width: 15px;
            height: 15px;
            margin-top: -5px;
            cursor: pointer;
        }
        /*  */
        .hot_mk {
            margin-top: 5px;
        }

        .hot_mk>div {
            width: 380px;
            height: 420px;
            float: left;
            margin-right: 28px;
            border-radius: 7px;
            border: 1px solid #ececec;
            position: relative;
            margin-top: 30px;
        }

        .hot_mk>div:nth-child(3n+3) {
            margin-right: 0px;
        }

        .hot_mk>div>div:nth-of-type(1) {
            width: 96px;
            height: 25px;
            background: gray;
            opacity: 0.6;
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
        }


        .hot_mk>div>img {
            width: 100%;
            height: 260px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
        }

        .hot_mk>div>p:nth-of-type(1) {
            padding: 14px 20px 0px;
            color: #222;
            height: 64px;
            overflow: hidden;
            font-size: 18px;
        }

        .hot_mk>div>p:nth-of-type(2) {
            padding: 0px 0px 14px 20px;
            color: #888;
            font-size: 16px;
            margin-top: 20px;
        }

        .hot_mk>div>p:nth-of-type(2)>span:nth-of-type(1) {
            display: inline-block;
            width: 74.8%;
        }

        .hot_mk>div>p:nth-of-type(2)>span:nth-of-type(2) {
            display: inline-block;
            position: absolute;
        }

        .hot_mk>div>p:nth-of-type(3) {
            padding: 0px 20px 14px 20px;
            color: #555;
        }

        .hot_mk>div>p:nth-of-type(3)>span {
            margin-left: 8px;
            display: inline-block;
            width: 30px;
        }

        .hot_mk>div>p:nth-of-type(3)>img:nth-of-type(2) {
            margin-left: 10px;
            margin-top: -6px;
        }

        .hot_mk>div>p:nth-of-type(3)>span:nth-of-type(3) {
            display: inline-block;
            width: 104px;
            height: 30px;
            background: #3bcd80;
            color: #fff;
            text-align: center;
            padding-top: 3px;
            border-radius: 7px;
            margin-left: 24px;
        }

        
        /* 进行==未结束 */
        .time_now,
        .time_end {
            position: relative;
            /* margin-left: 45px; */
        }

        .time_now>img,
        .time_end>img {
            position: absolute;
            margin-top: -4px;
        }

        .time_now>span,
        .time_end>span {
            position: absolute;
            width: 60px;
            margin-left: 26px;
            color: #fff;
        }

    </style>
</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <!-- 分类课堂 -->
    <div class="container list_fl">
        <div class="title_lx">
            <a><img src="images/home.png"><span>首页</span></a>
            <span>/</span>
            <a><span>搜索结果列表</span></a>
        </div>
        <div style="overflow: hidden;">
            <!-- 分类查询content -->
            <div class="con_title">
                <div class="class_list hot_mk">

                </div>
            </div>
            <!-- 近期热点 -->
            <div class="_right">
                <div class="_right_title">热门活动</div>
                <hr>
                <div class="_right_img">
                </div>
            </div>
        </div>
    </div>


    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="http://cdn.bootcss.com/slick-carousel/1.6.0/slick.min.js"></script>
<script src="js/sou_activity.js"></script>

</html>