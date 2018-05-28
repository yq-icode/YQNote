
var db, dbName = "idxTestDB", dbVersion = 4;
var OS_TUser = "TUser";

var DBOpenRequest = window.indexedDB.open(dbName, dbVersion);//打开数据库(只有改变版本号才能对该数据库结构和数据进行操作)

//下面事情执行于：数据库首次创建版本，或者window.indexedDB.open传递的新版本（版本数值要比现在的高）
DBOpenRequest.onupgradeneeded = function(event) {
    var db = event.target.result;
    console.log("数据库当前版本：" + event.newVersion)

    // 创建一个数据库存储对象
    var os = db.createObjectStore(OS_TUser, {
        keyPath: 'IDXid',
        autoIncrement: true
    });

    // 定义存储对象的数据项
    os.createIndex('IDXid', 'Tid', {
        unique: true
    });
    os.createIndex('IDXname', 'Tname');
    os.createIndex('IDXsex', 'Tsex');
    os.createIndex('IDXyihun', 'Tyihun');
    os.createIndex('IDXbirthday', 'Tbirthday');
    os.createIndex('IDXaddr', 'Taddr');
    os.createIndex('IDXxingQu', 'TxingQu');
    os.createIndex('IDXremark', 'Tremark');
};

//数据库打开成功后
DBOpenRequest.onsuccess = function(event) {
    db = DBOpenRequest.result; //存储数据结果
    method.show();
};

var method = {
	add: function(newItem){
		var TA = db.transaction(OS_TUser,'readwrite');
		
		var objSt = TA.objectStore(OS_TUser);
		var OSRequest = objSt.add(newItem);
		
		OSRequest.onsuccess = function(){
			method.show();
		}
		OSRequest.onerror = function(){
			console.log("add error");
		}
	},
	show: function(){
		var _html = "", xuHao = 1;
		var objSt = db.transaction(OS_TUser).objectStore(OS_TUser);
		var range = IDBKeyRange.upperBound(3, false);
		objSt.openCursor().onsuccess = function(e){
			var cursor = e.target.result;
			if(cursor){
				_html += "<tr><td>" + xuHao + "</td>" + $('#tp1').tmpl(cursor.value).html() + "</tr>";
				xuHao = xuHao + 1;
				cursor.continue();
			}
			else{
				$('#tbList').html(_html);
			}
		}
	},
	edit: function(id){
		var objSt = db.transaction(OS_TUser,'readwrite').objectStore(OS_TUser);
		
	},
	del: function(id){
		var objSt = db.transaction(OS_TUser,'readwrite').objectStore(OS_TUser);
		var request = objSt.delete(id);
		request.onsuccess = function(){
			method.show();
		}
	}
}

//表单提交新增数据
var fmE = document.getElementById('fmEle');
fmE.addEventListener('submit', function(event){
	event.preventDefault();
	
	//将提交的表单数据存储为需要的格式
	var addData = {};
	addData['TxingQu'] = '';
	addData['Tyihun'] = "否"; //默认为未选中
	$(fmE).serializeArray().forEach(function(e){
    	if(e.name){
    		addData[e.name] = e.value;
    		
    		//将兴趣爱的多个值合并到一起
    		if(e.name.indexOf('TxingQu') > -1){
    			addData['TxingQu'] += e.value + " ";
    		}
    	}
    })
	
    console.log(addData);
    
	method.add(addData);
	this.reset();
})

//编辑数据
document.querySelector('#tbList').addEventListener('click', function(e){
	var eleBtn = e.target, id = "";//注意：必须为主键ID,即 IDXid 而不是 Tid
	if(eleBtn && eleBtn.classList.contains('edit') && (id = eleBtn.getAttribute('data-id'))){
		method.edit(parseInt(id));
		e.preventDefault();
	}
})

//删除数据
document.querySelector('#tbList').addEventListener('click', function(e){
	var eleBtn = e.target, id = "";//注意：必须为主键ID,即 IDXid 而不是 Tid
	if(eleBtn && eleBtn.classList.contains('del') && (id = eleBtn.getAttribute('data-id'))){
		method.del(parseInt(id));
		e.preventDefault();
	}
})