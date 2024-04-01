<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      // #ifdef APP-PLUS
      //设置3秒后主动关闭
      try {
        setTimeout(() => {
          plus.navigator.closeSplashscreen();
        }, 1000);
      } catch (e) {
        console.log(e)
      }
      // #endif
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  // 导入uviewui
  @import "uview-ui/index.scss";

  // page是修改uni-page-body的样式
  page {
    // height: 100%;
  }
</style>