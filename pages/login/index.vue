<template>
  <view class="sitir-basic-app-login sba-login">
    <view class="sba-login-app">
      <u-avatar class="sba-login-app-avatar" :src="logoUrl" shape="square" size="60"></u-avatar>
      <view class="sba-login-app-name">
        四特酒聚合平台客户端
      </view>
      <!-- <view class="loginBox">
        <uni-data-select style="margin-bottom: 10rpx;" :clear="false" v-model="selectUrl" :localdata="range"
          @change="changeUrl"></uni-data-select>
        <u--input style="margin-bottom: 10rpx;" placeholder="请输入账号(域控账号)" border="surround"
          v-model="userName"></u--input>
        <u--input password style="margin-bottom: 10rpx;" placeholder="请输入密码" border="surround"
          v-model="passWord"></u--input>
        <button type="primary" @click="login">登录</button>
      </view> -->
    </view>

    <view class="sba-login-fields">
      <view class="sba-login-fields-title">
        <u-icon class="sba-login-fields-icon" name="file-text" color="#2979ff" size="28"></u-icon>
        <view class="sba-login-fields-text">环境设置</view>
      </view>
      <u--form class="sba-login-field-wrapper" labelPosition="left" labelWidth="66" :model="loginData"
        :rules="loginRules" ref="uForm">
        <u-form-item class="sba-login-field" label="入口地址" prop="userInfo.name" borderBottom ref="item1">
          <u-input placeholder="请输入入口地址" @focus="onShowUpdateEnvUrlBtn(true)">
            <template slot="suffix">
              <u-code ref="uCode" seconds="20" changeText="X秒重新获取哈哈哈"></u-code>
              <u-button v-if="showUpdateEnvUrlBtn" @tap="onUpdateEnv" text="更新" type="success" size="mini"></u-button>
            </template>
          </u-input>
        </u-form-item>
        <u-form-item class="sba-login-field" label="环境选择" prop="userInfo.name" borderBottom ref="item1">
          <uni-data-select style="margin-bottom: 10rpx;" :clear="false" v-model="selectUrl" :localdata="range"
            @change="changeUrl"></uni-data-select>
        </u-form-item>
      </u--form>
    </view>
    <view class="sba-login-fields">
      <view class="sba-login-fields-title">
        <u-icon class="sba-login-fields-icon" name="account" color="#2979ff" size="28"></u-icon>
        <view class="sba-login-fields-text">账户信息</view>
      </view>
      <u--form class="sba-login-field-wrapper" labelPosition="left" labelWidth="66" :model="loginData"
        :rules="loginRules" ref="uForm">
        <u-form-item class="sba-login-field" label="账户名" prop="userInfo.name" borderBottom ref="item1">
          <u-input placeholder="请输入账号(域控账号)" @focus="onShowUpdateEnvUrlBtn(true)">
          </u-input>
        </u-form-item>
        <u-form-item class="sba-login-field" label="密码" prop="userInfo.name" borderBottom ref="item1">
          <u-input type="password" placeholder="请输入密码" @focus="onShowUpdateEnvUrlBtn(true)">
          </u-input>
        </u-form-item>
      </u--form>
    </view>
    <u-button @click="login" type="primary" icon="lock" text="登入"></u-button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        loginData: {},
        loginRules: {},
        logoUrl: '../../static/logo1.png',
        showUpdateEnvUrlBtn: false,
        userName: '',
        passWord: '',
        range: [{
            value: 'http://sommelier.pro2.pro-plat-3.ant.ac.sitejiu.local/sitir-sommelier-service',
            text: "生产环境"
          },
          {
            value: 'http://gateway.dev0.plat5.ant.magicsmithy.sitir.net',
            text: "测试环境"
          },
        ],
        selectUrl: 'http://sommelier.pro2.pro-plat-3.ant.ac.sitejiu.local/sitir-sommelier-service'
      }
    },
    methods: {
      onUpdateEnv() {
        this.onShowUpdateEnvUrlBtn(false)
      },
      onShowUpdateEnvUrlBtn(show) {
        this.showUpdateEnvUrlBtn = show
      },
      login() {
        uni.switchTab({
          url: '/pages/me/me'
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
      changeUrl(url) {
        // console.log(url)
        uni.setStorageSync('urlData', url)
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

  .sba-login {
    &-app {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    &-fields {
      &-title {
        display: inline-flex;
        align-items: center;
        // padding-bottom: 24rpx;
      }
    }
  }
</style>