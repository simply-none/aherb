<template>
  <view class="sba-apps-nav-wapper">
    <status-bar></status-bar>
    <uni-nav-bar class="uni-nav-bar"  title="应用导航" />
    <view :style="{
    height: wrapperHeight + 'px'
  }" class="sitir-basic-app-apps-nav sba-apps-nav">
      <!-- 左侧：一级导航列表 -->
      <view class="sba-apps-nav-lv1">
        <view class="sba-apps-nav-lv1-list">
          <view v-for="(item, index) in indexList" :key="index">
            <u-cell :title="`系统一级-${index + 1}`">
            </u-cell>
          </view>
        </view>
      </view>

      <!-- 右侧 -->
      <view class="sba-apps-nav-lv2-wrapper">
        <!-- 顶部：二级导航滑动列表 -->
        <view class="sba-apps-nav-lv2">
          <u-sticky bgColor="#fff">
            <u-tabs :list="list1"></u-tabs>
          </u-sticky>
        </view>
        <!-- body: 应用及其功能项 -->
        <app-card :style="{
    height: appsHeight + 'px',
    overflow: 'auto'
  }"></app-card>
      </view>
    </view>

  </view>
</template>

<script>
  import AppCard from '../../components/app-card.vue'
  import StatusBar from '../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue'
  export default {
    components: {
      StatusBar,
      AppCard
    },
    data() {
      return {
        wrapperHeight: null,
        appsHeight: null,
        apps: [{
            name: '应用1111',
            children: [{
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, ]
          },
          {
            name: '应用1111',
            children: [{
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, ]
          },
          {
            name: '应用1111',
            children: [{
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, ]
          },
          {
            name: '应用1111',
            children: [{
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, ]
          },
          {
            name: '应用1111',
            children: [{
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, {
              name: '功能项1111'
            }, ]
          }
        ],
        list1: [{
          name: '领域2',
        }, {
          name: '推荐',
        }, {
          name: '电影'
        }, {
          name: '科技'
        }, {
          name: '音乐'
        }, {
          name: '美食'
        }, {
          name: '文化'
        }, {
          name: '财经'
        }, {
          name: '手工'
        }],
        indexList: [],
        urls: [
          'https://cdn.uviewui.com/uview/album/1.jpg',
          'https://cdn.uviewui.com/uview/album/2.jpg',
          'https://cdn.uviewui.com/uview/album/3.jpg',
          'https://cdn.uviewui.com/uview/album/4.jpg',
          'https://cdn.uviewui.com/uview/album/5.jpg',
          'https://cdn.uviewui.com/uview/album/6.jpg',
          'https://cdn.uviewui.com/uview/album/7.jpg',
          'https://cdn.uviewui.com/uview/album/8.jpg',
          'https://cdn.uviewui.com/uview/album/9.jpg',
          'https://cdn.uviewui.com/uview/album/10.jpg',
        ],
      }
    },

    onLoad() {
      this.getNav()
      
    },
    onShow() {
      // 必须使用nexttick，否则获取该函数没有任何作用
      this.$nextTick(() => {
        this.getSysInfo()
      })
    },
    methods: {
      getSysInfo() {
        console.log('this ')
        let that = this;
        uni.getSystemInfo({
          success: function(res) {
            uni.createSelectorQuery().select('.uni-status-bar').boundingClientRect().select('.uni-nav-bar')
              .boundingClientRect().select('.sba-apps-nav-lv2')
              .boundingClientRect().exec(data => {
                console.log(res, data, 'res data')
                that.wrapperHeight = res.windowHeight - (data[0].height || 0) - (data[1].height || 0)
                that.appsHeight = that.wrapperHeight - (data[2].height || 0)
              })
          },
          fail(err) {
            console.log(err, 'err')
          }

        });
      },
      towebapp() {
        console.log('to-app', uni)
        uni.navigateTo({
          url: '/pages/test_nvue',
          fail(err) {
            console.log(err, 'err')
          },
          success(res) {
            console.log(res, 'res')
          }
        })
      },
      getNav() {
        for (let i = 0; i < 30; i++) {
          this.indexList.push({
            url: this.urls[uni.$u.random(0, this.urls.length - 1)]
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sba-apps-nav {
    display: flex;
    flex-direction: row;
    // overflow: hidden;

    // 左侧
    &-lv1 {
      width: 200rpx;
      overflow: auto;

      &-list {
        width: inherit;
      }
    }


    // 右侧
    &-lv2-wrapper {
      width: calc(100% - 200rpx);
      flex: 1;
    }

    &-lv2 {
      &-wrapper {
        overflow: auto;
      }
    }

    &-app {
      &-funcs-wrapper {
        margin: 16rpx;
        border: 1px solid #eeeeee;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      }

      &-title {

        &-text {
          font-size: 1.2em;
          font-weight: 400;
          color: #3c3c3c;
          display: inline-block;
          padding: 10rpx;
          border-left: 18rpx solid #b3b3b3;
        }
      }

      &-func {}
    }
  }
</style>