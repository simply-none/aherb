<template>
  <cover-view :class="[showSetting ? 'sbads-pop-setting-show' : 'sbads-pop-setting']">
    <view class="sitir-basic-app-dashboard-setting sbads">
      <view class="sbads-top">
        <view class="sbads-top-title">
          <text class=" font-size-base" v-if="componentName && componentOps[componentName]">
            {{ componentOps[componentName].title }}
          </text>
        </view>
        <view class="sbads-top-right" @click="closeSetting">
          <u-icon name="arrow-left-double"></u-icon>
          <text class="sbads-top-label font-size-base" v-if="componentName && componentOps[componentName]">
            {{ componentOps[componentName].topTitle }}
          </text>
        </view>
      </view>
      <view class="sbads-body">
        <NAppNav :class="[componentName === 'NAppNav' ? 'sbads-component-show' : 'sbads-component']"
          :render-whole="true" @setActiveWebview="setActiveWebview">
          <component :render-whole="true" :is="innerCompInSys.component" @editTitle="editSysTitle"></component>
        </NAppNav>
        <NSysSetting :class="[componentName === 'NSysSetting' ? 'sbads-component-show' : 'sbads-component']"
          :render-whole="true">
          <component :render-whole="true" :is="innerCompInSys.component" @editTitle="editSysTitle"></component>
        </NSysSetting>
      </view>
    </view>
  </cover-view>
</template>

<script>
  import NSysSettingSesc from '@/components/n-dashboard/n-sys-setting-desc.vue'
  import NEditPwd from '@/components/n-dashboard/n-edit-pwd.vue'
  import NAppNav from '@/components/n-dashboard/n-app-nav.vue'
  import NSysSetting from '@/components/n-dashboard/n-sys-setting.vue'
  export default {
    components: {
      NEditPwd,
      NSysSettingSesc,
      NAppNav,
      NSysSetting,
    },
    props: {
      componentName: [String, Boolean],
      showSetting: Boolean,
      innerCompInSys: Object,
    },
    data() {
      return {
        componentOps: {
          NAppNav: {
            icon: 'list-dot',
            title: '打开的应用',
            topTitle: '返回',
            name: 'apps-nav',
            // component: 'NShoWebviews',
            component: 'NAppNav',
            color: '#000',
            size: 20,
          },
          NSysSetting: {
            icon: 'setting',
            title: '设置',
            topTitle: '返回',
            name: 'setting',
            component: 'NSysSetting',
            color: '#000',
            size: 20,
          }
        }
      };
    },
    methods: {
      setActiveWebview(data) {
        this.$emit('setActiveWebview', data)
      },
      editSysTitle(component) {
        this.$emit('editSysTitle', component)
      },
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
      display: flex;
    }

    &-component {
      height: 0;
      flex: 0;

      &-show {
        flex: 1;
      }
    }

    &-pop-setting {
      flex: 0;
      height: 0;

      &-show {
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #fff;
        display: flex;
      }

      &-innerComp {
        height: 0;
      }
    }


  }
</style>