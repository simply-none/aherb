<template>
  <view class="sitir-basic-app-me sba-me">
    <status-bar></status-bar>
    <view class="sba-me-avatar">
      <u-avatar text="特" size="72" fontSize="24" randomBgColor></u-avatar>
      <view class="sba-me-info">
        <view class="sba-me-username">用户名: 四特酒</view>
        <view class="sba-me-number">工号: 20000000</view>
        <view class="sba-me-from">
          <text class="sba-me-from-label">当前组织: </text>
          <view class="sba-me-org">
            组织1级/组织2级
          </view>
        </view>
      </view>

    </view>
    <view class="sba-me-setting-wrapper">
      <view class="sba-me-setting" v-for="setting in settings" :key="setting.id">
        <text class="sba-me-setting-title">{{setting.title}}</text>
        <view class="sba-me-setting-items" v-for="item in setting.items" :key="item.id">
          <u-icon name="photo" color="#2979ff" size="28"></u-icon>
          <view class="sba-me-setting-item">{{item.title}}</view>
        </view>
      </view>
    </view>
    <view class="sba-me-logout">
      <u-button @click="logout" type="error" icon="lock-open" text="登出"></u-button>
    </view>
  </view>
</template>

<script>
  import StatusBar from '../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue'
  export default {
    components: {
      StatusBar,
    },
    data() {
      return {
        settings: [{
          title: '个人设置',
          items: [{
            title: '密码修改'
          }]
        }, {
          title: '系统设置',
          items: [{
              title: '切换组织'
            },
            {
              title: '切换环境'
            },
            {
              title: '检查更新'
            },
          ]
        }]
      }
    },
    methods: {
      logout() {
        uni.navigateTo({
          url: '/pages/login/index'
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .sba-me {
    &-avatar {
      padding: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

    }

    &-username {
      font-size: 1.2em;
      padding: 6rpx;
    }

    &-from {
      display: inline-flex;
    }

    &-setting {
      &+& {
        margin-top: 6rpx;
      }

      &-title {
        width: 100%;
        background-color: #f3f4f6;
        display: inline-block;
        padding: 12rpx;


      }

      &-items {
        padding: 12rpx;
        display: inline-flex;
        width: 100%;
      }



      &-wrapper {}
    }
  }
</style>