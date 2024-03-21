<template>
  <view class="sitir-basic-app-dashboard-setting sbads">
    <view class="sbads-top">
      <view class="sbads-top-title">
        <text class=" font-size-base">
          {{ title }}
        </text>
      </view>
      <view class="sbads-top-right" @click="closeSetting">
        <u-icon name="arrow-left-double"></u-icon>
        <text class="sbads-top-label font-size-base">设置</text>
      </view>
    </view>
    <view class="sbads-body">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: () => '',
      },
    },
    data() {
      return {

      };
    },
    methods: {
      closeSetting() {
        console.log('close')
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sbads {
    display: flex;
    flex: 1;
    flex-flow: column nowrap;

    &-top {
      height: 24rpx;
      padding: 0 12rpx 0 6rpx;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      background-color: #fafafa;

      &-title {
        flex: 1;
      }

      &-right {
        // flex: 1;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
      }

      &-label {
        padding-left: 3rpx;
      }
    }

    &-body {
      flex: 1;
    }

  }
</style>