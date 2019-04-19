function imgscroll(){
	var scrollImgWrap = $('.scrollWrap');
	var imgsBox = $(scrollImgWrap).find('ul');
	var btn_left = $(scrollImgWrap).find('.btn-left');
	var btn_right = $(scrollImgWrap).find('.btn-right');
	var imgLargeBox = $('.picLarge');
	
	var showarea = $(scrollImgWrap).find('.mask').width(); //获取显示区域的宽度
	var posLeft = $(imgsBox).position().left; //左偏移值
	var img_width = $(imgsBox).find('li').outerWidth(true); //获取每张图片的宽度
	var img_moveNum = 3; //每次移动图片的数量，此数值可以更改，可以一次移动一张图片，也可以一次移动多张图片；
	var moveDistance = img_width * img_moveNum; //每次移动的距离；
	var img_num = $(imgsBox).find('li').length; //获取图片的数量
	var imgs_width = img_width * img_num; //计算所有图片总的宽度
	
	imgsBox.css({'width':imgs_width}); //给包含所有图片的标签设置宽度
	$('#xmlist dd').eq(0).addClass('on'); //默认选中第一项
	$(imgsBox).find('li').eq(0).addClass('on'); //默认选中第一张图片
	setBtnState(posLeft); //初始时只能右移
	
	//设置按钮状态
	function setBtnState(n){
		posLeft = n;
		if(posLeft == 0){
			$(btn_left).find('span').addClass('disable');
			$(btn_right).find('span').removeClass('disable');
			if(imgs_width <= showarea){
				$(btn_right).find('span').addClass('disable');
			}
		}
		if((imgs_width + posLeft > showarea) && posLeft < 0){
			$(btn_left).find('span').removeClass('disable');
			$(btn_right).find('span').removeClass('disable');
		}
		if(imgs_width + posLeft == showarea){
			$(btn_left).find('span').removeClass('disable');
			$(btn_right).find('span').addClass('disable');
		}
	}
	
	//右移
	$(btn_right).click(function(){
		var dis = imgs_width + posLeft - showarea;
		if(posLeft <= 0 && imgs_width > showarea){
			if(dis >= moveDistance){
				posLeft = posLeft - moveDistance;
			}
			else{
				posLeft = showarea - imgs_width;
			}
			$(imgsBox).animate({left: posLeft}, '50', setBtnState(posLeft));
		}
	})
	
	//左移
	$(btn_left).click(function(){
		if(Math.abs(posLeft) >= moveDistance){
			posLeft = posLeft + moveDistance;
		}
		else{
			posLeft = 0;
		}
		$(imgsBox).animate({left: posLeft}, '50', setBtnState(posLeft));
	})
	
	//点击缩略图切换大图
	$(imgsBox).find('li').click(function(){
		$(this).addClass('on').siblings('li').removeClass('on');
		
		//切换大图
		var imgLargeSrc = $(this).find('img').attr('src');
		$(imgLargeBox).html("<img src='" + imgLargeSrc + "' alt='' />");
		
		//选中左侧对应的项目名
		var xmId = $(this).attr('data-xm-id');
		$("#xmlist dd[data-xm-id='" + xmId + "']").addClass('on').siblings('dd').removeClass('on');
	})
	
	//点击左侧项目名时：选中并移动缩略图，切换大图
	$('#xmlist dd').click(function(){
		$(this).addClass('on').siblings('dd').removeClass('on');
		
		//切换大图
		var xmId = $(this).attr('data-xm-id');
		var obj = $(imgsBox).find("li[data-xm-id='" + xmId + "']").eq(0);
		$(imgLargeBox).html("<img src='" + $(obj).find('img').attr('src') + "' alt='' />");
		
		//选中缩略图
		var obj_position_left = $(obj).position().left;
		$(obj).addClass('on').siblings('li').removeClass('on');
		
		var tt = posLeft + $(obj).position().left;
		
		console.log("*******************");
		console.log("boxLeft: " + posLeft);
		console.log("liLeft: " + $(obj).position().left);
		console.log("boxLeft + liLeft: " + tt);
		
		//移动缩略图
		//选中的缩略图在蒙板左侧时
		if(tt <= 0){
			posLeft = posLeft + (Math.abs(posLeft) - obj_position_left);
		}
		//选中的缩略图在蒙板右侧时
		if(tt >= showarea && posLeft < 0){
			posLeft = posLeft - (obj_position_left + img_width - Math.abs(posLeft) - showarea);
		}
		if(tt >= showarea && posLeft == 0){
			posLeft = showarea - (obj_position_left + img_width);
		}
		console.log("posLeft: " + posLeft);
		$(imgsBox).animate({left: posLeft}, '50', setBtnState(posLeft));
	})
}