<template>
  <view class="sitir-basic-app-dashboard sbad" ref="box" :style="{
      height: wrapperHeight
    }">
    <status-bar></status-bar>
    <view class="sbad-top">
      <view class="sbad-logo">
        <u-image class="sbad-image" src="@/static/sitir_logo.jpg" mode="aspectFit"></u-image>
        <text class="sbad-title font-size-base">四特酒聚合平台客户端</text>
      </view>
      <!-- 顶部导航条-右侧内容 -->
      <slot name="topright"></slot>
    </view>
    <u-divider></u-divider>
    <view class="sbad-body">
      <view class="sbad-aside">
        <block v-for="(tab) in asideTabs" :key="tab.name">
          <view class="sbad-aside-item">
            <u-icon :name="tab.icon" :color="tab.color" :size="tab.size" @click="toggleAsideTab(tab.type, tab)"
              :bold="true"></u-icon>
          </view>
        </block>
      </view>
      <view class="sbad-divider"></view>

      <!-- 窗口内容-窗口主体 -->
      <slot name="body" :showSetting="activeTab.showSetting" :showWebviews="activeTab.showWebviews"
        :activeTabComponent="activeTab.component" :onHandleData="onHandleData"></slot>
    </view>
  </view>
</template>

<script>
  import StatusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue'
  import XtxTreeNode from '@/components/xtx-treeNode/xtx-treeNode.vue'

  // #ifdef APP-NVUE
  const dom = weex.requireModule("dom");
  console.log(dom, 'dom')
  // #endif
  export default {
    components: {
      StatusBar,
      XtxTreeNode
    },
    mounted() {
      setTimeout(() => {
        dom.getComponentRect("viewport", (option) => {
          this.wrapperHeight = option.size.height - 30
        })
      }, 100);
    },
    data() {
      return {
        activeTab: {
          showSetting: false,
          name: 'apps-nav',
          component: 'show-webview-list',
          showWebviews: true,
        },
        asideTabs: [{
            type: 'webviewSelf',
            icon: 'list-dot',
            title: '打开的应用',
            topTitle: '返回',
            name: 'apps-nav',
            component: 'show-webview',
            showWebviews: false,
            color: '#000',
            size: 20,
            showSetting: false,
          },
          {
            type: 'tab',
            icon: 'setting',
            title: '设置',
            topTitle: '返回',
            name: 'setting',
            component: 'NSysSetting',
            color: '#000',
            size: 20,
            showSetting: true,
          },
        ],
        show: false,
        wrapperHeight: null,
      }
    },
    watch: {
      "activeTab.openSetting": {
        handler(n, o) {
          console.log(n, o)
          if (!n) {
            this.removeAsidetabColor()
          }
        }
      }
    },
    methods: {
      onHandleData(payload) {
        if (payload.type === 'setTab') {
          this.toggleAsideTab(payload.subType, payload.data)
        }
        console.table(payload.subType, this.activeTab)
      },
      removeAsidetabColor() {
        this.asideTabs.forEach(item => {
          item.color = '#000'
        })
      },
      toggleAsideTab(type, tab) {
        let component = {}
        console.error(type, JSON.stringify(this.activeTab))
        switch (type) {
          case 'clickAdd':
            break
          case 'tab':
            break
          case 'smallAppAndAppNavs':
            component = {
              component: 'show-webview',
              showWebviews: false,
              showSetting: false,
            }
            break;
          case 'webviewSelf':
            let con = (!this.activeTab.component.includes('show-webview') && !this
              .activeTab.showWebviews) || (this.activeTab.component.includes('show-webview-list') && this
              .activeTab
              .showWebviews)
            component = {
              component: con ? 'show-webview' : 'show-webview-list',
              showWebviews: con ? false : true,
            }
            break
          case 'otherToTabViews':
            let con2 = this.activeTab.showWebviews === true
            component = {
              component: con2 ? 'show-webview-list' : 'show-webview',
              showWebviews: con2 ? true : false,
              showSetting: false,
            }
            break
          default:
            throw new Error('未知的新类型：该类型确保已经处理完showWebviews和showSetting两个属性')
        }

        this.activeTab = Object.assign({}, this.activeTab, {
          ...tab,
          ...component
        })

        this.asideTabs.forEach(item => {
          if (item.component === tab.component) {
            item.color = '#006aff'
          } else {
            item.color = '#000'
          }
        })
        console.log(this.activeTab.component, 'latest')
      },
    }

  }
</script>

<style scoped lang="scss">
  $widthOrHeight: 36rpx;

  .sbad {
    display: flex;
    flex-flow: column nowrap;

    // 顶部样式
    &-top {
      width: 750rpx;
      height: $widthOrHeight;
      padding-right: 12rpx;
      display: flex;
      flex-flow: nowrap row;
    }

    &-logo {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }

    &-image {
      height: $widthOrHeight;
      width: $widthOrHeight;
    }

    &-title {
      padding-left: 6rpx;
      color: #000;
    }

    // 主体样式
    &-body {
      flex: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
    }

    // 主体-侧边栏样式
    &-aside {
      width: $widthOrHeight !important;
      display: flex;
      flex-flow: column;
      align-items: center;

      &-item {
        margin-top: 12px;
      }
    }

    .u-divider {
      margin: 0;
    }

    &-divider {
      width: 1rpx;
      background-color: #dcdfe6;
    }
  }
</style>