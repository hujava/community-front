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
    <title>热点资讯</title>
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


        ._left,
        #form1 {
            float: left;
            width: 910px;
        }

        ._right {
            width: 250px;
            height: 300px;
            float: right;
            margin-top: 55px;
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
            height: 40px;
            ;
            margin-top: 14px;
        }

        ._right_img>div>img {
            width: 144px;
            height: 98px;
            border-radius: 7px;
            float: left;
        }

        ._right_img>div>p {
            color: #555;
            font-size: 14px;
            margin-left: 6px;
            float: left;
            width: 100%;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin-bottom: 0px;
        }

        ._right_img>div>p:nth-of-type(1):hover {
            color: #3bcd80;
            cursor: pointer;
        }

        ._right_img>div>p:nth-of-type(1):focus {
            color: #555;
        }

        ._right_img>div>p:nth-of-type(2)>span {
            font-size: 12px;
            color: #888;
        }

        ._right_img a {
            color: #555;
        }

        hr {
            margin-top: -2px;
            margin-left: 65px;
            border: 1px solid #eee;
            margin-bottom: 0px;
        }

        /* 学习课堂 */
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
            height: 275px;
        }

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
            margin-top: 50px;
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

        .wl_time {
            margin-top: 20px;
            color: #888;
            font-size: 14px;
            overflow: hidden;
        }

        .wl_time>div {
            float: left;
            width: 50%;
            padding: 0px 10px;
        }

        .wl_time>div:nth-of-type(2) {
            text-align: right;
        }

        a {
            color: #3bcd86;
            cursor: pointer;
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

        /* left */
        ._content {
            overflow: hidden;
            margin-top: 20px;
            padding-bottom: 25px;
            border-bottom: 1px solid #ececec;
        }

        ._con_img {
            float: left;
        }

        ._con_img>img {
            width: 206px;
            height: 138px;
            border-radius: 7px;
        }

        ._con_lit {
            margin-left: 15px;
            float: left;
            width: 75%;
        }

        ._con_lit>p:nth-of-type(1) {
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            margin: 0px;
            font-size: 18px;
            cursor: pointer;
            color: #555;
        }

        ._con_lit>p:nth-of-type(2) {
            width: 96%;
            font-size: 14px;
            cursor: pointer;
            color: #888;
            margin-top: 5px;
            overflow: hidden;
            height: 40px;
        }

        .list_ck {
            height: 50px;
            margin-top: 10px;
            text-align: right
        }

        .list_dz {
            height: 50px;
            margin-top: 10px;
            margin-left: 14px
        }

        .list_dz span,
        .list_ck span {
            margin-left: 6px;
            color: #888;
            font-size: 12px;
        }

        .list_ck {
            margin-right: 6px;
        }

        .list_dck {
            overflow: hidden;
        }

        .list_dck>div {
            float: left;
        }

        .list_ck>img,
        .list_dz>img {
            width: 16px;
            height: 16px;
        }

        .list_dck span {
            margin-left: 6px;
            color: #c8c8c8;
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
        }
   
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="adposition_banner">
        <div class="adposition_title">
            <div class="line-left"></div>
            热点资讯
            <div class="line-right"></div>
        </div>
    </div>
    <!-- 导航条 -->
    <div class="nav_tab">
        <ul>
            <li class="consult_1" value="1">新闻</li>
            <li class="consult_2" value="2">通知</li>
            <li class="consult_3" value="3">公告</li>
        </ul>
    </div>
    <div class="container">
        <form id="form1" runat="server">
            <div class="_left">

            </div>
            <div class="log_text">
                <ul class="pagination" id="pagination">

                </ul>
                <input type="hidden" id="PageCount" runat="server" />
                <input type="hidden" id="PageSize" runat="server" value="5" />
                <input type="hidden" id="countindex" runat="server" value="10" />
                <!--设置最多显示的页码数 可以手动设置 默认为7-->
                <input type="hidden" id="visiblePages" runat="server" value="7" />
            </div>
        </form>

        <!-- 近期热点 -->
        <div class="_right">
            <div class="_right_title">近期热点</div>
            <hr>
            <div class="_right_img">
            </div>

        </div>
    </div>
    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="js/pagination/jquery.pagination.js"></script>
<script src="js/jqPaginator.min.js"></script>
<script src="js/g_school.js"></script>

</html>