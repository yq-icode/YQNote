import Mock from './WxMock.js'
let Random = Mock.Random;

let mockData = Mock.mock('/mock/mockData', {
	/* 菜单 */
	"navs":{
		"model":[
			{
				"title": "自定义导航栏背景图",
				"url":"/pages/md/md001",
			},{
				"title": "圆形进度条",
				"url":"/pages/md/md002",
			}
		]
	},
	/* 测试数据(用于页面填充) */
	"testData|30-100":[
		{
			"name": Random.csentence(6, 20)
		}
	]
})

export{mockData};
