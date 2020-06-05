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
        id = userDetails.getId();
	}
}

%>
<!DOCTYPE html>
<html>

<head>
    <title>积分兑换</title>
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

        .about_us {
            width: 1200px;
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
            height: 220px;
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
            margin-top: 10px;
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

        .house_title {
            font-size: 16px;
            color: #555;
            margin-top: 46px;
            text-indent: 33px;
        }

        /* content */
        .line_house {
            margin-top: 40px;
            overflow: hidden;
        }

        .line_house>div:nth-of-type(1) {
            width: 480px;
            height: 1px;
            border-bottom: 1px solid #ececec;
            float: left;
            margin-top: 20px;
        }

        .line_house>div:nth-of-type(2) {
            color: #3bcd80;
            font-size: 24px;
            text-align: center;
            width: 240px;
            float: left;
        }

        .line_house>div:nth-of-type(3) {
            width: 480px;
            height: 1px;
            border-bottom: 1px solid #ececec;
            float: left;
            margin-top: 20px;
        }

        .list_mk {
            margin-top: 34px;
            overflow: hidden;
        }

        .list_mk>div {
            width: 280px;
            /* height: 300px; */
            margin-left: 22px;
            float: left;
        }

        .list_mk>div:nth-of-type(4n+1) {
            margin-left: 5px;
        }

        .list_mk>div>img {
            height: 176px;
            width: 100%;
            border-top-right-radius: 7px;
            border-top-left-radius: 7px;
            cursor: pointer;
            border: 1px solid #E4E4E4;
            border-bottom: 0px solid #E4E4E4;
        }

        .list_ul {
            padding: 20px 20px 0px;
            overflow: hidden;
            font-size: 16px;
            border: 1px solid #e4e4e4;
            border-bottom-left-radius: 7px;
            border-bottom-right-radius: 7px;
        }

        .list_ul>li {
            width: 50%;
            float: left;
            list-style: none;
            height: 28px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: default;
        }

        .list_ul>li:nth-of-type(2),
        .list_ul>li:nth-of-type(4) {
            text-align: right;
        }

        .list_ul>li:nth-of-type(3),
        .list_ul>li:nth-of-type(4) {
            height: 30px;
        }

        .list_ul>li:nth-of-type(5) {
            font-size: 12px;
            color: #888;
            padding-top: 10px;
        }

        .iwant {
            width: 104px;
            height: 30px;
            border: 1px solid #FD4F4F;
            border-radius: 7px;
            color: #FD4F4F;
            padding: 2px 12px;
            cursor: pointer;
        }

        .iwant>img {
            margin-top: -4px;
        }

        .exchange {
            width: 106px;
            height: 30px;
            background: #3bcd80;
            color: #fff;
            text-align: center;
            border-radius: 7px;
            padding-top: 3px;
            margin-left: 12px;
            cursor: pointer;
        }

        /* tab切换 */
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

        .nav_tab>ul>li:nth-of-type(3) {
            color: #888;
            list-style: none;
            width: 150px;
            display: inline-block;
            line-height: 50px;
        }

        .jf_model {
            width: 430px;
            height: 310px;
            position: fixed;
            left: 0rem;
            right: 0rem;
            margin: 0 auto;
            z-index: 1001;
            background: #fff;
            border-radius: 10px;
            top: 40%;
            display: none;
        }

        .jf_background {
            background: #000;
            opacity: 0.2;
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0rem;
            right: 0rem;
            top: 0px;
            z-index: 1000;
            display: none;
        }

        .model_title {
            height: 36px;
            margin: 16px 25px;
            border-bottom: 1px solid #eee;
        }

        .model_title>span:nth-of-type(1) {
            display: inline-block;
            height: 16px;
            border-left: 2px solid #3bcd80;
        }

        .model_title>span:nth-of-type(2) {
            display: inline-block;
            color: #555;
            font-size: 16px;
            margin-top: -6px;
            margin-left: 6px;
        }

        .model_title>img {
            float: right;
        }

        .s_jf {
            margin-top: 50px;
            text-align: center;
        }

        .s_jf>div {
            color: #222;
            font-size: 20px;
            padding: 12px 90px;
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
        .list_ul>p{
            color: #555;
            font-size: 14px;
            cursor: default;
        }
        .list_ul>li:nth-of-type(5){
            height: 40px;
        }
        .foot{
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
            积分兑换
            <div class="line-right"></div>
        </div>
    </div>
    <div class="container scrollH">
        <div class="content_mk">
            <form id="form1" runat="server">
                <div class="list_mk">
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
        <!--  -->
        <div class="jf_background">

        </div>
        <div class="jf_model">
            <div class="model_title">
                <span></span>
                <span>立即兑换</span>
                <img class="closeJf" src="images/close.png"/>
            </div>
            <div class="s_jf">
                <img src=""/>
                <div></div>
            </div>
        </div>
    </div>



    <!-- 导入尾部文件 -->
    <!-- 导入尾部文件 -->
    <div class="foot">
        <jsp:include page="footer.jsp" />
    </div>
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/jqPaginator.min.js"></script>
<script src="js/forest_house.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var id = '<%=id%>';
        $(".adposition_title").attr("value", id);
    });
</script>

</html>