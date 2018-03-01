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
	
	/* 【浏览器兼容 browser-support】为浏览器兼容添加固定内容和标签
	 */
	var b_support = document.querySelectorAll('.browser-support');
	var b_num = b_support.length;
	console.log("browser-support num: " + b_num);
	if(b_num > 0){
		$(b_support).each(function(){
			var b_summary = $(this).find('.summary').html();
			var addspan = b_summary.replace(/; /g,'</span><span>');/*用分号分隔浏览器*/
			$(this).prepend("<mark>兼容性</mark>");
			$(this).find('.summary').html("<span>" + addspan + "</span>");
		})
	}
	
	
	/* 【引用 reference】
	 */
	var reference = document.querySelectorAll('.reference');
	var reference_num = reference.length;
	console.log("reference num: " + reference_num);
	if(reference_num > 0){
		$(reference).each(function(){
			$(this).prepend("摘自：");
		})
	}
	
	$('#footer').load('_footer.html');
	
})

/* 【article页面添加TOP】
*/
function addArticleTop(){
	var _topHtml = "";
	_topHtml += "<div id='top'>";
	_topHtml += "<a href='' class='iconfont icon-bijiben logo'><span>YQ-NOTE</span></a>"
	_topHtml += "<a class='iconfont icon-shangyige back' onclick='history.go(-1)'><span>" + $('.article-title').html() + "</span></a>"
	_topHtml += "</div>";
	$('body').prepend(_topHtml);
}


