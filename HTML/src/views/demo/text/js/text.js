// JavaScript Document

//text-03
//*********************************************************
$(function(){
	var w_ul_successCase=0;
	$('.successCase .scrollbox ul li').each(function(){
		_w = $(this).width();
		w_ul_successCase = _w + w_ul_successCase;
	})
	$('.successCase .scrollbox ul').css({'width':w_ul_successCase});
	$('.successCase .scrollbox ul li:first').addClass('first');
	setInterval('scroll_horizon(".successCase .scrollbox")',Math.random()*1000+3546);
	
})
function scroll_horizon(obj){
	var scroll_width = $(obj).find('ul li:first').width();
	$(obj).find('ul').animate({
		marginLeft:-scroll_width + 'px'
	},800,function(){
		$(this).css({'margin-left':"0px"}).find("li:first").appendTo(this);
		$(obj).find('ul li').removeClass('first');
		$(obj).find('ul li:first').addClass('first');
	});
}

//text-04
//*********************************************************
$(function(){
	setInterval('scroll_singleV(".notice")',Math.random()*565+3590);
})
function scroll_singleV(obj){
	$(obj).find("ul:first").animate({
			marginTop:"-32px"
	},500,function(){
			$(this).css({'margin-top':"0px"}).find("li:first").appendTo(this);
	});
}
//text-06
//*********************************************************
/*$(function(){
	var pic_box = $('.text-06 .list');
	$(pic_box).find('li').hover(
		function(){
			$(this).animate({
				backgroundColor:'rgba(255,255,255,1)'
			}, 0);
		},
		function(){
			$(this).animate({
				backgroundColor:'rgba(255,255,255,0)'
			}, 0);
		}
	)
})*/