function f1(callback){
    setTimeout(function (){
        //f1
        callback()
    },1000)
    f1(f2)
}
new Promise(resolve=>{
   setTimeout(()=>{
       resolve('HELLO')
   },2000).then(res=>{
       console.log(res)
   })
})