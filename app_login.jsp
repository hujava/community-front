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
<html class="m-navlist">

<head>
    <title>志愿者注册</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=0,maximum-scale=1.0" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">

    <style>
        *,
        html,
        body {
            margin: 0;
            padding: 0;
            font-family: "微软雅黑";
            -webkit-overflow-scrolling: touch;
        }

        @media screen and (max-width:321px) {
            .m-navlist {
                font-size: 15px
            }
        }

        @media screen and (min-width:321px) and (max-width:400px) {
            .m-navlist {
                font-size: 16px
            }
        }

        @media screen and (min-width:400px) {
            .m-navlist {
                font-size: 18px
            }
        }

        .nav {
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
        ::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            font-size: 0.46rem;
            color: #ccc;
        }

        :-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            font-size: 0.46rem;
            color: #ccc;
        }

        ::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            font-size: 0.46rem;
            color: #ccc;
        }

        :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            font-size: 0.46rem;
            color: #ccc;
        }

        /* 手机号 */
        .logf_username {
            height: 1.5rem;
            width: 100%;
            border-bottom: 1px solid #eee;
            margin-top: 0.3rem;
            padding-top: 0.4rem;
        }

        .logf_username>span {
            font-size: 0.46rem;
        }

        .logf_username>input {
            height: 30px;
            border: none;
            width: 6.55rem;
            padding-left: 1rem;
        }

        .logf_username>input:focus {
            border: none;
        }

        /* 验证码 */
        .logf_yzm {
            height: 1.5rem;
            width: 65%;
            border-bottom: 1px solid #eee;
            padding-top: 0.4rem;
            display: inline-block;
        }

        .logf_yzm>span {
            font-size: 0.46rem;
        }

        .logf_yzm>input {
            height: 30px;
            border: none;
            width: 2.75rem;
            padding-left: 1rem;
        }

        .logf_yzm>input:focus {
            border: none;
        }

        /* 社区 */
        .logf_sq {
            height: 1.5rem;
            width: 100%;
            border-bottom: 1px solid #eee;
            position: relative;
        }

        .logf_sq>span {
            font-size: 0.46rem;
            position: absolute;
            top: 0.4rem;
        }

        .logf_sq>div {
            width: 6rem;
            display: inline-block;
            font-size: 0.46rem;
            color: #ccc;
            padding-top: 0.4rem;
            margin-left: 2.5rem;
        }

        .logf_sq>img {
            height: 0.3rem;
            width: 0.15rem;
            vertical-align: unset;
            margin-left: 0.2rem;
            position: absolute;
            top: 0.6rem;
        }

        /* 密码 */
        .logf_password {
            height: 1.5rem;
            width: 100%;
            border-bottom: 1px solid #eee;
            padding-top: 0.35rem;
        }

        .logf_password>span {
            font-size: 0.46rem;
        }

        .logf_password>input {
            height: 30px;
            border: none;
            width: 6.1rem;
            padding-left: 1.5rem;
        }

        .logf_password>input:focus {
            border: none;
        }

        /* 确认密码 */
        .logf_passwords {
            height: 1.5rem;
            width: 100%;
            border-bottom: 1px solid #eee;
            margin-top: 0.3rem;
            padding-top: 0.15rem;
        }

        .logf_passwords>span {
            font-size: 0.46rem;
        }

        .logf_passwords>input {
            height: 30px;
            border: none;
            width: 5.2rem;
            padding-left: 0.6rem;
        }

        .logf_passwords>input:focus {
            border: none;
        }

        /* 昵称 */
        .logf_name {
            height: 1.5rem;
            width: 100%;
            border-bottom: 1px solid #eee;
            padding-top: 0.25rem;
        }

        .logf_name>span {
            font-size: 0.46rem;
        }

        .logf_name>input {
            height: 30px;
            border: none;
            width: 6.2rem;
            padding-left: 1.45rem;
        }

        .logf_name>input:focus {
            border: none;
        }



        /* 注册 */
        .log_register {
            width: 9rem;
            height: 50px;
            background: #3bcd80;
            font-size: 18px;
            color: #fff;
            text-align: center;
            padding-top: 12px;
            cursor: pointer;
            border-radius: 50px;
            margin-left: 0.1rem;
            margin: 0 auto;
            margin-top: 0.8rem;
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

        /* 验证码验证 */
        .h_yzm {
            height: 0.88rem;
            border-radius: 50px;
            background: #ececec;
            color: #d5d5d5;
            padding: 0.16rem 0.35rem;
            display: inline-block;
            position: absolute;
            right: 1rem;
            margin-top: 0.4rem;
        }

        .login_r {
            padding: 0.8rem;
        }

        .ynxy {
            margin: 0 auto;
            margin-top: 2rem;
            margin-bottom: 0.3rem;
        }

        .ynxy a {
            color: #5C91FE;
        }

        .ynxy img {
            width: 0.7rem
        }

        .add_community {
            background: #fff;
            position: fixed;
            z-index: 10;
            bottom: 0rem;
            width: 100%;
            height: 13rem;
            display: none;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .add_background {
            width: 100%;
            height: 100%;
            display: none;
            background: black;
            opacity: 0.6;
            position: fixed;
            top: 0rem;
            z-index: 9;
        }

        .add_tit {
            font-size: 0.4rem;
            font-weight: bold;
            padding: 0.3rem 0.5rem;
            border-bottom: 1px solid #eee;
        }

        .add_tit>img {
            /* margin-left: 6.5rem; */
            position: absolute;
            right: 0.5rem;
        }

        .add_xy {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0rem;
            background: #fff;
            display: none;
        }

        .comm_list {
            padding: 0.2rem 0.5rem;
            height: 11.5rem;
            list-style: none;
            overflow-y: scroll;
        }

        .comm_list>li {
            /* padding: 0.2rem 0rem; */
            font-size: 0.4rem;
            line-height: 1.4rem;
            overflow: scroll;
        }

        .comm_list>li>span {
            border-bottom: 2px solid #fff;
        }

        .comm_model {
            position: fixed;
            left: 0rem;
            right: 0rem;
            margin: 0 auto;
            z-index: 10;
            width: 6rem;
            background: #fff;
            border-radius: 10px;
            top: 5rem;
            margin-left: 2.4rem;
            display: none;
        }

        .comm_model>div {
            width: 100%;
            font-size: 0.5rem;
            color: #222;
            border-bottom: 1px solid #eee;
            padding: 0.5rem;
            text-align: center;
            margin-bottom: 0.2rem;
        }

        .comm_model>span {
            font-size: 0.5rem;
            color: #3bcd80;
            display: inline-block;
            width: 100%;
            text-align: center;
            height: 1.2rem;
            padding-top: 0.2rem;
        }

        input {
            outline: none
        }

        .app_login {
            text-align: center;
            width: 100%;
            padding-top: 1rem;
        }
        .app_login>img{
            width: 130px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="nav">
            <div class="login_r">
                <div class="app_login">
                    <img src="images/app_login.png">
                </div>
                <div class="logf_username">
                    <span>手机号</span>
                    <input type="number" placeholder="请输入手机号">
                </div>
                <div class="logf_yzm">
                    <span>验证码</span>
                    <input type="text" maxlength="4" placeholder="验证码">
                </div>
                <div class="h_yzm">获取验证码</div>
                <div class="logf_name">
                    <span>姓名</span>
                    <input type="text" maxlength="16" placeholder="请输入真实姓名">
                </div>
                <div class="logf_sq">
                    <span>社区</span>
                    <div>请选择社区</div>
                    <img src="images/sq.png" />
                </div>
                <div class="logf_password">
                    <span>密码</span>
                    <input type="password" placeholder="请输入密码">
                </div>
                <div class="logf_passwords">
                    <span>确认密码</span>
                    <input type="password" placeholder="请再次输入密码">
                </div>
                <!-- <div class="ynxy">
                    <img src="images/nxy.png" />
                    <span>我已阅读并同意<a>《合创家社区平台用户协议》</a></span>
                </div> -->
                <div class="log_register">注册</div>
            </div>
        </div>
        <!-- 社区 -->
        <div class="add_community">
            <div class="add_tit">
                <span>请选择所在社区</span>
                <img class="clone" src="images/clear.png">
            </div>
            <ul class="comm_list">
            </ul>
        </div>
        <div class="add_background"></div>
        <div class="comm_model">
            <div>发送成功！</div>
            <span>确定</span>
        </div>
    </div>

</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/app_login.js?v=1.0"></script>

</html>