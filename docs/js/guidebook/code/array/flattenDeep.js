// 数组降维
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];

function flattenDeep1(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep1(val)) : acc.concat(val), []);
}
var res = flattenDeep1(arr1);
console.log(res)
function flattenDeep2(arr){
    let ret = [];
    let toArr = function(arr){
        arr.forEach(function(item){
            Array.isArray(item) ? toArr(item) : ret.push(item);
        });
    }
    toArr(arr);
    return ret;
}

console.log(flattenDeep2(arr1));

function flattenDeep3(arr) {
    const stack = [...arr],res = []
    while(stack.length) {
        let topEle = stack.pop()
        if(Array.isArray(topEle)) {
            stack.push(...topEle)
        } else {
            res.push(topEle)
        }
    }
    res.reverse()
    return res
}
console.log(flattenDeep3(arr1));
