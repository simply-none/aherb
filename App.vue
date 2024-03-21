<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
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