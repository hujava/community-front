
//  var $k=jQuery.noConflict();   $重置
$(function(){

	$(".body_box").css({"minHeight":$(window).height() - $(".footer").innerHeight() - $(".header").height()});

	$(window).scroll(function(){
		if($(window).width>750){
			if($(window).scrollTop()>=111){
				$(".header").addClass("header_small")
			}else{
				$(".header").removeClass("header_small")
			}
		}
	})
	
	$(".gotop").click(function(){
		$("html").animate({scrollTop:0},400+$(window).scrollTop()*0.3);
		if(navigator.appVersion.match("WebKit")){
			$("body").animate({scrollTop:0},400+$(window).scrollTop()*0.3);
		}
		else{
			$("html").animate({scrollTop:0},400+$(window).scrollTop()*0.3);
		}
	});
	
	$(window).scroll(function(){
		if($(window).scrollTop()>200){
			$(".right_navbar").fadeIn();
		} else { 
			$(".right_navbar").fadeOut();
		}
	});
	/*搜索按钮事件*/ 
	$(".header .search .a").on("click",function(e){
		e.preventDefault();
		e.stopPropagation();
		$(".header .search").toggleClass("on");
		$(".header .search_w").fadeToggle(100);
	})



    $(".search_w").click(function(){
        return false;
    });
    $(document).click(function(){
        $(".header .search").removeClass("on");
        $(".header .search_w").hide();
    })
    

    if($(window).width()<=1600){ $("body").addClass("w_1660"); }else{ $("body").removeClass("w_1660"); };
    if($(window).width()<=750){ $("body").removeClass("w_1660"); }

	$(window).resize(function(){
    	if($(window).width()<=1660){ $("body").addClass("w_1660"); }else{ $("body").removeClass("w_1660"); };
     	if($(window).width()<=750){ $("body").removeClass("w_1660"); }
	});


	$(".header .nav li").hover(function(){
		if($(window).width()>750){
			$(this).find(".secondNav").fadeIn(300);
		}
	},function(){
		if($(window).width()>750){
			$(this).find(".secondNav").stop().hide();
		}
	})

	$(".header .nav li i").on("click",function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass("on").closest("li").siblings().find("i").removeClass("on")
		$(this).closest("li").siblings().find(".secondNav").slideUp(300)
		$(this).siblings(".secondNav").stop().slideToggle(300)
	})


	/*导航按钮事件*/
	$(".menu_h").click(function(){
		if(!$("body").hasClass('menu-open')){
			$("body").addClass("menu-open");
			unWinScroll();
		}else{
			$("body").removeClass("menu-open");
			enWinScroll();
		}
	});

	$(".body_bg").click(function(){
		$("body").removeClass("menu-open");
		enWinScroll();
	});

	scrollPosfix('side-bar');
	
	$('.side-bar').mCustomScrollbar({
		advanced:{autoExpandHorizontalScroll:true}
	});
	
	//	锚点跳转
	$('.side-item,.secondNav a').on('click', function(){
		var data = $(this).data('ahcnor');
		var ahcnor = $('.side-bar').nextAll();
		
		ahcnor.each(function(){
			if($(this).data('ahcnor') - data == 0){
				$('body, html').stop().animate({scrollTop: $(this).offset().top - $('.header').height()}, Math.abs($(this).offset().top - $(window).scrollTop()) * 0.3);
			}
		});
	});
	

	//	tab切换模块
	$('.tab-wrap').each(function(){
		var _this = $(this);
		var _bar = _this.children('.tab-bar');
		var _term = _bar.find('.tab-term');
		var _cont = _this.children('.tab-cont');
		var _item = _cont.children('.tab-item');
		
		if(_bar.find('.cur').length<1){
			_term.eq(0).addClass('cur');
		}
		var _cur = _bar.find('.cur');

		_item.eq(_cur.index()).addClass('act');
		_term.hover(function(){
			var $this = $(this);
			if(!$this.hasClass('cur')){
				$this.addClass('cur').siblings('.tab-term').removeClass('cur');
				_item.eq($this.index()).addClass('act').siblings('.tab-item').removeClass('act');
			}
		});
	});

	// 添加锚点
	$(".nav li").each(function(i){$(this).find(".secondNav a").addClass("mao_"+i)});
// 
})

//全局js
$(function(){
//start

	if($(window).width()<=750){
		htmlsize();
	}

	$(window).resize(function(){
		if($(window).width()<=750){
			htmlsize();
		}
	});


});

/*	fixed定位元素的横向滚动显示	*/
function scrollPosfix(ele){
	foo();
	
	$(window).on('scroll', foo);
	
	function foo(){
		var posEle = $('.'+ele);
		if($(window).scrollLeft()>0){
			if(posEle.hasClass(ele)){
				posEle.css('margin-left', -$(window).scrollLeft() + 'px');
			}else{
				posEle.css('margin-left', '0px');
				posEle = null;
			}
		}
	}
}
	
/*	禁止窗口滚动	*/
function unWinScroll(){
	var top = $(window).scrollTop();
	$('body').css({'position':'fixed','top':-top + 'px','width':'100%'}).data('winScroll',top);
}

/*	释放窗口滚动	*/
function enWinScroll(){
	$('body').removeAttr('style');
	$(window).scrollTop($('body').data('winScroll'));
}

function htmlsize(){
	var ww;
	var maxw=750;
	var minw=320;
	if($(window).width()>maxw){ww=maxw;}
	else if($(window).width()<minw){ww=minw;}
	else{
		ww=$(window).width();
	}
	$("html").css({fontSize:(ww/maxw)*100});
}


function addC(ele){
	$(ele).each(function(index,elements){
		$(this).addClass("list_"+index)
	})
}
function offset(ele){
	return $(ele).offset().top
}
function scorllAnimate(ele){
		var _offsetAnimate = $(ele).offset().top 
		var _scroll1Animate = $(window).scrollTop() + $(window).height()/1.5;
		if(_scroll1Animate >= _offsetAnimate){$(ele).addClass("anim")}
		// else{$(ele).removeClass("anim")}
}


function scroll(ele){
	$(document).find(ele).mCustomScrollbar({
		mouseWheelPixels:800,
        horizontalScroll: false,
        scrollInertia:500,
        mouseWheelPixels:50,
        advanced: {
            updateOnContentResize: true,
            updateOnBrowserResize: true,
            autoExpandHorizontalScroll: true
        }
    });
}



$(function(){

	$(document).on("click",".sc_com dt a",function(e){
	        e.preventDefault();
	        e.stopPropagation();
	        if($(this).closest(".sc_com").hasClass("ieopen")){
	            $(".ieopen").removeClass("ieopen")
	        }else{
	            $(".ieopen").removeClass("ieopen")
	            $(this).closest(".sc_com").toggleClass("ieopen");
	        }
	})

    $(document).on("click", ".select-box dd a", function (e) {
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parents(".select-box").find("dt b").html($(this).html());
        var _val = $(this).data("val")
        $(this).closest(".select-box").find("dt input").val(_val)
    })
    $(document).bind("click",function () {
        $(".sc_com").removeClass("ieopen");

    })
    if($(".select_a").size()>=1){
    	scroll(".select_a")
    }


})