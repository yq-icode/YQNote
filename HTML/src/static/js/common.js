// JavaScript Document

window.onload = function(){
	//gnHover();
	//snHover();
}

//hover effct on global navi
function gnHover(){
	var li_group = $('header').getElementsByTagName('li');
	for(i=0;i<li_group.length;i++){
		if(li_group[i].style.backgroundColor != '#5FA9C2' ){
			li_group[i].onmouseover = function(){
				this.style.backgroundColor = '#cccccc';
			}
			li_group[i].onmouseout = function(){
				this.style.backgroundColor = '#5FA9C2';	
			}
		}
	}
}

//hover effct on side navi
function snHover(){
	var dt_group = $('sideNavi').getElementsByTagName('dt');
	for(i=0;i<dt_group.length;i++){
		dt_group[i].onmouseover = function(){
			with(this.style){
				backgroundColor = '#fff';
				borderLeft = '1px solid #DDD';
				borderBottom = '1px solid #CCC';
				borderRight = '1px solid #DDD';
			}
		}
		dt_group[i].onmouseout = function(){
			with(this.style){
				backgroundColor = '#F8F8F8';
				borderLeft = '1px solid #EEE';
				borderBottom = '1px solid #DDD';
				borderRight = '1px solid #EEE';
			}
		}
	}
}


//******************************************************
// new part
//******************************************************
$(document).ready(function() {
	//reset 'padding-left' for code-box which has class='line-numbers'
	var codebox = $('.code-box');
	$(codebox).each(function(index, element) {
        if($(this).find('pre').hasClass('line-numbers')){
			$(this).css({'padding-left':'20px'});
		}
    });
});
//show tooltip
$(function () {
	if($('[data-toggle="tooltip"]').length){
		$('[data-toggle="tooltip"]').tooltip();
	}
})