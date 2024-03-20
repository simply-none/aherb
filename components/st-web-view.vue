<template>
  <view class="web-view-wrap" :style="viewStyle">
    <web-view ref="webview" :src="webUrl" @onPostMessage="receiveMessage" @message="receiveMessage" :fullscreen="false"
      class="web-view-inner" :style="viewStyle"></web-view>
  </view>
</template>

<script>
  export default {
    name: "st-web-view",
    props: {
      webUrl: String,
      viewStyle: {
        type: Object,
        default: () => ({
          width: '100%',
          height: '100%',
        })
      }
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
</style>