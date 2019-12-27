<template>
	<view>
		<view v-for="(item,index) in listData" :key="index">
			<view>{{item.id}}</view>
			<view>{{item.age}}</view>
			<view>{{item.sex}}</view>
			<view>{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: []
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData:function(){
				// Mock.mock({
				// 	"listData|5":[{
				// 		"id|+1":1,
				// 		"age|18-28":25,
				// 		"sex|1":["男","女"],
				// 		"name":"@cname"
				// 	}]
				// })
				// uni.request({
				// 	url:"https://testdata.com",
				// 	success(res) {
				// 		console.log(res)
				// 	}
				// })
			}
		}
	}
</script>

<style>
</style>
