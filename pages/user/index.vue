<template>
  <view>



    <view class="userBox">
      <view>
        <u-avatar :src="src" size="80"></u-avatar>
      </view>
      <view style="margin-left: 10rpx; font-size: 18rpx;">
        <view>
          当前用户：{{userBox.perName}}
        </view>
        <view>
          当前账号：{{userBox.perCode}}
        </view>
      </view>
    </view>

    <view class="funcBox">
      <u-grid :border="true" @click="gongneng">
        <u-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex">
          <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="baseListItem.name" :size="22">
          </u-icon>
          <text class="grid-text">{{baseListItem.title}}</text>
        </u-grid-item>
      </u-grid>
    </view>

    <view style="width: 100%; height: 50rpx; margin-top: 10rpx;">
      <u-button type="error " text="注销退出" @click="logOut"></u-button>
    </view>
    <view style="height: 30rpx;"></view>

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog cancelText="取消" confirmText="确定" content="您将退出当前账号,是否确定？" @confirm="dialogConfirm"
        @close="dialogClose">
      </uni-popup-dialog>
    </uni-popup>
    <u-toast ref="uToast" />
    <!-- u-laoding-page -->
    <u-loading-page bg-color="rgba(0, 0, 0, 0.3)" loading-mode="spinner" :loading="false"></u-loading-page>
  </view>
</template>

<script>
  import StWebView from '@/components/st-web-view.vue'
  export default {
    components: {
      StWebView
    },
    data() {
      return {
        subData: {},
        // 若使用模拟器，则必须保证模拟器的网络和电脑的网络在同一个环境下，才能访问weburl
        // webUrl: 'http://localhost:8082/pages/component/view/view'				,
        webUrl1: 'http://192.168.1.113:8081/#/pages/index/index',
        webUrl2: 'https://www.baidu.com',
        webUrl: '',
        userBox: '',
        src: '',
        baseList: [
          //      {
          // 	name: 'photo',
          // 	title: '历史轮次列表'
          // },
          // {
          // 	name: 'lock',
          // 	title: '待品评'
          // },
          // {
          // 	name: 'star',
          // 	title: '检查更新'
          // }
        ]
      }
    },
    onReady() {
      this.webUrl = this.webUrl1
    },
    onLoad() {
      // let arry = uni.getStorageSync('localData') || '' 
      // if (arry === '') {
      // 	uni.redirectTo({
      // 		url: '/pages/login/index'
      // 	})
      // } else {
      // 	this.getUser()
      // }
    },
    methods: {
      receiveData(data) {
        console.log(data, 'receive')
        this.subData = data
      },
      toggle() {
        uni.redirectTo({
          url: '/pages/view1/view1'
        })
      },
      toggle2() {
        uni.redirectTo({
          url: '/pages/test_nvue'
        })
      },
      dialogConfirm() {
        uni.clearStorageSync('localData')
        uni.clearStorageSync('urlData')
        uni.redirectTo({
          url: '/pages/login/index'
        })
      },
      dialogClose() {

        console.log('点击关闭')
      },
      gongneng(num) {
        if (num === 0) {

        } else if (num === 1) {

        } else if (num === 2) {
          // 检测本地应用版本并对比线上版本判断是否进行更新（测试需要真机测试且修改为main-dev.json，本地浏览器无法使用）
          plus.runtime.getProperty(plus.runtime.appid, (info) => {
            uni.request({
              url: 'http://free.sitejiu.com:8088/repository/apps/main.json',
              sslVerify: false
            }).then(res => {
              console.log(res)
              if (info.version < res[1].data.client.android.version) {
                uni.downloadFile({
                  url: res[1].data.client.android.uri,
                  success(data) {
                    if (data.statusCode === 200) {
                      uni.showLoading({
                        title: '下载中'
                      })
                      setTimeout(function() {
                        plus.runtime.install(data.tempFilePath)
                        uni.hideLoading()
                      }, 3000)
                    } else {
                      uni.showToast({
                        icon: 'error',
                        title: '更新失败'
                      })
                    }
                  }
                })
              } else {
                this.$u.toast('暂无新版本')
              }
            })
          })
        }
      },
      getUser() {
        uni.request({
          url: 'https://keycloak.sitejiu.local/auth/realms/sitir/protocol/openid-connect/userinfo',
          method: 'GET',
          header: {
            "Accept": "application/json",
            "Content-type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + uni.getStorageSync('localData').access_token
          },
          success: (response) => {
            this.getUserInfo(response)
          },
          fail: (err) => {
            uni.reLaunch({
              url: "/pages/login/index",
            });
            uni.showToast({
              title: "接口超时,请重新登入",
              position: "top",
              duration: 1000,
              icon: "error"
            })
          }
        })
      },
      getUserInfo(res) {
        uni.request({
          url: 'http://nipponia.andeancat.pro-plat-3.ant.ac.sitejiu.local/nipponia-service/v1/nipponia/get-personal-info',
          method: 'GET',
          data: {
            accId: res.data.attributes.LDAP_ID,
            orgId: 10000,
            orgCode: "pro2",
          },
          header: {
            "Accept": "application/json",
            "Content-type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + uni.getStorageSync('localData').access_token
          },
          success: (response) => {
            this.userBox = response.data.resultBody
            uni.setStorageSync('userData', response.data.resultBody)
          },
          fail: (err) => {
            uni.reLaunch({
              url: "/pages/login/index",
            });
            uni.showToast({
              title: "接口超时,请重新登入",
              position: "top",
              duration: 1000,
              icon: "error"
            })
          }
        })
      },
      logOut() {
        this.$refs.alertDialog.open('center')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .userBox {
    width: 100%;
    height: 150rpx;
    border-bottom: 1px solid #ccc;
    display: flex;
    // justify-content: center;   /* 子元素水平居中 */
    align-items: center;
    /* 子元素垂直居中 */
    padding-left: 20rpx;
  }

  .funcBox {
    border-bottom: 1rpx solid #ccc;
  }

  .grid-text {
    font-size: 14px;
    color: #909399;
    padding: 10rpx 0 20rpx 0rpx;
    /* #ifndef APP-PLUS */
    box-sizing: border-box;
    /* #endif */
  }
</style>