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
    <title>账号登录</title>
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

        .login_l {
            margin-top: 90px;
            margin-left: 40px;
            float: left;
        }

        .login_r {
            width: 488px;
            height: 568px;
            background: url('images/login_right_bg.png');
            float: left;
            margin-top: 65px;
            padding: 45px 65px;
        }

        .nav {
            overflow: hidden;
        }

        .log_tit {
            overflow: hidden;
        }

        .log_tit>div:nth-of-type(1) {
            font-size: 22px;
            color: #222;
            text-align: center;
            width: 50%;
            line-height: 60px;
            border-bottom: 2px solid #3bcd80;
            cursor: pointer;
            float: left;
        }

        .log_tit>div:nth-of-type(2) {
            font-size: 22px;
            color: #555;
            text-align: center;
            width: 50%;
            line-height: 60px;
            cursor: pointer;
            border-bottom: 2px solid #eee;
            float: left;
        }

        /* 登录 */
        .log_username,
        .logf_username {
            height: 90px;
            width: 100%;
            border-bottom: 1px solid #d2d2d2;
            margin-top: 10px;
        }

        .log_username>input,
        .logf_username>input {
            height: 30px;
            border: none;
            margin-top: 50px;
            margin-left: 10px;
            width: 250px;
        }

        .log_username>input:focus,
        .logf_username>input:focus {
            border: none;
        }

        .log_username>img,
        .logf_username>img {
            margin-left: 50px;
        }

        .log_password,
        .logf_password {
            height: 90px;
            width: 100%;
            border-bottom: 1px solid #d2d2d2;
        }

        .log_password>input,
        .logf_password>input {
            height: 30px;
            border: none;
            margin-top: 50px;
            margin-left: 10px;
            width: 250px;
        }

        .logf_password>input {
            width: 150px;
        }

        .log_password>input:focus,
        .logf_password>input:focus {
            border: none;
        }

        .log_password>img,
        .logf_password>img {
            margin-left: 50px;
        }

        .logf_username,
        .logf_password {
            display: none;
        }


        .log_forget {
            color: #888;
            text-decoration: underline;
            line-height: 70px;
            margin-left: 300px;
            cursor: pointer;
        }

        a:hover,
        a:focus {
            text-decoration: underline;
            cursor: pointer;
        }

        .log_login {
            width: 355px;
            height: 50px;
            background: #3bcd80;
            font-size: 18px;
            color: #fff;
            text-align: center;
            padding-top: 12px;
            cursor: pointer;
            border-radius: 7px;
            margin-top: 20px;
        }

        .log_resg {
            color: #888;
            cursor: default;
            text-align: center;
            margin-top: 36px;
        }

        .log_resg>span {
            color: #555;
            cursor: pointer;
        }

        .log_resg>span:hover {
            color: #3bcd80;
        }

        .log_yzm {
            color: #3bcd80;
            cursor: pointer;
            padding: 0 4px;
            height: 25px;
            border: 1px solid #3bcd80;
            text-align: center;
            margin-top: 54px;
            float: right;
        }

        .foot {
            /* position: absolute; */
            width: 100%;
        }
        /* .input_ss,.navi>li{
            display: none;
        } */
        .return_m>span{
            display: block;
        }
    </style>

</head>

<body class="HolyGrail">
    <!-- 导入头部文件 -->
    <jsp:include page="header.jsp" />
    <div class="container scrollH">
        <div class="nav">
            <img class="login_l" src="images/login_left.jpg">
            <div class="login_r">
                <div class="log_tit">
                    <div value="1">账号登录</div>
                    <div value="2">手机登录</div>
                </div>
                <div class="log_username">
                    <input type="text" placeholder="请输入用户名">
                    <img src="images/user.png">
                </div>
                <div class="log_password">
                    <input type="password" placeholder="请输入密码">
                    <img src="images/password.png">
                </div>
                <div class="logf_username">
                    <input type="text" placeholder="请输入手机号">
                    <img src="images/phone.png">
                </div>
                <div class="logf_password">
                    <input type="text" placeholder="请输入验证码">
                    <div class="log_yzm">发送验证码</div>
                </div>
                <a class="log_forget">忘记密码</a>
                <div class="log_login">登录</div>
                <div class="log_resg">没有账号，<span>立即注册</span></div>
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
<script src="js/login.js"></script>

</html>