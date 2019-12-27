// 视频播放控制器

(function($){
	
	$.fn.playController = function(options){
		var playController = this;
		
		var t_total, 		//视频总时长（单位：秒）
			
			btn_play, 		//播放按钮
			btn_back,		//快退按钮
			btn_forward,	//快进按钮
			
			bar_block, 		//滑块
			bars,
			bar, 			//已播放的进度条
			bar_track, 		//播放条总长度（即播放条轨道）
			
			ele_t_cur,    	//HTML元素:视频当前播放进度
			
			dis_step1, 		//正常播放每秒移动的距离
			dis_step2 = 10, //快进&快退距离（长度单位）
			t_cur = 0, 		//已播放秒数
			dis = 0, 		//已播放长度
			state = -2, 	//播放状态（'0'暂停中, '1'播放中,'-1'播放结束,'-2'未开始）
			timer; 			//计时器
		
		//默认参数
		var defaults = {
	    	t_start : '09:34:52', //视频开始时间
	    	t_end : '10:12:31'    //视频结束时间
		};
		
		//合并参数
		var param = $.extend({}, defaults, options);
		
		//HTML
		var template = "<div class='controlBar'>" +
						   "<div class='btnBox'>" +
						       "<a class='iconfont icon-kuaitui btnBack' href='javascript:void(0)'></a>" +
						       "<a class='iconfont icon-bofang btnPlay' href='javascript:void(0)'></a>" +
						       "<a class='iconfont icon-kuaijin btnForward' href='javascript:void(0)'></a>" +
						   "</div>" +
						   "<div class='barBox'>" +
						       "<div class='bars'>" +
						           "<span class='bar' style='width:" + dis + "px'></span>" +
						           "<span class='barBlock' style='left:" + dis + "px'></span>" +
						           "<span class='barTrack'></span>" +
						           "<label class='timeStart'>" + param.t_start + "</label>" +
						           "<label class='timeEnd'>" + param.t_end + "</label>" +
						       "</div>" +
						       "<div class='time'>" +
						           "<label class='tCurrent'>00:00:00</label>" +
						           "/<label class='tTotal'></label>" +
						       "</div>" +
						   "</div>" +
					   "</div>";
					   
		var methods = {
			//初始化
			init:function () {
				//构建播放控制器DOM结构
				playController.html(template);
				//计算并显示视频总时长
				t_total = methods.computeTimeDifference(param.t_start, param.t_end);
				$(playController).find('.tTotal').html(methods.convertSecondToTime(t_total));
				
				btn_play = $(playController).find('.btnPlay'); 			 //播放按钮
				btn_back = $(playController).find('.btnBack'); 			 //快退按钮
				btn_forward = $(playController).find('.btnForward'); 	 //快进按钮
				
				bar_block = $(playController).find('.barBlock'); 		 //滑块
				bars = $(playController).find('.bars');
				bar = $(playController).find('.bar'); 					 //已播放的进度条
				ele_t_cur = $(playController).find('.tCurrent');    	 //HTML元素:视频当前播放进度
				bar_track = $(playController).find('.barTrack').width(); //播放条总长度
				dis_step1 = parseFloat(bar_track / t_total); 			 //正常播放每秒移动的距离
				
				methods.listen();
			},
			////事件监听
			listen:function(){
				event.onPlayPause().onFastForward().onFastBack().onClickBar().onShowTime();
//				event.onDragBlock();
			},
			//计算视频时长（单位：秒）
			computeTimeDifference:function(tStart,tEnd){
				var tE = methods.convertTimeToSecond(tEnd),
		    		tS = methods.convertTimeToSecond(tStart),
		    		tF = tE - tS;
		    	if(tF >= 0){
		    		return tE - tS;
		    	}else{
		    		alert("开始时间不得小于结束时间！");
		    		return;
		    	}
			},
			//播放状态时实时计算播放进度
			pos_current:function(){
				if(dis >= bar_track){
					dis = bar_track;
				}else if(dis < 0){
					dis = 0;
				}
				else{
					dis += dis_step1;
				}
				methods.set();
			},
			//根据断点时间设置播放进度（tp:传入的断点时间）
			setProgress:function(tp){
				var tpStart = methods.computeTimeDifference(param.t_start, tp),
					tpEnd = methods.computeTimeDifference(tp, param.t_end);
				if(tpStart >= 0 && tpEnd >= 0){
					dis = bar_track*tpStart/t_total;
					if(state == -2){ //播放前直接跳转到断点继续播放
						timer = setInterval(methods.pos_current,1000);
					}
					state = 1;
				}else{
					alert("断点时间不在视频时间内！");
					return;
				}
			},
			//将播放进度成 滑块$(bar_block)的位置、$(bar)的宽度、当前播放时间
			set:function(){
				if (dis >= 0 && dis < bar_track) {
					$(bar_block).animate({left:  dis + "px"},10);
					$(bar).animate({width:  dis + "px"},10);
				}
				else if (dis >= bar_track) {//播放完毕后
					$(bar).css("width", bar_track + "px");
					$(bar_block).css("left", bar_track + "px");
					clearInterval(timer);
					state = -1;
					dis = bar_track;
				}
				else {
					$(bar).css("width", "0");
					$(bar_block).css("left", "0");
					clearInterval(timer);
					dis = 0;
					state = -2;
				}
				$(ele_t_cur).html(methods.convertLenToTime(dis,0));
				methods.setPlayBtnState();
			},
			//将时间（时间格式：00:00:00）转成数值（单位为秒）
			convertTimeToSecond:function(time){
				var h,m,s;
			    h = Math.round(time.substring(0,2));
			    m = Math.round(time.substring(3,5));
			    s = Math.round(time.substring(6,8));
			    return Math.round(h*3600 + m*60 + s);
			},
			//将时长（单位：秒）转化为时间格式（时间格式：00:00:00）
			convertSecondToTime:function(second){
				var _hh =  Math.floor(second/(60*60))%24;
				var _mm = Math.floor(second/60)%60;
				var _ss = Math.floor(second/1)%60;
				
				//当'时分秒'值小于10时让其显示为两位数
		        if(_hh >= 0 & _hh < 10) _hh = "0" + _hh;
		        if(_mm >= 0 & _mm < 10) _mm = "0" + _mm;
		        if(_ss >= 0 & _ss < 10) _ss = "0" + _ss;
		        
				return _hh + ':' + _mm + ':' + _ss;
			},
			//将当前播放进度转化为时间（时间格式：00:00:00）
			//containStartTime: '1'包含视频开始时间, '0'不包含视频开始时间
			convertLenToTime:function(len,containStartTime){
				t_cur = Math.round(t_total * len / bar_track);
				if(t_cur > t_total){
					t_cur = t_total;
				}
				if(containStartTime == 1){
					return methods.convertSecondToTime(t_cur + methods.convertTimeToSecond(param.t_start));
				}else if(containStartTime == 0){
					return methods.convertSecondToTime(t_cur);
				}
			},
			//设置播放按钮状态
			setPlayBtnState:function(){
				if(state == 0 || state == -1 || state == -2)//暂停或停止
				{
					$(btn_play).removeClass('icon-zanting');
				}
				else if(state == 1){
					$(btn_play).addClass('icon-zanting');
				}
			},
			//获取点击时间
			getCurrentTime:function(){
				return methods.convertSecondToTime(t_cur);
			}
		};
		
		var event = {
			//播放与暂停视频
			onPlayPause:function(){
				$(btn_play).click(function(){
//					if(dis >= bar_track){//重播
//						dis = 0;
//						clearInterval(timer);
//						state = -1;
//					}
					if(state == 0 || state == -1 || state == -2)//播放
					{
						if(state == -1){ //重播
							dis = 0;
						}
						state = 1;
						timer = setInterval(methods.pos_current,1000);
					}
					else if(state == 1){ //暂停
						clearInterval(timer);
						state = 0;
					}
					methods.setPlayBtnState();
				})
				return event;
			},
			//快进
			onFastForward:function(){
				$(btn_forward).click(function(){
					dis = dis + dis_step2;
					methods.set();
				})
				return event;
			},
			//快退
			onFastBack:function(){
				$(btn_back).click(function(){
					dis = dis - dis_step2;
					methods.set();
				})
				return event;
			},
			//拖动滑块设置播放进度
//			onDragBlock:function(){
//				$(bar_block).on({
//			        mousedown: function (e) {
//			        	console.log(e);
//			            $(bars).on('mousemove', function (e) {
//			                dis = e.pageX - $(this).offset().left;
//			                methods.set();
//			            });
//			        },
//			        mouseup: function (e) { $(bars).off('mousemove'); }
//			    });
//			    $(document).on('mouseup', function () { $(bars).off('mousemove');})
//				return event;
//			},
			//点击播放条设置播放进度
			onClickBar:function(){
				$(bars).on({
					mousedown: function(e){
						dis = e.pageX - $(this).offset().left;
						methods.set();
						//当视频 暂停/未播放/播放结束 时，点击播放条时使其自动播放
						if(state == 0 || state == -1 || state == -2)
						{
							timer = setInterval(methods.pos_current,1000);
							state = 1;
						}
					}
//					mouseup: function(){
//						$(bars).off('mousemove');
//					}
				})
				return event;
			},
			//鼠标悬停时显示当前时间
			onShowTime:function(){
				$(bars).on({
					mousemove: function(e){
						var dis1 = e.pageX - $(this).offset().left;
//						console.log(dis1);
						$(this).attr('title',methods.convertLenToTime(dis1,1));
					}
				})
				return event;
			}
		};
		
		methods.init();
		return methods;
	}
})(jQuery);

