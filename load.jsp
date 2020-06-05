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
	<title>分页</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta http-equiv=X-UA-Compatible content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<style>
		.result {
			height: 80px;
			border-bottom: 1px solid #ececec;
			padding-top: 20px;
		}

		.result>img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			margin-left: 30px;
		}

		.result>span {
			margin-left: 30px;
		}
	</style>
</head>

<body>
	<div class="ajax_option">
	
	</div>
	<script src="js/jquery-1.10.2.min.js"></script>
	<script src="js/pagination/jquery.pagination.js"></script>
	<script type="text/javascript">
		/* 获取当前服务器地址 */
		function getRootPath() {
			//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
			var curWwwPath = window.document.location.href;
			//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
			var pathName = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathName);
			//获取主机地址，如： http://localhost:8083
			var localhostPaht = curWwwPath.substring(0, pos);
			//获取带"/"的项目名，如：/uimcardprj
			var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
			return (localhostPaht + projectName + "/");
		}
		var httpXhr = getRootPath();

		/* 地址栏参数截取 */
		function GetQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		};
		var aid = GetQueryString("aid"); //活动ID
		if (aid != null && aid.toString().length > 1) {
			var aid = aid;
		}
		var c_id = GetQueryString("c_id"); //课程ID
		if (c_id != null && c_id.toString().length > 1) {
			var c_id = c_id;
		}
		var list = GetQueryString("list");
		if (list != null && list.toString().length > 1) {
			var list = list;
		}
		var id = '<%=id%>';
		var param="";
		if(aid!=null){
			param=aid;
		}
		else{
			param=c_id;
		}
		$(function () {
			$.ajax({
				type: "post",
				url: httpXhr + "messageTableController/messageTableList.do?pc=1&mt_type=1&tj=1" + "&w_id=" + param,
				dataType: "json",
				success: function (data) {
					if (data.code == "200") {
						var str = "";
						var jsonL = data.data.rows.length;
						for (var i = 0; i < jsonL; i++) {//userBVo u_url
							var img = encodeURI(encodeURI(data.data.rows[i].u_url));
							var fileUrl = httpXhr + "getFileController/getFile.do?fileName=" + img;
							str += "<div class=\"result\"><img src=\"" + fileUrl + "\"/><span>" + data.data.rows[i].mt_des + "</span></div>";
						}
						$(".ajax_option").html(str);
						function pageselectCallback(page_index, jq) {
							$("#Searchresult").children().remove();
							var new_content = "";
							var page_index = page_index + 1;
							var index = "";
							if (page_index * 4 > jsonL) {
								index = jsonL;
							} else {
								index = page_index * 4
							}
							for (var i = (page_index - 1) * 4; i < index; i++) {
								new_content = $("#hiddenresult div.result:eq(" + i + ")").clone();
								$("#Searchresult").append(new_content); //装载对应分页的内容
							}
							return false;
						}
						$("#Pagination").pagination(jsonL, {
							num_edge_entries: 1, //边缘页数
							num_display_entries: 3, //主体页数
							callback: pageselectCallback,
							items_per_page: 4, //每页显示1项  
							prev_text: "前一页",
							next_text: "后一页"
						});
					}
				}
			});
		})

	</script>
</body>

</html>