// JavaScript Document

//tab switch
function tabSwitch(){
	var tc = $(".tabWrap > .tabContent > .tabConBody");
	var tab = $(".tab > li > a");
	for(var t=1;t<=tc.length;t++){
		document.getElementById('tab' + t).onclick = function(){
		for(i=0;i<tc.length;i++){
			tc[i].style.display = 'none';
			tab[i].className = '';
		}
		var arr = this.id.split('');
		document.getElementById('tc' + arr[arr.length - 1]).style.display = 'block';
		this.className = 'on';
		document.title = this.innerHTML;
		return false;
		}
	}
}

