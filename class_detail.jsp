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
    <title>课程详情</title>
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

        .info_detail {
            overflow: hidden;
            margin-left: 10px;
        }

        .info_img {
            width: 480px;
            margin-top: 20px;
            float: left;
        }

        .info_img>img {
            width: 100%;
            height: 280px;
        }

        .info_content {
            width: 684px;
            margin-left: 20px;
            float: left;
        }

        h4 {
            font-size: 28px;
            margin-top: 29px;
            color: #555;
            margin-bottom: 20px;
        }

        ._content {
            padding: 14px 15px;
            /* width: 672px;
            height: 198px; */
            background: url("images/class_bk.png") no-repeat;
            background-size: 100% 100%;
            font-size: 12px;
        }

        ._content>div {
            margin-bottom: 13px;
        }

        ._content>div:last-child {
            margin-bottom: 0px;
        }

        ._content>div>span:nth-of-type(1) {
            font-size: 16px;
            color: #888;
            display: inline-block;
            width: 90px;
        }

        ._content>div>span:nth-of-type(2) {
            font-size: 16px;
            color: #555;
        }

        ._content>div:nth-of-type(4)>span:nth-of-type(2)>span {
            margin-right: 6px;
        }

        .btns {
            float: left;
            width: 70px;
            height: 30px;
            background: #fff;
            color: #888;
            border-radius: 5px;
            cursor: not-allowed;
            border: 1px solid #ececec;
            font-size: 12px;
            margin-top: 16px;
            margin-left: 26px;
        }

        .content_bom>div {
            float: left;
            margin-top: 16px;
            font-size: 16px;
            color: #888;
        }

        /* .content_bom>div:nth-of-type(1) {
            margin-left: 100px;
        } */

        .content_bom>div>img {
            margin-top: -2px;
            margin-right: 6px;
        }

        .title_dzmk {
            margin-left: 60px;
        }

        .toobar {
            width: 950px;
            height: 50px;
            border: 1px solid #ececec;
            margin-top: 30px;
        }

        .courseinfoPic {
            width: 950px;
            min-height: 100px;
            box-shadow: 0 -8px 10px rgba(0, 0, 0, 0.15);
            padding: 50px;
            margin-top: 15px;
        }

        .courseinfoPic img {
            width: 100%;
            background-size: contain;
        }

        .targetResultPic {
            width: 950px;
            min-height: 100px;
            margin-top: 30px;
        }

        /* ul,
        ol {
            padding: 0px 40px;
        } */

        /*  吸顶效果  */
        #wrap[data-fixed="fixed"] {
            width: 952px;
            position: fixed;
            top: -1px;
            z-index: 50;
            background: #f8f8f8;
            margin-left: -1px;
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
            float: left;
        }

        .dzmk {
            text-align: center;
            padding-top: 30px;
            width: 950px;
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

        /* 学校配色 */
        .sc_ch {
            width: 54px;
            height: 240px;
            color: #F8C696;
            border: 1px solid #F8C696;
            border-radius: 7px;
            display: inline-block;
            text-align: center;
            margin-right: 6px;
            font-size: 14px;

        }

        .sc_sm {
            width: 54px;
            height: 24px;
            color: #FAA0A8;
            border: 1px solid #FAA0A8;
            border-radius: 7px;
            display: inline-block;
            text-align: center;
            margin-right: 6px;
            font-size: 14px;

        }

        .sc_pri {
            width: 54px;
            height: 24px;
            color: #F8C696;
            border: 1px solid #F8C696;
            border-radius: 7px;
            display: inline-block;
            text-align: center;
            margin-right: 6px;
            font-size: 14px;
        }

        .sc_mid {
            width: 54px;
            height: 24px;
            color: #FAA0A8;
            border: 1px solid #FAA0A8;
            border-radius: 7px;
            display: inline-block;
            text-align: center;
            margin-right: 6px;
            font-size: 14px;

        }

        /* 课程介绍 */
        .courseinfoPic>img {
            width: 100%;
            height: auto;
            /* margin-bottom: 20px; */
        }

        /* 课程大纲 */
        .coursedg {
            width: 950px;
            min-height: 100px;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            padding: 20px 50px;
            position: relative;
            margin-top: -15px;
        }

        .coursedg>div {
            width: 100%;
            height: 70px;
            background: #FBFBFB;
            margin: 10px 0px;
            border: 1px solid transparent;
        }

        .coursedg>div>div {
            border-radius: 50px;
            background: #E1E1E1;
            width: 30px;
            height: 30px;
            position: absolute;
            margin: 20px;
            padding: 5px 11px;
            color: #5a5a5a;
        }

        .coursedg>div>p:nth-of-type(1) {
            left: 116px;
            color: rgb(102, 102, 102);
            font-size: 14px;
            margin-top: 12px;
            position: absolute;
        }

        .coursedg>div>p:nth-of-type(2) {
            left: 116px;
            width: 60%;
            height: 20px;
            color: rgb(153, 153, 153);
            overflow: hidden;
            font-size: 12px;
            margin-top: 36px;
            position: absolute;
        }

        #wrap {
            width: 950px;
        }

        /* 推荐课程 */
        .course_tj {
            height: 500px;
            float: right;
            margin-top: 30px;
        }


        /* 推荐课程 */
        ._right {
            width: 222px;
            float: right;
            margin-top: 16px;
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
            height: 210px;
            border-bottom: 1px solid #ececec;
            margin-top: 14px;
        }

        ._right_img>div:last-child {
            border-bottom: none;
        }

        ._right_img>div>img {
            width: 100%;
            height: 150px;
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
        }

        ._right_img>div>p:nth-of-type(1):hover {
            /* color: #3bcd80; */
            cursor: pointer;
        }

        ._right_img>div>p:nth-of-type(1):focus {
            color: #555;
        }

        ._right_img>div>p:nth-of-type(2) {
            margin-top: -9px;
            height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #3bcd80;
            cursor: pointer;
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
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="container">
        <div class="title_lx">
            <a><img src="images/home.png"><span>首页</span></a>
            <span>/</span>
            <a><span>课程</span></a>
        </div>
        <div class="info_detail">
            <div class="info_img"><img src=""></div>
            <div class="info_content">
                <h4></h4>
                <div class="_content">
                    <div><span>编号：</span><span></span></div>
                    <div><span>授课区域：</span><span></span></div>
                    <div><span>学段：</span><span></span></div>
                    <div><span>课时</span><span></span></div>
                </div>
                <div class="content_bom">
                    <!-- <button disabled="" class="btns" type="button">已结束</button> -->
                    <div><img src="images/act-s.png"><span>浏览量：</span><span></span></div>
                    <div class="title_dzmk"><img src="images/act-z.png"><span>点赞：</span><span></span></div>
                </div>
            </div>
        </div>

        <!-- 面包屑导航 -->
        <div class='tabsholder'>
            <div data-tab="课程介绍">
                <!-- 活动介绍 -->
                <div class="mok1">
                    <!-- 简介 -->
                    <div>
                        <!-- 底图 -->
                        <div class="courseinfoPic">

                        </div>
                    </div>
                </div>
                <!-- 课程大纲-->
                <div class="mok2">
                    <!-- 简介 -->
                    <div>
                        <!-- 底图 -->
                        <div class="coursedg"></div>
                    </div>
                </div>
                <!-- 点赞 -->
                <div class="dzmk">
                    <img src="images/dz_g.png" style="width: 140px;height: 36px;">
                    <div></div>
                </div>

                <!-- 活动评论 -->
                <div class="mok3">
                    <!-- 简介 -->
                    <div>
                        <!-- 底图 -->
                        <div class="targetResultPic">
                            <div class="title_bt">课程评论</div>
                            <hr />
                            <!-- 评论 -->
                            <div class="comment">
                                <div class="comm_title">评论</div>
                                <textarea class="comment_content" rows="3" cols="25" type="text"
                                    placeholder="请写下你的评论..."></textarea>
                                <button class="release">发布</button>
                            </div>
                            <!-- 发布 -->
                            <div id="Searchresult"></div>
                            <div id="hiddenresult" style="display:none;"></div>
                            <div class="_pag">
                                <div id="Pagination" class="pagination"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-tab="课程大纲"> </div>
            <div data-tab="课程评论"></div>

        </div>

        <!-- 推荐课程 -->
        <div class="course_tj">
            <div class="_right">
                <div class="_right_title">推荐课程</div>
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
<script src="js/pagination/jquery.pagination.js"></script>
<script src="js/class_detail.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var msg = '<%=userName%>';
        $(".release").attr("value", msg);
    });
</script>

</html>