// JavaScript Document

window.onload = function(){
	//aa();
	bb();
	
}
//aa()不可用，原因不明
function aa(){
	tag_ul = $('navi');
	for(i=0;i<tag_ul.childNotes.length;i++){
		var note = tag_ul.childNodes[i];
		if(note.noteName == 'li'){
			var mNavi = note.getElementsByTagName('a')[0];
			var sNavi = note.getElementsByTagName('dl')[0];
			
			mNavi.onmouseover = function(){alert(mNavi.id + '' + sNavi.id);
				this.style.backgroundColor = '#ccc',
				sNavi.style.display = 'block'
			}
			mNavi.onmouseout = function(){
				this.style.backgroundColor = '#CCCCFF'
				sNavi.style.display = 'none'
			}
		}
	}
}



function bb() {
	navRoot = document.getElementById("navi");
	for (i=0; i<navRoot.childNodes.length; i++) {
		node = navRoot.childNodes[i];
		if (node.nodeName=="LI") {//标签名为大写
			node.onmouseover=function() {
				this.className+="over";
			}
			node.onmouseout=function() {
				this.className=this.className.replace("over", "");
			}
		}
	}	
}