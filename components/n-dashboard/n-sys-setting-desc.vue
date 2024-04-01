<template>
  <scroll-view scroll-y="true" class="sitir-basic-app-dashboard-sys-setting-desc sbadssd">
    <u--form :borderBottom="false" class="sbadssd-personal" labelPosition="left" :labelWidth="132" labelAlign="right"
      :model="model1" :rules="rules" ref="uForm">

      <u-form-item label="当前账户:" :labelWidth="60" prop="userInfo.name" ref="item1">
        <view class="sbadssd-account">
          <u--text class="sbadssd-account-name" text="000000000000"></u--text>
          <u-button class="sbadssd-edit-pwd" size="small" type="primary" @click="toggleEditPwd" icon="edit-pen"
            text="修改密码"></u-button>
          <u-button class="sbadssd-logout" size="small" type="error" @click="logout" icon="lock-open"
            text="登出"></u-button>
        </view>
      </u-form-item>
      <u-form-item label="选择头像:" :labelWidth="60" prop="userInfo.name" ref="item1">
        <u-avatar text="特" randomBgColor></u-avatar>
      </u-form-item>
    </u--form>

    <u-divider></u-divider>
    <u--form class="sbadssd-env" labelPosition="left" :labelWidth="60" labelAlign="right" :model="model1" :rules="rules"
      ref="uForm">

      <u-form-item label="入口地址:" :labelWidth="60" prop="userInfo.name" ref="item1">
        <u--input border="surround" v-model="model1.userInfo.name"></u--input>
      </u-form-item>
      <u-form-item label="环境选择:" :labelWidth="60" prop="userInfo.name" ref="item1">
        <u--input border="surround" v-model="model1.userInfo.name"></u--input>
      </u-form-item>
      <u-form-item :labelWidth="60" ref="item1">
        <u-button @click="editPwd" size="small" type="primary" icon="hourglass-half-fill" text="切换"></u-button>
      </u-form-item>
    </u--form>

    <u-divider></u-divider>


    <u--form class="sbadssd-about" labelPosition="left" :labelWidth="60" labelAlign="right" :model="model1"
      :rules="rules" ref="uForm">

      <u-form-item label="当前版本:" prop="userInfo.name" ref="item1">
        <view class="sbadssd-update">
          <u--text class="sbadssd-version" text="4.0.0"></u--text>
          <u-button size="small" icon="download" text="检查更新"></u-button>
        </view>
      </u-form-item>
    </u--form>

  </scroll-view>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        showSex: false,
        model1: {
          userInfo: {
            name: 'uView UI',
            sex: '',
          },
        },
        actions: [{
            name: '男',
          },
          {
            name: '女',
          },
          {
            name: '保密',
          },
        ],
        rules: {
          'userInfo.name': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change']
          },
          'userInfo.sex': {
            type: 'string',
            max: 1,
            required: true,
            message: '请选择男或女',
            trigger: ['blur', 'change']
          },
        },
        radio: '',
        switchVal: false,
        activeTab: {
          component: '',
          openSetting: false,
        },

        tabs: [{
            name: 'account',
            title: '个人信息',
            label: 'apps',
            component: 'NAppNav',
            color: '#000',
            size: 28,
          },
          {
            name: 'calendar',
            title: '环境切换',
            label: 'setting',
            component: 'NSysSetting',
            color: '#000',
            size: 28,
          },
          {
            name: 'error-circle',
            title: '关于系统',
            label: 'setting',
            component: 'NSysSetting',
            color: '#000',
            size: 28,
          },
        ],
      };
    },
    onReady() {
      //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
      this.$refs.uForm.setRules(this.rules)
    },
    methods: {
      logout() {
        uni.redirectTo({
          url: '/pages/n-login',
          success() {
            console.log('suc')
          },
          fail(e) {
            console.log('fi', e)
          }
        })
      },
      toggleEditPwd() {
        this.$emit('editTitle', 'NEditPwd')
      },
      closeSetting() {
        console.log('close')
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sbadssd {
    padding: 6rpx;
    display: flex;
    flex: 1;
    flex-flow: column nowrap;

    // 个人信息
    &-personal {}

    &-account {
      display: flex;
      flex-flow: row;

      &-name {}
    }

    &-edit-pwd {
      margin: 0 6rpx 0 24rpx;
    }

    &-logout {}


    // 环境入口
    &-env {}



    // 关于系统
    &-about {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }

    &-update {
      display: flex;
      flex-flow: row;

      .u-text {}

      .u-button {
        margin: 0 0 0 6rpx;
      }
    }

    &-version {
      display: flex;
    }

    .u-divider {
      margin: 0;
    }
  }
</style>