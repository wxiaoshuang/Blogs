# 

## 常见问题

* ```JavaScript```七种内置类型: ```number、string、boolean、undefined、null、object、symbol```(ES6新增加)
* ```基本类型：```指保存在栈内存中的数据，```引用类型：```([对象引用]())指保存在堆内存中的对象，传递的是引用的地址
* ```弱类型：```变量没有类型, 变量持有的值有类型
* ```(typeof null === 'object') = true```，正确的返回值应该是```null```，但是这个```bug```由来已久。 ```(undefined == null) = true```
* ```indexOf```为```ECMAScript5```新方法，```IE8```及以下不支持
*  ```setTimeout(callback, 100)```，```setTimeout```只接受一个函数做为参数不接受闭包，因为闭包会自执行，Nodejs 下最小延迟 ```1ms``` 参见 [v12.x timers.js#L167](https://github.com/nodejs/node/blob/v12.x/lib/internal/timers.js#L167)

## 欺骗词法作用域

首先明确一点，js是词法作用域，词法作用域由写代码期间函数所声明的位置来定义，而不是调用的时候确定的，但是js可以有方法欺骗此法作用域

> javascript有两种机制(eval()、with)在运行时来修改词法作用域，这样做通常会导致性能下降，内存泄漏问题。

- **eval函数接收一个字符串为参数，解析字符串生成代码并运行**

```js
function test(str, b){
    eval(str);

    console.log(a, b);
}

var a = 1;

test("var a = 3", 2); // 3 2

console.log(a); // 1
```

上面这段代码示例，eval调用的str相当于在test函数作用域内部声明了一个新的变量a，当console.log()在打印时会在foo函数内部找到a和b，将无法找到外部的a，因此最终输出结果是3和2，最外层a仍就输出是1，两者比较可以看到效果。

- **with通常被当作重复引用同一个对象中的多个属性的快捷方式**

```js
{
function withObj(obj){
    with(obj){
        a = 2
    }
}

let o1 = {
    a: 1,
}

let o2 = {
    b: 1,
}

withObj(o1);
console.log(o1.a); // 2

withObj(o2);
console.log(o2.a); // undefined
console.log(a); // 2
}
```

以上示例中withObj(obj)函数接受一个obj参数，该参数是一个对象引用，执行了with，o1传进去，a=2赋值操作找到了o1.a并将2赋值给它，o2传进去，因为o2没有a属性，就不会创建这个属性，o2.a保持undefined，这个时候就会创建一个新的全局变量a。

- **对性能的影响**

javascript引擎在编译阶段会进行性能优化，很多优化依赖于能够根据代码词法进行静态分析，预先确定了变量和函数的定义位置，才能快速找到标识符，但是在词法分析阶段遇到了with或eval无法明确知道它们会接收什么代码，也就无法判断标识符的位置，最简单的做法就是遇到with或eval不做任何优化，使用其中一个都会导致代码运行变慢，因此，请不要使用他们。

## 数据类型

javascript中的数据类型可以分成两类：基本数据类型和引用数据类型

基本数据类型包括Number, String, Boolean, Undefined, Null, Symbol(ES6新增)

引用数据类型只有一种，是Object

基本数据类型用typeof 来判断

```javascript
typeof 1 // 'number'
typeof 'adbn' // 'string'
typeof true // 'boolean'
typeof null // 'object'
typeof undefined // 'undefined'
typeof Symbol() // 'symbol'
typeof {} // 'object'
typeof [] // 'object'
typeof function() {} // 'function'
```

注意，**typeof null 的结果是 'object'**

引用类型判断使用Object.prototype.toString()方法

```javascript
Object.prototype.toString.call([])
// "[object Array]"
Object.prototype.toString.call({})
// "[object Object]"
Object.prototype.toString.call(function(){})
// "[object Function]"
Object.prototype.toString.call(null)
// "[object Null]"
Object.prototype.toString.call(undefined)
// "[object Undefined]"
Object.prototype.toString.call(1)
// "[object Number]"
Object.prototype.toString.call("1")
// "[object String]"
Object.prototype.toString.call(true)
// "[object Boolean]"
Object.prototype.toString.call(Symbol())
// "[object Symbol]"
```
### Number

## 类型转换
### 转Number
有三个函数可以转成数值类型
Number, parseInt, parseFloat
```javascript
Number("1234acv") // NaN
parseInt("1234acv") // 1234
parseFloat("1234acv") //1234
```
### 转Boolean
调用Boolean显示转换

## 数组常用方法总结

### 数组去重

数组去重方法网上十几种之多，这里只总结了自己觉得好用的几种

- **1 Set数组去重**

> ES6新的数据结构Set，类似于数组，它的元素都是唯一的。

```js
var arr = [1,1,'true','true',true,true,undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, [], [],{},{}];
var res = [...new Set(arr)]
console.log(res) 
// [ 1, 'true', true, undefined, null, NaN, 'NaN', 0, [], [], {}, {} ]
```
不考虑兼容性，这种去重的方法代码最少。这种方法无法去掉空对象,空数组
- **2  reduce + includes**

> reduce对数组中的每一个元素依次执行回调函数，不含数组中未赋值、被删除的元素，回调函数接收四个参数

* ```callback```：执行数组中每个值的函数，包含四个参数
  * ```previousValue```：上一次调用回调返回的值，或者是提供的初始值```（initialValue）```
  * ```currentValue```：数组中当前被处理的元素
  * ```index```：当前元素在数组中的索引
  * ```array```：调用 ```reduce``` 的数组
* ```initialValue```：可选，作为第一次调用 ```callback``` 的第一个参数。

```javascript
function uniqByReduce(arr) {
   return arr.reduce((prev, curr) => prev.includes(curr)? prev: [...prev, curr],[])
}
var arr = [1,1,'true','true',true,true,undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, [], [],{},{}]
console.log(uniqByReduce(arr))
// [ 1, 'true', true, undefined, null, NaN, 'NaN', 0, [], [], {}, {}]
```

- **3  filter + indexOf**

```js
var arr = [1,1,'true','true',true,true,undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, [], [],{},{}]
function uniqByFilter(arr) {
    return arr.filter((v, i) => {
        return arr.indexOf(v) === i
    })
}
console.log(uniqByFilter(arr));
// [ 1, 'true', true, undefined, null, 'NaN', 0, [], [], {}, {} ]
```
无法去掉空对象,空数组, NaN全部被筛掉了

- **4 filter + hasOwnProperty**
```javascript
function uniq(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
console.log(uniq(arr));
[ 1, 'true', true, undefined, null, NaN, 'NaN', 0, [], {} ]
```
注意：`typeof item + item`的执行顺序是`typeof item`然后再与后面的item相加
这种方法最好，可以将空数组和空对象也去重

- **5 map**

```javascript
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
// [ 1, 'true', true, undefined, null, NaN, 'NaN', 0, [], [], {}, {}]
```
不能去重空数组，空对象，将这种方法用`typeof item + item`改造一下就可以实现数组和对象的去重了
```javascript
function uniqByMap() {
    let map = new Map()
    let res = []
    for (let i = 0; i < arr.length; i++) {
        let key = typeof arr[i] + arr[i] // 构造key
        if(!map.has(key)){  // 如果有该key值
            res.push(arr[i])
        }
        map.set(key, true)  // 如果没有该key值
    }
    return res
}
console.log(uniqByMap(arr));
// [ 1, 'true', true, undefined, null, NaN, 'NaN', 0, [], [], {}, {}]
```

上面的方法适用于数组的元素是基本数据类型吗，如果数组的元素是对象，想根据对象的某个key去重



```javascript
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
    return arr.reduce((prev, next) => {
       hash[next[key]] ? "" : hash[next[key]] = true && cur.push(next);
       return cur;
    }, [])
}
```

### 深度降维

- **`递归`**

```javascript
function flattenDeep(arr){
    let ret = [];
    let toArr = function(arr){
        arr.forEach(function(item){
            Array.isArray(item) ? toArr(item) : ret.push(item);
        });
    }
    toArr(arr);
    return ret;
}
```

- **`栈`**

不使用递归，使用 stack 无限反嵌套多层嵌套数组

```javascript
function flattenDeep(arr) {
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
```



- **`reduce + concat`**

```js
function flattenDeep(arr) {
   return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
```
### 数组交集

求两个数组的交集，交集里面允许有重复元素

方法1:双指针
```js
// 
function intersection(arr1, arr2) {
    if(!arr1.length) {
        return arr2
    }
    if(!arr2.length) {
        return arr1
    }
    arr1.sort((a, b) => a - b)
    arr2.sort((a, b) => a - b)
    let i = 0
    let j = 0
    let res = []
    while(i < arr1.length && j < arr2.length) {
        if(arr1[i] < arr2[j]) {
            i++
        } else if(arr1[i] > arr2[j]) {
            j++
        } else {
            res.push(arr1[i])
            i++
            j++
        }
    }
    return res
}
```
方法2: map计数
```javascript
function intersection(arr1, arr2) {
    let map = new Map()
    let res = []
    for (let i = 0; i < arr1.length; i++) {
        if(!map.has(arr1[i])) {
            map.set(arr1[i], 1)
        } else {
            map.set(arr1[i],  map.get((arr1[i]) + 1))
        }
    }
    for (let i = 0; i < arr2.length; i++) {
        let val = map.get((arr2[i]))
        if(val && val > 0) {
            res.push(arr2[i])
            map.set(arr2[i], val - 1)
        }
    }
}
```

