
function arr(){
    setTimeout(function(){     
        console.log('1');   
    },0)   
    async function async1(){    
        console.log('4');    
        await async2(); 
        //开始异步
        console.log('6');   
    }   
    async function async2(){    
        console.log('5');   
    }   
    async1();   
    new Promise(function(resolve,reject){    
        console.log('2');    
        resolve();   
    }).then(function(e2){    
        console.log('h');   
    })   
    console.log('3');  
}
// 4 5 2 3 6 h 1
arr();

var f=(x)=>x;
var f1=(x)=>(x); //加括号和没加括号一样
var f2=(x) =>({x})//返回对象
console.log(f(1),f1(1),f2(1))