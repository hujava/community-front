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
	}
}

%>
<!DOCTYPE html>
<html>

<head>
    <title>页眉</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- <link rel="stylesheet" href="css/bootstrap/bootstrap.css"> -->

    <style type="text/css">
        *,
        html {
            margin: 0;
            padding: 0;
        }

        body {
            scroll: no;
            overflow-x: hidden;
        }

        .HolyGrail {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }

        /*tab切换*/
        .btni {
            height: 40px;
            z-index: 10;
            /*margin-top: 11px;*/
        }

        .navi {
            min-width: 880px;
            height: 112px;
            position: absolute;
            margin: 0;
            z-index: 10;
            /* margin-left: 340px; */
            top: 18px;
            right: -14px;
            padding-top: 60px;
            background: url('images/header_bg.png') no-repeat;
            background-position-x: 280px;
            cursor: pointer;
        }

        ul,
        ol {
            padding: 0px;
        }

        .navi>li {
            text-align: center;
            list-style: none;
            float: left;
            /* padding: 0 4px; */
            line-height: 40px;
            position: relative;
        }

        .navi>li>ul {
            list-style: none;
            padding: 0px;
            background: white;
            margin: 0;
            padding: 0;
            width: 140px;
            position: absolute;
            margin-left: -14px;
        }

        .navi>li>a {
            text-decoration: none;
            color: #555;
            width: 100%;
            height: 50px;
            display: inline-block;
            line-height: 30px;
            padding: 0px 18px;
            font-size: 16px;
        }

        /*搜索框样式*/
        div.search {
            width: 240px;
            position: absolute;
            left: 550px;
            top: 27px;
        }

        form {
            position: relative;
            width: 330px;
            margin: 0 auto;
        }

        .findInfo,
        button {
            border: none;
            outline: none;
        }

        .findInfo {
            width: 100%;
            height: 36px;
            padding-left: 13px;
        }

        /* button {
            height: 36px;
            width: 42px;
            cursor: pointer;
            position: absolute;
        } */

        /*搜索框1*/
        .bar1 .findInfo {
            border: 1px solid #FF9812;
            border-radius: 2px;
            /*background: #F9F0DA;*/
            color: #9E9C9C;
            font-size: 14px;
        }

        .bar1 button {
            top: 0;
            right: -15px;
            background: #FF9812;
            border-radius: 0 2px 2px 0;
        }

        .bar1 button:before {
            content: "\f002";
            font-family: FontAwesome;
            font-size: 16px;
            color: #F9F0DA;
        }

        /*导航栏鼠标悬浮改变颜色*/
        .lihover li {
            color: black;
            font-size: 14px;

        }

        .lihover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)
        }

        .lihover li:hover {
            color: #3bcd80;
        }

        /* 去除点击样式 */
        .input,
        button,
        a {
            outline: 0 none !important;
            blr: expression(this.onFocus=this.blur());
        }

        #fontcolor {
            /* color: #ff9912; */
            border-bottom: 4px solid #3bcd80;
            display: inline-block;
            padding-bottom: 15px;
            cursor: pointer;
        }

        .fontcolor1 {
            /* color: #ff9912; */
            border-bottom: 4px solid #3bcd80;
            display: inline-block;
            padding-bottom: 15px;
        }

        .fontcolor2 {
            color: white;
            border-bottom: none
        }

        /* placeholder变色 */
        ::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            color: #999;
            font-size: 15px;
        }

        :-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #999;
            font-size: 15px;
        }

        ::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #999;
            font-size: 15px;
        }

        :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #999;
            font-size: 15px;
        }

        input {
            outline: none;
            border: 1px solid #ddd;
        }

        input:focus {
            border: 1px solid #ddd;
        }

        #from {
            width: 0px;
            margin: 0px;
            position: static;
        }

        .class,
        .navi>li {
            cursor: pointer;
        }

        .lihover {
            text-align: center;
            margin-left: 14px;
            /* box-shadow: 0 0 4px 0 gray; */
            cursor: pointer;
            border-radius: 7px;
            display: none;
        }

        a:focus,
        li:focus {
            color: #fff;
        }

        ul li a {
            color: #888;
            display: inline-block;
            /* width: 90px; */
            /* border-bottom: 1px solid #ececec; */
        }

        .lihover a {
            width: 90px;
            border-bottom: 1px solid #e6e6e6;
        }

        a:hover,
        a:focus {
            color: #3bcd80;
            text-decoration: none;
        }

        input:focus {
            outline: none;
        }

        /* logo */
        .logo {
            height: 128px;
            float: left;
        }

        .logo>img {
            margin-top: 25px;
        }

        .dh_draw {
            width: 100%;
            height: 4px;
            background: url('images/dh.png') no-repeat;
        }

        /* 搜索 */
        .input_ss {
            margin-top: 20px;
            margin-left: 626px;
            position: absolute;
            z-index: 15;
            overflow: hidden;
        }

        .input_ss>input {
            width: 600px;
            height: 36px;
        }

        .input_ss>span {
            font-size: 14px;
            color: #3bcd80;
        }

        .input_ss>span:nth-of-type(1) {
            margin-left: 42px;
            float: left;
            margin-top: 6px;
        }

        .input_ss>span:nth-of-type(2) {
            margin-left: 12px;
            float: left;
            margin-top: 6px;
        }

        .form-group {
            width: 376px;
            float: left;
        }

        .btn-primary {
            background: #3bcd80;
            color: #fff;
            border-color: #3bcd80;
        }

        .btn-primary:hover,
        .btn-primary.focus {
            background: #3bcd80;
            color: #fff;
            border-color: #3bcd80;
        }

        .form-control:focus {
            border: 1px solid #eee;
            box-shadow: none;
            border-left: 1px solid #fff;
        }

        .btn-primary:focus,
        .btn-primary.focus {
            background: #3bcd80;
            color: #fff;
            border-color: #3bcd80;
        }

        .btn:focus,
        .btn.focus {
            background: #3bcd80;
            color: #fff;
            border-color: #3bcd80;
        }

        .sou_course {
            float: left;
            border: 1px solid #eee;
            padding: 6px 14px;
            height: 35px;
            font-size: 14px;
            color: #888;
            border-right: none;
            cursor: pointer;
            border-right: none;

        }

        .sou_und {
            border-left: 1px solid #eee;
            width: 1px;
            height: 22px;
            cursor: default;
            position: absolute;
            left: 70px;
            top: 6px;
        }

        .sou_course>span {
            font-size: 14px;
        }

        .sou_course>img {
            margin-left: 3px;
        }

        .form-control {
            border-bottom-left-radius: 0px;
            border-top-left-radius: 0px;
            height: 35px;
            box-shadow: none;
            border: 1px solid #eee;
            border-left: 1px solid #fff;
        }

        .sou_mk {
            background: #fff;
            width: 73px;
            margin-top: 34px;
            display: none;
            box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.075);
        }

        .sou_mk>li {
            text-align: center;
            font-size: 14px;
            color: #888;
            line-height: 20px;
            cursor: pointer;
        }

        .sou_mk>li:hover {
            color: #3bcd80;
        }

        .sou_mk>li:nth-of-type(2) {
            line-height: 35px;
            height: 45px;
        }

        /* .sou_mk>li:hover{background: #ecf6fd;} */
        .registe,
        .login,
        .log_end {
            cursor: pointer;
        }

        .log_end {
            margin-left: 80px;
            width: 30px;
            height: 30px;
            display: none;
            margin-top: 2px;
        }

        .log_return {
            width: 170px;
            height: 180px;
            display: none;
            cursor: pointer;
            border-radius: 7px;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
            background: #fff;
            color: #888;
            margin-top: 10px;
            padding: 0px 20px;
            /* position: absolute; */
            z-index: 20;
            margin-left: -60px;
        }

        .log_return>div {
            padding-left: 15px;
            font-size: 16px;
            height: 44px;
            border-bottom: 1px solid #eee;
            padding-top: 10px;
        }

        .log_return>div:hover {
            color: #3bcd80;
        }

        .log_return>div:nth-of-type(4) {
            border: none;
        }

        .btn {
            padding: 5px 12px;
            border-radius: 0px;
        }

        .con_pos {
            position: relative;
        }

        .navi>li:nth-of-type(8)>a {
            padding: 0px 0px 0px 24px;
        }

        .navi>li>a>span {
            font-size: 17px;
        }

        .return_m {
            position: absolute;
            margin-top: 90px;
            right: 0px;
            font-size: 16px;
            z-index: 11;
            cursor: pointer;
        }

        .return_m>span {
            display: none;
        }

        .return_m>span:hover {
            color: #3bcd80;
        }

        .log_hover {
            position: absolute;
            margin-left: 90%;
            margin-top: 22px;
            z-index: 20;
        }
    </style>

