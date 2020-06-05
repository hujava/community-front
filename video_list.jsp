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
    <title>小视频</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/tab/jquery.cardtabs.css">
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/pagination/pagination.css">
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

        /* 小视频LIST */
        .eco_mk {
            margin-top: 30px;
            overflow: hidden;
        }

        .eco_mk>a {
            width: 279px;
            height: 190px;
            border-radius: 7px;
            margin-left: 28px;
            float: left;
            margin-bottom: 30px;
            cursor: pointer;
            margin-bottom: 60px;
        }

        .eco_mk>a:nth-of-type(4n+1) {
            margin-left: 0px;
        }

        .eco_mk>a>div>img:nth-of-type(1) {
            width: 280px;
            height: 190px;
            border-radius: 7px;
        }

        .eco_mk>a>div {
            position: relative;
        }

        .eco_mk>a>div>div:nth-of-type(1) {
            width: 260px;
            height: 32px;
            color: #222;
            font-size: 16px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            margin-top: 6px;
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

        .hoverplay {
            width: 60px;
            height: 60px;
            top: 65px;
            position: absolute;
            margin-left: 106px;
            display: none;
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

        .nav_tab>ul>li:nth-of-type(3) {
            color: #3bcd86;
            list-style: none;
            width: 150px;
            display: inline-block;
            line-height: 50px;
        }

        /*  */
        #form1 {
            width: auto;
        }

        .log_text {
            text-align: center;
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
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="adposition_banner">
        <img src="">
        <div class="adposition_title">
            <div class="line-left"></div>
            社区学院
            <div class="line-right"></div>
        </div>
    </div>
    <!-- 导航条 -->
    <div class="nav_tab">
        <ul>
            <li class="class_1" value="1">儿童培训</li>
            <li class="class_2" value="2">老年大学</li>
            <li class="class_3" value="3">小视频</li>
            <li class="class_4" value="4">小知识</li>
        </ul>
    </div>
    <div class="container">
        <!-- 条件 -->
        <div class="listMenu">
            <p>分类：</p>
            <div class="fl_lbxx">
                <span value="0">全部</span>
                <span value="1">生物多样性</span>
                <span value="2">垃圾分类</span>
                <span value="3">能源</span>
                <span value="4">水资源</span>
                <span value="5">自然与艺术</span>
                <span value="6">科普环保</span>
            </div>
        </div>
        <!-- 小视频LIST -->
        <!-- 模块一 -->
        <form id="form1" runat="server">
            <div class="eco_mk">

            </div>
            <div class="log_text">
                <ul class="pagination" id="pagination">

                </ul>
                <input type="hidden" id="PageCount" runat="server" />
                <input type="hidden" id="PageSize" runat="server" value="12" />
                <input type="hidden" id="countindex" runat="server" value="10" />
                <!--设置最多显示的页码数 可以手动设置 默认为7-->
                <input type="hidden" id="visiblePages" runat="server" value="7" />
            </div>
        </form>

    </div>


    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="js/pagination/jquery.pagination.js"></script>
<script src="js/jqPaginator.min.js"></script>
<script src="js/video_list.js"></script>

</html>