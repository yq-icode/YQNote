// JavaScript Document

$(function ()
{
	var btn_play = $('.controlBar .btnPlay'), //播放按钮
		btn_back = $('.controlBar .btnBack'), //快退按钮
		btn_forward = $('.controlBar .btnForward'), //快进按钮
		
    	bars = $('.controlBar .bars'),
    	bar = $('.controlBar .bars .bar'), //已播放的进度条
    	bar_block = $('.controlBar .bars .barBlock'), //滑块
    
    	ele_t_total = $('.tTotal'),    //HTML元素:视频总时长
    	ele_t_cur = $('.tCurrent'),    //HTML元素:视频当前播放进度
    	ele_t_start = $('.timeStart'), //HTML元素:视频开始时间
    	ele_t_end = $('.timeEnd'), 	   //HTML元素:视频结束时间
    	
    	t_start = '09:34:52', //视频开始时间
    	t_end = '10:12:31', //视频结束时间
    	t_cur = 0, //已播放秒数
    	t_total, //视频总时长（单位：秒）
    	
    	dis = 0; //已播放长度
    	
    //获取并显示视频的开始时间、结束时间、总时长
    t_total = videoTotalSecond(t_start,t_end);
    $(ele_t_start).html(t_start);
    $(ele_t_end).html(t_end);
    $(ele_t_total).html(convertSecondToTime(t_total));
    
	var	state = 0, //播放状态（'0'暂停中, '1'播放中）
		bar_track = $(bars).find('.barTrack').width(), //播放条总长度
		dis_step1 = parseFloat(bar_track / t_total), //正常播放每秒移动的距离
		dis_step2 = 10, //快进/快退距离
		timer; //计时器
	
	//播放与暂停视频
	$(btn_play).click(function(){
		if(dis >= bar_track){//重播
			dis = 0;
		}
		if(state==0)//播放
		{
			timer=setInterval(pos_current,1000);
			state=1;
		}
		else{
			clearInterval(timer);//暂停
			state=0;
			
			//暂停状态下：鼠标悬停时显示当前时间
			$(bars).on({
				mousemove: function(e){
					var dis1 = e.pageX - $(this).offset().left;
					$(this).attr('title',convertLenToTime(dis1,1));
				}
			})
		}
		$(this).toggleClass('icon-zanting');
	})
	
	//播放状态时实时计算播放进度
	function pos_current()
	{	
		if(dis >= bar_track){
			dis = bar_track;
		}
		else{
			dis += dis_step1;
		}
		set();
		
		//播放状态下：鼠标悬停时显示当前时间
		$(bars).on({
			mousemove: function(e){
				var dis1 = e.pageX - $(this).offset().left;
				$(this).attr('title',convertLenToTime(dis1,1));
			}
		})
	}
	
	//快进
	$(btn_forward).click(function(){
		dis = dis + dis_step2;
		set();
	})
	//快退
	$(btn_back).click(function(){
		dis = dis - dis_step2;
		set();
	})
	
	$(bars).on({
		mousedown: function(e){//点击播放条设置播放进度
			dis = e.pageX - $(this).offset().left;
			set();
		},
		mouseup: function(){
			$(bars).off('mousemove');
		}
	})
	
	//拖动滑块
    $(bar_block).on({
        mousedown: function (e) {
            $(bars).on('mousemove', function (e) {
                dis = e.pageX - $(this).offset().left;
                set();
            });
        },
        mouseup: function (e) { $(bars).off('mousemove'); }
    });

    $(document).on('mouseup', function () { $(bars).off('mousemove');})
	
	//将播放进度成 滑块$(bar_block)的位置、$(bar)的宽度、当前播放时间
	function set(){
		if (dis >= 0 && dis < bar_track) {
			$(bar_block).animate({left:  dis + "px"},10);
			$(bar).animate({width:  dis + "px"},10);
		}
		else if (dis >= bar_track) {//播放完毕后
			$(bar).css("width", bar_track + "px");
			$(bar_block).css("left", bar_track + "px");
			clearInterval(timer);
			$(btn_play).toggleClass('btnPause');
			state=0;
			dis = bar_track;
		}
		else {
			$(bar).css("width", "0");
			$(bar_block).css("left", "0");
			dis = 0;
		}
		$(ele_t_cur).html(convertLenToTime(dis,0));
	}
	
	//将当前播放进度转化为时间（时间格式：00:00:00）
	//containStartTime: '1'包含视频开始时间, '0'不包含视频开始时间
	function convertLenToTime(len,containStartTime){
		t_cur = Math.round(t_total * len / bar_track);
		if(t_cur > t_total){
			t_cur = t_total;
		}
		if(containStartTime == 1){
			return convertSecondToTime(t_cur + convertTimeToSecond(t_start));
		}else if(containStartTime == 0){
			return convertSecondToTime(t_cur);
		}
	}
	
	//将时间（时间格式：00:00:00）转成数值（单位为秒）
    function convertTimeToSecond(time){
    	var h,m,s;
	    h = Math.round(time.substring(0,2));
	    m = Math.round(time.substring(3,5));
	    s = Math.round(time.substring(6,8));
	    return Math.round(h*3600 + m*60 + s);
    }
    
    //将时长（单位：秒）转化为时间格式（时间格式：00:00:00）
    function convertSecondToTime(second){
    	var _hh =  Math.floor(second/(60*60))%24;
		var _mm = Math.floor(second/60)%60;
		var _ss = Math.floor(second/1)%60;
		
		//当'时分秒'值小于10时让其显示为两位数
        if(_hh >= 0 & _hh < 10) _hh = "0" + _hh;
        if(_mm >= 0 & _mm < 10) _mm = "0" + _mm;
        if(_ss >= 0 & _ss < 10) _ss = "0" + _ss;
        
		return _hh + ':' + _mm + ':' + _ss;
    }
    
    //计算视频总时长（单位：秒）
    function videoTotalSecond(tStart,tEnd){
    	var tE = convertTimeToSecond(tEnd),
    		tS = convertTimeToSecond(tStart);
    	return (tE - tS);
    }
    
    //窗口改变时调整播放器尺寸
    $(window).resize(function(){
    	bar_track = $(bars).find('.barTrack').width(); //播放条总长度
		dis_step1 = parseFloat(bar_track / t_total); //正常播放每秒移动的距离
    })
})
