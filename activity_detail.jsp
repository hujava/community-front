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
    <title>活动详情</title>
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
        }

        .info_content {
            width: 604px;
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
            height: 220px;
            background: rgba(59, 205, 134, 0.05) !important;
            font-size: 12px;
        }

        ._content>div {
            /* margin-bottom: 9px; */
            margin-bottom: 13px;
        }

        ._content>div>span:nth-of-type(1) {
            font-size: 12px;
            color: #666;
            display: inline-block;
            width: 90px;
        }

        ._content>div>span:nth-of-type(2) {
            font-size: 12px;
            color: #333;
        }

        .btns {
            float: left;
            width: 150px;
            height: 46px;
            background: #fff;
            color: #888;
            border-radius: 5px;
            cursor: not-allowed;
            border: 1px solid #ececec;
            font-size: 20px;
            margin-top: 16px;
            margin-left: 26px;
        }

        .content_bom>div {
            float: left;
            margin-top: 22px;
            margin-left: 60px;
            font-size: 12px;
            color: #555;
        }

        .content_bom>div:nth-of-type(1) {
            margin-left: 100px;
        }

        .content_bom>div>img {
            margin-top: -2px;
            margin-right: 6px;
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
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="container">
        <div class="title_lx">
            <a><img src="images/home.png"><span>首页</span></a>
            <span>/</span>
            <a><span></span></a>
        </div>
        <div class="info_detail">
            <div class="info_img"><img src=""></div>
            <div class="info_content">
                <h4></h4>
                <div class="_content">
                    <div><span>编号：</span><span></span></div>
                    <!-- <div><span>参与人员：</span><span></span></div> -->
                    <div><span>活动负责人：</span><span></span></div>
                    <div><span>负责人电话：</span><span></span></div>
                    <div><span>负责人邮箱：</span><span></span></div>
                    <div><span>报名时间：</span><span></span></div>
                    <div><span>活动时间：</span><span></span></div>
                    <div><span>活动地点：</span><span></span></div>
                </div>
                <div class="content_bom">
                    <button class="btns enroll" type="button">已结束</button>
                    <div><img src="images/act-s.png"><span>浏览量：</span><span></span></div>
                    <div class="title_dzmk"><img src="images/act-z.png"><span>点赞：</span><span></span></div>
                </div>
            </div>
        </div>

        <!-- 面包屑导航 -->
        <div class='tabsholder'>
            <div data-tab="活动介绍">
                <!-- 活动介绍 -->
                <div class="mok1">
                    <!-- 简介 -->
                    <div>
                        <!-- 底图 -->
                        <div class="courseinfoPic">

                        </div>
                        <!-- 近期热点 -->
                        <div class="_right">
                            <div class="_right_title">热门活动</div>
                            <hr>
                            <div class="_right_img">
                            </div>
                        </div>
                        <div style="clear: both;"></div>
                    </div>

                </div>
                <!-- 点赞 -->
                <div class="dzmk">
                    <img src="images/dz_g.png" style="width: 140px;height: 36px;">
                    <div></div>
                </div>
                <!-- 活动评论 -->
                <div class="mok2">
                    <!-- 简介 -->
                    <div>
                        <!-- 底图 -->
                        <div class="targetResultPic">
                            <div class="title_bt">活动评论</div>
                            <hr />
                            <!-- 评论 -->
                            <div class="comment">
                                <div class="comm_title">评论</div>
                                <textarea class="comment_content" rows="3" cols="25" type="text"
                                    placeholder="请写下你的评论..."></textarea>
                                <button class="release">发布</button>
                            </div>
                            <div id="Searchresult"></div>
                            <div id="hiddenresult" style="display:none;"></div>
                            <div class="_pag">
                                <div id="Pagination" class="pagination"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-tab="活动评论">
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
<script src="js/activity_detail.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var userName = '<%=userName%>';
        $(".enroll").attr("value", userName);
    });
</script>


</html>