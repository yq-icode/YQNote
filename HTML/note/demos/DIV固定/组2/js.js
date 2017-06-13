// JavaScript Document

/******************************************************************
 注意：
 此处要用$(document).scrollTop()，不要用$(body).scrollTop()
 $(body).scrollTop()在chrome中起作用，在FF中不起作用，原因不明
 ******************************************************************/
function isFixBar(){
	var obj = $('.isFixBar');
	var obj_offsetTopValue = $(obj).offset().top;
	
	$(window).scroll(function(){
		
		if($(document).scrollTop() >= obj_offsetTopValue){
			$(obj).css({
				position:'fixed'
			});
		}
		else{
			$(obj).css({position:'relative'});
		}
	});
	
}