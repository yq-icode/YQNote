<template>
	<view class="uni-padding-wrap">
		<view class="list">
			<view v-for="(item,index) in navs" :key="index" class="item" @tap="jump(item)">
				<view class="font34">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				"navs": []
			}
		},
		onLoad() {
			this.getList();
		},
		methods:{
			jump:function(e){
				uni.navigateTo({
					url: e.url + "?title=" + e.title
				})
			},
			getList:function(){
				let that = this;
				uni.request({
					url:"/mock/mockData",
					success:function(res){
						console.log(res);
						that.navs = res.navs.model;
					}
				})
			}
		}
	}
</script>

<style>
</style>
