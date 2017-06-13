// JavaScript Document
//logbox
$(function(){
	var vd_account = $('.logbox .account input').attr('value');
	$('.logbox .account input').focus(function(){
		if($(this).attr('value')==vd_account){$(this).attr('value','').css({'color':'#333'});}
	}).blur(function(){
		if($(this).attr('value')==''){$(this).attr('value',vd_account).css({'color':'#ccc'});}	
	})
	$('.logbox .pw #pw1').focus(function(){
		$(this).css({'display':'none'});
		$('.logbox .pw #pw2').css({'display':''}).focus();
	})
	$('.logbox .pw #pw2').blur(function(){
		if(!$(this).attr('value')){
			$(this).css({'display':'none'});
			$('.logbox .pw #pw1').css({'display':''});
		}
	})
})