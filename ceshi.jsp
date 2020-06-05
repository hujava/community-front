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
    <title>老年大学</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/slick-carousel/1.6.0/slick.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/slick-carousel/1.6.0/slick-theme.min.css" rel="stylesheet">
    <script type="text/javascript">
    	function sb(){
    		var bc = new plus.barcode.Barcode('barcode');
			bc.setFlash(false);
			bc.onmarked=function(type, result){//扫描成功
			    plus.webview.show('barcodeSucceed','pop-in',100);
			    mui.fire(plus.webview.getWebviewById('barcodeSucceed'),'showResult'{result:result});
			    window.setTimeout(function(){
			            plus.webview.currentWebview().reload();
			    },1000);
			}
			bc.start();
    	}
    </script>
</head>

<body class="HolyGrail">
    <input type="button" value="点击扫码" onclick="sb()"/>
</body>

</html>