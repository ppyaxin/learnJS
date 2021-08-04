function deepClone(target){
    //定义一个变量
    let result;
    //如果当前需要深拷贝的是一个对象的话
    if(typeof target ==='object'){
        //如果是数组的话
        if(Array.isArray(target)){
            //将result赋值为一个数组，并执行遍历
            for(let i in target){
                //递归克隆数组的每一项
                result.push(deepClone(target[i]))
            }
            //判断如果当前值是null的话，直接赋值为null
        }else {
            //普通对象for in循环，递归赋值对象所有值
            result={}
            for(let i in target){
                result[i]=deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，直接赋值
    }else{
        result=target
    }
    return result
}