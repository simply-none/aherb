<template>
  <view>
    <web-view ref="webview" :style="{
			width: '100%',
			height: '200px'
		}" :fullscreen='false' :src="webUrl" @onPostMessage="receiveMessage" @message="receiveMessage"></web-view>
  </view>
</template>

<script>
  export default {
    name: "st-web-nview",
    props: {
      webUrl: String
    },
    data() {
      return {

      };
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