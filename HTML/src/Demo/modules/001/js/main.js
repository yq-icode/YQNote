/* ***********************************
 * 笔记模块
/* ***********************************/
var notes = {},    //笔记对象
	noteList = []; //笔记数据
	
require(['mockData', 'qd', 'mCustomScrollbar'], function(MD, QD){
	
	/* ***********************************
	 * 笔记模块
	 * ***********************************/
	notes = {
		//获取数据
		getData:function(){
			$.ajax({
				type:"get",
				url:"/MockData/Note",
				dataType: 'json',
				success:function(d){
					noteList = d;
					notes.getNotes(d);
				}
			});
		},
		//读取笔记 Personal Note
		getNotes:function(d){
			var _html = "";
			
			//笔记添加框的HTML
			_html += notes.noteEditHtml({});
			
			notes.sortNotes(d);
			
			//笔记列表HTML
			d.forEach(function(item){
				_html += notes.noteItemHtml(item);
			})
			
			$('#note ul').html(_html);
			
			notes.noteEmpty();
		},
		
		//按时间倒序排序笔记
		sortNotes:function(data){
			data.sort(function(a,b){
				return QD.dateTimeConvert.toTimeStamp(b.noteTime) - QD.dateTimeConvert.toTimeStamp(a.noteTime);
			})
		},
		
		//打开笔记添加框 Open Note
		openNote:function(){
			$('.noteEmpty').css('display', 'none');
			if($('#note #noteAdd').css('display') === 'none'){
				$('#note #noteAdd').css('display', 'block').find('textarea').val('');
			}
			$('#note').mCustomScrollbar("scrollTo", "top");
		},
		
		//关闭笔记编辑框  close Note
		closeNote:function(e, para){
			var obj = $(e).parents('li');
				
			//关闭添加框
			if($(obj).attr('id') == "noteAdd"){
				$('#note #noteAdd').css('display', 'none');
				notes.noteEmpty();
			}else{ //关闭编辑框
				$(obj).replaceWith(notes.noteItemHtml(para));
			}
		},
		
		//将笔记转为编辑状态
		noteEdit:function(e, para){
			var obj = $(e).parents('li');
			$(obj).replaceWith(notes.noteEditHtml(para));
		},
		
		//删除笔记
		noteDelete:function(e, para){
			var _html = "<span class='confirmClose' title='delete'></span>" +
						"<p class='mt20' align='center'><img src='/Content/images/icon10.png' alt='' /></p>" +
						"<h2 class='fontS32 mt40 fontMSR700'>Delete this note?</h2>" +
						"<p class='fontS19 mt15'>The note once deleted cannot be restored.</p>";
					
			QD.layerMe.confirm(_html, ['Delete', 'Cancel'], ['660px', '480px'],
				function(layero, index){
					$(layero).find('.confirmClose').on('click', function(){
						top.layer.close(index);
					})
				},
				function(index, layero){
					top.layer.close(index);
//							noteList = noteList.filter(ele => ele.id !== para.id);
					noteList = noteList.filter(function(ele){
						return ele.id !== para.id;
					});
					$(e).parents('li').remove();
					notes.noteEmpty();
				}
			)
		},
		
		//判断笔记是否为空
		noteEmpty:function(){
			if(noteList.length == 0){
				$('.noteEmpty').css('display', 'block');
			}
		},
		
		//提交笔记 submit Note
		submitNote:function(form, para){
			var val = $(form).serializeArray()[0].value;
			if(val == ''){
				QD.layerMe.msg("note can not be empty!");
			}else{
				var curTime = QD.dateTimeConvert.dSlant(new Date().toJSON()) + " " + new Date().toTimeString().substring(0,5); //当前时间
				
				if($(form).parents('li').attr('id') == 'noteAdd'){ //添加新笔记
					var newItem = {
						"id": noteList.length + 1,
						"noteContent": val,
						"noteTime": curTime
					}
					noteList.push(newItem);
					$('#note #noteAdd').after(notes.noteItemHtml(newItem));
					
				}else{ //保存修改的笔记
//							noteList.some(item => {
//								if(item.id == para.id){
//									item.noteContent = val;
//									item.noteTime = curTime;
//									$(form).parents('li').replaceWith(notes.noteItemHtml(item));
//									return true;
//								}
//							})
					noteList.some(function(item){
						if(item.id == para.id){
							item.noteContent = val;
							item.noteTime = curTime;
							$(form).parents('li').replaceWith(notes.noteItemHtml(item));
							return true;
						}
					})
				}
				notes.closeNote(form, para);
			}
			return false;
		},
		
		//单条笔记html
		noteItemHtml:function(para){
			var _html = "<li data-id='" + para.id + "'>" +
							"<p>" + para.noteContent + "</p>" +
							"<span class='time'>" + para.noteTime + "</span>" +
							"<div class='dropDown' onclick='notes.noteMenu(this)'>" +
								"<span class='dropDown-toggle'></span>" +
								"<div class='dropDown-menu'>" +
									"<span class='edit' onclick='notes.noteEdit(this," + JSON.stringify(para) + ")'>Edit</span>" +
									"<span class='delete' onclick='notes.noteDelete(this," + JSON.stringify(para) + ")'>Delete</span>" +
								"</div>" +
							"</div>" +
						"</li>";
			return _html;
		},
		
		//笔记编辑框html
		noteEditHtml:function(para){
			var _html = "";
			if(JSON.stringify(para) == '{}'){
				_html += "<li class='editBox' id='noteAdd'>";
				para.noteContent = '';
			}else{
				_html += "<li class='editBox' data-id='" + para.id + "'>";
			}
			_html += "<form onsubmit='notes.submitNote(this," + JSON.stringify(para) + "); return false;'>" +
							"<textarea name='note'>" + para.noteContent + "</textarea>" +
							"<span class='close' onclick='notes.closeNote(this," + JSON.stringify(para) + ")'></span>" +
							"<button type='submit' class='mBtn sm blue'>Save</button>" +
					 "</form>";
			_html += "</li>";
			
			return _html;
		},
		
		//打开/关闭笔记菜单弹框 noteMenu
		noteMenu:function(e){
			$(e).find('.dropDown-menu').slideToggle(100, function(){
				var ss = $('#note').offset().top + $('#note').height() - $(e).find('.dropDown-menu').offset().top;
				if(ss <= $(e).find('.dropDown-menu').height()){
					$(e).find('.dropDown-menu').css({
						top: 'auto',
						bottom: '0.25rem'
					})
				}
			});
		}
	}
	$(function(){
		notes.getData();
		
		//笔记模块添加自定义滚动条
		$('#note').css('height', $('#note').parents('.BR').height() - 213);
		$('#note').mCustomScrollbar({
			theme: 'minimal-dark',
			mouseWheel:{
				scrollAmount: 200
			}
		})
		
		//关闭笔记菜单弹框 noteMenu
		$(document).click(function(e){
			var drops = $('#note .dropDown');
			for(var i=0; i<drops.length; i++){
				var obj = drops[i];
				if(!$(obj).is(e.target) && $(obj).has(e.target).length === 0){
			        $(obj).find('.dropDown-menu').slideUp(10);
			    }
			}
		});
	})
})