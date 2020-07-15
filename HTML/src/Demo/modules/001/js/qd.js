define(function(){
	/* layer弹框
	 * -------------------------------
	 * msg 			: message dialog
	 * dialog		: iframe dialog
	 * confirm  	： confirm dialog
	 * -------------------------------*/
	var layerMe = {
		//layer msg
		msg: function(message, callback){
			layer.msg(message, {
				time: 1500,
				skin: 'layerMsg'
			}, function(){
				callback && callback();
			});
		},
		dialog: function(type, title, content, area, successCallback, endCallback){
			layer.open({
				type: type,
				title: title,
				closeBtn: 0,
				content: content,
				area: area,
				shade: 0.1,
				shadeClose: true,
				skin: 'layerDialog',
				success:function(layero, index){
					successCallback && successCallback(layero, index);
				},
				end:function(){
					endCallback && endCallback();
				}
			})
		},
		//关闭弹窗
		dialogCLose: function(){
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		},
		//layer confirm
		confirm: function(content, btn, area, successCallback, yesCallback){
			top.layer.open({
				title: false,
				content: content,
				closeBtn: 0,
				btn: btn,
				btnAlign: 'c',
				area: area,
				shade: 0.2,
				skin: 'layerConfirm',
				success: function(layero, index){
					successCallback && successCallback(layero, index);
				},
				yes: function(index, layero){
					yesCallback && yesCallback(index);
				},
				btn2 :function(index){
					layer.close(index);
				}
			})
		}
		
	}
	
	
	/* 只有出现错误信息时才显示bootstrapvalidator的errorbox
	 * -------------------------------*/
	function SHErrorBox(e){
		var isShow = false;
		$(e).find('.help-block').each(function(){
			if($(this).css('display') == 'block'){
				isShow = true;
			}
		})
		if(isShow){
			$(e).css('visibility', 'visible');
		}else{
			$(e).css('visibility', 'hidden');
		}
	}
	
	/* datetimepicker init
	 * -------------------------------*/
	function dateTimePickerInit(ele, format, maxView, minView, pickerPosition){
		$(ele).datetimepicker({
			format: format || 'yyyy/mm/dd',
			autoclose: true,
			maxView: maxView || 2,
			minView: minView || 2,
			todayBtn: true,
			todayHighlight: true,
			pickerPosition: pickerPosition || "bottom-right"
		});
	}
	
	function bsSelectPickerInit(ele, data){
		var optHtml = "", selectedVal;
		
		//多选
		if(data.multiple){
			selectedVal = [];
			$.each(data.options, function() {
				optHtml += "<option>" + this.name + "</option>";
				if(this.selected){
					selectedVal.push(this.name);
				}
			});
		}else{ //单选
			selectedVal = "";
			$.each(data.options, function() {
				optHtml += "<option>" + this + "</option>";
			});
			selectedVal = data.options[data.selectedId - 1];
		}
		
		$(ele).html(optHtml).selectpicker('refresh').selectpicker('val', selectedVal);
	}
	
	
	/* 转换日期、时间
	 * -------------------------------*/
	var dateTimeConvert = {
		//convert 'YYYY-MM-DD' to 'DD/MM/YYYY'
		dSlant:function(date){
			if(date){
				var d = date.substring(0, 10).split('-'),
					year = d[0],
					month = d[1],
					day = d[2];
				return day + "/" + month + "/" + year;
			}else{
				console.warn("date is empty!");
			}
		},
		//convert 'YYYY/MM/DD' to 'YYYY-MM-DD'
		dStrikeThrough:function(date){
			if(date){
				return date.replace(/\//g, '-');
			}else{
				console.warn("date is empty!");
			}
		},
		//转时间戳（时间格式：'DD/MM/YYYY HH:mm'）
		toTimeStamp:function(dt){
			var dd = dt.split(' ')[0].split('/'),
				time = dt.split(' ')[1].split(':'),
				year = dd[2],
				month = dd[1],
				day = dd[0],
				hour = time[0],
				min = time[1];
			
			return new Date(year + "/" + month + "/" + day + " " + hour + ":" + min).getTime();
		},
		
		//根据开始时间和时长计算结束时间（时间段不会跨天）
		//startTime: YYYY-MM-DD hh:mm
		//length: 50mins 2hour
		calEndTime:function(startTime, length){
			var st = new Date(startTime).getTime(),
				et = new Date();
				
			if(length.indexOf('min')){
				et.setTime(st + length.slice(0, -5)*60*1000);
			}else if(length.indexOf('hour')){
				et.setTime(st + length.slice(0, -5)*60*60*1000);
			}
			var year = et.getFullYear(),
				month = et.getMonth() + 1 < 10 ? "0" + (et.getMonth() + 1) : (et.getMonth() + 1),
				day = et.getDate() < 10 ? "0" + et.getDate() : et.getDate(),
				hour = et.getHours() < 10 ? "0" + et.getHours() : et.getHours(),
				min = et.getMinutes() < 10 ? "0" + et.getMinutes() : et.getMinutes();
			
			return year + "-" + month + "-" + day + " " + hour + ":" + min;
		},
		//根据开始日期和日期持续时间计算结束日期
		calEndDate:function(startDate, length){
			var st = new Date(startDate);
				
			if(length.indexOf('week') > -1){
				st.setDate(st.getDate() + length.substring(0, 1)*7);
			}else if(length.indexOf('month') > -1){
				st.setDate(st.getDate() + length.substring(0, 1)*30);
			}
			var year = st.getFullYear(),
				month = st.getMonth() + 1 < 10 ? "0" + (st.getMonth() + 1) : (st.getMonth() + 1),
				day = st.getDate() < 10 ? "0" + st.getDate() : st.getDate();
			return year + "-" + month + "-" + day;
		},
		//将日期转换为week
		dateToWeek:function(date){
			var d = new Date(date), str = "";
			switch (d.getDay()){
				case 0:
					str = "Sun";
					break;
				case 1:
					str = "Mon";
					break;
				case 2:
					str = "Tue";
					break;
				case 3:
					str = "Wen";
					break;
				case 4:
					str = "Thu";
					break;
				case 5:
					str = "Fri";
					break;
				case 6:
					str = "Sat";
					break;
				default:
					break;
			}
			return str;
		}
	}
	return {
		'layerMe': layerMe,
		'SHErrorBox': SHErrorBox,
		'dateTimeConvert': dateTimeConvert,
		'bsSelectPickerInit': bsSelectPickerInit,
		'dateTimePickerInit': dateTimePickerInit
	}
})


