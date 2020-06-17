define(['./lib/mock'],function(Mock){
	var Random = Mock.Random;
	var mData = Mock.mock({
		
		/* 模拟指定范围的日期与时间段，并按日期先后排序
		 * ------------------------------------ */
		"DateF1|5":[
			{
				//开始日期（控制开始日期范围为：当天日期 - dateDiff）
				"startDate": function(){
					var d1, d2;
					d1 = new Date();
					d1.setTime(d1.getTime() - this.dateDiff*24*60*60*1000);
					d2 = d1;
					var year = d2.getFullYear(),
						month = d2.getMonth() + 1 < 10 ? "0" + (d2.getMonth() + 1) : (d2.getMonth() + 1),
						day = d2.getDate() < 10 ? "0" + d2.getDate() : d2.getDate();
					return year + "-" + month + "-" + day;
				},
				//为了不让结束时间超出24点，取0-18点的时间范围
				"startTime": function(){
					var h = Math.round(Math.random() * 18),
						m = Math.round(Math.random() * 59),
						hh = h < 10 ? "0" + h : h,
						mm = m < 10 ? "0" + m : m;
					return hh + ":" + mm;
				},
				//结束时间 = startTime + duration
				"endTime": function(){
					var st = new Date(this.startDate + " " + this.startTime).getTime(),
						et = new Date(),
						duration = (Math.random()*6).toFixed(2); //单位：小时
						
					et.setTime(st + duration*60*60*1000);
					
					var hour = et.getHours() < 10 ? "0" + et.getHours() : et.getHours(),
						min = et.getMinutes() < 10 ? "0" + et.getMinutes() : et.getMinutes();
					
					return hour + ":" + min;
				},
				"dateDiff|+1":1
			}
		]
		
	})
	
	return mData;
})


	




