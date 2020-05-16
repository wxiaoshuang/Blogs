// 数组去重

var arr = [1,1,'true','true',true,true,undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, [], [],{},{}];
// 1 set去重
var res = [...new Set(arr)]
console.log(res) // [ 1, 'true', true, undefined, null, NaN, 'NaN', 0, [], [], {}, {} ]

// 2
function uniq(arr){
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev :[...prev, cur],[]);
}
console.log(uniq(arr));

function uniqByFilter(arr) {
    return arr.filter((v, i) => {
        return arr.indexOf(v) === i
    })
}
console.log(uniqByFilter(arr));
function uniqByMap() {
    let map = new Map()
    let res = []  // 数组用于返回结果
    for (let i = 0; i < arr.length; i++) {
        if(!map.has(arr[i])) {  // 如果有该key值
            res.push(arr[i])
        }
        map.set(arr[i], true)  // 如果没有该key值
    }
    return res
}
console.log(uniqByMap(arr));
function uniqByMap2() {
    let map = new Map()
    let res = []  // 数组用于返回结果
    for (let i = 0; i < arr.length; i++) {
        let key = typeof arr[i] + arr[i]
        if(!map.has(key)){  // 如果有该key值
            res.push(arr[i])
        }
        map.set(key, true)  // 如果没有该key值
    }
    return res
}
console.log(uniqByMap2(arr));
function unique(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
console.log(unique(arr));
let person = [
    {id: 0, name: "小明"},
    {id: 1, name: "小张"},
    {id: 2, name: "小李"},
    {id: 3, name: "小孙"},
    {id: 1, name: "小周"},
    {id: 2, name: "小陈"},
]
function uniqBy(arr, key) {
    let hash = {}
    return arr.reduce((prev, curr) => {
        hash[curr[key]] ? "" : hash[curr[key]] = true && prev.push(curr);
        return prev;
    }, [])
}

console.log(uniqBy(person, 'id'));
