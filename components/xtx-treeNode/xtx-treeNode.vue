<template>
  <view>
    <view class="item--list" v-for="(item, index) in list" :key="index">
      <view class="item--title" hover-class="tree__hover-class" @click="selectNode(item)">
        <view>
          <text class="item--title-text font-size-base">
            {{ item.orgName }}
          </text>
        </view>
        <!-- <view v-if="item.children && item.children.length" class="open__and--close"
          @click.stop="handleOpenClose(item, index)">
          {{ item.isOpen?'收起':'展开'}}
        </view> -->
      </view>
      <view v-if="item.isOpen && item.children && item.children.length" class="">
        <treeItem :list="item.children" @change="selectNode"></treeItem>
      </view>
    </view>
  </view>
</template>

<script>
  import treeItem from '../xtx-treeNode/xtx-treeNode'
  export default {
    name: 'treeItem',
    components: {
      treeItem
    },
    props: {
      list: {
        item: Array,
        default: () => []
      }
    },
    methods: {
      selectNode(item) {
        this.$emit('change', item)
      },
      handleOpenClose(item, index) {
        if (!item.hasOwnProperty('isOpen')) {
          item.isOpen = false
        }
        item.isOpen = !item.isOpen
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped lang="scss">
  .item--list {
    padding-left: 16rpx;
    width: 250rpx;
  }

  .item--title {
    display: flex;
    align-items: center;
    font-size: 12rpx;
    border-bottom: 1rpx solid #f7f7f7;
    padding: 6rpx 12rpx;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;

    &-text {
      font-size: 12rpx;
    }
  }

  .open__and--close {
    margin-left: auto;
    font-size: 12rpx;
  }

  .tree__hover-class {
    background-color: #f7f7f7;
  }
</style>