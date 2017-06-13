// JavaScript Document

$(document).ready(function(){
	//select-box
	$('.select-box > .select-vbox').click(
		function(){
			$(this).next('.select-optionBox').slideDown('fast');
		}
	)
	$('.select-box').hover(
		function(){
			$(this).addClass('sb-zIndex');
		},
		function(){
			$(this).find('.select-optionBox').slideUp('fast');
			$(this).removeClass('sb-zIndex');
		}
	)
	$('.select-box > .select-optionBox').find('a').click(
		function(){
			$(this).parents('.select-optionBox').slideUp('fast');
		}
	)
	//jobSort
	$('.jobSort').find('dt').hover(
		function(){
			$(this).find('ul').slideDown('fast');
			$(this).addClass('current');
		},
		function(){
			$(this).find('ul').css({'display':'none'});
			$(this).removeClass('current');
		}
	)
})