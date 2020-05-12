# JavaScript

## 常见问题

* ```JavaScript```七种内置类型: ```number、string、boolean、undefined、null、object、symbol```(ES6新增加)
* ```基本类型：```指保存在栈内存中的数据，```引用类型：```([对象引用]())指保存在堆内存中的对象，传递的是引用的地址
* ```弱类型：```变量没有类型, 变量持有的值有类型
* ```(typeof null === 'object') = true```，正确的返回值应该是```null```，但是这个```bug```由来已久。 ```(undefined == null) = true```
* ```indexOf```为```ECMAScript5```新方法，```IE8```及以下不支持
*  ```setTimeout(callback, 100)```，```setTimeout```只接受一个函数做为参数不接受闭包，因为闭包会自执行，Nodejs 下最小延迟 ```1ms``` 参见 [v12.x timers.js#L167](https://github.com/nodejs/node/blob/v12.x/lib/internal/timers.js#L167)

## 欺骗词法作用域

> 词法作用域由写代码期间函数所声明的位置来定义，javascript有两种机制(eval()、with)在运行时来修改词法作用域，这样做通常会导致性能下降，内存泄漏问题。

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

上面这段代码示例，eval调用的str相当于在test函数作用域内部声明了一个新的变量b，当console.log()在打印时会在foo函数内部找到a和b，将无法找到外部的a，因此最终输出结果是3和2，最外层a仍就输出是1，两者比较可以看到效果。

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

# 数组常用方法总结
## 数组去重

- **1 Set数组去重**

> ES6新的数据结构Set，类似于数组，它的元素都是唯一的。

```js
let arr = [1, 22, 33, 44, 22, 44];

console.log([...new Set(arr)]); //[1, 22, 33, 44]

```

- **2 reduce数组对象去重**

> reduce对数组中的每一个元素依次执行回调函数，不含数组中未赋值、被删除的元素，回调函数接收四个参数

* ```callback```：执行数组中每个值的函数，包含四个参数
  * ```previousValue```：上一次调用回调返回的值，或者是提供的初始值```（initialValue）```
  * ```currentValue```：数组中当前被处理的元素
  * ```index```：当前元素在数组中的索引
  * ```array```：调用 ```reduce``` 的数组
* ```initialValue```：可选，作为第一次调用 ```callback``` 的第一个参数。

示例：

```js
// 简单数组去重
function uniq(arr) {
   let hash = {};
   
   function unique(arr){
       return arr.reduce(function(previousValue, currentValue, index, array){
           hash[currentValue] ? null : hash[currentValue] = true && previousValue.push(currentValue);
   
           return previousValue
       }, []);
   } 
   unique(arr)
   return arr
}
let arr = [10, 30, 40, 40]
uniq(arr)
console.log(arr);
// 数组对象去重
function uniqBy(arr, key) {
    let hash = {};
       
       function unique(arr, key){
           return arr.reduce(function(previousValue, currentValue, index, array){
               hash[currentValue[key]] ? null : hash[currentValue[key]] = true && previousValue.push(currentValue);
       
               return previousValue
           }, []);
       } 
       unique(arr, key)
       return arr
}
const uniqueArr = uniqBy([{name: 'zs', age: 15}, {name: 'lisi'}, {name: 'zs'}], 'name');

console.log(uniqueArr); // [{name: 'zs', age: 15}, {name: 'lisi'}]
```


## 数组交集

<!-- tabs:start -->

### **js**

```js
function intersection(arr1, arr2 ) {
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

### **typescript**

```typescript
function intersection<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
    if(!arr1.length) {
        return arr2
    }
    if(!arr2.length) {
        return arr1
    }
    arr1.sort((a, b) => a - b)
    arr2.sort((a, b) => a - b)
    let i: number = 0
    let j: number = 0
    let res:Array<T>
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

<!-- tabs:end -->

## 数组降维

- **方法一：将数组字符串化**

> 利用数组与字符串的隐式转换，使用+符号链接一个对象，javascript会默认调用toString方法转为字符串，再使用字符串分割成字符串数组，最后转成数值形数组

```js
let arr = [[222, 333, 444], [55, 66, 77], 11, ]
arr += '';
arr = arr.split(',');
arr = arr.map(item => Number(item));

console.log(arr); // [222, 333, 444, 55, 66, 77, 11]
```

- **方法二：利用apply和concat转换**

> concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

```js
{
    function reduceDimension(arr) {
        return Array.prototype.concat.apply([], arr);
    }

    console.log(reduceDimension([[123], 4, [7, 8],[9, [111]]]));
    // [123, 4, 7, 8, 9, Array(1)]
}

```
- **方法三 自定义函数实现**

> 推荐使用，经测试这个是执行效率最高的。

```js
function reduceDimension(arr){
    let ret = [];

    let toArr = function(arr){
        arr.forEach(function(item){
            item instanceof Array ? toArr(item) : ret.push(item);
        });
    }

    toArr(arr);

    return ret;
}

let arr = [[12], 4, [333, [4444, 5555]], [9, [111, 222]]];

for(let i = 0; i < 100000; i++){
    arr.push(i);
}

let start = new Date().getTime();

console.log('reduceDimension: ', reduceDimension(arr));
console.log('耗时: ', new Date().getTime() - start);
```

# Vue demo

<div id="main">hello {{ msg }}</div>

<script>
  new Vue({
    el: '#main',
    data: { msg: 'Vue' }
  })
</script>

# Vuep
<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">
  <template>
    <div>Hello, {{ name }}!</div>
  </template>

  <script>
    module.exports = {
      data: function () {
        return { name: 'Vue' }
      }
    }
  </script>
</script>

<details>
  <summary>images <small>(memorable)</small></summary>

   <div>hihi</div>
</details>

# Tips
?> _TODO_ unit test

!> **Important** is money, my friend!
