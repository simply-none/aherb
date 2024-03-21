<template>
  <view class="sitir-basic-app-dashboard-app-nav sbadan">
    <scroll-view scroll-y="true" class="sbadan-sys">
      <block v-for="i in 50" :key="i">
        <view class="sbadan-sys-inner">
          <u-icon name="grid"></u-icon>
          <text class="sbadan-sys-item font-size-base">
            系统：{{i}}
          </text>
        </view>

      </block>
    </scroll-view>
    <view class="sbadan-divider"></view>
    <scroll-view scroll-y="true" class="sbadan-domain">
      <block v-for="i in 50" :key="i">
        <view class="sbadan-sys-inner">
          <u-icon name="car"></u-icon>
          <text class="sbadan-domain-item font-size-base">
            领域：{{i}}
          </text>
        </view>

      </block>
    </scroll-view>
    <view class="sbadan-divider"></view>
    <scroll-view scroll-y="true" class="sbadan-apps">
      <block v-for="i in 50" :key="i">
        <view class="sbadan-apps-inner" @click="setActiveWebview(i)">
          <u--image mode="scaleToFill" width="50" height="50" class="sbal-simg"
            src="https://cdn.uviewui.com/uview/album/1.jpg"></u--image>
          <text class="sbadan-apps-item font-size-base">
            应用：{{i}}
          </text>
        </view>

      </block>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {

      };
    },
    methods: {
      setActiveWebview(app) {
        this.$emit('setActiveWebview', {
          id: app,
          url: 'https://www.baidu.com/s?wd=' + app
        })
      },
      closeSetting() {
        console.log('close')
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sbadan {
    display: flex;
    flex: 1;
    flex-flow: row nowrap;

    &-sys {
      width: 150rpx;
      display: flex;

      &-inner {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        padding: 6rpx;
      }
    }

    &-domain {
      width: 150rpx;
      display: flex;


      &-inner {

        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        padding: 20rpx;
      }
    }

    &-apps {
      flex: 1;
      display: flex;
      flex-flow: row wrap;

      &-inner {
        flex: 1;
        display: flex;
        flex-flow: column;
        padding: 12rpx;
      }
    }

    &-divider {
      width: 1rpx;
      background-color: #dcdfe6;

    }
  }
</style>