//实现一个call方法
//call 的实例
var name = 'pp'
var obj = {
    name:'cc'
}
function fn(){
    console.log(this.name)
}
fn() //pp
fn.call(obj) //cc

//例子2
var foo ={
    value :2
}

function bar(){
    console.log(this.value)
}

bar.call(foo)//2
 //等价于调用call的时候，把foo对象改成了
var foo={
    value:2,
    bar:function(){
        console.log(this.value)
    }
}
foo.bar()//2
//模拟分三步走：1.将函数设置为对象的属性 2.执行该函数 3.删除该函数
foo.fn = bar
foo.fu()
delete foo.fn
Function.prototype.call2=function(context){
    //没传参数或者为null是默认是window
    var context =context||window
    //首先要获取调用call的函数，用this可以获取
    context.fu=this
    var args =[]
    for(var i=1;i<arguments.length;i++){
        args.push('arguments['+i+']')
    } 
    eval('context.fn('+args+')')
    delete context.fn
}
bar.call(null)
//apply 把 arguments 换成 arr就好了
