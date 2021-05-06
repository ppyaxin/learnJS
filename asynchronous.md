####js异步方式
任务完成的顺序与交付任务的时间顺序无关。
#####1.回调函数
回调是一个函数被作为一个参数传递到另一个函数里，在那个函数执行完后再执行。
- 假设f2等待f1的执行结果

```
function f1(callback){
    setTimeout(function (){
        //f1
        callback()
    },1000)
    f1(f2)
}
```
#####2.promise
- promise是一个对象
- 主要用于异步计算，可以将异步操作队列化，按照期望顺序执行，返回符合预期的结果
- 可以在对象之间传递和操作promise，帮助处理队列
- promise三个状态：
  pending:待定
  fulfilled:操作成功，将异步操作的结果作为参数传递。
  rejected:操作失败，将异步操作的错误，作为参数传递。
  当promise状态发生改变，就会触发then()里响应函数处理后续步骤。promise状态一经改变，凝固不变。
- 优点在于，将异步的操作以同步的流程表达，避免了层层嵌套的回调函数。
- 缺点在于无法取消。如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。处于pending状态时，无法得知进展到哪个阶段。
```
new Promise(resolve=>{
   setTimeout(()=>{
       resolve('HELLO')
   },2000).then(res=>{
       console.log(res)
   })
})
```
then
- 接收两个函数作为参数，分别代表fulfilled和reject
- then()返回一个新的promise实例，所以可以链式调用。
#####事件循环
js引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。
######事件循环顺序
外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段...
各个阶段大致功能
- timers: 这个阶段执行定时器队列中的回调如 setTimeout() 和 setInterval()。
- I/O callbacks: 这个阶段执行几乎所有的回调。但是不包括close事件，定时器和setImmediate()的回调。
idle, prepare: 这个阶段仅在内部使用，可以不必理会。
- poll: 等待新的I/O事件，node在一些特殊情况下会阻塞在这里。
- check: setImmediate()的回调会在这个阶段执行。
- close callbacks: 例如socket.on('close', ...)这种close事件的回调。
######轮询阶段(poll)
当个v8引擎将js代码解析后传入libuv引擎后，循环首先进入poll阶段。poll阶段的执行逻辑如下： 先查看poll queue中是否有事件，有任务就按先进先出的顺序依次执行回调。 当queue为空时，会检查是否有setImmediate()的callback，如果有就进入check阶段执行这些callback。但同时也会检查是否有到期的timer，如果有，就把这些到期的timer的callback按照调用顺序放到timer queue中，之后循环会进入timer阶段执行queue中的 callback。 这两者的顺序是不固定的，收到代码运行的环境的影响。如果两者的queue都是空的，那么loop会在poll阶段停留，直到有一个i/o事件返回，循环会进入i/o callback阶段并立即执行这个事件的callback。

值得注意的是，poll阶段在执行poll queue中的回调时实际上不会无限的执行下去。有两种情况poll阶段会终止执行poll queue中的下一个回调：1.所有回调执行完毕。2.执行数超过了node的限制。
######check阶段
check阶段专门用来执行setImmediate()方法的回调，当poll阶段进入空闲状态，并且setImmediate queue中有callback时，事件循环进入这个阶段。
######close关闭事件回调状态
当一个socket连接或者一个handle被突然关闭时（例如调用了socket.destroy()方法），close事件会被发送到这个阶段执行回调。否则事件会用process.nextTick（）方法发送出去。
######timer定时器状态
这个阶段以先进先出的方式执行所有到期的timer加入timer队列里的callback，一个timer callback指得是一个通过setTimeout或者setInterval函数设置的回调函数。
######I/O callback阶段
如上文所言，这个阶段主要执行大部分I/O事件的回调，包括一些为操作系统执行的回调。例如一个TCP连接生错误时，系统需要执行回调来获得这个错误的报告。
