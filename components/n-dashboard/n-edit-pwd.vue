<template>
  <scroll-view scroll-y="true" class="sitir-basic-app-dashboard-edit-pwd sbadep">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form labelPosition="left" :labelWidth="60" :model="model1" :rules="rules" ref="uForm" class="sbadep-form">

      <u-form-item label="当前账户:" ref="item1">
        <u--text class="sbadssd-account-name" text="000000000000"></u--text>
      </u-form-item>
      <u-form-item label="原密码:" prop="userInfo.name" ref="item1">
        <u--input border="surround" v-model="model1.userInfo.name"></u--input>
      </u-form-item>
      <u-form-item label="新密码:" prop="userInfo.name" ref="item1">
        <u--input border="surround" v-model="model1.userInfo.name"></u--input>
      </u-form-item>
      <u-form-item label="确认密码:" prop="userInfo.name" ref="item1">
        <u--input border="surround" v-model="model1.userInfo.name"></u--input>
      </u-form-item>
      <u-form-item ref="item1">
        <u-button @click="editPwd" size="small" type="primary" text="提交修改"></u-button>
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
      editPwd() {
        this.$emit('editTitle', 'NSysSettingSesc')
      },
      sexSelect(e) {
        this.model1.userInfo.sex = e.name
        this.$refs.uForm.validateField('userInfo.sex')
      },
      closeSetting() {
        console.log('close')
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sbadep {
    display: flex;
    flex: 1;
    flex-flow: row nowrap;

    &-form {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
    }

    &-sys {
      width: 100rpx;
      display: flex;

      &-inner {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        padding: 6rpx;
      }
    }

    &-domain {
      width: 100rpx;
      display: flex;

      &-inner {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        padding: 6rpx;
      }
    }

    &-body {
      flex: 1;
      display: flex;
      flex-flow: row wrap;

    }

    &-divider {
      width: 1rpx;
      background-color: #dcdfe6;

    }
  }
</style>