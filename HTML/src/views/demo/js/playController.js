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
			has_operation = false, //是否有操作（操作包括：'开始/暂停/快进/快退/点击进度条'操作）
			
			speed = 1,		//加速&减速速率
			speedMax = 8,	//最大速率
			speedMin = 1/8,	//最小速率
			
			step,			//快进&快退秒数
			t_cur = 0, 		//已播放秒数
			state = -2, 	//播放状态（'0'暂停中, '1'播放中,'-1'播放结束,'-2'未播放,'-3'停止播放）
			timer; 			//计时器
		
		//默认参数
		var defaults = {
			t_date: '2019-12-18',   //视频日期
	    	t_start : '09:34:52',   //视频开始时间
	    	t_end : '10:12:31',     //视频结束时间
	    	callbackVideoPlay: null //'快进/快退' 操作的回调函数（即点击 '快进/快退' 时自动调用的外部函数）
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
						           "<span class='bar'></span>" +
						           "<span class='barBlock'></span>" +
						           "<span class='barTrack'></span>" +
						           "<span class='timeCur'></span>" +
						           "<label class='timeStart'>" + param.t_start + "</label>" +
						           "<label class='timeEnd'>" + param.t_end + "</label>" +
						       "</div>" +
						       "<div class='time'>" +
						           "<label class='tCurrent'>00:00:00</label>" +
						           "<label class='speed'>(x1)</label>" +
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
				$(playController).find('.tTotal').html(methods.convertSecondToTime(t_total,0));
				
				btn_play = $(playController).find('.btnPlay'); 			 //播放按钮
				btn_back = $(playController).find('.btnBack'); 			 //快退按钮
				btn_forward = $(playController).find('.btnForward'); 	 //快进按钮
				
				timeCur = $(playController).find('.timeCur'); 	 		 //视频当前时间（包括视频开始时间）
				
				bar_block = $(playController).find('.barBlock'); 		 //滑块
				bars = $(playController).find('.bars');
				bar = $(playController).find('.bar'); 					 //已播放的进度条
				
				ele_t_cur = $(playController).find('.tCurrent');    	 //HTML元素:视频当前播放进度
				ele_speed = $(playController).find('.speed');    	 	 //HTML元素:加速&减速速率
				
				bar_track = $(playController).find('.barTrack').width(); //播放条总长度
				step = Math.round(t_total/20);						 	 //快进&快退秒数
				
				methods.listen();
			},
			////事件监听
			listen:function(){
				event.onPlayPause().onClickBar().onDragBlock().onShowTime().windowResize();
//				event.onFastForward().onFastBack();
				event.onSpeedUp().onSpeedDown();
			},
			//计算视频时长（单位：秒）
			computeTimeDifference:function(tStart,tEnd){
				var tE = methods.convertTimeToSecond(tEnd),
		    		tS = methods.convertTimeToSecond(tStart),
		    		tF = tE - tS;
		    	if(tF >= 0){
		    		return tF;
		    	}else{
		    		alert("开始时间不得大于结束时间！");
		    		return;
		    	}
			},
			//播放状态时实时计算播放进度
			pos_current:function(){
				if(t_cur >= t_total){
					t_cur = t_total;
				}else if(t_cur < 0){
					t_cur = 0;
				}
				else{
					t_cur += speed;
				}
				methods.setBars();
			},
			//从断点时间（即指定时间点）开始播放（tp:传入的断点时间）
			setProgress:function(tp){
				var tpStart = methods.computeTimeDifference(param.t_start, tp),
					tpEnd = methods.computeTimeDifference(tp, param.t_end);
				if(tpStart >= 0 && tpEnd >= 0){
					t_cur = tpStart;
					if(state == -2 || state == -1){ //'播放前/播放结束'时直接跳转到断点继续播放
						timer = setInterval(methods.pos_current,1000);
					}
					state = 1;
				}else{
					alert("断点时间不在视频时间内！");
					return;
				}
			},
			//设置播放进度： 滑块$(bar_block)的位置、$(bar)的宽度、当前播放时间
			setBars:function(){
				if (t_cur >= 0 && t_cur < t_total) {
					$(bar_block).animate({left:  t_cur/t_total*100 + "%"},10);
					$(bar).animate({width:  t_cur/t_total*100 + "%"},10);
					$(timeCur).animate({left:  t_cur/t_total*100 + "%"},10).html(methods.convertSecondToTime(t_cur,1));
				}
				else if (t_cur >= t_total) {//播放完毕后
					$(bar).css("width", "100%");
					$(bar_block).css("left", "100%");
					$(timeCur).html('');
					clearInterval(timer);
					state = -1;
					t_cur = t_total;
				}
				else {
					$(bar).css("width", "0");
					$(bar_block).css("left", "0");
					$(timeCur).html('');
					clearInterval(timer);
					t_cur = 0;
					state = -2;
				}
				$(ele_t_cur).html(methods.convertSecondToTime(t_cur,0));
				methods.setPlayBtnState();
				methods.controlVideo();
				has_operation = false;
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
			//containStartTime: '1'包含视频开始时间, '0'不包含视频开始时间
			convertSecondToTime:function(second, containStartTime){
				if(containStartTime == 1){
					second += methods.convertTimeToSecond(param.t_start);
				}
				
				var _hh =  Math.floor(second/(60*60))%24;
				var _mm = Math.floor(second/60)%60;
				var _ss = Math.floor(second/1)%60;
				
				//当'时分秒'值小于10时让其显示为两位数
		        if(_hh >= 0 & _hh < 10) _hh = "0" + _hh;
		        if(_mm >= 0 & _mm < 10) _mm = "0" + _mm;
		        if(_ss >= 0 & _ss < 10) _ss = "0" + _ss;
		        
				return _hh + ':' + _mm + ':' + _ss;
			},
			//设置播放按钮状态
			setPlayBtnState:function(){
				if(state == 0 || state == -1 || state == -2)//暂停/停止/播放前
				{
					$(btn_play).removeClass('icon-zanting');
				}
				else if(state == 1){
					$(btn_play).addClass('icon-zanting');
				}
			},
			//提供给调用控制视频播放的外部函数API
			controlVideo:function(){
				var t = methods.convertSecondToTime(t_cur,1);
				param.callbackVideoPlay(t,state,has_operation);
			}
		};
		
		var event = {
			//播放与暂停视频
			onPlayPause:function(){
				$(btn_play).click(function(){
					has_operation = true;
					switch (state) {
                        case 0:
                            state = 1;
                            timer = setInterval(methods.pos_current, 1000);
                            break;
                        case 1:
                        	state = 0;
                            clearInterval(timer);
                            methods.setBars();
                            break;
                        case -1:
                            t_cur = 0;
                            state = 1;
                            timer = setInterval(methods.pos_current, 1000);
                            break;
                        case -2:
                        	t_cur = 0;
                            state = 1;
                            timer = setInterval(methods.pos_current, 1000);
                            break;
                        default:
                            break;
                    }
					methods.setPlayBtnState();
				})
				return event;
			},
			//快进（播放进度）
			onFastForward:function(){
				$(btn_forward).click(function(){
					has_operation = true;
					t_cur = t_cur + step;
					methods.setBars();
				})
				return event;
			},
			//快退（播放进度）
			onFastBack:function(){
				$(btn_back).click(function(){
					has_operation = true;
					t_cur = t_cur - step;
					methods.setBars();
				})
				return event;
			},
			//加速（播放速度）
			onSpeedUp:function(){
				$(btn_forward).click(function(){
					has_operation = true;
					if(speed < speedMax){
						speed = speed * 2;
					}
					$(ele_speed).html("(x" + speed + ")");
				})
				return event;
			},
			//减速（播放速度）
			onSpeedDown:function(){
				$(btn_back).click(function(){
					has_operation = true;
					if(speed > speedMin){
						speed = speed/2;
					}
					$(ele_speed).html("(x" + speed + ")");
				})
				return event;
			},
			//拖动滑块设置播放进度
			onDragBlock:function(){
				var isDown = false;
				$(bar_block).on({
			        mousedown: function (e) {
			        	isDown = true;
			        }
			    })
			    $(bars).on('mousemove', function (e) {
			    	if(isDown){
						var d = e.pageX - $(this).offset().left;
						t_cur = Math.round(d/bar_track*t_total);
		                methods.setBars();
		        	}
			    })
			    $(document).on('mouseup', function () { 
			    	isDown = false;
			    })
				return event;
			},
			//点击播放条设置播放进度
			onClickBar:function(){
				$(bars).on({
					click: function(e){
						has_operation = true;
						var d = e.pageX - $(this).offset().left;
						t_cur = Math.round(d/bar_track*t_total);
						methods.setBars();
						//当视频 '暂停/未播放/播放结束' 时，点击播放条时使其自动播放
						if(state == 0 || state == -1 || state == -2)
						{
							timer = setInterval(methods.pos_current,1000);
							state = 1;
						}
					}
				})
				return event;
			},
			//鼠标悬停时显示当前时间
			onShowTime:function(){
				$(bars).on({
					mouseover: function(e){
						var d = e.pageX - $(this).offset().left;
						var t = Math.round(d/bar_track*t_total);
						$(this).attr('title',methods.convertSecondToTime(t,1));
					}
				})
				return event;
			},
			//改变窗口尺寸时，重置已播放进度条长度
			windowResize:function(){
				$(window).resize(function(){
					bar_track = $(playController).find('.barTrack').width();
				})
			}
		};
		
		methods.init();
		return methods;
	}
})(jQuery);

