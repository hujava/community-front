<%@page import="org.springframework.security.core.GrantedAuthority"%>
<%@page import="org.community.model.UserEntity"%>
<%@page import="org.springframework.security.core.context.SecurityContextImpl"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Object obj=request.getSession()
				.getAttribute("SPRING_SECURITY_CONTEXT");
int id=0;
if(obj!=null){
	SecurityContextImpl securityContextImpl = (SecurityContextImpl) request.getSession()
				.getAttribute("SPRING_SECURITY_CONTEXT");
	if (securityContextImpl != null && securityContextImpl.getAuthentication() != null
		&& securityContextImpl.getAuthentication().getPrincipal() != null) {
		UserEntity userDetails = (UserEntity) securityContextImpl.getAuthentication().getPrincipal();
        id = userDetails.getId();
	}
}

%>
<!DOCTYPE html>
<html>

<head>
    <title>数据统计</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="css/swiper/swiper.css">


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

        .tit_name {
            color: #555;
            font-size: 24px;
            margin-top: 32px;
        }

        .map {
            width: 590px;
            height: 400px;
            background: url("images/map.jpg") no-repeat;
            background-size: 100%;
            margin-top: 12px;
            position: relative;
        }

        .lchy {
            margin-top: 26px;
            margin-left: 71px;
            width: 74px;
            height: 76px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
        }

        .ebz {
            width: 60px;
            height: 66px;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 120px;
            margin-left: 70px;
        }

        .lxbq {
            width: 30px;
            height: 62px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 100px;
            margin-left: 130px;
        }

        .lyxel {
            width: 20px;
            height: 46px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 218px;
            margin-left: 135px;
        }

        .rzjy {
            width: 33px;
            height: 30px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-19deg);
            -ms-transform: rotate(-19deg);
            -moz-transform: rotate(-19deg);
            -webkit-transform: rotate(-19deg);
            -o-transform: rotate(-19deg);
            margin-top: 208px;
            margin-left: 153px;
        }

        .jyhf {
            width: 18px;
            height: 27px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 238px;
            margin-left: 167px;
        }

        .rzjy1 {
            width: 14px;
            height: 25px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 233px;
            margin-left: 185px;
        }

        .rzjy2 {
            width: 15px;
            height: 13px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 248px;
            margin-left: 218px;
        }

        .rzjy3 {
            width: 37px;
            height: 23px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-33deg);
            -ms-transform: rotate(-33deg);
            -moz-transform: rotate(-33deg);
            -webkit-transform: rotate(-33deg);
            -o-transform: rotate(-33deg);
            margin-top: 278px;
            margin-left: 213px;
        }

        .jygj {
            width: 46px;
            height: 42px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-33deg);
            -ms-transform: rotate(-33deg);
            -moz-transform: rotate(-33deg);
            -webkit-transform: rotate(-33deg);
            -o-transform: rotate(-33deg);
            margin-top: 200px;
            margin-left: 200px;
        }

        .hlgxc {
            width: 61px;
            height: 23px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 266px;
            margin-left: 161px;
        }

        .ltjy {
            width: 44px;
            height: 30px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 240px;
            margin-left: 220px;
        }

        .lxy {
            width: 29px;
            height: 91px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            margin-top: 261px;
            margin-left: 267px;
        }

        .xlc1 {
            width: 27px;
            height: 34px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-22deg);
            -ms-transform: rotate(-22deg);
            -moz-transform: rotate(-22deg);
            -webkit-transform: rotate(-22deg);
            -o-transform: rotate(-22deg);
            margin-top: 203px;
            margin-left: 261px;
        }

        .xlc2 {
            width: 76px;
            height: 25px;
            cursor: pointer;
            position: absolute;
            margin-top: 203px;
            margin-left: 261px;
        }

        .xlc3 {
            width: 36px;
            height: 25px;
            cursor: pointer;
            position: absolute;
            margin-top: 230px;
            margin-left: 331px;
        }

        .wrjy {
            width: 10px;
            height: 26px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-19deg);
            -ms-transform: rotate(-19deg);
            -moz-transform: rotate(-19deg);
            -webkit-transform: rotate(-19deg);
            -o-transform: rotate(-19deg);
            margin-top: 234px;
            margin-left: 292px;
        }

        .wlsq {
            width: 11px;
            height: 16px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
            -moz-transform: rotate(-10deg);
            -webkit-transform: rotate(-10deg);
            -o-transform: rotate(-10deg);
            margin-top: 233px;
            margin-left: 303px;
        }

        .jby {
            width: 30px;
            height: 28px;
            cursor: pointer;
            position: absolute;
            transform: rotate(-31deg);
            -ms-transform: rotate(-31deg);
            -moz-transform: rotate(-31deg);
            -webkit-transform: rotate(-31deg);
            -o-transform: rotate(-31deg);
            margin-top: 277px;
            margin-left: 304px;
        }

        .ndxc1 {
            width: 26px;
            height: 16px;
            cursor: pointer;
            position: absolute;
            margin-top: 258px;
            margin-left: 348px;
        }

        .ndxc2 {
            width: 21px;
            height: 18px;
            cursor: pointer;
            position: absolute;
            margin-top: 273px;
            margin-left: 340px;
        }

        .jssq1 {
            width: 38px;
            height: 19px;
            cursor: pointer;
            position: absolute;
            margin-top: 230px;
            margin-left: 370px;
        }

        .jssq2 {
            width: 31px;
            height: 25px;
            cursor: pointer;
            position: absolute;
            margin-top: 247px;
            margin-left: 377px;
        }

        .lby1 {
            width: 16px;
            height: 22px;
            cursor: pointer;
            position: absolute;
            margin-top: 230px;
            margin-left: 422px;
        }

        .lby2 {
            width: 74px;
            height: 27px;
            cursor: pointer;
            position: absolute;
            margin-top: 200px;
            margin-left: 363px;
        }

        .dcjy {
            width: 30px;
            height: 14px;
            cursor: pointer;
            position: absolute;
            margin-top: 254px;
            margin-left: 412px;
        }

        .lxsq1 {
            width: 17px;
            height: 18px;
            cursor: pointer;
            position: absolute;
            margin-top: 275px;
            margin-left: 364px;
        }

        .lxsq2 {
            width: 21px;
            height: 33px;
            cursor: pointer;
            position: absolute;
            margin-top: 281px;
            margin-left: 380px;
        }

        .xkysq1 {
            width: 14px;
            height: 33px;
            cursor: pointer;
            position: absolute;
            margin-top: 269px;
            margin-left: 465px;
        }

        .xkysq2 {
            width: 38px;
            height: 26px;
            transform: rotate(-29deg);
            -ms-transform: rotate(-29deg);
            -moz-transform: rotate(-29deg);
            -webkit-transform: rotate(-29deg);
            -o-transform: rotate(-29deg);
            cursor: pointer;
            position: absolute;
            margin-top: 240px;
            margin-left: 454px;
        }

        .rqsq1 {
            width: 14px;
            height: 42px;
            cursor: pointer;
            position: absolute;
            margin-top: 205px;
            margin-left: 526px;
        }

        .rqsq2 {
            width: 22px;
            height: 33px;
            cursor: pointer;
            position: absolute;
            margin-top: 204px;
            margin-left: 502px;
        }

        .ovfl {
            overflow: hidden;
        }

        .left {
            width: 600px;
            float: left;
        }

        .right {
            float: right;
            width: 530px;
            position: relative;
        }

        .konwperson {
            font-size: 18px;
            font-weight: bold;
            color: #222;
            margin-top: 35px;
        }

        .konwperson_chart,
        .acvitity_chart {
            width: 530px;
            height: 245px;
            border: 1px solid #eee;
            margin-top: 20px;
        }

        .con_foot {
            width: 100%;
            float: left;
        }

        .know_list {
            width: 170px;
            height: 220px;
            border-radius: 7px;
            border: 1px solid #eee;
            display: inline-block;
            margin-top: 26px;
            margin-right: 4px;
            position: relative;
        }

        .con_foot>div:nth-of-type(1) {
            margin-left: 20px;
        }

        .know_list>img:nth-of-type(1) {
            height: 150px;
            width: 100%;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
        }

        .know_list>img:nth-of-type(2) {
            position: absolute;
            top: -16px;
            left: -14px;
        }

        .know_list>p {
            margin: 10px;
        }

        .know_list>p:nth-of-type(2) {
            margin-top: -5px;
        }

        .know_list>p:nth-of-type(2)>span {
            margin-left: 6px;
        }

        /*  */
        .know_lists {
            width: 165px;
            height: 220px;
            border-radius: 7px;
            border: 1px solid #eee;
            float: left;
            margin-top: 26px;
            margin-right: 20px;
            position: relative;
            cursor: pointer;
        }

        .know_lists>img:nth-of-type(1) {
            height: 150px;
            width: 100%;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
        }

        .know_lists>img:nth-of-type(2) {
            position: absolute;
            top: -16px;
            left: -14px;
        }

        .know_lists>p {
            margin: 10px;
            height: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .know_lists>p:nth-of-type(2) {
            margin-top: -5px;
        }

        .know_lists>p:nth-of-type(2)>span {
            margin-left: 6px;
        }

        .ryzx,
        .con_dy {
            width: 48%;
            float: left;
        }

        .con_dy {
            padding-left: 73px;
            width: 50.3%;
        }

        .highcharts-credits {
            display: none;
        }

        .acvitity_chart {
            /* padding-top: 70px; */
        }

        .log_tl {
            width: 590px;
            /* height: 200px; */
            overflow: hidden;
        }

        .log_tl>div {
            width: 136px;
            height: 40px;
            float: left;
            font-size: 16px;
            margin-right: 11px;
            padding-top: 10px;
            overflow: hidden;
            /*溢出隐藏*/
            white-space: nowrap;
            /*规定文本不进行换行*/
            text-overflow: ellipsis;
            /*当对象内文本溢出时显示省略标记（...）*/
        }

        .log_tl>div>div {
            width: 15px;
            height: 15px;
            border-radius: 4px;
            background: yellow;
            font-size: 16px;
            display: inline-block;
            margin-right: 10px;
        }

        .acvitity_chart>div {
            margin-top: 40px;
        }

        .cfrs {
            position: absolute;
            z-index: 100;
            margin: 30px 20px;
        }

        .cfrs_activity {
            position: absolute;
            z-index: 100;
            margin: 30px 20px;
        }

        .cfrs_activity>span>span {
            color: #3bcd80;
            display: inline-block;
            width: 70px;
        }

        .cfrs_tl {
            position: absolute;
            z-index: 100;
            margin-top: -30px;
            left: 62%;
        }

        .cfrs_tl>div {
            display: inline-block;
        }

        .cfrs_tl>div:nth-of-type(1) {
            width: 15px;
            height: 15px;
            border-radius: 4px;
            background: #2ACDC4;
            margin-right: 10px;
        }

        .cfrs_tl>div:nth-of-type(3) {
            width: 15px;
            height: 15px;
            border-radius: 4px;
            background: #C7C7C7;
            margin-left: 30px;
            margin-right: 10px;
        }

        .month_count {
            width: 90px;
            height: 24px;
            color: #555;
            text-align: center;
            border: 1px solid #ddd;
            margin-left: 28px;
            display: inline-block;
            cursor: pointer;
        }

        .month_count_list {
            width: 90px;
            height: 205px;
            color: #555;
            text-align: center;
            border: 1px solid #ddd;
            display: inline-block;
            cursor: pointer;
            background: #fff;
            overflow-y: scroll;
            border-top: none;
            margin-left: 81.3%;
            display: none;
        }

        .month_count_list>span {
            display: inline-block;
            width: 100%;
            text-align: left;
            line-height: 30px;
            padding-left: 7px;
        }

        /* 设置滚动条的样式 */
        ::-webkit-scrollbar {
            width: 6px;
        }

        /*滚动槽*/
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(205, 205, 205, 0.3);
            border-radius: 10px;
        }

        /* 滚动条滑块 */
        ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.1);
            -webkit-box-shadow: inset 0 0 6px rgba(205, 205, 205, 0.5);
        }

        ::-webkit-scrollbar-thumb:window-inactive {
            background: rgba(205, 205, 205, 0.4);
        }

        .jf_model {
            width: 430px;
            height: 420px;
            position: fixed;
            left: 0rem;
            right: 0rem;
            margin: 0 auto;
            z-index: 1001;
            background: #fff;
            border-radius: 10px;
            top: 28%;
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
            text-align: center;
        }

        .s_jf>img {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            margin-bottom: 30px;
        }

        .s_jf>p {
            color: #555;
            font-size: 20px;
        }

        .s_jf>p:nth-of-type(3) {
            color: #3bcd80;
        }

        .s_jf>p:nth-of-type(3)>img {
            margin-right: 6px;
        }

        /*  */
        .sq_gd {
            width: 200px;
            position: absolute;
            margin: 0 auto;
            z-index: 1002;
            border-radius: 10px;
            top: 14%;
            left: 16%;
            background: #fff;
            background-size: 100% 100%;
            pointer-events: none;
            display: none;
            width: 400px;
            height: 300px;
            padding: 20px;
        }
        .sq_gd>img{
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        .sq_bg {
            width: 100%;
            height: 100%;
            position: absolute;
            margin: 0 auto;
            z-index: 1001;
            background: black;
            border-radius: 10px;
            opacity: 0.2;
            top: 0px;
            left: 0px;
            pointer-events: none;
            display: none;
        }
        .month_count>img{
            margin-left: 36px;
        }
        .month_count_list>span:hover{
            color: #3bcd80;
        }
    </style>
</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <!-- 轮播图 -->
    <div class="lbt">
        <div class="swiper-container">
            <div class="swiper-wrapper"></div>
            <div class="swiper-pagination "></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>

    <div class="container ovfl">
        <!-- title -->
        <div class="left">
            <div class="tit_name">社区活动统计</div>
            <div class="map">
                <!-- 单个社区弹框 -->
                <div class="sq_gd"><img src="images/map/46463.png"></div>
                <div class="sq_bg"></div>
                <div class="lchy move_list" value="46479"></div>
                <div class="ebz move_list" value="46470"></div>
                <div class="lxbq move_list" value="46478"></div>
                <div class="lyxel move_list" value="46474"></div>
                <div class="rzjy move_list" value="46483"></div>
                <div class="jyhf move_list" value="46473"></div>
                <div class="rzjy1 move_list" value="46482"></div>
                <div class="jygj move_list" value="46467"></div>
                <div class="hlgxc move_list" value="46472"></div>
                <div class="ltjy move_list" value="46481"></div>
                <div class="rzjy2 move_list" value="46482"></div>
                <div class="rzjy3 move_list" value="46482"></div>
                <div class="lxy move_list" value="46463"></div>
                <div class="xlc1 move_list" value="46476"></div>
                <div class="xlc2 move_list" value="46476"></div>
                <div class="xlc3 move_list" value="46476"></div>
                <div class="wrjy move_list" value="46466"></div>
                <div class="wlsq move_list" value="46469"></div>
                <div class="jby move_list" value="46477"></div>
                <div class="ndxc1 move_list" value="46484"></div>
                <div class="ndxc2 move_list" value="46484"></div>
                <div class="jssq1 move_list" value="46464"></div>
                <div class="jssq2 move_list" value="46464"></div>
                <div class="lby1 move_list" value="46475"></div>
                <div class="lby2 move_list" value="46475"></div>
                <div class="dcjy move_list" value="46468"></div>
                <div class="lxsq1 move_list" value="46471"></div>
                <div class="lxsq2 move_list" value="46471"></div>
                <div class="xkysq1 move_list" value="46465"></div>
                <div class="xkysq2 move_list" value="46465"></div>
                <div class="rqsq1 move_list" value="46480"></div>
                <div class="rqsq2 move_list" value="46480"></div>
            </div>
            <div class="log_tl">
                <div class="46479">
                    <div class="list1"></div><span>龙城花园</span>
                </div>
                <div class="46470">
                    <div class="list2"></div><span>二拨子新村</span>
                </div>
                <div class="46478">
                    <div class="list3"></div><span>龙兴园北</span>
                </div>
                <div class="46483">
                    <div class="list4"></div><span>融泽嘉园一区</span>
                </div>
                <div class="46482">
                    <div class="list5"></div><span>融泽嘉园二区</span>
                </div>
                <div class="46474">
                    <div class="list6"></div><span>融泽嘉园三区</span>
                </div>
                <div class="46467">
                    <div class="list7"></div><span>金域国际</span>
                </div>
                <div class="46473">
                    <div class="list8"></div><span>金域华府</span>
                </div>
                <div class="46472">
                    <div class="list9"></div><span>回龙观新村</span>
                </div>
                <div class="46481">
                    <div class="list10"></div><span>蓝天嘉园</span>
                </div>
                <div class="46463">
                    <div class="list11"></div><span>龙兴园</span>
                </div>
                <div class="46476">
                    <div class="list12"></div><span>新龙城</span>
                </div>
                <div class="46469">
                    <div class="list13"></div><span>万龙社区</span>
                </div>
                <div class="46464">
                    <div class="list14"></div><span>吉晟社区</span>
                </div>
                <div class="46465">
                    <div class="list15"></div><span>新康园社区</span>
                </div>
                <div class="46466">
                    <div class="list16"></div><span>万润家园</span>
                </div>
                <div class="46468">
                    <div class="list17"></div><span>东村家园</span>
                </div>
                <div class="46471">
                    <div class="list18"></div><span>龙乡社区</span>
                </div>
                <div class="46475">
                    <div class="list19"></div><span>龙博苑</span>
                </div>
                <div class="46477">
                    <div class="list20"></div><span>金榜园</span>
                </div>
                <div class="46480">
                    <div class="list21"></div><span>瑞旗家园</span>
                </div>
                <div class="46484">
                    <div class="list22"></div><span>南店新村</span>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="konwperson">知晓率</div>
            <div class="cfrs">
                <span>采访人数：</span><span></span>
            </div>
            <div class="konwperson_chart" id="konwperson_chart">


            </div>
            <div class="cfrs_tl">
                <div></div>
                <div>已知晓</div>
                <div></div>
                <div>未知晓</div>
            </div>
            <div class="konwperson">活动统计</div>
            <div class="cfrs_activity">
                <span>活动总数量(场)：<span></span></span>
                <span>活动总人数(人)：<span></span></span>
                <div class="month_count"><span>全部</span><img src="images/xl.jpg"></div>
                <div class="month_count_list">
                    <span value="all">全部</span>
                    <span value="1">1月</span>
                    <span value="2">2月</span>
                    <span value="3">3月</span>
                    <span value="4">4月</span>
                    <span value="5">5月</span>
                    <span value="6">6月</span>
                    <span value="7">7月</span>
                    <span value="8">8月</span>
                    <span value="9">9月</span>
                    <span value="10">10月</span>
                    <span value="11">11月</span>
                    <span value="12">12月</span>
                </div>
            </div>
            <div class="acvitity_chart" id="acvitity_chart">

            </div>
        </div>
        <div class="con_foot">
            <div class="ryzx">
                <div class="konwperson">荣誉之星</div>
                <div class="ryzx1">
                </div>
            </div>
            <div class="con_dy">
                <div class="konwperson">督导员</div>
                <div class="con_dy1">
                </div>
            </div>
        </div>


    </div>
    <!--  -->
    <div class="jf_background"></div>
    <div class="jf_model">
        <div class="model_title">
            <span></span>
            <span></span>
            <img class="closeJf" src="images/close.png">
        </div>
        <div class="s_jf">
            <img src="images/forest_r.png">
            <p></p>
            <p></p>
            <p></p>
        </div>
    </div>


    <!-- 导入尾部文件 -->
    <jsp:include page="footer.jsp" />
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/swiper/swiper.min.js"></script>
<script src="http://cdn.highcharts.com.cn/highcharts/highcharts.js"></script>
<script src="js/tjfx.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var id = '<%=id%>';
    });
</script>

</html>