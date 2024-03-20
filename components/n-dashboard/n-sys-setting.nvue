<template>
  <view class="sitir-basic-app-dashboard-sys-setting sbadss">
    <view class="sbadss-sys">
      <block v-for="tab in tabs" :key="tab.name">
        <view class="sbadss-sys-inner">
          <u-icon :name="tab.name"></u-icon>
          <text class="sbadss-sys-item font-size-base">
            {{ tab.title }}
          </text>
        </view>

      </block>
    </view>
    <view class="sbadss-divider"></view>
    <view class="sbadss-body">
      <slot></slot>
    </view>
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
        activeTab: {
          component: '',
          openSetting: false,
        },

        tabs: [{
            name: 'account',
            title: '个人信息',
            label: 'apps',
            component: 'NAppNav',
            color: '#000',
            size: 28,
          },
          {
            name: 'calendar',
            title: '环境切换',
            label: 'setting',
            component: 'NSysSetting',
            color: '#000',
            size: 28,
          },
          {
            name: 'error-circle',
            title: '关于系统',
            label: 'setting',
            component: 'NSysSetting',
            color: '#000',
            size: 28,
          },
        ],
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
  .sbadss {
    display: flex;
    flex: 1;
    flex-flow: row nowrap;

    &-sys {
      width: 100rpx;
      display: flex;

      &-inner {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        padding: 6rpx;
      }
    }

    &-domain {
      width: 100rpx;
      display: flex;

      &-inner {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        padding: 6rpx;
      }
    }

    &-body {
      flex: 1;
      display: flex;
      flex-flow: row wrap;

    }

    &-divider {
      width: 1rpx;
      background-color: #dcdfe6;

    }
  }
</style>