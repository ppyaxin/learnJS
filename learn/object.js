function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    //每个函数都有一个原型属性,这个属性是一个指针,只想一个对象.
    //好处在于可以让所有实例对象共享它包含的属性方法
    Person.prototype.hh="hhh"
    this.sayName = function () {
        console.log(this.name)
    }
}
// 步骤:
// 1.创建新对象
// 2.讲构造函数的作用域赋给新对象(this指向新对象)
// 3.执行构造函数中的代码(为这个新对象添加属性)
// 4.返回新对象
var person1 = new Person("gerto", 29, "softare")
var person2 = new Person("Goyeo", 39, "doctor")

console.log(person1.constructor==Person)
console.log(person1 instanceof Object)

//任何函数,用new调用,可以作为构造函数,不通过new调用为普通函数
// Person("iroui",21,"hgiutp")
// window.sayName()

function foo(a,b){
    return a*b
}
console.log(foo.constructor)
console.log(foo.prototype)

function Gadget(name,color){
    this.name=name
    this.color=color
    this.WhatAreyou=function(){
        return 'I am a'+this.color+''+this.name;
    }
}
Gadget.prototype.price=100
var newtoy =new Gadget('fgoud','BLACKA')
console.log(newtoy.__proto__)

function extend(Child,Parent){
    var F =function(){}
    F.prototype=Parent.prototype
    Child.prototype=new F()
    Child.prototype.constructor=Child
    Child.uber=Parent.prototype
}
function extend2(Child,Parent){
    var p=Parent.prototype
    var c=Child.prototype
    for(var i in p){
        c[i]=p[i]
    }
    c.uber=p
}
function extendCopy(p){
    var c={}
    for(var i in p){
        c[i]=p[i]
    }
    c.uber=p
    return c
}

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