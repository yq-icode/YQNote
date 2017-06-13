// JavaScript Document

$(document).ready(function(){
	//select-box
	$('.select-box > .select-vbox').click(
		function(){
			$(this).next('.select-optionBox').slideDown('fast');
			if($(this).parent('.select-box').hasClass('address')){
				address();
			}
		}
	)
	$('.select-box').hover(
		function(){
			$(this).addClass('sb-zIndex');
		},
		function(){
			$(this).find('.select-optionBox').slideUp('fast');
			$(this).removeClass('sb-zIndex');
			if($(this).hasClass('address')){
				$(this).find('.letter').find('a').removeClass('on');
				$(this).find('dd').hide();
				$(this).find('dd').find('.region').find('.item').hide();
				$(this).find('dd').find('a').removeClass('on');
			}
		}
	)
})

function address(){
	$('.address').find('.letter').find('a').first().addClass('on');
	$('.address').find('dd').first().show();
	
	$('.address').find('.letter').find('a').click(function(){
		$('.address').find('.letter').find('a').removeClass('on');
		$(this).addClass('on');
		var letterNo = $('.address').find('.letter').find('a').index(this);
		$('.address').find('dd').hide();
		$('.address').find('dd').eq(letterNo).show();
	})
	
	$('.address').find('.city').find('a').click(function(){
		$(this).parents('.city').find('a').removeClass('on');
		$(this).addClass('on');
		var cityNo = $(this).index();
		$(this).parents('dd').find('.region').find('.item').hide();
		$(this).parents('dd').find('.region').find('.item').eq(cityNo).show();
	})
		
	$('.address').find('.region').find('a').click(function(){
		if($(this).hasClass('nolimit')){
			$('.address').find('.region').find('a').removeClass('on');
			$(this).addClass('on');
		}
		else{
			$('.address').find('.region').find('.nolimit').removeClass('on');
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				alert(1);
			}
			else{
				$(this).addClass('on');
				alert(0);
			}
		}
	})
	/*
	$('.address').find('.region').find("a:not('.nolimit')").click(function(){
		$(this).toggleClass('on');
		$('.address').find('.region').find('.nolimit').removeClass('on');
	})
	$('.address').find('.region').find('.nolimit').click(function(){
		$('.address').find('.region').find("a:not('.nolimit')").removeClass('on');
		$(this).toggleClass('on');
	})
	*/
}