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
    <title>忘记密码</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
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

        .foot {
            bottom: 0px;
            width: 100%;
        }

        .con_title {
            color: #222;
            font-size: 24px;
            margin-top: 50px;
        }

        .con_title>span {
            margin-left: 9%;
            display: inline-block;
        }

        .con_title>img {
            margin-left: 30.3%;
            display: inline-block;
        }

        .con_title>div {
            color: #555;
            font-size: 16px;
            text-align: center;
        }

        .content {
            width: 405px;
            margin: 0 auto;
            margin-top: 46px;
        }

        .con_login {
            overflow: hidden;
        }

        .con_login>div {
            width: 50%;
            float: left;
            display: inline-block;
        }

        .undline1 {
            width: 100%;
            height: 5px;
            background: #3bcd80;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
        }

        .undline1>span:nth-of-type(1) {
            background: #3bcd80;
            width: 30px;
            height: 30px;
            display: inline-block;
            position: absolute;
            color: #fff;
            padding: 6px 11px;
            border-radius: 50%;
            margin-left: 80px;
            margin-top: -12px;
        }

        .undline1>span:nth-of-type(2) {
            display: inline-block;
            position: absolute;
            color: #222;
            margin-left: 65px;
            margin-top: 26px;
            font-size: 16px;
        }

        .undline2 {
            width: 100%;
            height: 5px;
            background: #ccc;
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
        }

        .undline2>img {
            display: inline-block;
            position: absolute;
            margin-left: 92px;
            margin-top: -6px;
        }

        .undline2>span:nth-of-type(1) {
            display: inline-block;
            position: absolute;
            color: #888;
            margin-left: 85px;
            margin-top: 26px;
            font-size: 16px;
        }

        .con_list {
            margin-top: 60px;
        }
        .con_list1 {
            margin-top: 60px;
            display: none;
        }
        .con_list1>img{
            margin-left: 130px;
            margin-top: 60px;
        }


        /* 手机号 */
        .log_phone {
            height: 58px;
            margin-left: 58px;
        }

        .log_phone>div {
            display: inline-block;
            height: 100%;
            width: 70px;
            text-align: right;
            padding-top: 20px;
            font-size: 16px;
        }

        .log_phone>input {
            height: 38px;
            margin-left: 10px;
            width: 250px;
            padding-left: 10px;
        }

        /* 验证码 */
        .log_yzm {
            height: 58px;
            margin-left: 58px;
        }

        .log_yzm>div:nth-of-type(1) {
            display: inline-block;
            height: 100%;
            width: 70px;
            text-align: right;
            padding-top: 20px;
            font-size: 16px;
        }

        .log_yzm>div:nth-of-type(2) {
            display: inline-block;
            height: 38px;
            width: 100px;
            text-align: center;
            font-size: 14px;
            color: #3bcd80;
            border: 1px solid #3bcd80;
            margin-left: 10px;
            padding-top: 8px;
        }

        .log_yzm>input {
            height: 38px;
            margin-left: 10px;
            width: 140px;
            padding-left: 10px;
        }

        /* 密码 */
        .log_password {
            height: 58px;
            margin-left: 58px;
        }

        .log_password>div {
            display: inline-block;
            height: 100%;
            width: 70px;
            text-align: right;
            padding-top: 20px;
            font-size: 16px;
        }

        .log_password>input {
            height: 38px;
            margin-left: 10px;
            width: 250px;
            padding-left: 10px;
        }

        /* 确认密码 */
        .log_passwords {
            height: 58px;
            margin-left: 58px;
        }

        .log_passwords>div {
            display: inline-block;
            height: 100%;
            width: 70px;
            text-align: right;
            padding-top: 20px;
            font-size: 16px;
        }

        .log_passwords>input {
            height: 38px;
            margin-left: 10px;
            width: 250px;
            padding-left: 10px;
        }

        .submit {
            width: 315px;
            height: 50px;
            padding-top: 10px;
            text-align: center;
            margin-top: 30px;
            background: #3bcd80;
            color: #fff;
            margin-left: 70px;
            border-radius: 8px;
            font-size: 20px;
            letter-spacing: 10px;
            cursor: pointer;
            box-shadow: 0px 0px 18px #3bcd80;
        }
        .login_li {
            width: 315px;
            height: 50px;
            padding-top: 10px;
            text-align: center;
            margin-top: 30px;
            background: #3bcd80;
            color: #fff;
            margin-left: 50px;
            border-radius: 8px;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0px 0px 18px #3bcd80;
        }
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="container">
        <div class="con_title">
            <span>找回密码</span>
            <img src="images/volunteer.png">
            <div>志愿者</div>
        </div>
        <div class="content">
            <div class="con_login">
                <div class="undline1">
                    <span>1</span>
                    <span>信息验证</span>
                </div>
                <div class="undline2">
                    <img src="images/init2.png">
                    <span>完成</span>
                </div>
            </div>
            <!-- 修改 -->
            <div class="con_list">
                <div class="log_phone">
                    <div>手机号：</div><input type="text" placeholder="请输入用户名">
                </div>
                <div class="log_yzm">
                    <div>验证码：</div><input type="text" maxlength="4" placeholder="请输入验证码">
                    <div class="log_ylog">验证码</div>
                </div>
                <div class="log_password">
                    <div>密码：</div><input type="password" maxlength="16" placeholder="请输入密码">
                </div>
                <div class="log_passwords">
                    <div>密码：</div><input type="password" maxlength="16" placeholder="请输入确认密码">
                </div>
                <div class="submit">提交</div>
            </div>
            <!-- 成功后 -->
            <div class="con_list1">
                <img src="images/finxg.png">
                <div class="login_li">去登陆</div>
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
<script src="js/forgit.js"></script>

</html>