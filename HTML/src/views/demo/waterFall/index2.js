var outDiv = document.getElementById('main');

/* 滚动加载
 */
function newData(){
	if (checkWillLoad()){ //判断是否加载
		var data = { //创造假数据 
			"dataImg": [
				{"img": "1 (31).jpg"},
				{"img": "1 (32).jpg"},
				{"img": "1 (33).jpg"},
				{"img": "1 (34).jpg"},
				{"img": "1 (35).jpg"}
			]
		};
		//遍历创建盒子 
		$.each(data.dataImg,function (index,value) { 
			var newBox = $('<div>').addClass('box').appendTo($('#main .inner')); //创建一个div标签 设置它的类为'box' 添加到'main'里面去 
			var newPic = $('<div>').addClass('pic').appendTo($(newBox));
			$('<img>').attr('src','images/'+$(value).attr('img')).appendTo($(newPic));//创建img 取出遍历的对象value的img属性对应的值，$(value).attr('img')写法等同于value.img
		})
	}
}
//判断是否加载
function checkWillLoad(){
	var dis1 = $('#main .inner').width(); //safari中无法正确取此值，dis1一直小于dis2,所以safari只要向右滚动就会一直加载
	var dis2 = outDiv.scrollLeft + $(window).width();
	console.log("dis1:" + dis1 + " /  dis2:" + dis2);
	return dis1 <= dis2;
}


/* 添加滚动效果
 */
var addMouseWheelHandler = function(){
    if(document.addEventListener){
        document.addEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
        document.addEventListener('wheel', MouseWheelHandler, false); //Firefox
        document.addEventListener('DOMMouseScroll', MouseWheelHandler, false); //Old Firefox
    }
    else{
        document.attachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
    }
},
removeMouseWheelHandler = function(){
    if(document.addEventListener){
        document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
        document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
        document.removeEventListener('DOMMouseScroll', MouseWheelHandler, false); //old Firefox
    }
    else{
        document.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
    }
},
stopDefault = function(e){
    //W3C
    if (e && e.preventDefault)
        e.preventDefault();
    //IE
    else
        window.event.returnValue = false;
    return false;
},

//滚动后的处理函数 
MouseWheelHandler = function(e){
    stopDefault(e);
    var step = $('.box').width();
    var e = e || window.event,
        value = e.wheelDelta || -e.deltaY || -e.detail,
        delta = Math.max(-1, Math.min(1, value));
        
    if(delta < 0){//向下滚动鼠标滚轮，屏幕滚动条右移 
         outDiv.scrollLeft += step;
         newData();//滚动加载
    }
    else{//向上滚动鼠标滚轮，屏幕滚动条左移
        outDiv.scrollLeft -= step;
    }
};
   
