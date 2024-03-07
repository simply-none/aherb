// https://juejin.cn/post/7239923199609241658#heading-6
import {
  debounce
} from "lodash";
import Service, {
  HttpDownloadResponse,
  HttpRequestConfig
} from "luch-request";
import {
  MD5
} from "crypto-js";

const backendUR = {
  dev: "http://127.0.0.1:4523/m1/1062323-0-default/",
  test: "http://127.0.0.1:4523/m1/1062323-0-default/",
  prod: "http://127.0.0.1:4523/m1/1062323-0-default/",
};

// 当前环境
export const ProcessEnv = "dev";
// 后端地址
export const baseURL = backendUR[ProcessEnv]; //本地/

/**
 *重复请求拦截 - 如果上一次请求还没有结束，相同的请求不会继续发送
 * cachcRequest：用与缓存每次请求的key
 * cacheRequestToast：用于缓存每次请求的key，用于判断是否需要弹出提示
 */
let cachcRequest = {}
let cacheRequestToast = {}

const request = new Service({
  baseURL,
  timeout: 60 * 1000,
  custom: {
    loading: false, //是否增加loading，可以设置为true 或者 string
    retry: 1, // 设置自动发送请求次数，默认1次
    closerePeatIntercept: false, // 是否关闭该接口重复请求拦截
    isSignatrue: true, // 是否开启验签
    withoutErrorToast: false, // 是否关闭错误提示
  },
  // 重复请求拦截 - 如果上一次请求还没有结束，相同的请求不会继续发送
  getTask: (task, config) => {
    if (config.custom.closerePeatIntercept) return;
    let reqKey = generateReqKey(config);
    if (cachcRequest[reqKey]) {
      cacheRequestToast[reqKey] = 1;
      task.abort();
    } else {
      cachcRequest[reqKey] = 1;
    }
  },
});

/**
 * @author: pxt
 * @return {*}
 * @description: 跳转到登陆也，使用防抖
 */
const backDebounce = debounce(
  () => {
    uni.reLaunch({
      url: "/common-pages/account",
    });
  },
  2000, {
    trailing: true,
  }
);

request.interceptors.request.use((config) => {
  /**
   *请求头增加token
   */
  config.header.Authorization = uni.getStorageSync("token");

  /**
   * 请求接口增加loading
   */
  if (config.custom?.loading) {
    uni.showLoading({
      title: typeof config.custom?.loading === "string" ?
        config.custom?.loading : "加载中",
      mask: true,
    });
  }
  return config;
});
request.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      // 清除loading
      if (response.config.custom?.loading) {
        uni.hideLoading();
      }
      // 重复请求拦截 请求成功 删除缓存
      let reqKey = generateReqKey(response.config);
      delete cachcRequest[reqKey];

      const resData = response.data;
      if (resData.code === 200) {
        resolve(resData);
      } else if (resData.code === 401) {
        uni.showToast({
          title: "登录过期，请重新登录",
          icon: "none",
          mask: true,
        });
        // 使用防抖 返回首页，防止多次跳转
        backDebounce();
        reject(resData.message);
      } else if (resData.code === 500) {
        response.config.custom.withoutErrorToast ||
          uni.showToast({
            title: resData.message,
            icon: "none",
            duration: 4000,
          });
        reject(response);
      } else {
        resolve(response);
      }
    });
  },
  // 对响应错误做点什么 （statusCode !== 200）
  async (response) => {
    if (response.config.custom?.loading) {
      uni.hideLoading();
    }
    var config = response.config;

    console.log("response", config, config.custom.retry);

    // 重复请求拦截 - 如果是重复请求，不会继续发送请求，直接返回上一次请求的结果
    let reqKey = generateReqKey(response.config);
    if (cacheRequestToast[reqKey]) {
      delete cacheRequestToast[reqKey];
      return Promise.reject(response);
    }
    if (!config || !config.custom.retry) return Promise.reject(response);
    // 请求超时判断
    if (response?.errMsg === "request:fail timeout") {
      uni.showToast({
        title: "请求超时",
        icon: "error",
        duration: 3000,
        mask: true,
      });
      return Promise.reject(response);
    }
    if (response.statusCode) {
      return Promise.reject({
        type: "none",
        msg: "系统维护中，请稍后再试"
      });
    }
    // 一般是网络断开 或者 后端卡死情况
    if (!response.statusCode) {
      // 重复请求拦截 请求失败 删除缓存
      delete cachcRequest[reqKey];
      // custom.retryCount用来记录当前是第几次发送请求
      config.custom.retryCount = config.custom.retryCount || 0;
      // 如果当前发送的请求大于等于设置好的请求次数时，不再发送请求，返回最终的错误信息
      if (config.custom.retryCount >= config.custom.retry) {
        uni.showToast({
          title: "当前网络不稳定,请检查您的网络设置",
          icon: "none",
          duration: 3000,
          mask: true,
        });
        return Promise.reject(response);
      }
      // 记录请求次数+1
      config.custom.retryCount += 1;
      // 设置请求间隔 在发送下一次请求之前停留一段时间，时间为上方设置好的请求间隔时间
      let backOff = new Promise < null > ((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 500);
      });
      // 再次发送请求
      await backOff;
      return await request.request(config);
    }
    return Promise.reject(response);
  }
);

/*
 *对请求方法进行封装，方便类型定义
 */

const requestMethods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "HEAD",
  "OPTIONS",
  "TRACE",
  "UPLOAD",
  "DOWNLOAD",
];

let exportMethod = {};
requestMethods.forEach((item) => {
  request[item.toLowerCase()] = async (
    url,
    ...args
  ) => {
    let temp = null;
    if (["get", "upload", "download"].includes(item.toLowerCase())) {
      temp = {
        url,
        method: item,
        ...(args[0] || {}),
      };
    } else {
      temp = {
        url,
        method: item,
        data: args[0],
        ...(args[1] || {}),
      };
    }
    const res = await request.request(temp);
    return (res.data.result === undefined ? res.data : res.data.result)
  };
  exportMethod[item.toLowerCase()] = request[item.toLowerCase()];
});

export default exportMethod as requests;

/**
 *工具函数
 */

// 生成请求key
function generateReqKey(config) {
  const {
    method,
    url,
    params,
    data
  } = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
}
// 对象转字url格式
function objToPathStr(val) {
  let str = "";
  for (const key in val) {
    str += key + "=" + (val[key] + "") + "&";
  }
  str = str.substring(0, str.length - 1);
  return str;
}