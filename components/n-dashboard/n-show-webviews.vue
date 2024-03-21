<template>
  <view class="sitir-basic-app-dashboard-show-apps sbadsa">
    <text class=" font-size-base">展示所有打开应用</text>
    <view v-for="app in apps">
      <text class="font-size-base">{{ app.url }}</text>
    </view>
    <view class="sbadsa-body">
      <template v-for="webView in apps">
        <st-web-view :key="webView.url" :class="['sbadsa-web-view']" :web-url="webView.url"></st-web-view>
      </template>
    </view>
  </view>
</template>

<script>
  import StWebView from '@/components/st-web-nview.nvue'
  export default {
    components: {
      StWebView,
    },
    props: {
      apps: {
        type: [Array],
        default: () => [],
      },
    },
    data() {
      return {

      };
    },
    methods: {
      setActiveWebview(app) {
        this.$emit('setActiveWebview', {
          id: Date.now(),
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
  .sbadsa {
    display: flex;
    flex: 1;
    flex-flow: column;

    &-body {
      flex: 1;
      display: flex;
      flex-flow: row wrap;

    }

    &-web-view {
      display: flex;
      width: 250rpx;
      height: 200rpx;
      color: red;

      &-inner {
        flex: 0;
        z-index: -10000;
      }

      &-active {
        flex: 1;
      }
    }

    &-divider {
      width: 1rpx;
      background-color: #dcdfe6;

    }
  }
</style>