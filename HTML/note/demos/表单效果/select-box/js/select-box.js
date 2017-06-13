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
})
