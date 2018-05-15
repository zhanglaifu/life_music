import originJsonp from 'jsonp'

export default function jsonp(url,data,option){
	url += (url.indexOf('?') < 0 ? '?' : "&") + param(data)
	return new Promise( (resolve,reject) => {
		originJsonp(url,option,(err,data) => {  //调用jsonp插件方法请求url，请求的option回调函数，最后一个是匿名的回调函数。
			if(!err){
				resolve(data)
			}else{
				reject(err)
			}
		})
	})
}


export function param(data){
	let url = ""
	for (var k in data){
		let value = data[k] !== undefined ? data[k] : ''
		url += "&" + k + '=' + encodeURIComponent(value)  //这里使用&是为了将两个不同的查询值链接起来 但是最后要消掉第一个&
	}
	return url ? url.substring(1) : ''
}
