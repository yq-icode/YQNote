// JavaScript Document
$(document).ready(function(){
	shadboxFun();
})

function shadboxFun(){
	$('.showbox').click(function(){
		$('.popbox-container').fadeToggle();
		
		$('.popbox-overlay').css({
			"height": $(document).height() + 'px'
		})
		
		$(".popbox-wrapper").animate({
			height: 'toggle', opacity: 'toggle'
		}, "slow");
		
		var _height = $('#pw01').height();
		var _width = $('#pw01').width();
		
		$('#pw01').css({
			"left": ($(window).width() - _width)/2 + 'px'
		});
		
		var userAgent = window.navigator.userAgent.toLowerCase();
		var version = $.browser.version;
		
		if(version!="6.0"){//如果是非IE6
			$('.popbox-wrapper').css({
				"top": ($(window).height() - _height)/2 + $(window).scrollTop() + 'px'
			});
		}
	})
	
	$('.popbox-close').click(function(){
		$(".popbox-wrapper").animate({
			height: 'toggle', opacity: 'toggle'
		}, "slow");
		
		$('.popbox-container').fadeToggle();				
	})
}
