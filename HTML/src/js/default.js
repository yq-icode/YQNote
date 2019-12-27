$(function(){
	
	/*
	 * 根据二级标题和三级标题构建左栏菜单并添加锚点
	 */
	var _wsHtml = "";
	_wsHtml += "<dl>";
	var r2 = $('.r2-title');//层级2
	
	for(i=0;i<r2.length;i++){
		$(r2).eq(i).attr('id',('r2-' + i));//给二级标题赋ID
		_wsHtml += "<dt><a href='#" + $(r2).eq(i).attr('id') + "'>" + $(r2).eq(i).html() + "</a></dt>";
		_wsHtml += "<dd>";
		var r3 = $(r2).eq(i).next('.r2-body').find('.r3-title');//层级2下的层级3
		for(j=0;j<r3.length;j++){
			$(r3).eq(j).attr('id',('r3-' + i + '-' + j));//给三级标题赋ID
			_wsHtml += "<a href='#" + $(r3).eq(j).attr('id') + "'>" + $(r3).eq(j).html() + "</a>";
		}
		_wsHtml += "</dd>";
	}
	_wsHtml += "</dl>";
	$('#wside').append(_wsHtml);
	
	$('#wside a').on('click', function(){
		$('#wside a').removeClass('on');
		$(this).addClass('on');
	})
	
	/* 添加全局top按钮
	 */
	var toTop = "<a id='toTop' href='#' class='iconfont icon-ico-top'></a>";
	$('#wside').append(toTop);
	
	
	/* 添加footer
	 */
//	var footWrap = "<footer id='footer'></footer>";
//	$("body").append(footWrap);
//	$("#footer").load("/include/_footer.html");
	
	/*
	 * 动态生成文章数字
	 */
	var LNHtml = "<span class='ttBlock-list-icon'></span>";
	$('.ttBlock-list').prepend(LNHtml)
	
	/* 【浏览器兼容 browser-support】为浏览器兼容添加固定内容和标签
	 */
	var b_support = document.querySelectorAll('.browser-support');
	var b_num = b_support.length;
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
	if(reference_num > 0){
		$(reference).each(function(){
			var linkA = $(this).find('a');
			for(var i=0;i<linkA.length;i++){ //当引用地址有多个时
				$(linkA).eq(i).attr({
					'target' : '_blank'
				});
				var hrefTxt = '<u>' + $(linkA).eq(i).attr('href') + '</u>';
				if($(linkA).eq(i).html() != ''){
					$(linkA).eq(i).append(' < ' + hrefTxt + ' >');
				}else{
					$(linkA).eq(i).append(hrefTxt);
				}
			}
		})
	}
	
	/* 实例链接
	 */
	var expLk = document.querySelectorAll('.expLink');
	if(expLk.length > 0){
		$(expLk).each(function(){
			$(this).text('请查看实例演示');
			var _ifh = "<i class='iconfont icon-xiaoguo'></i>";
			$(this).attr('target','_blank').prepend(_ifh);
		})
	}
	
	/* 单独的链接引用
	 */
	var ref = document.querySelectorAll('.ref');
	if(ref.length > 0){
		$(ref).each(function(){
			$(this).attr('target','_blank').append($(this).attr('href'));
		})
	}
	
	/* 屏幕截图图片的处理：
	 * 1 将其缩放为100%;
	 * 2 图片存放目录：images/screenPics/
	 */
	var SPImgs = document.querySelectorAll("img[src*='images/screenPics/']");
	if(SPImgs.length > 0){
		for(var i=0;i<SPImgs.length;i++){
			var img = SPImgs[i];
			var imgSrc = img.getAttribute("src");
			if(imgSrc.indexOf("/screenPics/") > 0){
				img.classList.add("screenPics");
			}
		}
	}
	
})

/* 高亮显示关键字*/
function keyLight(ele, key, bgColor){
  	var sText = $(ele).html(),
	  	bgColor = bgColor,    
	  	sKey = "<span class='keyLight' style='background-color:" + bgColor + "'>" + key + "</span>",
	  	num = -1,
	  	rStr = new RegExp(key, "g"),
	  	rHtml = new RegExp("\<.*?\>","ig"), //匹配html元素
	  	aHtml = sText.match(rHtml); //存放html元素的数组
  	sText = sText.replace(rHtml, '{~}');  //替换html标签
  	sText = sText.replace(rStr,sKey); //替换key
  	sText = sText.replace(/{~}/g,function(){  //恢复html标签
    	num++;
    	return aHtml[num];
  	});

  	$(ele).html(sText);
}
$(function(){
	keyLight('#wmain','-jquery-');
})


//动态设置iframe高度，使其等于其内容页的高度，不出现垂直滚动条
function ifrHeightAuto(){
	if($('iframe').length > 0){
		$('iframe').each(function(){
			var ifr = this;
			var y = (ifr.contentWindow || ifr.contentDocument);
    		if(y.document)y = y.document;
			$(this).css('height', $(y).find('#wrap').height());
		})
	}
}

window.onload = function(){
	ifrHeightAuto();
}

