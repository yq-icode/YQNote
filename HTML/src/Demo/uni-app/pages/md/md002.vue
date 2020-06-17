<template>
	<view class="uni-padding-wrap">
		<view class="circleProgressWrap">
			<view class="circleProgress">
				<view class="progressTextBox">
					<text class="score">{{curScore}}</text>
				</view>
				<view class="left">
					<view class="leftProgress" :style="{ transform: 'rotate(' + degL + 'deg)'}"></view>
				</view>
				<view class="right">
					<view class="rightProgress" :style="{ transform: 'rotate(' + degR + 'deg)'}"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				degL: -45, 		//leftProgress旋转角度
				degR: 45,		//rightProgress旋转角度
				curScore: 60
			}
		},
		onLoad(e) {
			this.sliderchange(this.curScore);
		},
		methods: {
			//计算旋转角度
			sliderchange: function(score) {
				var deg = score / 100 * 360;
				if (deg <= 180) {
					this.degL = -45;
					this.degR = 45 + deg;
				} else {
					this.degL = -45 + (deg - 180);
					this.degR = 45 + 180;
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		height: 100%;
	}
	.uni-padding-wrap {
		height: 100%;
		background: #007AFF;
		color: #fff;
	}
	.circleProgressWrap {
		width: 100%;
		height: 350upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.circleProgress{
		position: relative;
		width: 290upx;
		height: 290upx;
		display: flex;
		justify-content: center;
		background: linear-gradient(135deg, #0CA3F9, #0B75FD);
		border-radius: 50%;
	}
	.circleProgress .progressTextBox{
		position: absolute;
		left:0;
		top: 0;
		z-index: 10;
		width: 100%;
		height: 100%; 
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
	.circleProgress .progressTextBox .score{
		font-size: 90upx;
	}
	.circleProgress .left, .circleProgress .right{
		width: 145upx;
		height: 290upx;
		overflow: hidden;
	}
	.circleProgress .leftProgress, .circleProgress .rightProgress{
		width: 260upx;
		height: 260upx;
		border:15upx solid rgba(255,255,255,0.2);
		border-bottom:15upx solid rgba(255,255,255,0.8);
		border-radius: 50%;
	}
	.circleProgress .leftProgress{
		border-right:15upx solid rgba(255,255,255,0.8);
	}
	.circleProgress .rightProgress{
		border-left:15upx solid rgba(255,255,255,0.8);
		margin-left: -145upx;
	}
</style>
