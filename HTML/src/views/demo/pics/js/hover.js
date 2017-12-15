// JavaScript Document

//ph-01
//*********************************************************
function pic_hover_01(){
	var pic_box = $('.ph-01 .picbox');
	$(pic_box).find('li').hover(
		function(){
			$(this).addClass('on');	
			$(this).find('.hidbox').animate({
				top:'0',
				opacity:'1'
			}, 300);
		},
		function(){
			$(this).removeClass('on');
			$(this).find('.hidbox').animate({
				top:'149px',
				opacity:'0.1'
			}, 1000);
		}
	)
}
//ph-02
//*********************************************************
$(window).load(function(){
	//设置和获取一些变量
	var thumbnail = {
		imgIncrease : 100, /* 增加图像像素（变焦） */
		effectDuration : 400, /* 效果的持续时间（变焦和标题） */
		/* 
		获取的图像的宽度和高度。要使用这些
		2件事:
		列表项大小相同
		得到的图像缩放后恢复正常
		*/
		imgWidth : $('.thumbnailWrapper ul li').find('img').width(), 
		imgHeight : $('.thumbnailWrapper ul li').find('img').height()
	};

	//列表项相同的大小作为图像
	$('.thumbnailWrapper ul li').css({ 
		'width' : thumbnail.imgWidth, 
		'height' : thumbnail.imgHeight 
	});

	//当鼠标移到列表项...
	$('.thumbnailWrapper ul li').hover(function(){
		$(this).find('img').stop().animate({
			/* 变焦效果，提高图像的宽度 */
			width: parseInt(thumbnail.imgWidth) + thumbnail.imgIncrease,
			/* 我们需要改变的左侧和顶部的位置，才能有放大效应，因此我们将它们移动到一个负占据一半的img增加 */
			left: thumbnail.imgIncrease/2*(-1),
			top: thumbnail.imgIncrease/2*(-1)
		},{ 
			"duration": thumbnail.effectDuration,
			"queue": false
		});

		//使用slideDown事件显示的标题
		$(this).find('.caption:not(:animated)').slideDown(thumbnail.effectDuration);
		
		//当鼠标离开...
	}, function(){
	
		//发现图像和动画...
		$(this).find('img').animate({
			/* 回原来的尺寸（缩小） */
			width: thumbnail.imgWidth,
			/* 左侧和顶部位置恢复正常 */
			left: 0,
			top: 0

		}, thumbnail.effectDuration);

		//隐藏使用滑块事件的标题
		$(this).find('.caption').slideUp(thumbnail.effectDuration);

	});

});
//ph-03
//*********************************************************
$(document).ready(function(){
	$(".ph-03 ul li .rsp").hide();
	$(".ph-03 ul li").hover(function(){
		$(this).find(".rsp").stop().fadeTo(500,0.5)
		$(this).find(".text").stop().animate({left:'0'}, {duration: 500})
	},function(){
		$(this).find(".rsp").stop().fadeTo(500,0)
		$(this).find(".text").stop().animate({left:'318'}, {duration: "fast"})
		$(this).find(".text").animate({left:'-318'}, {duration: 0})
	});
});