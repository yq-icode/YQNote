// JavaScript Document

function imgscroll(){
	
	var scrollImgWrap = $('.scrollWrap');
	var imgsBox = $(scrollImgWrap).find('ul');
	var btn_left = $(scrollImgWrap).find('.btn-left');
	var btn_right = $(scrollImgWrap).find('.btn-right');
	
	//每次移动图片的数量，此数值可以更改，可以一次移动一张图片，也可以一次移动多张图片；
	var img_moveNum = 3;
	
	//获取显示区域的宽度
	var showarea = $(scrollImgWrap).width();
	
	//偏移量
	var imgsBox_left = $(imgsBox).position().left;
	
	//获取每张图片的宽度
	var img_width = $(imgsBox).find('li').width();
	
	//获取图片的数量
	var img_num = $(imgsBox).find('li').length;
	
	//计算所有图片总的宽度
	var imgs_width = img_width * img_num;
	
	//给包含所有图片的标签设置宽度
	imgsBox.css({'width':imgs_width});
	
	//每次移动的距离；
	var moveDistance = img_width * img_moveNum;
	
	//初始时只能左移
	if(Math.abs(imgsBox_left) == 0){
		$(btn_right).find('span').addClass('disable');
	}
	
	//左移
	$(btn_left).click(function(){
		
		imgsBox_left = $(imgsBox).position().left;
		
		if(imgs_width + imgsBox_left >= img_width){
			$(btn_left).find('span').removeClass('disable');//判断按钮当前的状态
			
			if(imgs_width + imgsBox_left - showarea >= moveDistance){
				$(imgsBox).animate(
					{left: imgsBox_left - moveDistance},'slow'				   
				)
				if(imgs_width + imgsBox_left - showarea == moveDistance){
					//判断按钮当前的状态
					$(btn_left).find('span').addClass('disable');
					$(btn_right).find('span').removeClass('disable');
				}
			}
			else{
				$(imgsBox).animate(
					{left: showarea - imgs_width},'slow'				   
				)
				//判断按钮当前的状态
				$(btn_left).find('span').addClass('disable');
				$(btn_right).find('span').removeClass('disable');
			}
		}
	})
	
	//右移
	$(btn_right).click(function(){
		imgsBox_left = $(imgsBox).position().left;
		if(imgs_width + imgsBox_left - showarea < imgs_width){
			
			$(btn_right).find('span').removeClass('disable');//判断按钮当前的状态
			
			if(Math.abs(imgsBox_left) >= moveDistance){
				$(imgsBox).animate(
					{left: imgsBox_left + moveDistance},'slow'				   
				)
				if(Math.abs(imgsBox_left) == moveDistance){
					//判断按钮当前的状态
					$(btn_right).find('span').addClass('disable');
					$(btn_left).find('span').removeClass('disable');
				}
			}
			else{
				$(imgsBox).animate(
					{left: 0},'slow'				   
				)
				//判断按钮当前的状态
				$(btn_right).find('span').addClass('disable');
				$(btn_left).find('span').removeClass('disable');
			}
		}
	})
	
}