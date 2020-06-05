/*
======ʾ��=====
<style>
body{margin:20px;}
.focus{width:500px;position:relative;margin:auto;}
.frame{width:100%;height:100%;overflow:hidden;}
.frame .child{height:100%;float:left;}
.nav{}
.nav i{}
.nav i.now{}
.prev{}
.next{}
.title{}
.count{}
.count b{font-weight:normal;}
.count em{font-style:normal;}
</style>
<div class="focus"><a href="javascript:;" class="prev">&lt;</a><a href="javascript:;" class="next">&gt;</a>
  <div class="frame">
	<div class="child" style="background:#faa;" title="c1"></div>
	<div class="child" style="background:#afa;" title="c2"></div>
	<div class="child" style="background:#aaf;" title="c3"></div>
	<div class="child" style="background:#ffa;" title="c4"></div>
	<div class="child" style="background:#aff;" title="c5"></div>
  </div>
  <div class="nav">
	<i>1</i>
	<i>2</i>
	<i>3</i>
	<i>4</i>
	<i>5</i>
  </div>
  <div class="title"></div>
  <div class="count"><b></b>/<em></em></div>
</div>
<script>
$('.focus .frame').mScroll({
		     auto : 1,                   //�Զ���ʼ
		direction : "h",                 //��������,h����,v����
		    dtype : "left",              //��������
		  isfocus : 0,                   //�Ƿ���Ϊ����ͼ
		  minsize : 1,                   //��С����
		    speed : 500,                 //�����ٶ�
		   easing : "",                  //��������
			delay : 5000,                //�Զ��������
			  nav : ".focus .nav i",     //������ť
			event : "click",             //������ť�¼�����
        scrollnav : 0,                   //��������
    nav_direction : "h",                 //��������,h����,v����
			 prev : ".focus .prev",      //ǰһ��
			 next : ".focus .next",      //��һ��
		    index : ".focus .index",     //��ǰ���
			count : ".focus .count b",   //����
			title : ".focus .count em",  //����
			arrow : 1,                   //�Ƿ�ת
			cycle : 1,                   //�Ƿ�ѭ��
		mousestop : 1,                   //��껮��ֹͣ
	   mousewheel : 0,                   //���������¼�
	        touch : 0,                   //���������¼�
		 callback : function(idx){}      //�ص�����
});
</script>
===============
*/
//��������
/*
f=��������frame
s=frame�ڹ���Ԫ��
c=s����Ԫ��
n=������Ԫ��
np=������Ԫ��
ns=�����ڹ���Ԫ��
w,h=��������
ww,hh=ԭʼ�ܳ���
size=s����Ԫ��ԭʼ����
iv,ti=��ʱ��
sw=���ƿ���
idx=��ǰ���
cm=s����Ԫ�ر߾�
*/
(function($) {
	$.fn.mScroll = function(options) {
		var opts = $.extend({},$.fn.mScroll.defaults,options); 
		this.each(function(){
			//��ʼ������
			var f = $(this);
			var s,c,n,np,ns,w,ww,h,hh,wn,hn,size,iv,ti,sw=1,sw1=0,idx=0,ids=0,cm=0;
			//var tt=5000;
			
			//�����жϳ�ʼ��
			if(opts.cycle==0){opts.auto=0;}
			if(opts.touch==1){
				opts.minsize=1;
				opts.mousestop=0;
				opts.mousewheel=0;
			}
			
			function getMinsize(){
				if(typeof(opts.minsize)=="object"){
					var minsize=opts.minsize[0].size;
					for(var i=0;i<opts.minsize.length;i++){
						if($(window).width()>opts.minsize[i].width){
							minsize=opts.minsize[i].size;
						}
					}
					return minsize;
				}
				else{
					return opts.minsize;
				}
			}
			
			
			//����scroll�ṹ����ֵs
			if(f.children().is("ul") && f.children().size()>1 && !f.children().hasClass("child")){
				f.children().addClass("scroll");
			}
			else{
				f.children().wrapAll("<div class='scroll' style='height:100%;'></div>");
			}
			s = f.find(".scroll");
			
			//��ʼ��size
			size=s.children().size();			
			
			//����c���񣬸�ֵc
			if(opts.cycle==1 && size>getMinsize()){s.append(s.html());}
			c = s.children();
			
			//��ʼ������
			n = $(opts.nav);
			if(opts.scrollnav){
				wn = n.outerWidth()+parseInt(n.css("margin-left"))+parseInt(n.css("margin-right"));
				hn = n.outerHeight()+parseInt(n.css("margin-top"))+parseInt(n.css("margin-bottom"));
				np= $(opts.nav).parent();
				n.wrapAll("<div class='scroll' style='height:100%;'></div>");
				ns=np.find(".scroll");
				if(opts.nav_direction=="h"){
					ns.width(n.size()*wn);
					np.stop().animate({scrollLeft:0},100);
				}
				if(opts.nav_direction=="v"){
					ns.height(n.size()*hn);
					np.stop().animate({scrollTop:0},100);
				}
			}
			n.eq(0).addClass("now");
			
			//��ʼ����Ԫ�سߴ�
			if(opts.direction=="h"){
				setH();
				s.css({width:100000});
				f.stop().animate({scrollLeft:0},100);
			}
			if(opts.direction=="v"){		
				setV();		
				s.height(100000);				
				f.stop().animate({scrollTop:0},100);
			}
			//�ߴ����ú���
			function setH(){
				cm=parseInt(c.eq(1).css("margin-left"))+parseInt(c.eq(1).css("margin-right"));
				if(cm==0){
					w = Math.floor(f.width()/getMinsize());
					if(opts.isfocus!=1){
						f.width(w*getMinsize());
					}
					c.width(w);
				}
				else{					
					if(opts.isfocus!=1){
						w=c.width()+cm;
						f.width(w*getMinsize()-cm);
					}
				}
				ww=c.size()*w;
			}
			function setV(){
				cm=parseInt(c.css("margin-top"))+parseInt(c.css("margin-bottom"));
				if(cm==0){
					h = Math.floor(f.height()/getMinsize());
					if(opts.isfocus!=1){
						f.height(h*getMinsize());
					}
					c.height(h);
				}
				else{					
					if(opts.isfocus!=1){
						h=c.height()+cm;
						f.height(h*getMinsize()-cm);
					}
				}
				hh=c.size()*h;
			}
			
			//����title
			$(opts.count).text(size);
			$(opts.title).text(c.eq(0).attr("title"));
			$(opts.index).text(1);
			
			//����ͼ����Ӧ
			$(window).resize(function(){rs();});
			setTimeout(function(){rs();},300);
			
			//����Ӧ
			function rs(){
				sw==0;
				clearTimeout(ti);
				if(opts.direction=="h"){
					setH();
					f.stop().scrollLeft(idx*w);
				}
				if(opts.direction=="v"){
					setV();
					f.stop().scrollTop(idx*h);
				}
				ti=setTimeout(function(){
					sw=1;
				},500);
			}
			
			//�ж�c�����Ƿ����㿪ʼ����
			if(size>getMinsize()){
			
			//�Զ���ʼ
			if(opts.auto==1){
				run();
			}
			
			function run(){				
				var t=opts.delay;
				if(idx==0){
					//t=tt;
				}				
				clearTimeout(iv);
				iv=setTimeout(function(){
					move(opts.dtype);
					run();
				},t);
			}
			
			//ִ�лص�����
			if(typeof(opts.callback)=="function"){
				opts.callback(idx);
			}
			
			//-------------start-------------//
			//��������
			function move(act,speed){
				if(!speed){speed=opts.speed;}
				if(sw==1){
					sw=0;
					if(act=="left"){
						if(opts.cycle!=1){
							if(idx+getMinsize()<size){
								idx++;ids++;
								if(opts.direction=="h"){
									f.animate({scrollLeft:ids*w},speed,opts.easing,function(){sw=1;});
								}
								if(opts.direction=="v"){
									f.animate({scrollTop:ids*h},speed,opts.easing,function(){sw=1;});
								}
								
							}
							else{sw=1;}
						}
						if(opts.cycle==1){	
							if(idx==size-1){idx=0;}
							else{idx++;}
							ids++;
							if(opts.direction=="h"){
								f.animate({scrollLeft:ids*w},speed,opts.easing,function(){									
									if(f.scrollLeft()>=ww*0.5){f.scrollLeft(0);ids=0;}
									sw=1;
								});
							}
							if(opts.direction=="v"){
								f.animate({scrollTop:ids*h},speed,opts.easing,function(){
									if(f.scrollTop()>=hh*0.5){f.scrollTop(0);ids=0;}
									sw=1;
								});
							}
							
						}
					}
					if(act=="right"){
						if(opts.cycle!=1){
							if(idx>0){
								idx--;ids--;
								if(opts.direction=="h"){
									f.animate({scrollLeft:ids*w},speed,opts.easing,function(){sw=1;});
								}
								if(opts.direction=="v"){
									f.animate({scrollTop:ids*h},speed,opts.easing,function(){sw=1;});
								}
							}
							else{sw=1;}
						}
						if(opts.cycle==1){
							if(idx==0){idx=size-1;ids=size;}
							else{idx--;}
							ids--;
							if(opts.direction=="h"){
								if(f.scrollLeft()<=0){f.scrollLeft(ww*0.5);}
								f.animate({scrollLeft:ids*w},speed,opts.easing,function(){sw=1;});
							}
							if(opts.direction=="v"){
								if(f.scrollTop()<=0){f.scrollTop(hh*0.5);}
								f.animate({scrollTop:ids*h},speed,opts.easing,function(){sw=1;});
							}
						}
					}						
					n.removeClass("now");
					n.eq(idx).addClass("now");
					$(opts.title).text(c.eq(idx).attr("title"));
					$(opts.index).text(idx+1);					
					if(opts.scrollnav){autonav();}
					if(typeof(opts.callback)=="function"){
						opts.callback(idx);//ִ���Զ��嶯��
					}
				}
			}
			//���Ұ�ť
			if(opts.prev){
				$(opts.prev).hover(function(){sw=1;});
				$(opts.prev).click(function(){
					if(opts.arrow==1){move("right");}
					else{move("left");}
					if(opts.auto){
						//clearInterval(iv);
						//iv = window.setInterval(function(){move(opts.dtype);},opts.delay);
						run();
					}
				});
				
			}
			if(opts.next){
				$(opts.next).hover(function(){sw=1;});
				$(opts.next).click(function(){
					if(opts.arrow==1){move("left");}
					else{move("right");}
					if(opts.auto){
						//clearInterval(iv);
						//iv = window.setInterval(function(){move(opts.dtype);},opts.delay);
						run();
					}
				});
			}
			
			//����������ֻ�����ʾ
			function autonav(){
				if(opts.nav_direction=="h"){					
					if(idx*wn==np.scrollLeft()){
						np.stop().animate({scrollLeft:np.scrollLeft()-wn},opts.navspeed);
					}
					if((idx+1)*wn==np.scrollLeft()+np.width()){
						np.stop().animate({scrollLeft:np.scrollLeft()+wn},opts.navspeed);
					}
					if(idx==0){np.stop().animate({scrollLeft:0},opts.navspeed);}
					if(idx==size-1){np.stop().animate({scrollLeft:size*wn},opts.navspeed);}
				}
				if(opts.nav_direction=="v"){
					if(idx*hn==np.scrollTop()){
						np.stop().animate({scrollTop:np.scrollTop()-hn},opts.navspeed);
					}
					if((idx+1)*hn==np.scrollTop()+np.height()){
						np.stop().animate({scrollTop:np.scrollTop()+hn},opts.navspeed);
					}
					if(idx==0){np.stop().animate({scrollTop:0},opts.navspeed);}
					if(idx==size-1){np.stop().animate({scrollTop:size*hn},opts.navspeed);}
				}
			}
			//�������
			n.each(function(index, element) {
				$(this).bind(opts.event,function(){
					if(opts.direction=="h"){f.stop().animate({scrollLeft:index*w},opts.speed,opts.easing,function(){sw=1;});}
					if(opts.direction=="v"){f.stop().animate({scrollTop:index*h},opts.speed,opts.easing,function(){sw=1;});}
					idx=index;
					ids=index;
					n.removeClass("now");
					n.eq(idx).addClass("now");
					if(opts.scrollnav){autonav();}
					$(opts.title).text(c.eq(idx).attr("alt"));
					//ִ�лص�����
					if(typeof(opts.callback)=="function"){
						opts.callback(idx);
					}
					if(opts.auto){
						//clearInterval(iv);
						//iv = window.setInterval(function(){move(opts.dtype);},opts.delay);
						run();
					}						
				});
			});
			//������
			if(opts.mousewheel){
				f.mousewheel(function(event,delta,deltaX,deltaY){
					if(delta<0){
						if(opts.arrow==1){move("left");}
						else{move("right");}
					}
					else{
						if(opts.arrow==1){move("right");}
						else{move("left");}
					}
					event.stopPropagation();
					event.preventDefault();
				});
			}
			//��껮��ֹͣ
			if(opts.mousestop && !opts.mousewheel){
				f.hover(function(){sw=0},function(){sw=1});
			}
			
			var browser=navigator.appName 
				
			if(browser=="Microsoft Internet Explorer") { 
				var b_version=navigator.appVersion 
				var version=b_version.split(";"); 
				var trim_Version=version[1].replace(/[ ]/g,""); 
				
				if(!trim_Version=="MSIE8.0" && !trim_Version=="MSIE9.0"){
					//��������
					if(opts.touch){
						f.attr("id","frame"+f.offset().top);
						var touch,p0,fl,m;
						var obj1=document.getElementById(f.attr("id"));
						var start,end="";

						obj1.addEventListener('touchstart',function(event){
							if(sw==1){
								sw1=1;
								touch = event.targetTouches[0];
								if(opts.direction=="h"){
									p0=touch.screenX;
									start=touch.screenX;
									fl=f.scrollLeft();
									m=w;
								}
								if(opts.direction=="v"){
									p0=touch.screenY;
									start=touch.screenY;
									fl=f.scrollTop();
									m=h;
								}						
								if(opts.auto){
									clearInterval(iv);
								}
							}
						},false);
						obj1.addEventListener('touchmove',function(event){
							if(sw==1 && sw1==1){
								touch = event.targetTouches[0];
								if(opts.direction=="h"){
									f.scrollLeft(fl-(touch.screenX-p0));
									end=touch.screenX;
									if(Math.abs(touch.screenX-p0)>$(window).width()*0.05){
										event.preventDefault();//��ֹ�����Ĭ���¼�
									}
								}
								if(opts.direction=="v"){
									f.scrollTop(fl-(touch.screenY-p0));
									end=touch.screenY;
									if(Math.abs(touch.screenY-p0)>f.height()*0.05){

									}
									event.preventDefault();//��ֹ�����Ĭ���¼�
								}
							}
						},false);
						obj1.addEventListener('touchend',function(event){
							if(sw==1 && end!=""){
								if(end-start<m*-0.1){
									move("left",(m-Math.abs(end-start))/m*opts.speed);
								}
								else if(end-start>m*0.1){
									move("right",(m-Math.abs(end-start))/m*opts.speed);
								}
								else{
									sw=0;						
									if(opts.direction=="h"){
										f.stop().animate({scrollLeft:ids*m},opts.speed*0.5,opts.easing,function(){sw=1;});
									}
									else{
										f.stop().animate({scrollTop:ids*m},opts.speed*0.5,opts.easing,function(){sw=1;});
									}

								}
								if(opts.auto){
									//clearInterval(iv);
									//iv = window.setInterval(function(){move(opts.dtype);},opts.delay);
									run();
								}
								sw1=0;
								end="";
							}
						},false);
					}
				}
			}
			
			
				
			//-------------end-------------//
			}
		})
	};
	$.fn.mScroll.defaults = {
		     auto : 1,                    //�Զ���ʼ
		direction : "h",                  //��������,h����,v����
		    dtype : "left",               //��������
		  isfocus : 0,                    //�Ƿ���Ϊ����ͼ
		  minsize : 1,                    //��С����
		    speed : 500,                  //�����ٶ�
		   easing : "",                   //��������
			delay : 5000,                 //�Զ��������
			  nav : null,                 //������ť
			event : "click",              //�����¼�
        scrollnav : 0,                    //��������
		 navspeed : 500,                  //���������ٶ�
    nav_direction : "h",                  //��������,h����,v����
			 prev : null,                 //ǰһ��
			 next : null,                 //��һ��
		    index : null,                 //��ǰ���
			count : null,                 //����
			title : null,                 //����
			arrow : 1,                    //�Ƿ�ת
			cycle : 1,                    //�Ƿ�ѭ��
		mousestop : 1,                    //��껮��ֹͣ
	   mousewheel : 0,                    //���������¼�
	        touch : 0,                    //���������¼�
		 callback : function(idx){}       //�ص�����
	}
})(jQuery);