<body>
    <!--导航开始-->
    <div class="container con_pos">
        <!-- LOGO -->
        <div class="logo">
            <img src="images/logo.png">
        </div>
        <div class="input_ss">
            <div class="sou_course"><span>课程</span><img src="images/xl.jpg">
                <div class="sou_und"></div>
            </div>
            <div class="input-group form-group">
                <input type="text" class="form-control" placeholder="请输入搜索内容" />
                <span class="input-group-btn">
                    <button class="btn btn-primary"><img src="images/js.png"></button>
                </span>
            </div>
            <span class="registe">注册</span>
            <span class="login">登录</span>


            <ul class="sou_mk">
                <li value="1">课程</li>
                <li value="2">活动</li>
            </ul>
        </div>
        <div class="log_hover">
            <img class="log_end" src="images/userp.png">
            <div class="log_return">
                <div></div>
                <div>我的信息</div>
                <div>我的活动</div>
                <div>退出登录</div>
            </div>
        </div>
        <!-- 导航菜单 -->
        <div class="return_m"><span>返回首页>></span></div>
        <div class="btni">
            <ul class="navi">
                <li><a href="" onclick="syClick('main')" class="main" id="content"><span>首页</span></a></li>
                <li>
                    <a href="" onclick="syClick('g_school')" class="g_school"><span>热点资讯</span></a>
                    <ul class="lihover">
                        <div class=\"bgh\"></div>
                        <li onclick="syClick('g_school1')"><a class="g_school1">新闻</a></li>
                        <li onclick="syClick('g_school2')"><a class="g_school2">通知</a></li>
                        <li onclick="syClick('g_school3')"><a class="g_school3">公告</a></li>
                    </ul>
                </li>
                <li>
                    <a href="" onclick="syClick('classified_classroom')"
                        class="classified_classroom"><span>社区学院</span></a>
                    <ul class="lihover">
                        <div class=\"bgh\"></div>
                        <li onclick="syClick('classified_classroom')"><a class="classified_classroom">儿童培训</a></li>
                        <li onclick="syClick('classified_classroom2')"><a class="classified_classroom2">老年大学</a></li>
                        <li onclick="syClick('classified_classroom3')"><a class="classified_classroom3">小视频</a></li>
                        <li onclick="syClick('classified_classroom4')"><a class="classified_classroom4">小知识</a></li>
                    </ul>
                </li>
                <li>
                    <a href="" onclick="syClick('e_password')" class="e_password"><span>公益活动</span></a>
                    <ul class="lihover">
                        <div class=\"bgh\"></div>
                        <li onclick="syClick('e_password')"><a class="e_password">社区活动</a></li>
                        <li onclick="syClick('e_password2')"><a class="e_password2">党建活动</a></li>
                    </ul>

                </li>
                <li><a href="" onclick="syClick('forest_house')" class="forest_house"><span>积分兑换</span></a></li>
                <li onclick="syClick('zm_zyz')"><a class="zm_zyz"><span>招募志愿者</a></li>
                <li onclick="syClick('tjfx')"><a class="tjfx"><span>数据统计</a></li>
                <li><a href="" onclick="syClick('sc_wl')" class="sc_wl"><span>荣誉之星</span></a></li>
                <!-- <li><a href="" onclick="syClick('forest_house')" class="forest_house"><span>福利商社</span></a></li> -->

                <li onclick="syClick('about_us')"><a class="about_us"><span>关于我们</a>
                </li>
            </ul>
        </div>
    </div>
    <!-- 分组线 -->
    <div class="dh_draw"></div>

</body>
<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/header.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        ///logout.do  退出
        var msg = '<%=userName%>';
        $(".log_return>div:nth-of-type(1)").html(msg)
        if (msg != "") {
            $(".registe,.login").hide();
            $(".log_end").show();

        }

    });
</script>

</html>