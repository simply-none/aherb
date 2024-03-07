# 基座app

## 联调开发注意事项

### web应用联调前准备

第一步：点击[DCloud uni-app](https://gitcode.net/dcloud/hello-uni-app-x/-/tree/alpha/hybrid/html)，下载`uni.webview.x.x.x.js`文件，放入到与`index.html`同级的目录下

第二步：在应用的入口文件（比如index.html）中，加入以下代码：

```html
<html>
  <body>
    <div id="app"></div>
  </body>
  <!-- 开始加入uni通信功能代码 -->
  <script type="text/javascript" src="./uni.webview.x.x.x.js"></script>
  <script>
    document.addEventListener('UniAppJSBridgeReady', function() {
       // ......
    });
  </script>
  <!-- 结束加入uni通信功能代码 -->
</html>
```

第三步：在使用`uni.xxx`功能的代码文件中，关闭eslint功能

### web应用发送数据给基座app

第一步：在使用`uni.xxx`功能的代码文件中，关闭eslint功能

第二步：`uni.postMessage`方法的参数定义：

```javascript
/**
 * type: {string} 发送数据的目的，比如获取token（getToken）
 *   type的值：
 *      getToken
 *      getAuth
 *      ......
 *  payload：{object} 发送数据附带的其他数据信息
 */
function uni.postMessage ({
  type: string,
  payload: object
}) {
  return null
}
```

第三步：发送数据

**vue3**

```vue
<template>
  <div>
    <button @click="sendDataToBaseApp">
      发送数据给基座app
    </button>
  </div>
</template>

<script setup>
function sendDataToBaseApp () {
  const data = {
    name: 'sub-app',
    date: (new Date()).toLocaleTimeString()
  }
  // 使用uni.postMessage()发送数据
  uni.postMessage({
    type: 'getToken',
    payload: data
  })
}
</script>
```

**vue2**

```vue
<template>
  <div>
    <button @click="sendDataToBaseApp">
      发送数据给基座app
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    function sendDataToBaseApp () {
      const data = {
        name: 'sub-app',
        date: (new Date()).toLocaleTimeString()
      }
      // 使用uni.postMessage()发送数据
      uni.postMessage({
        type: 'getToken',
        payload: data
      })
    }
  }
}
</script>
```

### web应用从基座app接收数据

第一步：在使用`uni.xxx`功能的代码文件中，关闭eslint功能

第二步：接收数据

**vue3**

```vue
<template>
  <div>
    展示从基座app接收的数据：{{ baseAppData }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

let baseAppData = ref({})

// 必须将uni.postMessage参数type的值，附加到window对象上对应的该函数上，以获取相应的信息
window.getToken = function (data) {
  baseAppData.value = JSON.parse(data)
}

</script>
```

**vue2**

```vue
<template>
  <div>
    展示从基座app接收的数据：{{ baseAppData }}
  </div>
</template>

<script>
export default {
  data: {
    return {
      baseAppData: {}
    }
  },
  mounted () {
    // 必须将uni.postMessage参数type的值，附加到window对象上对应的该函数上，以获取相应的信息
    window.getToken = function (data) {
      baseAppData.value = JSON.parse(data)
    }
  },
}
</script>
```

## 注意事项

- nvue文件只能对text标签设置字体大小
- uview ui组件可能存在层级优先级冲突，所以当展示效果和预期不一致时，可调整组件的先后顺序

## 雷电模拟器端口查看

用于进行打开开发者工具进行调试

1. 先设置【setting.json】-> [运行配置] -> [安卓模拟器端口设置]，设置对应的模拟器端口号
2. cmd，打开雷电模拟器adb.exe所在位置，运行`adb nodaemon server`，得到以下结果`03-04 09:33:41.692  7380  9128 F adb     : main.cpp:165 could not install *smsocket* listener: cannot bind to 127.0.0.1:5037: 通常每个套接字地址(协议/网络址/端口)只允许使用一次。 (10048)`，可知端口号为5037
3. 点击顶部菜单栏->视图->显示webview调试控制台，
4. 在底部webbiew调试tab栏中，点击`inspect(调试)`，即可打开对应项目的开发者工具（类似web浏览器中的一样）

## 待开发项目

- 系统设置
- 个人设置
- 自动更新
- 登陆登出
- 环境切换
- 组织切换
- 多应用切换
- 展示导航
- 打开应用
- 看板