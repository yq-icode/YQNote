// JavaScript Document
function shadboxFun(objId){
	var obj = "#"+objId;  //对象ID
	
	$('.popbox-container').fadeToggle();
	$('.popbox-overlay').css({
		"height": $(document).height() + 'px'
	})
	
	var _height = $(obj).height();
	var _width = $(obj).width();
	
	//获取对象距离窗口上部和左部的距离
	var _top = ($(window).height() - _height)/2 + "px";
	var _left = ($(window).width() - _width)/2 + 'px';
	$(obj).css({"left":_left});
	
	$(obj).animate({
		opacity: 'toggle', top: _top
	}, "slow",function(){
			var userAgent = window.navigator.userAgent.toLowerCase();
			var version = $.browser.version;
			
			if(version!="6.0"){//如果是非IE6
				$(obj).css({
					"top": ($(window).height() - _height)/2 + 'px'
				});
			}
			if(version=="6.0"){//如果IE6
				$(obj).css({
					"top": ($(window).height() - _height)/2 + $(window).scrollTop() + 'px'
				});
			}
		});
}
$(document).ready(function(){
	//点击关闭按钮关闭弹出框
	$('.popbox-close').click(function(){
		$(this).parents('.popbox-wrapper').animate({
			opacity: 'toggle',top: '0px'
		}, "slow");
		
		$('.popbox-container').fadeToggle();				
	})
	
	//点击空白处关闭弹出框
	$('.popbox-overlay').click(function(){
		$(this).siblings('.popbox-wrapper').animate({
			opacity: 'hide',top: '0px'
		}, "slow");
		
		$('.popbox-container').fadeOut();				
	})
})
