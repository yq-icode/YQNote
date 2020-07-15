//define(['mock'],function(Mock){
//	var mData = Mock.mock({
//		/* Personal Note */
//		"Note|0-10":[
//			{
//				"id|+1": 1,
//				"noteTime": "@datetime(dd/MM/yyyy HH:mm)",
//				"noteContent": "@sentence(3,35)"
//			}
//		]
//	})
//	Mock.mock('Note', mData.Note);
//})

require(['mock'], function(Mock){
	var mData = Mock.mock({
		/* Personal Note */
		"Note|0-10":[
			{
				"id|+1": 1,
				"noteTime": "@datetime(dd/MM/yyyy HH:mm)",
				"noteContent": "@sentence(3,35)"
			}
		]
	})
	Mock.mock('Note', mData.Note);
})
