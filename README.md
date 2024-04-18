# README

> 开发环境：     
> 
> HBuilder x: 3.8.12        
> node: 16.20.0     
> npm: 8.19.4         
> os: Windows 10 家庭版 22H2 19045.3324

## 页面设置

- pages:
  - n-env: 环境设置
  - n-login：登录
  - n-main：主页面

## 组件设置

> 把设置内容全部引入到主页面中，是模拟器太卡了，后期看手机效果

- components：
  - n-dashboard：主页面布局
  - n-dashboard-select-org：选择组织
  - n-setting：设置页面结构
  - n-app-nav: 设置页面-应用导航界面
  - n-sys-setting：设置页面-设置
  - n-sys-setting-desc：设置页面-设置-设置详情
  - n-edit-pwd：设置页面-设置-修改密码
  - n-web-nview：webview页面

## 功能

> 目前为止，容易出错的地方是，webview的页面展示问题，目前将所有的webview和设置组件都放在一个view下的同一个层级，通过条件：height:0隐藏某界面，flex: 0展示某界面（内容高度），也可定宽定高