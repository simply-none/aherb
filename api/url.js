let URL = ""
if (process.env.NODE_ENV == "development") {
	// 本地联调环境
	URL: 'http://host10.ant.magicsmithy.sitir.net'
	// URL: 'http://host20.ant.magicsmithy.sitir.net'
} else {
	// 生产环境	
	URL = "http://sommelier.pro2.pro-plat-3.ant.ac.sitejiu.local/sitir-sommelier-service"
}
// 按需导出地址
export default {
	URL
}