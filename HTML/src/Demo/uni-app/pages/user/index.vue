<template>
	<view class="uni-padding-wrap">
		<view class="uni-center uni-common-mt">
			<block v-if="hasUserInfo === false">
				<button open-type="getUserInfo" @getuserinfo="mGetUserInfo">我要登录</button>
			</block>
			<block v-if="hasUserInfo === true">
				<view>
					<image class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
				</view>
				<view class="uni-h4">{{userInfo.nickName}}</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userInfo: {},
				hasUserInfo: false
			}
		},
		onLoad() {
			
		},
		onShow() {
		},
		methods:{
			mGetUserInfo:function(res){
				console.log("**: " + JSON.stringify(res.detail.userInfo));
				if (res.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + res.detail.errMsg,
						showCancel: false
					});
					return;
				}
				this.hasUserInfo = true;
				this.userInfo = res.detail.userInfo;
			}
		}
	}
</script>

<style>
	.userinfo-avatar {
		border-radius: 128upx;
		width: 128upx;
		height: 128upx;
	}
</style>
