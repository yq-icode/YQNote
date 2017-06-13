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
	
	//初始化位置
	var initial_pos = -pic_width_total+viewarea;
	if(pic_width_total > viewarea){
		pic_list_ul.css({'left':initial_pos+'px'});
	}
	else{
		pic_list_ul.css({'left':0});
	}
	
	pic_list_ul.css({'width':pic_width_total});
	
	//点击一次移动的距离
	var moveDistance = pic_width * pic_move_num;
	
	//初始左按钮不可点击
	$(btn_left).find('span').addClass('disable');
	
	//判断右按钮初始状态
	if(pic_width_total <= viewarea ){
		$(btn_right).find('span').addClass('disable');
	}
	
	$('.picWrap .picList .mask ul li').hover(
		function(){$(this).addClass('hover');},
		function(){$(this).removeClass('hover');}
	)
	
	//左移
	$(btn_left).click(function(){
		
		pic_list_ul_left = $(pic_list_ul).position().left;
		
		//当图片数量多余一屏时
		if(pic_width_total > viewarea){	
			if(Math.abs(pic_list_ul_left) + moveDistance < Math.abs(initial_pos) ){
				$(pic_list_ul).animate(
					{left: pic_list_ul_left - moveDistance},
					'slow',
					function(){
						//左按钮状态
						if(Math.abs($(pic_list_ul).position().left) == Math.abs(initial_pos)){
							$(btn_left).find('span').addClass('disable');
						}
						else{
							$(btn_left).find('span').removeClass('disable');	
						}
						
						//右按钮状态
						if(Math.abs($(pic_list_ul).position().left) > 0 && Math.abs($(pic_list_ul).position().left) <= Math.abs(initial_pos)){
							$(btn_right).find('span').removeClass('disable');
						}
						if(Math.abs($(pic_list_ul).position().left) == 0){
							$(btn_right).find('span').addClass('disable');
						}
							
				   }			   
				)
			}
			//当剩余的距离小于moveDistance时
			else if(Math.abs(pic_list_ul_left) + moveDistance >= Math.abs(initial_pos)){
				$(pic_list_ul).animate(
					{left: initial_pos},
					'slow',
					function(){
						$(btn_left).find('span').addClass('disable');
						$(btn_right).find('span').removeClass('disable');
					}
				)
			}
		}
		//当图片数量不足一屏或刚好一屏时
		else if(pic_width_total <= viewarea){ 
			$(btn_left).find('span').addClass('disable');
			$(btn_right).find('span').addClass('disable');
		}
		
	})
	
	//右移
	$(btn_right).click(function(){
		pic_list_ul_left = $(pic_list_ul).position().left;
		
		//当图片数量多余一屏时
		if(pic_width_total > viewarea){	
			if(Math.abs(pic_list_ul_left) > moveDistance){
				$(pic_list_ul).animate(
					{left: pic_list_ul_left + moveDistance},
					'slow',
					function(){
						if(Math.abs($(pic_list_ul).position().left) < Math.abs(initial_pos)){
							$(btn_left).find('span').removeClass('disable');
						}
					}			   
				)
			}
			//当剩余的距离小于moveDistance时
			else{
				$(pic_list_ul).animate(
					{left: 0},
					'slow',
					function(){
						$(btn_right).find('span').addClass('disable');
						$(btn_left).find('span').removeClass('disable');
					}				   
				)
				
			}
		}
		//当图片数量不足一屏或刚好一屏时
		if(pic_width_total <= viewarea){ 
			$(btn_left).find('span').addClass('disable');
			$(btn_right).find('span').addClass('disable');
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