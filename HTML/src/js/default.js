$(function(){
	//左栏菜单选中样式
	$('#wside a').on('click', function(){
		$('#wside a').removeClass('on');
		$(this).addClass('on');
	})
})
