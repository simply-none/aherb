<template>
  <view class="sba-lasted-used">
    <view class="sba-lasted-used-app-wrapper" v-for="app in apps" :key="app.id">
      <view class="sba-lasted-used-app-title">
        <text class="sba-lasted-used-app-title-text">
          {{ app.name }}
        </text>
      </view>
      <u-grid class="sba-lasted-used-app-funcs-wrapper" :border="false">
        <u-grid-item class="sba-lasted-used-app-funcs" v-for="func in app.children" :key="func.id" @click="towebapp">
          <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="'file-text'" :size="22"></u-icon>
          <text class="sba-lasted-used-app-func">{{ func.name }}</text>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
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

      }
    },
    methods: {
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
    },
  }
</script>

<style>

</style>