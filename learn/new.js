var newFunc = function ( func ){
    //1.新建一个空对象，并将 构造函数的原型对象赋给这个空对象
    var obj = Object.create(func.prototype);
    //2.执行构造函数，相应参数被传入，并将this的上下文指向新创建的对象obj
    var ret = func.call(obj);
    //3.如果构造函数返回了对象，就舍弃之前创建的对象obj，newObj = ret
    if(typeof ret === 'object') return ret;
    //4.反之，newObj = obj
    else return obj;
}
var foo = function(name){
    this.name = name || "100";
}
var newObj = newFunc(foo);
