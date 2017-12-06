// JavaScript Document

function picSwitch(){
	$(".picSwitch > ul").find('a').click(function(){
												  
		var picSWrap = $(this).parents('.picSwitch');
		var img_large = $(picSWrap).find('.largeImg').find('img');
		
		$(picSWrap).find("ul").find('a').removeClass('on');
		$(this).addClass('on');
		
		//获取要传给大图的src alt属性
		var largePath = $(this).attr("href");
		var largeAlt = $(this).attr("title");
		
		//为大图设置src alt属性
		$(img_large).attr({ src: largePath, alt: largeAlt });
		
		$(picSWrap).find('.largeImg').find('.imgtxt').find('span').html(" (" + largeAlt + ")");
		
		return false;
	});
	
}