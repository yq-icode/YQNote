$(function(){
	
	/*
	 * 根据二级标题和三级标题构建左栏菜单并添加锚点
	 */
	var _wsHtml = "";
	_wsHtml += "<dl>";
	var r2 = $('.r2-title');//层级2
	
	for(i=0;i<r2.length;i++){
		$(r2).eq(i).attr('id',('r2-' + i));//给二级标题赋ID
		_wsHtml += "<dt><a href='#" + $(r2).eq(i).attr('id') + "'>" + $(r2).eq(i).text() + "</a></dt>";
		_wsHtml += "<dd>";
		var r3 = $(r2).eq(i).next('.r2-body').find('.r3-title');//层级2下的层级3
		for(j=0;j<r3.length;j++){
			$(r3).eq(j).attr('id',('r3-' + i + '-' + j));//给三级标题赋ID
			_wsHtml += "<a href='#" + $(r3).eq(j).attr('id') + "'>" + $(r3).eq(j).text() + "</a>";
		}
		_wsHtml += "</dd>";
	}
	_wsHtml += "</dl>";
	$('#wside').append(_wsHtml);
	
	$('#wside a').on('click', function(){
		$('#wside a').removeClass('on');
		$(this).addClass('on');
	})
	
	/*
	 * 动态生成文章数字
	 */
	var LNHtml = "<span class='ttBlock-list-icon'></span>";
	$('.ttBlock-list').prepend(LNHtml)
})
