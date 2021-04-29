function fn(i){
    return function(n){
        console.log(n+ (i++))
    }
}
var f = fn(10)
f(20)//
fn(30)(40)
fn(40)(50)
f(30)
//a是自由变量，因为a既不是foo的参数也不是foo的局部变量
var a = 1;
function foo() {
    console.log(a);
}
foo();
//是闭包的条件：1.即使创建他的上下文已经销毁，它仍然存在
//2.在代码中引用了自由变量
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();
//闭包必考题
var data = [];
for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}
data[0]();
data[1]();
data[2]();

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}
data[0]();
data[1]();
data[2]();