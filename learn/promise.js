// 1.promise 构造函数
const promise = new Promise(function (resolve, reject) {
    //...
    if (/*异步操作成功*/true) {
        resolve(value)
    } else {
        reject(error)
    }
})
// 所以我们要实现的 promise (小写以便区分ES6的 Promise )构造函数大体如下：
//promise构造函数
function promise(fn) {
    let that = this
    that.status = 'pending' //存储promise的state
    that.value = '' //异步操作的结果
    that.reason = ''//异步操作失败的信息
    that.onFulfilledCb = [] // 存储then方法中注册的回调函数（第一个参数）
    that.onRejectedCb = [] // 存储then方法中注册的回调函数（第二个参数）

    function resolve(value) {
        // 将promise的状态从pending更改为fulfilled，并且以value为参数依次调用then方法中注册的回调
        setTimeout(() => {
            if (that.status === 'pending') {
                that.status = 'fulfilled'
                that.value = value
                that.onFulfilledCb.map(item => {
                    item(value)
                })
            }
        }, 0)
    }

    function reject(reason) {
        // 将promise的状态从pending更改为rejected，并且以reason为参数依次调用then方法中注册的回调
        setTimeout(() => {
            if (that.status === 'pending') {
                that.status = 'rejected'
                that.reason = reason
                // 2.2.3、2.2.6
                that.onRejectedCb.map(item => {
                    item(reason)
                })
            }
        }, 0)
    }

    fn(resolve, reject)
}
promise.prototype.then = function (onFulfilled, onRejected) {
    let that = this
    let promise2  
  
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => r
  
    if (that.status === 'pending') {
      return promise2 = new promise((resolve, reject) => {
        that.onFulfilledCb.push(value => {
          try {
            let x = onFulfilled(value)
          } catch(e) {
            reject(e)
          }
        })
  
        that.onRejectedCb.push(reason => {
          try {
            let x = onRejected(reason)
          } catch(e) {
            // 2.2.7.2
            reject(e)
          }
        })
      })
    }
  }

  //极度简答版then
  function promise(fn) {
    let that = this
    that.status = 'pending' //存储promise的state
    that.value = '' //异步操作的结果
    that.reason = ''//异步操作失败的信息
    that.onFulfilledCb = [] // 存储then方法中注册的回调函数（第一个参数）
    that.onRejectedCb = [] // 存储then方法中注册的回调函数（第二个参数）

    function resolve(value) {
        // 将promise的状态从pending更改为fulfilled，并且以value为参数依次调用then方法中注册的回调
        setTimeout(() => {
            if (that.status === 'pending') {
                that.status = 'fulfilled'
                that.value = value
                that.onFulfilledCb.map(item => {
                    item(value)
                })
            }
        }, 0)
    }

    function reject(reason) {
        // 将promise的状态从pending更改为rejected，并且以reason为参数依次调用then方法中注册的回调
        setTimeout(() => {
            if (that.status === 'pending') {
                that.status = 'rejected'
                that.reason = reason
                // 2.2.3、2.2.6
                that.onRejectedCb.map(item => {
                    item(reason)
                })
            }
        }, 0)
    }

    fn(resolve, reject)
}
  
// 使用时候的写法
promise.then(function(value){

},function(error){

})
//实现  
promise.prototype.then = function () {
    if (this.status === 'resolve') {
      arguments[0](value) //执行第一个参数函数
    } else if (this.status === 'reject' && arguments[1]) {
      arguments[1](error) //执行第二个参数函数
    }
  }