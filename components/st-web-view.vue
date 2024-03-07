<template>
  <view class="web-view-wrap" style="position: fixed; height: 200px; top: 100px;">
    <web-view ref="webview" :src="webUrl" @onPostMessage="receiveMessage" @message="receiveMessage" :fullscreen="false"
      style="height: 200px; top: 100px;"></web-view>
  </view>
</template>

<script>
  export default {
    name: "st-web-view",
    props: {
      webUrl: String
    },
    data() {
      return {

      };
    },
    onLoad() {
      console.log('1111')
      // vue
      let currentWebView = this.$scope ? this.$scope.$getAppWebview() : this.$parent.$scope.$getAppWebview()
      setTimeout(() => {
        let webView = currentWebView.children()[0]
        conosle.log(webView, 'webbiew')
        webView.setStyle({
          top: 150,
          height: 200,
        })
      }, 1000)


    },
    methods: {
      // data: { type: 发送数据类型, payload: 数据体 }
      sendMessage(data) {
        try {
          let transData = JSON.stringify(data)
          // vue
          // let currentWebView = this.$scope ? this.$scope.$getAppWebview() : this.$parent.$scope.$getAppWebview()
          // let webView = currentWebView.children()[0]
          // console.log(currentWebView)
          // console.log(webView, 'webview')
          // webView.evalJS(`setAccountInfo(${transData})`)
          // nvue
          this.$refs.webview.evalJS(`setAccountInfo(${transData})`)
        } catch (err) {
          console.log(err, 'err')
        }
      },
      receiveMessage(evt) {
        console.log('来自子页面的数据=', evt)
        this.subData = evt.detail.data
        this.$emit('receiveData', evt.detail.data)
      },
    }
  }
</script>

<style>
  .web-view-wrap {
    position: fixed;
    top: 280px;
  }
</style>