<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isErrorPage="true"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>404</title>
<script>"undefined"==typeof CODE_LIVE&&(!function(e){var t={nonSecure:"64590",secure:"64599"},c={nonSecure:"http://",secure:"https://"},r={nonSecure:"127.0.0.1",secure:"gapdebug.local.genuitec.com"},n="https:"===window.location.protocol?"secure":"nonSecure";script=e.createElement("script"),script.type="text/javascript",script.async=!0,script.src=c[n]+r[n]+":"+t[n]+"/codelive-assets/bundle.js",e.getElementsByTagName("head")[0].appendChild(script)}(document),CODE_LIVE=!0);</script></head>
<body style="background:none;" data-genuitec-lp-enabled="false" data-genuitec-file-id="wc2-18" data-genuitec-path="/community-front Maven Webapp/src/main/webapp/front_404.jsp">
    <p class="ds_center" data-genuitec-lp-enabled="false" data-genuitec-file-id="wc2-18" data-genuitec-path="/community-front Maven Webapp/src/main/webapp/front_404.jsp">
          抱歉，您访问的页面已经迷失了！<br />
    <a href="<%=basePath %>main.jsp">返回首页</a>
    </p>
</body>
</html>