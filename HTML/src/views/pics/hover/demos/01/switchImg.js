function switchImg(){
	try{
		var obj = document.getElementsByClassName('Hover');
		for(i=0;i<obj.length;i++){
			obj[i].onmouseover = function(){
	      this.src = this.src.replace(/(.+?)(\.gif|\.png|\.jpg)/g,"$1_over$2")
			}
			obj[i].onmouseout = function(){
	      this.src = this.src.replace(/_over/g,"");
			}
		}
	}
	catch(e){}
}
