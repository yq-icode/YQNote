var Mock = require("mockjs"),
	Random = Mock.Random;

var mockData = Mock.mock({
	"usrInfo":{
		"ip":Random.ip(),
		"name": Random.cname(),
		"age|18-60": 20,
		"desc": Random.cparagraph()
	}
})

console.log(mockData);

return mockData;