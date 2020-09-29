//定义函数方法
//1.函数声明定义函数
var x = myFunction(4, 3)

function myFunction(a, b) {
    return a * b
}
//2.函数表达式定义函数，函数可以在变量中存储
var y = function (a, b) {
    return a * b
};
//在变量中保存函数表达式之后，此变量可用作函数
//此函数是匿名函数，保存在变量中的函数不需要函数名，她们使用变量名来调用
var z = y(3, 4)
//3.Function()构造器
var myFunction = new Function("a", "b", "return a * b");
var x = myFunction(4, 3);
//与上面例子等价，尽量在js中避免使用new关键词
var myFunction = function (a, b) {
    return a * b
};
var x = myFunction(4, 3);

//自调用函数
//函数表达式可以作为“自调用”，自调用表达式自动被开始
//函数表达式会执行，加入表达式后跟着（）
//无法对函数声明自调用，需添加括号
(function () {
    var x = "hello"; //我会调用我自己
})

//箭头函数
//箭头函数允许用简短的语法来编写函数表达式
var x = function (x, y) {
    return x * y;
}
//等价于
const x = (x, y) => x * y
//箭头函数没有自己的this。他们不适合定义对象方法
//使用const安全因为始终是常量值
//单个语句可省略{}和return
const x = (x, y) => {
    return x * y
}

//参数：js函数不会对参数值进行任何检查，不检查数据类型，参数数量
//调用时省略了参数，丢失的参数值被设置为：undefined
//参数通过值传递，对象通过引用传递。即：参数的改变在函数外不可见，对象属性的改变在函数外可见

//通过方法调用函数
//this指的是拥有当前代码的对象
//可以将函数定义成对象方法
var myObject = {
    first = "pp",
    last = "yaxin",
    full: function () {
        return this.first + " " + this.last
    }
}
myObject.full(); //将返回pp yaxin

//通过函数构造器来调用函数，通过new关键词创建新对象
//新对象继承构造器内属性和方法
//构造器内this关键词没有值
//this的值会成功调用函数时创建的新对象
// 这是函数构造器：
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName = arg2;
}

// 创建了一个新对象：
var x = new myFunction("Bill", "Gates");
x.firstName; // 会返回 "Bill"

//使用call()方法，可以编写在不同对象上使用的方法，可以使用属于另一个对象的方法
//如果一个函数不是js对象的方法，那么它就是全局对象的函数
var person = {
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName: "Bill",
    lastName: "Gates",
}
var person2 = {
    firstName: "Steve",
    lastName: "Jobs",
}
person.fullName.call(person1); // 将返回 "Bill Gates"
//call可以接受参数
var person = {
    fullName: function (city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}
var person1 = {
    firstName: "Bill",
    lastName: "Gates"
}
person.fullName.call(person1, "Seattle", "USA");
//apply()与call()之间的区别：call()分别接受参数，apply()接受数组形式的参数
var person = {
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName: "Bill",
    lastName: "Gates",
}
person.fullName.apply(person1); // 将返回 "Bill Gates"

var person = {
    fullName: function (city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}
var person1 = {
    firstName: "John",
    lastName: "Doe"
}
person.fullName.apply(person1, ["Oslo", "Norway"]); //后面数组是城市和国家

//js变量属于本地或者是全局作用域，变量能够通过闭包实现私有
//全局变量活得和应用程序一样久，局部变量在函数调用时候被创建，在函数完成后被删除
//闭包指的是有权访问父作用域的函数，即使在父函数关闭之后。
add = (function () {
    var counter = 0;
    return function () {
        return counter += 1;
    }
})();

add();
add();
add();
// 计数器目前是 3 