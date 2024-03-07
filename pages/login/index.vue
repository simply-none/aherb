<template>
	<view>
		<view>
			<view class="loginBox">
				<uni-data-select
					style="margin-bottom: 10rpx;"
					:clear="false"
				    v-model="selectUrl"
				    :localdata="range"
					@change="changeUrl"
				></uni-data-select>
				<u--input
					style="margin-bottom: 10rpx;"
					placeholder="请输入账号(域控账号)"
					border="surround"
					v-model="userName"
				></u--input>
				<u--input
					password
					style="margin-bottom: 10rpx;"
					placeholder="请输入密码"
					border="surround"
					v-model="passWord"
				></u--input>
				<button type="primary" @click="login">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				userName: '',
				passWord: '',
				range: [
				    { value: 'http://sommelier.pro2.pro-plat-3.ant.ac.sitejiu.local/sitir-sommelier-service', text: "生产环境" },
				    { value: 'http://gateway.dev0.plat5.ant.magicsmithy.sitir.net', text: "测试环境" },
				],
				selectUrl: 'http://sommelier.pro2.pro-plat-3.ant.ac.sitejiu.local/sitir-sommelier-service'
			}
		},
		methods: {
			login () {
				uni.switchTab({
					url: '/pages/user/index'
				})
				// return true
				
				// uni.request({
				// 	// url:  this.selectUrl + '/sitir-auth-service/oauth/token',
				// 	url: 'https://keycloak.sitejiu.local/auth/realms/sitir/protocol/openid-connect/token',
				// 	method: 'POST',
				// 	header:{
				// 		'Accept': 'application/json',
				// 		'Content-Type' : 'application/x-www-form-urlencoded',
				// 	},
				// 	data: {
				// 		grant_type: 'password',
				// 		client_id: 'nipponia',
				// 		client_secret: 'smithy-pc',
				// 		username: this.userName,
				// 		password: this.passWord
				// 	},
				// 	success: res => {
				// 		console.log(res.data.status)
				// 		if (res.data.status === 0) {
				// 			uni.showToast({
				// 				title: '账户或密码错误',
				// 				icon: 'error'
				// 			}) 
				// 		} else {
				// 			uni.setStorageSync('localData', res.data)
				// 			if (res.data.access_token === undefined) {
				// 				uni.showToast({
				// 					title: '当前服务不可用',
				// 					icon: 'error'
				// 				})
				// 				uni.clearStorageSync('localData')
				// 			} else {
				// 				uni.switchTab({
				// 					url: '/pages/user/index'
				// 				})
				// 			}
				// 		}
				// 	},
				// 	fail: res => {
				// 		console.log(res, 'res')
				// 	}
				// })
			},
			changeUrl (url) {
				// console.log(url)
				uni.setStorageSync('urlData',url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		width: 100%;
		height: 100%;
		background: url('../../static/jiulei.jpg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.loginBox {
		width: 70%;
		height: 100%;
		margin: 45% auto;
	}
</style>