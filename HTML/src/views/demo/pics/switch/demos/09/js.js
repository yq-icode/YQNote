// JavaScript Document

function imgscroll(){
	var pic_wrap = $('.picWrap');
	var pic_large = $(pic_wrap).find('.picLarge');
	var pic_list_box = $(pic_wrap).find('.picList');
	
	var pic_list_ul = $(pic_list_box).find('ul');
	var btn_left = $(pic_list_box).find('.btn-left');
	var btn_right = $(pic_list_box).find('.btn-right');
	
	//每次移动的图片数量
	var pic_move_num = 3;
	
	var viewarea = $(pic_list_box).find('.mask').width();
	
	var pic_list_ul_left = $(pic_list_ul).position().left;
	
	//每张缩略图的宽度
	var pic_width = $(pic_list_ul).find('li').width() + 6;
	
	//所有缩略图的数量
	var pic_num = $(pic_list_ul).find('li').length;
	
	//所有缩略图的总宽度
	var pic_width_total = pic_width * pic_num;
	
	pic_list_ul.css({'width':pic_width_total});
	
	//点击一次移动的距离
	var moveDistance = pic_width * pic_move_num;
	
	if(Math.abs(pic_list_ul_left) == 0){
		$(btn_right).find('span').addClass('disable');
	}
	
	//左移
	$(btn_left).click(function(){
		
		pic_list_ul_left = $(pic_list_ul).position().left;
		
		if(pic_width_total + pic_list_ul_left >= pic_width){
			$(btn_left).find('span').removeClass('disable');
			
			if(pic_width_total + pic_list_ul_left - viewarea >= moveDistance){
				$(pic_list_ul).animate(
					{left: pic_list_ul_left - moveDistance},'slow'				   
				)
				if(pic_width_total + pic_list_ul_left - viewarea == moveDistance){
					$(btn_left).find('span').addClass('disable');
					$(btn_right).find('span').removeClass('disable');
				}
			}
			else{
				$(pic_list_ul).animate(
					{left: viewarea - pic_width_total},'slow'				   
				)
				$(btn_left).find('span').addClass('disable');
				$(btn_right).find('span').removeClass('disable');
			}
		}
	})
	
	//右移
	$(btn_right).click(function(){
		pic_list_ul_left = $(pic_list_ul).position().left;
		if(pic_width_total + pic_list_ul_left - viewarea < pic_width_total){
			
			$(btn_right).find('span').removeClass('disable');//判断按钮当前的状态
			
			if(Math.abs(pic_list_ul_left) >= moveDistance){
				$(pic_list_ul).animate(
					{left: pic_list_ul_left + moveDistance},'slow'				   
				)
				if(Math.abs(pic_list_ul_left) == moveDistance){
					$(btn_right).find('span').addClass('disable');
					$(btn_left).find('span').removeClass('disable');
				}
			}
			else{
				$(pic_list_ul).animate(
					{left: 0},'slow'				   
				)
				$(btn_right).find('span').addClass('disable');
				$(btn_left).find('span').removeClass('disable');
			}
		}
	})
	
	//大图切换
	$(pic_list_ul).find('a').click(function(){
												  
		var pic_large_cur = $(pic_large).find('img');
		
		$(pic_list_ul).find('li').removeClass('on');
		$(this).parents('li').addClass('on');
		
		var pic_large_path = $(this).attr("href");
		var pic_large_alt = $(this).attr("title");
		
		$(pic_large_cur).attr({ src: pic_large_path, alt: pic_large_alt });
		
		$(pic_large).find('.imgtxt').find('span').html(" (" + pic_large_alt + ")");
		
		return false;
	});
	
}