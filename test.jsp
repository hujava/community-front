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
    <title>测试</title>
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
            position: relative;
        }

        <style>* {
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .choose {
            width: 400px;
            height: 600px;
            float: left;
            margin: 50px 0 0 50px;
        }

        .content {
            width: 400px;
            height: 400px;
            position: relative;
        }

        .content img {
            width: 400px;
            height: 400px;
        }

        #listshow {
            width: 400px;
            height: 100px;
            margin-top: 20px;
        }

        #listshow li {
            width: 98px;
            height: 100px;
            float: left;
            border: 1px solid #666;
        }

        #listshow li img {
            width: 98px;
            height: 100px;
        }

        #listshow .selected {
            border-color: brown;
        }

        .larger {
            width: 400px;
            height: 400px;
            position: absolute;
            top: 50px;
            left: 500px;
            float: left;
            overflow: hidden;
            display: none;
        }

        #big {
            width: 800px;
            height: 800px;
            position: absolute;
            left: 0;
            top: 0;
        }

        .shadow {
            width: 200px;
            height: 200px;
            background-color: rgba(145, 200, 200, .4);
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;
            display: none;
        }
    </style>
    </style>

</head>

<body>
    <div class="choose">
        <div class="content">
            <img src="images/map.jpg" id="small">
            <div class="shadow"></div>
        </div>
        <ul id="listshow">
            <li class="selected">
                <img src="images/map.jpg" data-img="images/map.jpg" alt="">
            </li>
            <li>
                <img src="images/map.jpg" data-img="images/map.jpg" alt="">
            </li>
            <li>
                <img src="images/map.jpg" data-img="images/map.jpg" alt="">
            </li>
            <li>
                <img src="images/map.jpg" data-img="images/map.jpg" alt="">
            </li>
        </ul>
    </div>
    <div class="larger">
        <img src="images/map.jpg" id="big">
    </div>
</body>·

<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/bootstrap/bootstrap.min.js"></script>
<script src="js/volunteers.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var msg = '<%=userName%>';

            content.onmousemove = function (e) {
            var evt = window.event || e;

            larger.style.display = "block";
            shadow.style.display = "block";
            var clientX = evt.clientX;
            var clientY = evt.clientY;

            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            var X = clientX + scrollLeft - chooseMarginL - shadowW / 2;
            var Y = clientY + scrollTop - chooseMarginT - shadowH / 2;

            if (X <= 0) {
                X = 0;
            }
            if (X >= maxX) {
                X = maxX;
            }
            if (Y <= 0) {
                Y = 0;
            }
            if (Y >= maxY) {
                Y = maxY;
            }
            //防止遮罩层粘滞，跟随鼠标一起滑出大图位置
            var bigX = X * bigW / contentW;
            var bigY = Y * bigH / contentH;
            //  bigX / bigW = X / contentW,主图和遮罩层之间存在两倍关系，放大图和原图之间也有两倍关系
            shadow.style.left = X + "px";
            shadow.style.top = Y + "px";

            big.style.left = -bigX + "px";
            big.style.top = -bigY + "px";

        }
    });
</script>

</html>