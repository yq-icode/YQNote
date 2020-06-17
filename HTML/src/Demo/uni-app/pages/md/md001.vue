<template>
	<view>
		<uni-nav-bar fixed status-bar left-icon="back" @clickLeft="back" :title="pageTitle" color="#ffffff" background-color="transparent"></uni-nav-bar>
		<scroll-view scroll-y>
			<view v-for="(item, index) in list" :key="index">
				<view>{{item.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	export default {
		data(){
			return {
				pageTitle: "",
				list: []
			}
		},
		components:{
			uniNavBar
		},
		onLoad(e) {
			this.pageTitle = e.title;
			this.getList();
		},
		methods:{
			back:function(){
				uni.navigateBack();
			},
			getList:function(){
				let that = this;
				uni.request({
					url:"/mock/mockData",
					success:function(res){
						console.log(res);
						that.list = res.testData;
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #EFF0F1;
		background-image: url('@/static/img/bg2.jpg');
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 100% 180rpx;
	}
	scroll-view {
		position: absolute;
		left: 0;
		right: 0;
		top: 180rpx;
		bottom: 0;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
</style>