/* 【article文章及DEMO页面自动添加fixed TOP及标题】
*/
function addArticleTop(){
	var pgTitle, //页面标题
		curUrl,  //页面URL
		_topHtml = "";
		
	curUrl = document.location.search; //从问号(?)开始的 URL（查询部分）
	if(curUrl.indexOf('?tit=') > -1){
		var tit = curUrl.substring(curUrl.indexOf('?tit=')+5,curUrl.length);
		pgTitle = decodeURI(tit); //参数为中文，用decodeURI解码防止乱码
	}
	
	_topHtml += "<div id='top'>";
	_topHtml += "<a href='' class='iconfont icon-bijiben logo'><span>YQ-NOTE</span></a>"
	_topHtml += "<a class='iconfont icon-shangyige back' onclick='window.history.back(-1)'><span>" + pgTitle + "</span></a>"
	_topHtml += "</div>";
	$('body').prepend(_topHtml);
//	$('#wrap').prepend("<h1 class='article-title'>" + pgTitle + "</h1>");
	$('#wrap').css("padding-top","60px");//因TOP固定，添加内容距浏览器顶端的边距
}

/* 读取XML文件(菜单主页面的列表)
 * 参数xmlUrl:  xml文件的路径及名称
 * 参数ele:     菜单列表最外层的HTML元素
 */
function loadXML(xmlUrl,ele){
	requestXML(xmlUrl,ele);
}
function requestXML(xmlUrl,ele){
	var xmlhttp = GetXmlHttpObject();
	if (xmlhttp == null){
    	alert ("您的浏览器不支持AJAX!");
    	return;
    }
	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			processData(this.responseXML,ele);//读取XML数据
		}
	}
	xmlhttp.open("GET",xmlUrl,true);
	xmlhttp.send();
	xmlHttp="";
	
	//此函数的作用是解决为不同浏览器创建不同的 xmlhttp对象的问题
	function GetXmlHttpObject(){
		var xmlhttp=null;
	  	try{
	    	xmlhttp = new XMLHttpRequest();//code for IE7+, Firefox, Chrome, Opera, Safari
	  	}
	  	catch(e){
	    	try{
	      		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");// Internet Explorer
	      	}
	    	catch(e){
	      		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");//code for IE6, IE5
	      	}
	    }
	  	return xmlhttp;
	}
}
//读取XML数据
function processData(data,ele){
	var xmlDoc = data; //xml数据
	
	//菜单列表的HTML结构
	var _HTML   = "";
	
	var NMainS, //xml结点<main>
		NMain,
		NSubS, //xml结点<sub>
		NSub,
		NFileS, //xml结点<file>
		FPath, //file文件路径
		FName, //file文件名
		FTitle; //file文件标题
	
	NMainS = xmlDoc.getElementsByTagName("main");
	for(var i=0;i<NMainS.length;i++){
		NMain = NMainS[i];
		_HTML += "<h3>" + NMain.getAttribute("title") + "</h3>";
		
		NSubS = NMain.getElementsByTagName("sub");
		
		//当<main>下包含<sub>时
		if(NSubS.length > 0){ 
			for(var k=0;k<NSubS.length;k++){
				NSub = NSubS[k];
				console.log("*********NSub title: " + NSub.getAttribute("title"));
				NFileS = NSub.getElementsByTagName("file");
				_HTML += "<dl class='dl-horizontal'>";
				_HTML += "<dt>" + NSub.getAttribute("title") + "</dt>";
				_HTML += "<dd>";
				_HTML += getFileHtml(NFileS);
				_HTML += "</dd>";
				_HTML += "</dl>";
			}
		}
		//当<main>下不包含<sub>时
		else{ 
			NFileS = NMain.getElementsByTagName("file");
			_HTML += "<p>";
			_HTML += getFileHtml(NFileS);
			_HTML += "</p>";
		}
	}
	//读取取<file>部分
	function getFileHtml(e){
		var _html = "";
		for(var j=0;j<e.length;j++){
			FPath = e[j].getElementsByTagName("path")[0].childNodes[0].nodeValue; //文件路径
			FName = e[j].getElementsByTagName("name")[0].childNodes[0].nodeValue; //文件名
			FTitle = e[j].getElementsByTagName("title")[0].childNodes[0].nodeValue; //文件标题
			if(FPath.indexOf("https://") > -1){
				_html += "<a target='_blank' href='" + FPath + "'>" + FTitle + "</a>";
			}
			else{
				_html += "<a href='" + FPath + FName + ".html?tit=" + FTitle + "' title='" + FTitle + "'>" + FTitle + "</a>";
			}
		}
		return _html;
	}
	
	$(ele).prepend(_HTML);
}


/* 已废弃、已过时
 */
function hovrTip(ele){
	var _html = "<h3>已废弃</h3>" +
				"<p>已废弃的元素或者属性意味着它已经过时。<br>废弃的元素在以后将会过时，但是浏览器会继续支持已废弃的元素。</p>" +
				"<h3>已过时</h3>" +
				"<p>已过时的元素和属性浏览器不再支持，W3C也不会再去定义它。</p>";
	
	var index;
	
	$(ele).hover(
		function(){
			index = layer.tips(_html, $(this), {
				tips: [1, '#333'],
				area: 'auto',
				maxWidth: 500,
				time: 0
			})
		},
		function(){
			layer.close(index);
		}
	)
}


