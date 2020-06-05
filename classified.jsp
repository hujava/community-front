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
int userId = 0;
if(obj!=null){
	SecurityContextImpl securityContextImpl = (SecurityContextImpl) request.getSession()
				.getAttribute("SPRING_SECURITY_CONTEXT");
	if (securityContextImpl != null && securityContextImpl.getAuthentication() != null
		&& securityContextImpl.getAuthentication().getPrincipal() != null) {
		UserEntity userDetails = (UserEntity) securityContextImpl.getAuthentication().getPrincipal();
        userName = userDetails.getUsername();
        userId = userDetails.getId();
	}
}

%>
<!DOCTYPE html>
<html>

<head>
    <title>老年大学</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/slick-carousel/1.6.0/slick.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/slick-carousel/1.6.0/slick-theme.min.css" rel="stylesheet">
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

        /* 分类课堂 */
        .fl_title {
            color: #555;
            font-size: 24px;
            margin-top: 24px;
        }

        .fl_lb {
            width: 100%;
            border: 1px solid #ececec;
            height: 102px;
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
            margin-top: 30px;
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
        .class_list {
            overflow: hidden;
        }

        .class_list>div {
            width: 222px;
            height: 244px;
            float: left;
            margin-right: 18px;
            margin-top: 18px;
            border-radius: 7px;
            border: 1px solid #ececec;
            position: relative;
        }

        .class_list>div:nth-of-type(1) {
            margin-left: 0px;
        }

        .class_list>div>img {
            width: 100%;
            height: 148px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
        }

        .class_list>div>p:nth-of-type(1) {
            padding: 9px 12px 0px;
            color: #222;
            font-size: 16px;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .class_list>div>p:nth-of-type(2) {
            padding: 0px 12px;
            color: #3bcd80;
            font-size: 14px;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .class_list>div>p:nth-of-type(3) {
            padding: 0px 12px 16px 12px;
            color: #888;
        }

        .class_list>div>p:nth-of-type(3)>span {
            margin-left: 8px;
            display: inline-block;
            width: 30px;
        }

        .class_list>div>p:nth-of-type(3)>img:nth-of-type(2) {
            margin-left: 10px;
        }

        .class_list>div>p:nth-of-type(3)>span:nth-of-type(3) {
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

        .eco_mk>a>div {
            position: relative;
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
            padding: 5px 10px;
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


        .list_mk>p {
            cursor: pointer;
        }

        .fl_lbxx>span,
        .fl_lbx>span {
            cursor: pointer;
        }

        .list_data>span:nth-of-type(1),
        .fl_pj>span:nth-of-type(1) {
            background: #3bcd80;
            color: #fff;
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

        .nav_tab>ul>li:nth-of-type(2) {
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
    <!-- 分类课堂 -->
    <div class="container list_fl">
        <div class="fl_title">分类课程</div>
        <div class="fl_lb">
            <div class="fl_fs">
                <div>分类：</div>
                <div class="fl_lbxx fl_pj">
                </div>
            </div>
            <div class="fl_hb">
                <div>环保：</div>
                <div class="fl_lbxx list_data">
                </div>
            </div>
        </div>
        <div style="overflow: hidden;">
            <!-- 分类查询content -->
            <div class="con_title">
                <div class="con_titlen">
                    <div value="1">综合<i class="fa fa-angle-down"></i></div>
                    <div value="2">评分数<i class="fa fa-angle-down"></i></div>
                </div>
                <form id="form1" runat="server">
                    <div class="class_list">
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
            <!-- 近期热点 -->
            <div class="_right">
                <div class="_right_title">热门课程</div>
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
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://cdn.bootcss.com/slick-carousel/1.6.0/slick.min.js"></script>
<script src="js/jqPaginator.min.js"></script>
<script src="js/classified.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var id = '<%=userId%>';
    });
</script>

</html>