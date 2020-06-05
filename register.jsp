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
    <title>账号注册</title>
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
            height: 670px;
            background: url('images/login_right_bg.png');
            float: left;
            margin-top: 65px;
            padding: 45px 65px;
            background-size: 100% 100%;
        }

        .nav {
            overflow: hidden;
        }

        .log_tit {
            overflow: hidden;
        }

        .log_tit>div {
            font-size: 22px;
            color: #222;
            text-align: center;
            width: 50%;
            line-height: 60px;
            border-bottom: 2px solid #3bcd80;
            cursor: pointer;
            float: left;
        }

        .log_tit>div:nth-of-type(1) {
            text-align: left;
            padding-left: 6px;
        }

        .log_tit>div:nth-of-type(2) {
            margin-top: 60px;
        }

        /* 登录 */
        .log_username,
        .logf_username,
        .log_name,
        .log_sq {
            height: 40px;
            width: 100%;
            border-bottom: 1px solid #d2d2d2;
            margin-top: 26px;
        }

        .log_username>input,
        .logf_username>input {
            height: 30px;
            border: none;
            margin-left: 60px;
            width: 250px;
        }

        .log_name>input,
        .log_sq>input {
            height: 30px;
            border: none;
            margin-left: 78px;
            width: 240px;
        }

        .log_username>input:focus,
        .logf_username>input:focus,
        .log_name>input:focus,
        .log_sq>input:focus {
            border: none;
        }

        .log_password,
        .logf_password {
            height: 60px;
            width: 100%;
            border-bottom: 1px solid #d2d2d2;
        }

        .log_password>input,
        .logf_password>input {
            height: 30px;
            border: none;
            margin-top: 20px;
            margin-left: 78px;
            width: 240px;
        }

        .logf_password>input {
            width: 150px;
        }

        .log_password>input:focus,
        .logf_password>input:focus {
            border: none;
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
            margin-top: 10px;
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

        .log_yzm {
            color: #3bcd80;
            cursor: pointer;
            padding: 0 4px;
            height: 25px;
            border: 1px solid #3bcd80;
            text-align: center;
            margin-top: 20px;
            float: right;
        }

        .log_role {
            height: 90px;
            width: 100%;
        }

        .log_role>div {
            padding-left: 18px;
            padding-top: 30px;
            text-align: center;
            position: relative;
        }

        .log_role>div>img {
            margin-right: 20px;
        }

        .foot {
            /* position: absolute; */
            width: 100%;
        }

        .cri1,
        .cri2 {
            background: #3bcd80;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            position: absolute;
        }

        .cri1 {
            top: 36px;
            left: 120px;
        }

        .cri2 {
            top: 36px;
            left: 194px;
            display: none;
        }

        ::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            text-align: left;
        }

        :-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            text-align: left;
        }

        ::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            text-align: left;
        }

        :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            text-align: left;
        }

        .log_password2>input {
            margin-left: 74px;
        }

        .log_password2>input {
            margin-left: 50px;
        }
        .login_yzm>input{
            width: 100px;
        }
        /* 用户协议 */
        .ynxy {
            margin: 0 auto;
            margin-top: 26px;
            /* margin-bottom: 0.3rem; */
        }

        .ynxy a {
            color: #5C91FE;
        }

        .ynxy img {
            width: 20px;
        }

        /* 学生 */
        .mid_zcs {
            display: none;
            margin-top: 30px;
        }

        /* 志愿者 */
        .mid_zcz {
            display: block;
        }

        /* 学生注册 */
        .s_username {
            height: 60px;
            width: 100%;
            border-bottom: 1px solid #d2d2d2;
        }

        .s_username>input {
            height: 30px;
            border: none;
            margin-top: 20px;
            margin-left: 60px;
            width: 250px;
        }

        input:focus {
            border: 1px solid #fff;
        }

        .login_yzm>input {
            margin-left: 60px;
        }

        /* 弹框 */
        .comm_model {
            position: fixed;
            left: 0rem;
            right: 0rem;
            margin: 0 auto;
            z-index: 21;
            width: 280px;
            background: #fff;
            border-radius: 10px;
            top: 40%;
            display: none;
        }

        .comm_model>div {
            width: 100%;
            color: #222;
            border-bottom: 1px solid #eee;
            padding: 20px;
            text-align: center;
            font-size: 18px;
            cursor: default;
        }

        .comm_model>span {
            color: #3bcd80;
            display: inline-block;
            width: 100%;
            text-align: center;
            height: 40px;
            padding-top: 10px;
            font-size: 16px;
            cursor: pointer;
        }
        .add_background {
            width: 100%;
            height: 100%;
            display: none;
            background: black;
            opacity: 0.6;
            position: fixed;
            top: 0rem;
            z-index: 20
        }
        .log_select>span {
            display: inline-block;
            width: 100%;
            line-height: 26px;
            padding-left: 110px;
        }

        .log_select>span:hover {
            color: #fff;
            background: #3bcd80;
            cursor: pointer;
        }


        .log_select {
            background: #fff;
            box-shadow: 0px 2px 8px #ededed;
            -webkit-box-shadow: 1px 1px 3px #ededed;
            -moz-box-shadow: 1px 1px 3px #ededed;
            -o-box-shadow: 1px 1px 3px #ededed;
            position: relative;
            z-index: 10;
            max-height: 130px;
            overflow-y: scroll;
            display: none;
        }

        input:hover {
            cursor: pointer;
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
                    <div value="1">志愿者注册</div>
                    <div></div>
                </div>
                <!-- <div class="log_role">
                    <div>
                        <div class="cri1"></div>
                        <img src="images/student.png">
                        <div class="cri2"></div>
                        <img src="images/teacher.png">
                    </div>
                </div> -->
                <!-- 学生注册 -->
                <div class="mid_zcs">
                    <div class="s_username">
                        <span>用户名</span>
                        <input type="text" placeholder="请输入用户名">
                    </div>
                    <div class="s_name">
                        <span>真实姓名</span>
                        <input type="text" placeholder="请输入姓名">
                    </div>
                    <div class="s_area">
                        <span>所在地区</span>
                        <input type="text" placeholder="请选择地区">
                    </div>
                    <div class="s_school">
                        <span>所在学校</span>
                        <input type="text" placeholder="请输入学校">
                    </div>
                    <div class="s_grade">
                        <span>所在年级</span>
                        <input type="text" placeholder="请输入年级">
                    </div>
                    <div class="s_class">
                        <span>所在班级</span>
                        <input type="text" placeholder="请输入班级">
                    </div>
                    <div class="s_password">
                        <span>密码</span>
                        <input type="text" placeholder="请输入6-15位密码">
                    </div>
                </div>
                <!-- 志愿者注册 -->
                <div class="mid_zcz">
                    <div class="logf_username log_phone">
                        <span>手机号</span>
                        <input type="text" maxlength="11" placeholder="请输入手机号">
                    </div>
                    <div class="logf_password login_yzm">
                        <span>验证码</span>
                        <input type="text" maxlength="4" placeholder="请输入验证码">
                        <div class="log_yzm">发送验证码</div>
                    </div>
                    <div class="log_name">
                        <span>姓名</span>
                        <input type="text" placeholder="请输入真实姓名">
                    </div>
                    <div class="log_sq">
                        <span>社区</span>
                        <input type="text"  readonly="readonly" placeholder="请输入社区">
                        <div class="log_select">
                        </div>
                    </div>
                    <div class="log_password .log_password">
                        <span>密码</span>
                        <input type="password" placeholder="请输入密码">
                    </div>

                    <div class="log_password log_password2">
                        <span>确认密码</span>
                        <input type="password" placeholder="请再次输入密码">
                    </div>
                </div>
                <div class="ynxy">
                    <img src="images/nxy.png" />
                    <span>我已阅读并同意<a>《合创家社区平台用户协议》</a></span>
                </div>
                <div class="log_login">注册</div>
            </div>
        </div>
        <!-- 弹框 -->
        <div class="comm_model">
            <div>发送成功！</div>
            <span>确定</span>
        </div>
    </div>
    <div class="add_background"></div>
    <!-- 导入尾部文件 -->
    <div class="foot">
        <jsp:include page="footer.jsp" />
    </div>
</body>

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/register.js"></script>

</html>