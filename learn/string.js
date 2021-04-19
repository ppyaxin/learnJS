// js字符串操作方法
// concat,用于将一个或多个字符串拼接起来,返回新字符串,原字符串不变
var stringValue="hello "
var result=stringValue.concat("world","1")
console.log("stringValue: "+stringValue)
console.log("result: "+result)
//基于子字符串创建新字符串的方法
//第一个参数指定字符串的开始位置,第二个参数指定字符串到哪里结束
console.log("result.slice(3,7): "+result.slice(3,7))
console.log("result.substring(3,7): "+result.substring(3,7))
console.log("result.sbutr(3,7): "+result.substr(3,7))
//split分割字符串
console.log("result.split: "+result.split(","))