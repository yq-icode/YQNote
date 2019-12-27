require.config({
    paths: {
//      mock: 'http://mockjs.com/dist/mock'
        mock: 'mockjs' //mockjs 是通过npm全局安装
    }
})
require(['mock'], function(Mock){
	// Mock.mock(rurl, function(options))
//	Mock.mock(/\.json/, function(options) {
//	    return options
//	})
	
	Mock.mock(/\.html/, {
	    'list|1-5': [{
	        'id|+1': 1,
	        'email': '@EMAIL'
	    }],
	    'arr|1-5': [{
	        'id|+1': 1,
	        'name': '@cname'
	    }]
	})
	
	$.ajax({
	    url: 'hello.html',
	    dataType: 'json'
	}).done(function(data, status, jqXHR) {
	    console.log(JSON.stringify(data, null, 4))
	})
	
	$.ajax({
	    url: 'hello.html',
	    dataType: 'json',
	    data: {
	        foo: 1,
	        bar: 2,
	        faz: 3
	    }
	}).done(function(data, status, jqXHR) {
	    console.log(JSON.stringify(data, null, 4))
	})
	
	$.ajax({
	    url: 'hello.html',
	    type: 'post',
	    dataType: 'json',
	    data: {
	        foo: 1,
	        bar: 2,
	        faz: 3
	    }
	}).done(function(data, status, jqXHR) {
	    console.log(JSON.stringify(data, null, 4))
	})

})