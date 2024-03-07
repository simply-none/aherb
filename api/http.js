	/*
		定义并默认导出promise版本的请求方法
		params:{
			url,
			method,
			data,
			header
		}
		return:
			promise对象
	*/
import URL from './url.js'

export default (options) => {
	let arry = uni.getStorageSync('urlData')
	// console.log(arry)
	const secondUrl = '/sitir-sommelier-service'
	// 组装请求地址
	let defaultUrl = arry ? arry : 'http://sommelier.pro2.pro-plat-3.ant.ac.sitejiu.local/sitir-sommelier-service'
	let url = defaultUrl + options.url;
	return new Promise((resolve, reject) => {
		uni.request({
			// 请求地址
			url,
            // 请求方式     
			method: options.method || "get", 
            // 请求数据
			data: options.data || {},
            // 请求头
			header: options.header || {
				"Content-Type": options.method === 'post' ? 'application/json;charset=UTF-8' : "application/json",
				"Authorization": 'Bearer ' + uni.getStorageSync('localData').access_token ||'',
				"Url-Token": options.urlToken || ''
			},
			success: res => resolve(res.data),
			fail: err => reject(err)
		})
	})
}