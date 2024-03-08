<template>
  <view class="sba-lasted-used">
    <status-bar></status-bar>
    <uni-nav-bar class="uni-nav-bar"  title="最近使用" />
    <app-card></app-card>
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