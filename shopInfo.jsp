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
    <title>商品详情</title>
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
            margin-top: 9px;
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

        .info_detail {
            overflow: hidden;
            margin-left: 10px;
        }

        .info_img {
            width: 560px;
            margin-top: 20px;
            float: left;
        }

        .info_img>img {
            width: 100%;
            height: 330px;
            border: 1px solid #ececec;
        }

        .info_content {
            width: 610px;
            margin-left: 20px;
            float: left;
        }

        h4 {
            font-size: 18px;
            margin-top: 25px;
        }

        ._content {
            padding: 10px 15px;
            width: 100%;
            height: 60px;
            background: rgba(59, 205, 134, 0.05) !important;
            font-size: 12px;
        }

        ._content>div {
            padding: 10px;
        }

        ._content>div>span:nth-of-type(1) {
            font-size: 18px;
            color: #666;
            display: inline-block;
            width: 90px;
            margin-left: 18px;
        }

        ._content>div>span:nth-of-type(2) {
            font-size: 12px;
            color: #333;
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
            padding: 50px 70px;
            margin-top: 30px;
            float: left;
        }

        .courseinfoPic img {
            width: 850px;
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

        /*  吸顶效果  */
        #wrap[data-fixed="fixed"] {
            width: 991px;
            position: fixed;
            top: -1px;
            z-index: 50;
            background: #f8f8f8;
        }

        /*  */
        div.card-tabs-stack.graygreen div[data-tab] {
            border: none;
        }

        .graygreen>a:nth-of-type(1) {
            font-size: 12px;
            color: #555;
        }

        .tabsholder {
            margin-top: 30px;
            margin-left: 10px;
        }

        .dzmk {
            /* margin: 0 auto; */
            text-align: center;
            padding-top: 40px;
            width: 990px;
        }

        .dzmk>div {
            color: #fff;
            margin-top: -28px;
            margin-left: 62px;
            font-size: 16px;
        }

        .title_bt {
            color: #888;
            font-size: 16px;
            height: 30px;
            width: 65px;
            border-bottom: 2px solid #3bcd80;
        }

        hr {
            border-top: 2px solid #eee;
            margin-top: -2px;
            margin-left: 64px;
        }

        .comment {
            width: 100%;
            height: 220px;
            background: #F9F9F9;
            border-radius: 7px;
            padding-top: 20px;
            padding-left: 20px;
            margin-top: 20px;
        }

        .comm_title {
            width: 50px;
            line-height: 18px;
            height: 18px;
            color: #555;
            margin-bottom: 20px;
            border-left: 2px solid #3bcd86;
            padding-left: 12px;
        }

        .comment_content {
            width: calc(100% - 32px);
            height: 96px;
            background: #fff;
            border: none;
            padding: 8px 16px;
        }

        /* placeholder变色 */
        ::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            color: #999999;
            font-size: 12px;
        }

        :-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #999999;
            font-size: 12px;
        }

        ::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #999999;
            font-size: 12px;
        }

        :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #999999;
            font-size: 12px;
        }

        textarea:focus {
            border: none;
        }

        .release {
            width: 96px;
            height: 32px;
            line-height: 30px;
            border-radius: 5px;
            color: #3bcd86;
            border: 1px solid #3bcd86;
            background: #fff;
            float: right;
            margin-top: 16px;
            margin-right: 20px;
        }

        ._pag {
            position: relative;
            height: 70px;
        }

        .pagination {
            position: absolute;
            right: 0px;
        }

        .prev:focus,
        .next:focus {
            color: #555;
            border-color: #EEE;
        }

        .prev:hover,
        .next:hover {
            color: #555;
        }

        .current {
            cursor: pointer;
        }

        #wrap {
            width: 990px;
        }

        /* 推荐活动 */
        ._right {
            width: 180px;
            float: right;
            margin-top: -37px;
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
            height: 160px;
            border-bottom: 1px solid #ececec;
            margin-top: 14px;
        }

        ._right_img>div:last-child {
            border-bottom: none;
        }

        ._right_img>div>img {
            width: 100%;
            height: 116px;
            border-radius: 7px;
            float: left;
        }

        ._right_img>div>p {
            color: #555;
            font-size: 14px;
            /* margin-left: 6px; */
            float: left;
            width: 100%;
            height: 22px;
            margin-top: 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        ._right_img>div>p:nth-of-type(1):hover {
            color: #3bcd80;
            cursor: pointer;
        }

        ._right_img>div>p:nth-of-type(1):focus {
            color: #555;
        }

        ._right_img>div>p:nth-of-type(2) {
            margin-top: 25px;
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

        .info_content>h4 {
            font-size: 20px;
            color: #333;
        }

        .csyleDes {
            font-size: 16px;
            color: #555;
            margin: 2px 0px 16px 0px;
        }

        ._content>div>span>img {
            width: 25px;
        }


        .content_bom>div {
            display: inline-block;
        }

        /* 我想要 */
        .iwant {
            width: 142px;
            height: 46px;
            border: 1px solid #FD4F4F;
            border-radius: 7px;
            color: #FD4F4F;
            cursor: pointer;
            font-size: 20px;
            margin-top: 20px;
            padding-top: 8px;
            padding-left: 24px;
        }

        .iwant>img {
            margin-top: -4px;
            margin-right: 10px;
        }

        .exchange {
            width: 150px;
            height: 46px;
            background: #3bcd80;
            color: #fff;
            text-align: center;
            border-radius: 7px;
            padding-top: 8px;
            margin-left: 20px;
            cursor: pointer;
            font-size: 20px;
        }

        /* 提升框 */
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
        .iwantr{
            margin-top: 6px;
            color: #888;
        }
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="container scrollH">
        <div class="title_lx">
            <a><img src="images/home.png"><span>首页</span></a>
            <span>/</span>
            <a><span>积分兑换</span></a>
            <span>/</span>
            <a><span>商品详情</span></a>
        </div>
        <div class="info_detail">
            <div class="info_img"><img src=""></div>
            <div class="info_content">
                <h4></h4>
                <p class="csyleDes"></p>
                <div class="_content">
                    <div><img src="images/tree.png" /><span>30积分</span><span></span></div>
                </div>
                <div class="content_bom">
                    <div class="iwant"><img src="images/xinn.png">我想要</div>
                    <div class="exchange">立即兑换</div>
                    <p class="iwantr"><span>21054</span>人想要</p>
                </div>
            </div>
        </div>

        <!-- 面包屑导航 -->
        <div class='tabsholder'>
            <div data-tab="商品介绍">
                <!-- 活动介绍 -->
                <div class="mok1">
                    <!-- 简介 -->
                    <div>
                        <!-- 底图 -->
                        <div class="courseinfoPic">

                        </div>
                        <!-- 近期热点 -->
                        <div class="_right">
                            <div class="_right_title">推荐商品</div>
                            <hr>
                            <div class="_right_img">
                            </div>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>


        </div>

    </div>

    <!--  -->
    <div class="jf_background">

    </div>
    <div class="jf_model">
        <div class="model_title">
            <span></span>
            <span>立即兑换</span>
            <img class="closeJf" src="images/close.png" />
        </div>
        <div class="s_jf">
            <img src="" />
            <div></div>
        </div>
    </div>
    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>
<script src="js/pagination/jquery.pagination.js"></script>
<script src="js/shopInfo.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var userName = '<%=userName%>';
    });
</script>


</html>