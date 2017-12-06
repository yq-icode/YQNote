// JavaScript Document

//draw-01
//*********************************************************
$(document).ready(function(e) {
    var obj,num,time,prize_num, prize = new Array(), string_gx;
	$obj = $('.grid-game-wrap');
	$btn = $obj.find('.btn input');
	string_gx = '恭喜您荣获：';
	prize_num = 12;//格子总数量
	num = 0;
	time = 0;//每次点击时经过的奖品数
	
	prize[1] = string_gx + '天猫积分1888';
	prize[2] = string_gx + '天猫积分588';
	prize[3] = string_gx + '天猫积分188';
	prize[4] = string_gx + '价值69元美白保湿套装';
	prize[5] = string_gx + '天猫积分88';
	prize[6] = string_gx + '天猫积分58';
	prize[7] = string_gx + '天猫积分28';
	prize[8] = string_gx + '价值148元迪士尼女表一个';
	prize[9] = string_gx + '天猫积分18';
	prize[10] = string_gx + '天猫积分8';
	prize[11] = '再试试手气！';
	prize[12] = string_gx + '价值2888元倍轻松按摩器一个';
	
	$btn.click(function(){
		//选择奖品期间，按钮不可点击
		$(this).attr({'disabled':'disabled'});
		hpad();
	})
	
	function hpad(){
		if(num >= prize_num){num = 0;}
		//注意：下面两行代码的动画时间一定要是0，否则就会造成提示奖品弹出后，才选中最终奖品的情况
		$obj.find('li').animate({opacity:1},0);
		$obj.find('li').eq(num).stop(true, false).animate({opacity:0.3},0);
		
		//随着经过的奖品个数增多，速度逐渐减慢
		var speed = Math.floor(time/prize_num)*30+30+time*2;
		
		t = setTimeout(hpad,speed);
		num++;
		time++;
		if(time > 24 && time%prize_num == Math.round(Math.random(prize_num)*10)){
			clearTimeout(t);
			//抽奖一次后，置0
			time=0;
			//弹出所中奖品
			if(num){alert(prize[num]);}
			//一次抽奖完成，让按钮恢复可点状态
			$btn.removeAttr('disabled');
		}
	}
	
});

//draw-02
//*********************************************************