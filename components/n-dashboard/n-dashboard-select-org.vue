<template>
  <view class="sbadso-topright sitir-basic-app-dashboard-slect-org">
    <view class="sbadso-avatar"><u-avatar size="28" text="特" randomBgColor></u-avatar></view>
    <view class="sbadso-org" @click="handleSelectOrgDialog(true)">
      <text class="sbadso-org-title font-size-base">
        {{selectOrg.orgName || '选择组织' }}
      </text>
      <u-icon name="arrow-down"></u-icon>
    </view>
    <u-popup :safeAreaInsetTop="true" class="sbadso-popup" :show="show" mode="right"
      @close="handleSelectOrgDialog(false)">
      <scroll-view scroll-y="true">
        <view class="sbadso-popup-scroll">
          <xtx-treeNode :list="orgs" @change="change"></xtx-treeNode>
        </view>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
  import XtxTreeNode from '@/components/xtx-treeNode/xtx-treeNode.vue'

  import orgsData from '@/components/n-dashboard/orgs.js'

  export default {
    components: {
      XtxTreeNode
    },
    mounted() {
      this.orgs = orgsData
      this.dealObjectValue(this.orgs)
    },
    data() {
      return {
        show: false,
        selectOrg: {},
        orgs: [],
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
  .sbadso {

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

    // 弹窗样式
    &-popup {
      flex: 0;
      // height: 0;

      &-scroll {
        display: flex;
        flex-flow: column nowrap;
      }
    }
  }
</style>