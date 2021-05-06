function f1(callback) {
    setTimeout(function () {
        //f1
        callback()
    }, 1000)
    f1(f2)
}


new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ test: 1 })
        resolve({ test: 2 })
        reject({ test: 2 })
    }, 1000)
}).then((data) => {
    console.log('result1', data)
}, (data1) => {
    console.log('result2', data1)
}).then((data) => {
    console.log('result3', data)
})
//result1 { test: 1 }
//result3 undefined

function Promise(fn) {
    let state = 'pending';
    let value = null;
    const callbacks = [];

    this.then = function (onFulfilled) {
        return new Promise((resolve, reject) => {
            handle({ //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
                onFulfilled,
                resolve
            })
        })
    }

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback)
            return;
        }

        if (state === 'fulfilled') {
            if (!callback.onFulfilled) {
                callback.resolve(value)
                return;
            }
            const ret = callback.onFulfilled(value) //处理回调
            callback.resolve(ret) //处理下一个 promise 的resolve
        }
    }
    function resolve(newValue) {
        const fn = () => {
            if (state !== 'pending') return

            state = 'fulfilled';
            value = newValue
            handelCb()
        }

        setTimeout(fn, 0) //基于 PromiseA+ 规范
    }

    function handelCb() {
        while (callbacks.length) {
            const fulfiledFn = callbacks.shift();
            handle(fulfiledFn);
        };
    }

    fn(resolve)
}
