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
    <title>社区活动</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/tab/jquery.cardtabs.css">
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/pagination/pagination.css">

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

        .title_lx {
            font-size: 13px;
            margin-top: 16px;
            margin-left: 20px;
            width: 820px;
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

        /*  */

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
            background-size: 100%;
        }

        .adposition_title {
            width: 100%;
            font-size: 38px;
            text-align: center;
            font-family: "宋体";
            font-weight: bold;
            position: absolute;
            color: #fff;
            top: 0;
            left: 0;
            margin-top: 110px;
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

        .nav_tab>ul>li:nth-of-type(4) {
            color: #3bcd86;
            list-style: none;
            width: 150px;
            display: inline-block;
            line-height: 50px;
        }

        .title_lx {
            font-size: 13px;
            margin-top: 9px;
            margin-left: 20px;
            width: 820px;
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
            overflow: hidden;
        }

        .list_mk {
            width: 100%;
            height: 190px;
            border: 1px solid #ececec;
            margin-top: 20px;
            position: relative;
            cursor: pointer;
        }

        .list_mk>div:nth-of-type(1) {
            width: 190px;
            border-right: 1px solid #ececec;
            margin: 18px 0px;
            padding-left: 20px;
            float: left;

        }

        .list_mk>div:nth-of-type(1)>span:nth-of-type(1) {
            position: absolute;
            width: 55px;
            left: 70px;
            top: 70px;
            font-size: 16px;
            display: inline-block;
            text-align: center;
        }

        .list_mk>div:nth-of-type(1)>span:nth-of-type(2) {
            position: absolute;
            width: 70px;
            left: 60px;
            top: 90px;
            font-size: 16px;
            display: inline-block;
            text-align: center;
        }


        .list_mk>div:nth-of-type(2) {
            float: left;
        }

        .list_mk>div:nth-of-type(2)>img {
            width: 170px;
            height: 115px;
            border-radius: 7px;
            margin-top: 35px;
            margin-left: 20px;
        }

        .list_mk>div:nth-of-type(2)>div:nth-of-type(1) {
            width: 96px;
            height: 25px;
            background: black;
            opacity: 0.3;
            position: absolute;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            color: #fff;
            margin-left: 20px;
            top: 35px;
        }

        .list_mk>div:nth-of-type(2)>div:nth-of-type(2) {
            width: 96px;
            height: 22px;
            position: absolute;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            text-align: center;
            color: #fff;
            background: #fff;
            font-size: 14px;
            margin-left: 20px;
            top: 35px;
            text-align: center;
        }

        .list_mk>p {
            float: left;
            width: 500px;
            margin: 0 0 6px;
            margin-left: 20px;
        }

        .list_mk>p:nth-of-type(1) {
            font-size: 16px;
            color: #555;
            margin-top: 35px;
        }

        .list_mk>p:nth-of-type(2) {
            font-size: 14px;
            color: #888;
            height: 60px;
            overflow: hidden;
        }

        .list_mk>p:nth-of-type(3) {
            font-size: 16px;
            color: #888;
        }

        .lian {
            width: 150px;
            margin-left: 140px;
            margin-top: -92px;
            float: left;
            color: #555;
            font-size: 16px;
        }

        .lian>img {
            margin-right: 6px;
        }

        .foot {
            /* position: absolute; */
            /* bottom: 0px; */
            width: 100%;
            
        }

        .hot_mk {
            margin-bottom: 100px;
        }
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <!-- 导航条 -->
    <div class="container scrollH">
        <div class="title_lx">
            <a><img src="images/home.png"><span>数据统计</span></a>
            <span>/</span>
            <a><span>社区活动</span></a>
        </div>
        <!-- 条件 -->
        <div class="listMenu">
            <p>分类：</p>
            <div class="fl_lbxx">

            </div>
        </div>
        <!-- 小视频LIST -->
        <!-- 模块一 -->
        <div class="hot_mk">
            <!-- <div class="list_mk">
                <div><img src="images/crile.png"><span>2019年</span><span>6月29号</span></div>
                <div>
                    <img src="images/zyzzm.jpg">
                    <div></div>
                    <div>测试</div>
                </div>
                <p>测试·测试。测试</p>
                <p>测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试测试·测试。测试</p>
                <p>负责人：<span>张三</span></p>
                <div class="lian"><img src="images/lian.jpg"><span>12354</span></div>
            </div> -->
        </div>

    </div>


    <!-- 导入尾部文件 -->
    <div class="foot">
        <jsp:include page="footer.jsp" />
    </div>
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="js/pagination/jquery.pagination.js"></script>
<script src="js/tjfx_list.js"></script>

</html>