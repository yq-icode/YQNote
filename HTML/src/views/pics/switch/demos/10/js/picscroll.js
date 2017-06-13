function picscroll(){
	$(".picbox .group span").mouseover(function(){
		$(this).addClass("current").siblings("span").removeClass("current");
	}).mouseout(function(){
		$(this).removeClass("current").siblings("span");
	})

	var 
	index = 0 ;
	Swidth = 640 ; //每次滚动的距离
	timer = null ;
	
	function NextPage()
	{	
		if(index>2)
		{
			index = 0 ;
		}
		$(".pics_box").stop(true, false).animate({left: -index*Swidth+"px"},600)		
	}
	
	function PrevPage()
	{	
		if(index<0)
		{
			index = 2 ;
		}
		$(".pics_box").stop(true, false).animate({left: -index*Swidth+"px"},600)		
	}
	
	//下一页
	$(".btn_next img").click(function(){
		 index++ ;
		 NextPage();
	});
	//上一页
	$(".btn_prev img").click(function(){
		 index-- ;
		 PrevPage();
	});
	//自动滚动
	var timer = setInterval(function(){
		index++ ;
		NextPage();
	},4000);
		
	$(".btn_next img , .pics_box , .btn_prev img").mouseover(function(){
		clearInterval(timer);
	});
	$(".btn_next img , .pics_box , .btn_prev img").mouseleave(function(){
		timer = setInterval(function(){
			index++ ;
			NextPage();
		},4000);	
	});
}