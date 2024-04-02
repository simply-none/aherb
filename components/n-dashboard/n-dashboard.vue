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
      <view class="sbad-topright">
        <view class="sbad-avatar"><u-avatar size="28" text="特" randomBgColor></u-avatar></view>
        <view class="sbad-org" @click="handleSelectOrgDialog(true)">
          <text class="sbad-org-title font-size-base">
            {{selectOrg.orgName || '选择组织' }}
          </text>
          <u-icon name="arrow-down"></u-icon>
        </view>
      </view>
    </view>
    <u-divider></u-divider>
    <view class="sbad-body">
      <view class="sbad-aside">
        <block v-for="(tab) in asideTabs" :key="tab.name">
          <view class="sbad-aside-item">
            <u-icon :name="tab.icon" :color="tab.color" :size="tab.size" @click="toggleAsideTab(tab)"
              :bold="true"></u-icon>
          </view>
        </block>

      </view>
      <view class="sbad-divider"></view>

      <!-- 窗口内容主体 -->
      <slot name="body" :showSetting="activeTab.showSetting" :showWebviews="activeTab.showWebviews"
        :activeTabComponent="activeTab.component" :onHandleData="onHandleData"></slot>
    </view>
    <u-popup :safeAreaInsetTop="true" class="sbad-popup" :show="show" mode="right"
      @close="handleSelectOrgDialog(false)">
      <scroll-view scroll-y="true">
        <view class="sbad-popup-scroll">
          <xtx-treeNode :list="orgs" @change="change"></xtx-treeNode>
        </view>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
  import StatusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue'
  import XtxTreeNode from '@/components/xtx-treeNode/xtx-treeNode.vue'

  import orgsData from '@/components/n-dashboard/orgs.js'

  // #ifdef APP-NVUE
  const dom = weex.requireModule("dom");
  console.log(dom, 'dom')
  // #endif
  export default {
    props: {
      showWebViews: Boolean,
      // activeTab: Object,
    },
    components: {
      StatusBar,
      XtxTreeNode
    },
    mounted() {
      this.orgs = orgsData
      this.dealObjectValue(this.orgs)
      setTimeout(() => {
        dom.getComponentRect("viewport", (option) => {
          console.log('view port', option)
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
            icon: 'list-dot',
            title: '打开的应用',
            topTitle: '返回',
            name: 'apps-nav',
            // component: 'NShoWebviews',
            component: 'show-webview-list',
            color: '#000',
            size: 20,
            showSetting: false,
          },
          {
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
        selectOrg: {},
        orgs: [],
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
        console.log('active tab')
        if (payload.type === 'setTab') {
          this.activeTab = Object.assign({}, this.activeTab, payload.data)
        }
        console.table(this.activeTab)
      },
      removeAsidetabColor() {
        this.asideTabs.forEach(item => {
          item.color = '#000'
        })
      },
      toggleAsideTab(tab) {
        let component = {

        }
        console.error(tab.name, this.activeTab.name, this.activeTab.component, 'show-webview-list')

        if (tab.name === this.activeTab.name && this.activeTab.name === 'apps-nav' && this.activeTab.component ===
          'show-webview-list') {
          console.log('1')
          component = {
            component: 'show-webview',
            showWebviews: false,
            showSetting: false,
          }
        } else if (tab.name === this.activeTab.name && this.activeTab.name === 'apps-nav' && this.activeTab
          .component === 'show-webview') {
          console.log('2')
          component = {
            component: 'show-webview-list',
            showWebviews: true,
            showSetting: false,
          }
        } else {
          console.log('3')
        }
        this.activeTab = Object.assign({}, this.activeTab, {
          ...tab,
          ...component
        })
        console.log(tab.name, '切换tab', this.activeTab, )

        this.asideTabs.forEach(item => {
          if (item.name === tab.name) {
            item.color = '#006aff'
          } else {
            item.color = '#000'

          }
        })
      },
      change(org) {
        console.log(org, 'org')
        this.handleSelectOrgDialog(false)
        this.selectOrg = org
      },
      dealObjectValue(data) {
        data.forEach(item => {
          item.isOpen = true
          if (item.children)
            this.dealObjectValue(item.children)
        })
      },
      handleSelectOrgDialog(flag) {
        this.show = flag
      }
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

    &-topright {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
    }

    &-avatar {}

    &-org {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      &-title {
        padding: 0 3rpx 0 6rpx;
      }
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

    // 弹窗样式
    &-popup {
      flex: 0;
      height: 0;

      &-scroll {
        display: flex;
        flex-flow: column nowrap;
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