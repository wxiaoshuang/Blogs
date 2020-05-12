# call apply bind
三个函数都是通过函数来调用的，所以这三个方法是定义在Function.prototype上的  
都可以改变调用函数运行时的上下文
call和apply是立即执行该函数     
call 接收多个参数，第一个为函数上下文也就是this，后边参数为函数本身的参数  
apply接受两个参数，第一个是函数上下文，第二个参数是函数本身的参数用数组的形式传入  
bind返回一个绑定新对象后的函数


## call
```javascript
Function.prototype.myCall = function(context) {
    // 保证是函数调用myCall方法
    if(typeof  this != 'function') {
        throw new TypeError("not function")
    }
    // 第一个参数如果是空的的话或者是null的话，默认绑定到全局变量 
    context = context || window
    context.fn = this
    let args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn
    return result
}
```
如果context本身有fn属性的话,那么这种方法就会删掉这个对象的fn属性，
所以我们要想办法生成一个唯一的属性名称，
es6新增的一个数据类型Symbol就可以生成一个唯一的值，我们来改造一下
```javascript
Function.prototype.myCall = function(context) {
    if(typeof  this != 'function') {
        throw new TypeError("not function")
    }
    // 第一个参数如果是空的的话或者是null的话，默认绑定到全局变量 
    context = context || window
    const fn = Symbol('uniq')
    context[fn] = this
    let args = [...arguments].slice(1)
    let result = context[fn](...args)
    delete context[fn]
    return result
}
```
测试myCall
```javascript
var obj = {
    name: 'vampire'
}
var name = 'witch' // 这里大家试试把var改成let或者const, 看看有什么效果
function sayName() {
    return this.name
}
var r1 = sayName.myCall(obj) // vampire
var r2 = sayName.myCall() // witch
```
## apply
```javascript
Function.prototype.myBind = function(context) {
    if(typeof  this != 'function') {
            throw new TypeError("not function")
    }
    // 第一个参数如果是空的的话或者是null的话，默认绑定到全局变量 
    context = context || window
    const fn = Symbol('uniq')
    context[fn] = this
    let args = arguments[1] ? arguments[1]: []
    let result = context[fn](...args)
    delete context[fn]
    return result
}
```
## bind
bind() 方法创建一个新的函数， 当这个新函数被调用时其this置为提供的值，其参数列表前几项置为创建时指定的参数序列。

`fun.bind(thisArg[, arg1[, arg2[, ...]]])`

bind的参数和call非常类似，唯一的区别就在于除了调用bind时传入参数外，还可以在正式执行时传入参数，
两次传入参数以拼接的方式作为函数执行的实参

总的来说bind有如下三个功能点：

```
1. 改变原函数的 this 指向，即绑定上下文，返回原函数的拷贝  
2. 当绑定函数被调用时，bind的额外参数将置于实参之前传递给被绑定的方法。  
3. 注意，一个绑定函数也能使用new操作符创建对象,这种行为就像把原函数当成构造器，thisArg参数无效。
也就是new操作符修改this指向的优先级更高。
```
先来实现一二条
```javascript
Function.prototype.myBind = function(context) {
    // 保证是函数对象调用myBind方法
    if(typeof  this != 'function') {
            throw new TypeError("not function")
    }
    let self = this
    context = context || window
    let arg =  [].slice.call(arguments,1)
    let f = function() {
          let _arg = [].slice.call(arguments,0);
          return self.apply(context, arg.concat(_arg) );
    }
    return f
}
```
接下来实现第三条,先来看看第三条到底什么意思
```javascript
let obj = {
    name:'obj'
}
function getName() {
    this.name = 'getName'
}
let fn = getName.bind(obj)
let instance = new fn() 
console.log(instance.name);// 'getName', 绑定obj无效
```
也就是说，一个函数originFn调用了bind了新的执行上下文newContext，返回新的函数boundFn，
通过new boundFn()来使用的话，之前绑定的上下文newContext是无效的,
new boundFn()执行时候的this指向boundFn，而不是newContext
```javascript
Function.prototype.myBind = function(context) {
    if(typeof  this != 'function') {
        throw new TypeError("not function")
    }
    context = context || window
    let arg =  [].slice.call(arguments,1)
    let temp = function() {}
    temp.prototype = this.prototype
    let self = this
    let f = function() {
          let _arg = [].slice.call(arguments,0);
          return self.apply(this instanceof temp ? this : context, arg.concat(_arg) );
    }
    f.prototype = new temp()
    //   可以用f.prototype = Object.create(this)这行代码直接代替这些代码
    //   let temp = function() {}
    //   temp.prototype = this.prototype
    //   f.prototype = new temp()
    return f
}
```

解释下为什么要用这种方式继承，而不是f.prototype = this.prototype
`
  let temp = function() {}
  temp.prototype = this.prototype
  f.prototype = new temp()
`

这个问题就是一个继承的经典问题:  
继承为什么要用A.prototype = new B()而不是A.prototype = B或者A.prototype = B.prototype
> 要实现继承，就必须保证B继承A以后，
B所做的修改不能影响到A以及继承自A的其它对象。如果B.prototype = A的话，
那么着两个对象的引用是完全一致了，这样的话，
如果赋值 B.prototype.name=45455；
那么A.name就直接变成45455;直接把A和继承自A的其它对象全部改了，这根本谈不上继承。
  
> 至于B.prototype = A.prototype也是同理，修改B的原型就会直接把A的原型给污染掉。

> B.prototype = new A();这个方法，是创建了一个新的对象{}，
并且继承了A的原型，这是一个新对象，不是和A同一引用，所以不会污染A。

这种继承方式可以简写为：`B.prototype = Object.create(A.prototype)`

Object.create(proto)方法的原理就是
```markdown
function f(){}
f.prototype = proto
return new f()
```
