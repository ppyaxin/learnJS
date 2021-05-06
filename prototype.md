###原型
####1.原型属性
js中，函数本身也是包含了方法和属性的对象，函数对象有一个属性prototype。
```
function foo(a,b){
    return a*b
}
console.log(foo.constructor)
```
prototype的初始值是一个空对象。我们可以给空对象一些方法和属性，并不会对foo本身产生影响。只有foo()作为构造器，属性起作用。
```
[Function: Function]
foo {}
```
构造器函数
```
function Gadget(name,color){
    this.name=name
    this.color=color
    this.WhatAreyou=function(){
        return 'I am a'+this.color+''+this.name;
    }
}
```
可以用prototype增加构造器提供的功能
```
Gadget.prototype.price=100
```
用该构造器创建对象便可以访问之前的属性和方法，访问newtoy属性，先遍历，如果找不到就找**当前对象构造器函数的原型。**
```
var newtoy =new Gadget('fgoud','BLACKA')
```
由于原型本身也是对象，那证明他也有一个构造器,构造器也会有自己的原型。最后一环是object内建对象。
```
console.log(newtoy.__proto__) 
Gadget { price: 100 }
```
__proto__属性是对象实例指向相关原型的链接。但是__proto__与prototype不等价。__proto__实例属性，prototype为构造器属性。
###继承
####1.原型链
 ```
chilid.prototype=new Parent()
 ```
- 基于构造器的工作模式，使用原型链模式
- 默认继承机制，将可重用部分迁移到原型链中，不可重用部分设置为对象自身的属性
####2.只继承于原型
```
child.prototype=Parent.prototype
```
- 基于构造器工作的模式，原型拷贝模式，所有对象共享一个原型对象
- 该模式构建继承时候不需要新建对象实例，效率上表现更好
- 原型链查询快，因为并不存在链
- 对子对象的修改会影响父对象

####3.临时构造器方法
```
function extend(Child,Parent){
    var F =function(){}
    F.prototype=Parent.prototype
    Child.prototype=new F()
    Child.prototype.constructor=Child
    Child.uber=Parent.prototype
}
```
- 基于构造器的工作模式，使用原型链模式
- 与1的区别在于，只继承父对象的原型属性，而对于自身属性（被构造器添加到this中的属性）不予继承
- 访问父对象的便利方式（uber）
####4.只将继承部分封装成函数
####5.属性拷贝
```
function extend(Child,Parent){
    var F =function(){}
    F.prototype=Parent.prototype
    Child.prototype=new F()
    Child.prototype.constructor=Child
    Child.uber=Parent.prototype
}
```
- 基于构造器工作模式
- 使用原型模式
- 拷贝属性模式
- 将父对象原型中的全部转换成子对象圆形属性
- 无需为继承单独创建对象实例
- 原型链本身更短
####6.浅拷贝
```
function extendCopy(p){
    var c={}
    for(var i in p){
        c[i]=p[i]
    }
    c.uber=p
    return c
}
```
- 基于对象工作模式，属性拷贝模式
- 简单，没有使用原型属性
####7.深拷贝
```
function deepCopy(p,c){
    c=c|| {}
    for(var i in p){
        if(p.hasOwnProperty(i)){
            if(typeof p[i]==='object'){
                c[i]=Array.isArray(p[i])?[]:{}
                deepCopy(p[i],c[i])
            }else{
                c[i]=p[i]
            }
        }
    }
}
```
- 基于对象工作模式，属于拷贝模式
- 与浅拷贝基本相同，但所有对象执行的都是值传递
####8.对象之间的继承
####9.object()
####10.原型继承与属性拷贝混合使用
####11.多重继承
####12.寄生式继承
####13.构造器借用