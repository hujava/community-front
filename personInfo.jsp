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
int jf = 0;
String userUrl = "";
String aliasName = "";
String areasSq = "";
String areas_id = "";
String areas_name = "";
String age = "";
String gender = "";


if(obj!=null){
	SecurityContextImpl securityContextImpl = (SecurityContextImpl) request.getSession()
				.getAttribute("SPRING_SECURITY_CONTEXT");
	if (securityContextImpl != null && securityContextImpl.getAuthentication() != null
		&& securityContextImpl.getAuthentication().getPrincipal() != null) {
		UserEntity userDetails = (UserEntity) securityContextImpl.getAuthentication().getPrincipal();
        userName = userDetails.getUsername();
        userId = userDetails.getId();
        jf = userDetails.getJf();
        userUrl = userDetails.getUserUrl();
        aliasName = userDetails.getAlias_name();
        areasSq =  userDetails.getAreas_sq();
        areas_name = userDetails.getAreas_name();
        age = userDetails.getAge();
        gender = userDetails.getGender();

	}
}

%>
<!DOCTYPE html>
<html>

<head>
    <title>我的活动</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

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

        .hot_mk>div:nth-of-type(1),
        .hot_mk>div:nth-of-type(2),
        .hot_mk>div:nth-of-type(3) {
            margin-top: 6px;
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
            margin-top: 40px;
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

        /* 热门活动 */
        .hot-activity {
            background: url('images/hot_back.png') no-repeat;
            background-size: 100%;
            width: 1238px;
            position: relative;
            z-index: 10;
            margin-left: -18px;
        }

        .hot-left {
            width: 460px;
            min-height: 150px;
            padding: 40px 38px 50px 56px;
        }

        .hot-title {
            color: #3bcd80;
            font-size: 36px;
            font-weight: bold;
            width: 150px;
            float: left;
        }

        .hot-desc {
            width: 200px;
            float: right;
            color: #555;
        }

        .hot-right {
            width: 610px;
            float: right;
            margin-right: 65px;
            margin-top: -100px;
        }

        .hot-right a {
            color: #222;
        }

        .hot-right>div {
            display: inline-block;
            margin-left: 56px;
            width: 104px;
            height: 30px;
        }

        .hot-right>div:nth-of-type(1) {
            margin-left: 0px;
        }

        .hot-right>div:nth-of-type(5) {
            margin-left: 0px;
        }

        .hot_act {
            margin-top: -56px;
        }

        p {
            margin: 0px;
        }

        .hot_mk {
            margin-top: 5px;

        }

        .right_mk {
            float: right;
            width: 980px;
            padding: 23px;
            background: #fff;
            border-radius: 7px;
            margin-top: 30px;
        }

        .hot_mk>div {
            width: 300px;
            height: 350px;
            float: left;
            margin-right: 16px;
            border-radius: 7px;
            border: 1px solid #ececec;
            position: relative;
            margin-top: 30px;
        }

        .hot_mk>div:nth-child(3n+3) {
            margin-right: 0px;
        }

        .hot_mk>div>div:nth-of-type(1) {
            width: 96px;
            height: 25px;
            background: #000;
            opacity: 0.3;
            position: absolute;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            color: #fff;
        }

        .hot_mk>div>div:nth-of-type(2) {
            width: 96px;
            height: 22px;
            position: absolute;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            text-align: center;
            color: #fff;
        }


        .hot_mk>div>img {
            width: 100%;
            height: 190px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
        }

        .hot_mk>div>p:nth-of-type(1) {
            padding: 14px 20px 0px;
            color: #222;
            height: 64px;
            overflow: hidden;
            font-size: 18px;
        }

        .hot_mk>div>p:nth-of-type(2) {
            padding: 0px 0px 14px 20px;
            color: #888;
            font-size: 16px;
            margin-top: 20px;
        }

        .hot_mk>div>p:nth-of-type(2)>span:nth-of-type(1) {
            display: inline-block;
            width: 74.8%;
        }

        .hot_mk>div>p:nth-of-type(2)>span:nth-of-type(2) {
            display: inline-block;
            position: absolute;
            margin-left: -20px;
        }

        .hot_mk>div>p:nth-of-type(3) {
            padding: 0px 20px 14px 20px;
            color: #555;
        }

        .hot_mk>div>p:nth-of-type(3)>span {
            margin-left: 8px;
            display: inline-block;
            width: 30px;
        }

        .hot_mk>div>p:nth-of-type(3)>img:nth-of-type(2) {
            margin-left: 10px;
            margin-top: -6px;
        }

        .hot_mk>div>p:nth-of-type(3)>span:nth-of-type(3) {
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

        /* 进行==未结束 */
        .time_now,
        .time_end {
            position: relative;
            /* margin-left: 45px; */
        }

        .time_now>img,
        .time_end>img {
            position: absolute;
            margin-top: -4px;
        }

        .time_now>span,
        .time_end>span {
            position: absolute;
            width: 60px;
            margin-left: 26px;
            color: #fff;
        }

        .insView {
            cursor: pointer;
        }

        .insView:hover {
            color: #3bcd80;
        }

        .log_bg {
            background: #fbfbfb;
            width: 100%;
        }

        .log_info {
            width: 210px;
            height: 380px;
            float: left;
            margin-top: 30px;
        }

        /* 条件 */
        .listMenu {
            border: 1px solid #ececec;
            height: 50px;
            width: 100%;
            margin-bottom: 16px;
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

        .foot {
            /* position: absolute; */
            width: 100%;
            /* margin-top: 0px; */
            background: #fbfbfb;
        }

        .personinfo {
            height: 250px;
            width: 100%;
            text-align: center;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            background: #fff;
        }

        .personinfo>img {
            width: 100px;
            height: 100px;
            border-radius: 50px;
            margin-top: 30px;
            cursor: default;
        }

        .personinfo>p {
            font-size: 18px;
            color: #555;
            margin-top: 8px;
            cursor: default;
        }

        .personinfo span {
            color: #3bcd80;
            margin-left: 6px;
        }

        .log_list {
            height: 120px;
            width: 100%;
            border-bottom-left-radius: 7px;
            border-bottom-right-radius: 7px;
            background: #fff;
            margin-top: 10px;
            font-size: 16px;
        }

        .log_list>p {
            padding-top: 22px;
            position: relative;
            margin-left: 60px;
            cursor: pointer;
        }

        .log_list>p>span {
            margin-left: 10px;
            position: absolute;
            margin-top: 3px;
            color: #555;
        }

        .lg_tit,
        .lg_tit2 {
            font-size: 22px;
            color: #555;
            margin-bottom: 26px;
        }

        .lg_photo {
            width: 120px;
            height: 120px;
            border-radius: 50px;
            margin-left: 160px;
            margin-top: 30px;
        }

        .lg_infoList {
            margin-left: 130px;
            font-size: 16px;
            color: #555;
        }

        .lg_infoList>div {
            display: inline-block;
            margin-top: 20px;
        }

        .lg_infoList>div:nth-of-type(1) {
            width: 70px;
            text-align: right;
            margin-right: 6px;
        }

        .xname,
        .log_sq,
        .log_age,
        .log_sex {
            width: 200px;
            height: 38px;
            border: 1px solid #ddd;
            text-indent: 16px;
        }

        /*  */
        .log_select {
            background: #fff;
            box-shadow: 0px 2px 8px #ededed;
            -webkit-box-shadow: 1px 1px 3px #ededed;
            -moz-box-shadow: 1px 1px 3px #ededed;
            -o-box-shadow: 1px 1px 3px #ededed;
            position: absolute;
            z-index: 10;
            max-height: 130px;
            overflow-y: scroll;
            width: 200px;
            margin-left: 207px;
            display: none;
        }

        .log_select>span {
            display: inline-block;
            width: 100%;
            line-height: 26px;
            padding-left: 70px;
        }

        .log_select>span:hover {
            color: #fff;
            background: #3bcd80;
            cursor: pointer;
        }

        .saveInfo {
            width: 110px;
            height: 36px;
            border-radius: 7px;
            background: #3bcd80;
            color: #fff;
            font-size: 16px;
            padding: 6px 39px;
            margin-left: 206px;
            margin-top: 36px;
            cursor: pointer;
        }

        label {
            font-weight: normal;
        }

        input[type='radio'],
        input[type='checkbox'] {
            margin: 0px 6px;
        }

        label>input {
            margin-right: 6px;
        }
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="log_bg">
        <div class="container activet">
            <!-- 热门活动模块 -->
            <div class="log_info">
                <div class="personinfo">
                    <img src="">
                    <p></p>
                    <p>融泽嘉园一区</p>
                    <p><img src="images/tree.png"><span></span></p>
                </div>
                <div class="log_list">
                    <p><img src="images/per1.png"><span>我的信息</span></p>
                    <p><img src="images/xin1.png"><span>我的活动</span></p>
                </div>
            </div>
            <div class="right_mk">
                <div class="lg_tit">我的活动</div>
                <!-- 条件 -->
                <div class="listMenu">
                    <p>分类：</p>
                    <div class="fl_lbxx">

                    </div>
                </div>
                <div class="hot_mk"></div>
                <!-- 我的信息 -->
                <div class="lg_tit2">我的信息</div>
                <div class="myInfo">
                    <img class="lg_photo" src="images/app_login.png">
                    <div class="lg_infoList lg_active">
                        <div>手机号：</div>
                        <div></div>
                    </div>
                    <div class="lg_infoList">
                        <div>昵称：</div><input class="xname" type="text" placeholder="请输入昵称">
                    </div>
                    <div class="lg_infoList">
                        <div>社区：</div><input class="log_sq" type="text" placeholder="请选择社区">
                    </div>
                    <div class="log_select"></div>
                    <div class="lg_infoList">
                        <div>年龄：</div><input class="log_age" type="text" placeholder="请输入年龄">
                    </div>
                    <div class="lg_infoList">
                        <div>性别：</div><label>
                        </label><input name="sex" type="radio" class="sex1" value="1">男 </label>
                        <label><input name="sex" type="radio" class="sex2" value="2">女</label>
                    </div>
                    <div class="saveInfo">保存</div>
                </div>

            </div>
        </div>
    </div>
    <!-- 导入尾部文件 -->
    <div class="foot">
        <jsp:include page="footer.jsp" />
    </div>
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/tab/jquery.cardtabs.js"></script>i
<script src="js/personInfo.js"></script>
<script type="text/javascript">
    $(function () {
        var httpXhr = getRootPath();
        var msg = '<%=userId%>';
        var userName = '<%=userName%>';
        var jf = '<%=jf%>';
        var userUrl = '<%=userUrl%>';
        var aliasName = '<%=aliasName%>';
        var areas_name = '<%=areas_name%>';
        var areasSq='<%=areasSq%>';
        var age = '<%=age%>';
        var gender = '<%=gender%>';

        $(".lg_active>div:nth-of-type(2)").html(userName);
        $(".personinfo>p:nth-of-type(1)").html(aliasName);
        $(".personinfo>p:nth-of-type(2)").html(areas_name);
        $(".xname").val(aliasName);         
        $(".log_sq").val(areas_name);
        if(age==null){
            $(".log_age").val(age);
        }
        select_id=areasSq;
        $("input[name='sex'][value="+gender+"]").attr("checked",true);
        $(".personinfo>p:nth-of-type(3)>span").html(jf);
        $(".personinfo>img").attr("src", httpXhr + "getFileController/getFile.do?fileName=" + encodeURI(userUrl));
        $(".HolyGrail").attr("value", msg)

    });
</script>

</html>