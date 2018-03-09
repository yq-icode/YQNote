$(window).on('load', function(){
	waterFall(); //实现瀑布流布局 
	
	$(window).on('scroll',function (){ //滚动加载
		if (checkWillLoad()){ //判断是否加载
			var data = { //创造假数据 
				"dataImg": [
					{"img": "1 (31).jpg"},
					{"img": "1 (32).jpg"},
					{"img": "1 (33).jpg"},
					{"img": "1 (34).jpg"},
					{"img": "1 (35).jpg"},
					{"img": "1 (36).jpg"},
					{"img": "1 (37).jpg"},
					{"img": "1 (38).jpg"},
					{"img": "1 (39).jpg"},
					{"img": "1 (40).jpg"}
				]
			};
			//遍历创建盒子 
			$.each(data.dataImg,function (index,value) { 
				var newBox = $('<div>').addClass('box').appendTo($('#main')); //创建一个div标签 设置它的类为'box' 添加到'main'里面去 
				var newPic = $('<div>').addClass('pic').appendTo($(newBox));
				$('<img>').attr('src','images/'+$(value).attr('img')).appendTo($(newPic));//创建img 取出遍历的对象value的img属性对应的值，$(value).attr('img')写法等同于value.img
			})
			
			waterFall(); //实现瀑布流布局 
		}
	});
});

//实现瀑布流布局 
function waterFall () { 
	
	var allBox = $('#main > .box');//拿到所有的盒子
	var boxWidth = $(allBox).eq(0).outerWidth(); //取出其中一个盒子的宽度 
	var screenWidth = $(window).width(); //取出屏幕的高度 
	var cols = Math.floor(screenWidth/boxWidth); //求出列数 
	$('#main').css({ 'width':cols * boxWidth + 'px', 'margin':'0 auto' }); //父标签居中
	
	var heightArr = []; //对子盒子定位 
	
	//遍历 
	$.each(allBox,function (index,value) { 
		var boxHeight = $(value).outerHeight(); //取出单独盒子的高度 
		
		if(index < cols){ //判断是否第一行 
			heightArr[index] = boxHeight;
		}
		else{ //剩余的盒子要瀑布流布局 
			var minBoxHeight = Math.min.apply(null,heightArr); //求出最矮的盒子高度 
			var minBoxIndex = $.inArray(minBoxHeight,heightArr); //取出最矮高度对应的索引
			$(value).css({ //定位
				'position': 'absolute',
				'top': minBoxHeight + 'px',
				'left': minBoxIndex * boxWidth + 'px'
			});
			//更新数组中最矮的高度 
			heightArr[minBoxIndex] += boxHeight;
		}
	})
}

//判断是否符合加载条件 
function checkWillLoad(){ 
	var lastBox = $('#main > div').last(); //直接取出最后一个盒子
	var lastBoxDis = $(lastBox).outerHeight() + $(lastBox).offset().top; //取出最后一个盒子高度的一半 + 头部偏离的位置
	var clientHeight = $(window).height(); //求出浏览器的高度
	var scrollTopHeight = $(window).scrollTop(); //求出页面偏离浏览器高度
	return lastBoxDis <= clientHeight + scrollTopHeight; //比较返回
}