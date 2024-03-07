<template>
  <view class="">
    <uni-nav-bar class="uni-nav-bar" dark shadow left-icon="left" leftText="返回" rightText="设置"
      title="自定义高度在vue文件,非满屏" />
    <web-view :src="urll"></web-view>
    <u-button style="">测试</u-button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        titleName: "",
        urll: 'https://www.baidu.com',
        navHeight: 95 //80
      }
    },
    onLoad(item) {
      console.log('a')


      // #ifdef APP-PLUS
      var height = 0; //定义动态的高度变量，如高度为定值，可以直接写
      uni.getSystemInfo({
        //成功获取的回调函数，返回值为系统信息
        success: (sysinfo) => {
          height = sysinfo.windowHeight; //自行修改，自己需要的高度 此处如底部有其他内容，可以直接---(-50)这种
        },
        complete: () => {}
      });
      var currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
      setTimeout(function() {
        var wv = currentWebview.children()[0];
        wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
          top: 65, //此处是距离顶部的高度，应该是你页面的头部 40  65
          bottom: 60,
          height: 200, //webview的高度
          scalable: true, //webview的页面是否可以缩放，双指放大缩小,
        })
      }, 500); //如页面初始化调用需要写延迟
      // #endif

      // 原文链接：https://blog.csdn.net/Xc_Wl/article/details/124858496

    },
    methods: {
      goBack() {
        uni.redirectTo({
          url: '../news/index'
        });
        // uni.reLaunch({
        //     url: '../news/index'
        // });
        // uni.reLaunch
      }
    }
  }
</script>

<style lang="scss">

</style>