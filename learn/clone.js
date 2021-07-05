function shallowclone(obj) {
    let cloneObj = {}
    for (let i in obj) {
        cloneObj[i] = obj[i]
    }
    return cloneObj
}

function deepClone(obj) {
    if (typeof obj == "object") {
        var result = obj.constructor === Array ? [] : {}
        for(var i in obj){
            result[i] ==typeof obj[i]==="object"? deepClone(obj[i]):obj[i]
        }
    }else{
        var result =obj
    }
    return result
}