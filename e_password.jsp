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
    <title>公益活动</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/pagination/myPage.css">


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

        /* 导航栏 */

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

        .hot_mk>div:nth-of-type(1),
        .hot_mk>div:nth-of-type(2),
        .hot_mk>div:nth-of-type(3),
        .hot_mk>div:nth-of-type(4) {
            margin-top: 6px;
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
            height: 275px;
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
            margin-top: 40px;
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
        }

        .hot-desc {
            width: 200px;
            float: right;
            color: #555;
        }

        .hot-right {
            width: 610px;
            float: right;
            margin-right: 65px;
            margin-top: -100px;
        }

        .hot-right a {
            color: #222;
        }

        .hot-right>div {
            display: inline-block;
            margin-left: 56px;
            width: 104px;
            height: 30px;
        }

        .hot-right>div:nth-of-type(1) {
            margin-left: 0px;
        }

        .hot-right>div:nth-of-type(5) {
            margin-left: 0px;
        }

        .hot_act {
            margin-top: -56px;
        }

        p {
            margin: 0px;
        }

        .hot_mk {
            margin-top: 5px;
            overflow: hidden;
        }

        .log_text {
            text-align: center;
        }

        #form1 {
            width: 1200px;
        }

        .hot_mk>div {
            width: 280px;
            /* height: 190px; */
            float: left;
            margin-right: 26px;
            border-radius: 7px;
            border: 1px solid #ececec;
            position: relative;
            margin-top: 30px;
        }

        .hot_mk>div:nth-child(4n+4) {
            margin-right: 0px;
        }

        .hot_mk>div>div:nth-of-type(1) {
            width: 96px;
            height: 25px;
            background: #000;
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
        }


        .hot_mk>div>img {
            width: 100%;
            height: 190px;
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
            font-size: 14px;
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
            padding: 0px 20px 20px 20px;
            color: #555;
            position: relative;
        }

        .hot_mk>div>p:nth-of-type(3)>span:nth-of-type(1) {
            display: inline-block;
            width: 70.6%;
        }

        .hot_mk>div>p:nth-of-type(3)>span>span {
            margin-left: 4px;
            display: inline-block;
            width: 30px;
        }

        .hot_mk>div>p:nth-of-type(3)>span>img:nth-of-type(2) {
            margin-left: 16px;
            margin-top: -6px;
        }

        .hot_mk>div>p:nth-of-type(3)>span>span:nth-of-type(3) {
            display: inline;
            right: 0px;
            position: absolute;
        }

        .hot_mk>div>p:nth-of-type(3)>span:nth-of-type(2)>span {
            margin-left: 30px;
            width: 50px;
        }


        /* .hot_mk>div>p:nth-of-type(3)>span:nth-of-type(3) {
            display: inline-block;
            width: 104px;
            height: 30px;
            background: #3bcd80;
            color: #fff;
            text-align: center;
            padding-top: 3px;
            border-radius: 7px;
            margin-left: 24px;
        } */

        /* 进行==未结束 */
        .time_now,
        .time_end {
            position: relative;
            /* margin-left: 45px; */
        }

        .time_now>img,
        .time_end>img {
            position: absolute;
            margin-top: -6px;
        }

        .time_now>span,
        .time_end>span {
            position: absolute;
            width: 60px;
            margin-left: 26px;
            color: #fff;
        }

        .insView {
            cursor: pointer;
        }

        .insView:hover {
            color: #3bcd80;
        }


        /* 条件 */
        .listMenu {
            border: 1px solid #ececec;
            height: 50px;
            width: 100%;
            margin-top: 26px;
            overflow: hidden;
        }

        .listMenu>p {
            color: #222;
            font-size: 14px;
            height: 100%;
            width: 50px;
            margin-left: 20px;
            padding-top: 15px;
            float: left;
            font-weight: bold;
        }

        .fl_lbxx {
            float: left;
            padding-top: 10px;
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
            cursor: pointer;
        }

        .fl_lbxx>span:nth-of-type(1) {
            background: #3bcd80;
            color: #fff;
        }

        .pagination>.active>a,
        .pagination>.active>span,
        .pagination>.active>a:hover,
        .pagination>.active>span:hover,
        .pagination>.active>a:focus,
        .pagination>.active>span:focus {
            background: #3bcd80;
            border: 1px solid #3bcd80;
        }

        .pagination>li>a:hover,
        .pagination>li>span:hover,
        .pagination>li>a:focus,
        .pagination>li>span:focus {
            color: #3bcd80;
        }

        .pagination>li>a,
        .pagination>li>span {
            color: #3bcd80;
            margin-right: 5px;
            margin-bottom: 5px;
            display: inline-block;
        }

        .foot {
            width: 100%;

        }
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="adposition_banner">
        <div class="adposition_title">
            <div class="line-left"></div>
            公益活动
            <div class="line-right"></div>
        </div>
    </div>
    <!-- 导航条 -->
    <div class="nav_tab">
        <ul>
            <li class="consult_1" value="1">社区活动</li>
            <li class="consult_2" value="2">党建活动</li>
        </ul>
    </div>
    <div class="container">
        <!-- 条件 -->
        <div class="listMenu">
            <p>分类：</p>
            <div class="fl_lbxx">
            </div>
        </div>
        <!-- 热门活动模块 -->
        <form id="form1" runat="server">
            <div class="hot_mk">

            </div>
            <div class="log_text">
                <ul class="pagination" id="pagination">
                </ul>
                <input type="hidden" id="PageCount" runat="server" />
                <input type="hidden" id="PageSize" runat="server" value="8" />
                <input type="hidden" id="countindex" runat="server" value="10" />
                <!--设置最多显示的页码数 可以手动设置 默认为7-->
                <input type="hidden" id="visiblePages" runat="server" value="7" />
            </div>
        </form>
    </div>
    <!-- 导入尾部文件 -->
    <div class="foot">
        <jsp:include page="footer.jsp" />
    </div>
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="js/jqPaginator.min.js"></script>
<script src="js/e_password.js"></script>

</html>