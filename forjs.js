//for-in 语句是一种精确迭代语句，可以用来枚举对象的属性
var txt = "";
var person = {fname:"Bill", lname:"Gates", age:62}; 
var x;
for (x in person) {
  txt += person[x] + " ";
}
console.log(txt)
//for..of循环(ES6)
//for..of循环修复了for..in存在的问题，他只遍历属于对象本身的属性值。
//且这个对象必须是iterable可被迭代的。如Array, Map, Set。
var arr=[1,2,3,4]
for(i of arr){
    console.log("for of 结果为"+i)
}
// forEach(callbackFn, ?thisArg)方法(ES5.1)
// iterable可被迭代的对象都有forEach(callbackFn, ?thisArg)。
// 而Array, Map, Set对象都是可被迭代的。
// forEach()接收一个回调函数callbackFn，每次迭代都回调该函数。
// 回调函数的参数列表为(value, key, iterable)，依次是(值, 键, 可迭代的对象本身)。
arr.forEach(function(value,key,arr){
    console.log(value,key,arr)
})