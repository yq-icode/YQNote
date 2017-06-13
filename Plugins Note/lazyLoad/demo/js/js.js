// JavaScript Document

/******************************************************************
 注意：
 此处要用$(document).scrollTop()，不要用$(body).scrollTop()
 $(body).scrollTop()在chrome中起作用，在FF中不起作用，原因不明
 ******************************************************************/
function isFixBar(){
	var SFN = $('.S_FixedNav');
	
	//获取导航菜单和其索引
	var SFN_nav = $(SFN).find('a');
	var SFN_nav_index = SFN_nav.index();
	
	//获取导航的TOP偏移
	var SFN_offsetTopValue = $(SFN).offset().top;
	
	//获取每层的偏移值
	var f1 = $('#floor1').offset().top;
	var f2 = $('#floor2').offset().top;
	var f3 = $('#floor3').offset().top;
	
	$(window).scroll(function(){
		//获取滚动条滚动的距离
		var d_scrollTop = $(document).scrollTop();
		
		//根据滚动条的位置判断是否固定导航菜单
		if(d_scrollTop >= SFN_offsetTopValue){
			$(SFN).css({
				position:'fixed',
				top:'100px'
			});
		}
		else{
			$(SFN).css({position:'absolute', top:'200px'});
		}
		
		//根据滚动条滚动位置判断导航选中状态
		if(d_scrollTop < f1){
			$(SFN_nav).removeClass('on');
		}
		else if(d_scrollTop >= f1 && d_scrollTop < f2){
			$(SFN_nav).removeClass('on');
			$(SFN_nav).eq(0).addClass('on');
		}
		else if(d_scrollTop >= f2 && d_scrollTop < f3){
			$(SFN_nav).removeClass('on');
			$(SFN_nav).eq(1).addClass('on');
		}
		else if(d_scrollTop >= f3){
			$(SFN_nav).removeClass('on');
			$(SFN_nav).eq(2).addClass('on');
		}
	});
	
	//根据点击的导菜单航定位到相应的层
	$(SFN_nav).click(function(){
		$(SFN_nav).removeClass('on');
		$(this).addClass('on');	
	})
	
}