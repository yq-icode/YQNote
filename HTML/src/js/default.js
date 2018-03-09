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
			var linkA = $(this).find('a');
			$(this).prepend("摘自：");
			for(var i=0;i<linkA.length;i++){ //当引用地址有多个时
				$(linkA).eq(i).attr({
					'target' : '_blank'
				});
				$(linkA).eq(i).text($(linkA).eq(i).attr('href'));
			}
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
	
	/* 添加全局top按钮
	 */
	var toTop = "<a id='toTop' href='#' class='iconfont icon-ico-top'></a>";
	$('body').append(toTop);
	
	$('#footer').load('_footer.html');
	
})

/* 【article文章及DEMO页面自动添加fixed TOP】
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
	_topHtml += "<a class='iconfont icon-shangyige back' onclick='history.go(-1)'><span>" + pgTitle + "</span></a>"
	_topHtml += "</div>";
	$('body').prepend(_topHtml);
	$('body').css("padding-top","60px");//因TOP固定，添加内容距浏览器顶端的边距
}

/* 读取fileList.xml文件
 * 参数xmlUrl:  xml文件的路径
 * 参数sort:    菜单类别，即css|js|mobile|axure等
 * 参数ele:     菜单列表最外层的HTML元素
 */
function loadXMLDoc(xmlUrl,sort,ele){
	request(xmlUrl,sort,ele);
}
function request(xmlUrl,sort,ele){
	var xmlhttp = GetXmlHttpObject();
	if (xmlhttp == null){
    	alert ("您的浏览器不支持AJAX!");
    	return;
    }
	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			processData(this.responseXML,sort,ele);//读取XML数据
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
function processData(data,sort,ele){
	var xmlDoc = data; //xml数据
	
	//各菜单列表的HTML结构
	var _H_HTML   = "",
		_H_CSS    = "",
		_H_JS     = "",
		_H_MOBILE = "",
		_H_AXURE  = "",
		_H_DEMO   = "";
	
	var NMainS, //xml结点<main>
		NMain,
		NCategoryS, //xml结点<category>
		NCategory,
		NFileS, //xml结点<file>
		FPath, //file文件路径
		FName, //file文件名
		FTitle; //file文件标题
	
	NMainS = xmlDoc.getElementsByTagName("main");
	for(var i=0;i<NMainS.length;i++){
		NMain = NMainS[i];
		//HTML
		if(NMain.getAttribute("sort") == 'HTML'){
			NCategorys = NMain.getElementsByTagName("category");
			for(var k=0;k<NCategorys.length;k++){
				NCategory = NCategorys[k];
				console.log("*********category title: " + NCategory.getAttribute("title"));
				_H_HTML += "<h3>" + NCategory.getAttribute("title") + "</h3>";
				_H_HTML += "<ul>";
				NFileS = NCategory.getElementsByTagName("file");
				for(var j=0;j<NFileS.length;j++){
					FPath = NFileS[j].getElementsByTagName("path")[0].childNodes[0].nodeValue; //文件路径
					FName = NFileS[j].getElementsByTagName("name")[0].childNodes[0].nodeValue; //文件名
					FTitle = NFileS[j].getElementsByTagName("title")[0].childNodes[0].nodeValue; //文件标题
					console.log("file " + j + " : " + FTitle);
					_H_HTML += "<li>";
					if(FPath.indexOf("https://") > -1){
						_H_HTML += "<a target='_blank' href='" + FPath + "'>" + FTitle + "</a>";
					}
					else{
						_H_HTML += "<a href='" + FPath + FName + ".html?tit=" + FTitle + "'>" + FTitle + "</a>";
					}
					_H_HTML += "</li>";
				}
				_H_HTML += "</ul>";
			}
		}
		//CSS
		if(NMain.getAttribute("sort") == 'CSS'){
			NCategorys = NMain.getElementsByTagName("category");
			for(var k=0;k<NCategorys.length;k++){
				NCategory = NCategorys[k];
				console.log("*********category title: " + NCategory.getAttribute("title"));
				_H_CSS += "<h3>" + NCategory.getAttribute("title") + "</h3>";
				_H_CSS += "<ul>";
				NFileS = NCategory.getElementsByTagName("file");
				for(var j=0;j<NFileS.length;j++){
					FPath = NFileS[j].getElementsByTagName("path")[0].childNodes[0].nodeValue; //文件路径
					FName = NFileS[j].getElementsByTagName("name")[0].childNodes[0].nodeValue; //文件名
					FTitle = NFileS[j].getElementsByTagName("title")[0].childNodes[0].nodeValue; //文件标题
					console.log("file " + j + " : " + FTitle);
					_H_CSS += "<li>";
					if(FPath.indexOf("https://") > -1){
						_H_CSS += "<a target='_blank' href='" + FPath + "'>" + FTitle + "</a>";
					}
					else{
						_H_CSS += "<a href='" + FPath + FName + ".html?tit=" + FTitle + "'>" + FTitle + "</a>";
					}
					_H_CSS += "</li>";
				}
				_H_CSS += "</ul>";
			}
		}
		//JS
		if(NMain.getAttribute("sort") == 'JS'){
			NCategorys = NMain.getElementsByTagName("category");
			for(var k=0;k<NCategorys.length;k++){
				NCategory = NCategorys[k];
				console.log("*********category title: " + NCategory.getAttribute("title"));
				_H_JS += "<h3>" + NCategory.getAttribute("title") + "</h3>";
				_H_JS += "<ul>";
				
				NFileS = NCategory.getElementsByTagName("file");
				for(var j=0;j<NFileS.length;j++){
					FPath = NFileS[j].getElementsByTagName("path")[0].childNodes[0].nodeValue; //文件路径
					FName = NFileS[j].getElementsByTagName("name")[0].childNodes[0].nodeValue; //文件名
					FTitle = NFileS[j].getElementsByTagName("title")[0].childNodes[0].nodeValue; //文件标题
					console.log(j + " : " + FTitle);
					_H_JS += "<li>";
					if(FPath.indexOf("https://") > -1){
						_H_JS += "<a target='_blank' href='" + FPath + "'>" + FTitle + "</a>";
					}
					else{
						_H_JS += "<a href='" + FPath + FName + ".html?tit=" + FTitle + "'>" + FTitle + "</a>";
					}
					_H_JS += "</li>";
				}
				_H_JS += "</ul>";
			}
		}
		//MOBILE
		if(NMain.getAttribute("sort") == 'MOBILE'){
			NCategorys = NMain.getElementsByTagName("category");
			for(var k=0;k<NCategorys.length;k++){
				NCategory = NCategorys[k];
				console.log("*********category title: " + NCategory.getAttribute("title"));
				_H_MOBILE += "<h3>" + NCategory.getAttribute("title") + "</h3>";
				_H_MOBILE += "<ul>";
				NFileS = NCategory.getElementsByTagName("file");
				for(var j=0;j<NFileS.length;j++){
					FPath = NFileS[j].getElementsByTagName("path")[0].childNodes[0].nodeValue; //文件路径
					FName = NFileS[j].getElementsByTagName("name")[0].childNodes[0].nodeValue; //文件名
					FTitle = NFileS[j].getElementsByTagName("title")[0].childNodes[0].nodeValue; //文件标题
					console.log("file " + j + " : " + FTitle);
					_H_MOBILE += "<li>";
					if(FPath.indexOf("https://") > -1){
						_H_MOBILE += "<a target='_blank' href='" + FPath + "'>" + FTitle + "</a>";
					}
					else{
						_H_MOBILE += "<a href='" + FPath + FName + ".html?tit=" + FTitle + "'>" + FTitle + "</a>";
					}
					_H_MOBILE += "</li>";
				}
				_H_MOBILE += "</ul>";
			}
		}
		//AXURE
		if(NMain.getAttribute("sort") == 'AXURE'){
			NCategorys = NMain.getElementsByTagName("category");
			for(var k=0;k<NCategorys.length;k++){
				NCategory = NCategorys[k];
				console.log("*********category title: " + NCategory.getAttribute("title"));
				_H_AXURE += "<h3>" + NCategory.getAttribute("title") + "</h3>";
				_H_AXURE += "<ul>";
				NFileS = NCategory.getElementsByTagName("file");
				for(var j=0;j<NFileS.length;j++){
					FPath = NFileS[j].getElementsByTagName("path")[0].childNodes[0].nodeValue; //文件路径
					FName = NFileS[j].getElementsByTagName("name")[0].childNodes[0].nodeValue; //文件名
					FTitle = NFileS[j].getElementsByTagName("title")[0].childNodes[0].nodeValue; //文件标题
					console.log("file " + j + " : " + FTitle);
					_H_AXURE += "<li>";
					if(FPath.indexOf("https://") > -1){
						_H_AXURE += "<a target='_blank' href='" + FPath + "'>" + FTitle + "</a>";
					}
					else{
						_H_AXURE += "<a href='" + FPath + FName + ".html?tit=" + FTitle + "'>" + FTitle + "</a>";
					}
					_H_AXURE += "</li>";
				}
				_H_AXURE += "</ul>";
			}
		}
		//DEMO
		if(NMain.getAttribute("sort") == 'DEMO'){
			NCategorys = NMain.getElementsByTagName("category");
			for(var k=0;k<NCategorys.length;k++){
				NCategory = NCategorys[k];
				console.log("*********category title: " + NCategory.getAttribute("title"));
				_H_DEMO += "<dt><label>" + NCategory.getAttribute("title") + "</label></dt>";
				_H_DEMO += "<dd class='tag-group'>";
				NFileS = NCategory.getElementsByTagName("file");
				for(var j=0;j<NFileS.length;j++){
					FPath = NFileS[j].getElementsByTagName("path")[0].childNodes[0].nodeValue; //文件路径
					FName = NFileS[j].getElementsByTagName("name")[0].childNodes[0].nodeValue; //文件名
					FTitle = NFileS[j].getElementsByTagName("title")[0].childNodes[0].nodeValue; //文件标题
					console.log("file " + j + " : " + FTitle);
					if(FPath.indexOf("https://") > -1){
						_H_DEMO += "<a target='_blank' href='" + FPath + "'>" + FTitle + "</a>";
					}
					else{
						_H_DEMO += "<a href='" + FPath + FName + ".html?tit=" + FTitle + "'>" + FTitle + "</a>";
					}
				}
				_H_DEMO += "</dd>";
			}
		}
	}
	//在对应的菜单下显示各自的菜单列表
	switch (sort){
		case "html":
			$(ele).prepend(_H_HTML);
			break;
		case "css":
			$(ele).prepend(_H_CSS);
			break;
		case "js":
			$(ele).prepend(_H_JS);
			break;
		case "mobile":
			$(ele).prepend(_H_MOBILE);
			break;
		case "axure":
			$(ele).prepend(_H_AXURE);
			break;
		case "demo":
			$(ele).prepend(_H_DEMO);
			aded();//为标签设置随机颜色
			break;	
		default:
			break;
	}
}
/* 为TAGS页面的标签设置随机颜色
 */
function aded(){
	var tag_group = $('.tag-group');	
	$(tag_group).find('a').each(function(index, element) {
		var num = Math.round(Math.random()*7+1);
		$(this).removeClass().addClass('color-'+num);
    });
}
