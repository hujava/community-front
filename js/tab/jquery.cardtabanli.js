jQuery.fn.cardTabs = function(options){

	var mainClass =  $(this).attr('class');
	var activeCount = 0;

	var settings = $.extend({
        theme: '',
     }, options );

	// Initializing
	var htmlInner = $(this).html();
	var stack = $('<div />').addClass('card-tabs-stack').html(htmlInner);
	var bar = $('<div />').addClass('card-tabs-bar');

	$('.' + mainClass).children('div[data-tab]').each(function(){
		bar.append($('<a />').attr('href', 'javascript:void(0);').data('tab', $(this).data('tab')).append($(this).data('tab')));
	});

	$('.' + mainClass).html('').append(bar).append(stack);


	// Fixing the theme
	if(settings.theme != ''){
		$('.' + mainClass + ' .card-tabs-bar').addClass(settings.theme);
		$('.' + mainClass + ' .card-tabs-stack').addClass(settings.theme);
	}
    var bool=false;
	function toggleTab(obj){
	/*	$('.' + mainClass + " .card-tabs-stack div[data-tab][data-tab='" + obj[0].innerHTML + "']").show();
		$('.' + mainClass + " .card-tabs-stack div[data-tab][data-tab!='" + obj[0].innerHTML + "']").hide();*/

		/* 点击定位 */
		if(obj[0].innerHTML=="案例介绍"){
			if(bool==false){
                $("html, body").animate({scrollTop: $(".mok1").offset().top}, {duration: 500,easing: "swing"});
			}else {
                $("html, body").animate({scrollTop: $(".mok1").offset().top}, {duration: 500,easing: "swing"});
                bool=true;
			}
            return false;
		}else if(obj[0].innerHTML=="案例成果"){
			if(bool==false){
				$("html, body").animate({scrollTop: $(".mok2").offset().top-80 }, {duration: 500,easing: "swing"});
			}else {
				$("html, body").animate({scrollTop: $(".mok2").offset().top-50 }, {duration: 500,easing: "swing"});
                bool=true;
			}
			bool=true;
            return false;
		}else if(obj[0].innerHTML=="评价"){
			if(bool==false){
				$("html, body").animate({scrollTop: $(".mok3").offset().top-80 }, {duration: 500,easing: "swing"});
			}else {
				$("html, body").animate({scrollTop: $(".mok3").offset().top-50 }, {duration: 500,easing: "swing"});
                bool=true;
			}
			bool=true;
            return false;
        }else if(obj[0].innerHTML=="案例资料"){
			if(bool==false){
				$("html, body").animate({scrollTop: $(".mok4").offset().top-80 }, {duration: 500,easing: "swing"});
			}else {
				$("html, body").animate({scrollTop: $(".mok4").offset().top-50 }, {duration: 500,easing: "swing"});
                bool=true;
			}
			bool=true;
            return false;
        }

	}

	// Checking whether we have to set a tab as active
    $('.' + mainClass + ' .card-tabs-stack').children('div[data-tab]').each(function () {
    	if($(this).hasClass('active')){
    		$('.' + mainClass + " .card-tabs-bar a[data-tab='" + $(this).data('tab') + "']").addClass('active');
    		toggleTab($(this));
    		$(this).removeClass('active');
    		activeCount++;
    	}
	});

	// Otherwise, it's the first one, and the first tab in the bar needs to be active
	if(activeCount == 0){
		$('.' + mainClass + ' .card-tabs-bar a:first-child').addClass('active');
	}

	$('.' + mainClass + ' .card-tabs-bar a').click(function(){
		$('.' + mainClass + ' .card-tabs-bar a').removeClass('active');
		$(this).addClass('active');
		toggleTab($(this));
	});

	return this;
};