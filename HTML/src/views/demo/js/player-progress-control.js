// JavaScript Document

$(function ()
{
	var dis = 0;//实际播放长度
	
	var o_play = $('.controlBar .b_play');//播放按钮
	var o_back = $('.controlBar .b_back');//快退按钮
	var o_forward = $('.controlBar .b_forward');//快进按钮
    var o_bars = $('.controlBar .bars');
    var o_bar1 = $('.controlBar .bars .bar1');//已播放的进度条
    var o_block = $('.controlBar .bars i');//滑块
    
    var t_sum = $('.time-sum');
    var t_cur = $('.time-current');
    var t_cur_toSecond = 0;//已播放秒数
    var t_sum_toSecond;//视频总秒数
    
    //取视频总时间的时分秒并转化成秒
    var h,m,s;
    h = Math.round($(t_sum).html().substring(0,2));
    m = Math.round($(t_sum).html().substring(3,5));
    s = Math.round($(t_sum).html().substring(6,8));
    t_sum_toSecond = Math.round(h*3600 + m*60 + s);
    
	
	var state = 1;//默认播放
	var barsLength = $(o_bars).width();//播放条总长度
	var dis2 = parseFloat(barsLength / t_sum_toSecond); //每秒移动的距离
	var timer1;
	
	//播放与暂停
	$(o_play).click(function(){
		if(dis >= barsLength){//重播
			dis = 0;
		}
		if(state==1)//播放
		{
			timer1=setInterval(pos_current,1000);
			state=0;
		}
		else{
			clearInterval(timer1);//暂停
			state=1;
		}
		$(this).toggleClass('b_pause');
	})
	
	//播放状态时设置滑块位置
	function pos_current()
	{	
		if(dis >= barsLength){
			dis = barsLength;
		}
		else{
			dis += dis2;
		}
		set();
	}
	
	//快进
	$(o_forward).click(function(){
		dis = dis + 10;
		set();
	})
	//快退
	$(o_back).click(function(){
		dis = dis - 10;
		set();
	})

	
	$(o_bars).on({
		mousedown: function(e){//点击移动滑块
			dis = e.pageX - $(this).offset().left;
			set();
		},
		mousemove: function(e){ //鼠标悬停时显示当前时间
			var dis1 = e.pageX - $(this).offset().left;
			$(this).attr('title',toTime(dis1));
		},
		mouseup: function(){
			$(o_bars).off('mousemove');
		}
	})
	
	//拖动滑块
    $(o_block).on({
        mousedown: function (e) {
            $(o_bars).on('mousemove', function (e) {
                dis = e.pageX - $(this).offset().left;
                set();
            });
        },
        mouseup: function (e) { $(o_bars).off('mousemove'); }
    });

    $(document).on('mouseup', function () { $(o_bars).off('mousemove');})
	
	//设置滑块$(o_block)的位置及$(o_bar1)的宽度
	function set(){
		if (dis >= 0 && dis < barsLength) {
			$(o_block).animate({left:  dis + "px"},10);
			$(o_bar1).animate({width:  dis + "px"},10);
		}
		else if (dis >= barsLength) {//播放完毕后
			$(o_bar1).css("width", barsLength + "px");
			$(o_block).css("left", barsLength + "px");
			clearInterval(timer1);
			$(o_play).toggleClass('b_pause');
			state=1;
		}
		else {
			$(o_bar1).css("width", "0");
			$(o_block).css("left", "0");
		}
		
		$(t_cur).html(toTime(dis));
	}
	//将当前播放进度转化成时分秒格式
	function toTime(obj){
		t_cur_toSecond = Math.round(t_sum_toSecond * obj / $(o_bars).width());
		if(t_cur_toSecond > t_sum_toSecond){
			t_cur_toSecond = t_sum_toSecond;
		}
		var t_cur_h =  Math.floor(t_cur_toSecond/(60*60))%24;
		var t_cur_m = Math.floor(t_cur_toSecond/60)%60;
		var t_cur_s = Math.floor(t_cur_toSecond/1)%60;
		
		//当'时分秒'值小于10时让其显示为两位数
        if(t_cur_h >= 0 & t_cur_h < 10) t_cur_h = "0" + t_cur_h;
        if(t_cur_m >= 0 & t_cur_m < 10) t_cur_m = "0" + t_cur_m;
        if(t_cur_s >= 0 & t_cur_s < 10) t_cur_s = "0" + t_cur_s;
        
        var t_cur_time = t_cur_h + ':' + t_cur_m + ':' + t_cur_s;

		return t_cur_time;
	}
	
	
})
