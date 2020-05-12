
# 实现继承的方法
## 1 原型链
其基本思想是利用原型让一个引用类型继承另一个引用类型的
属性和方法
```javascript
function Parent(name) {
    this.name = name
    this.friend = [1, 2, 3]
}
Parent.prototype.sayName = function() {
    console.log(this.name)
}
function Child(age) {
    this.age = age
}
Child.prototype = new Parent()
let c1 = new Child(20)
let c2 = new Child(10)
c1.friend.push(4)
console.log(c1.friend)  // [1, 2, 3, 4]
console.log(c2.friend)  // [1, 2, 3, 4]
console.log(c1 instanceof Child) // true
console.log(c1 instanceof Parent) // true
```
原型链如图

![image-20200325193915602](./images/image-原型链.png)

优点：可以区分实例的类型

缺点：包含引用类型的原型属性会被所有实例共享

没法向父类的构造函数传递参数，确切的说应该是没办法在不影响所有实例对象的前提下向父类构造函数传递参数

## 2 借用构造函数
```javascript
function Parent(name) {
    this.name = name
    this.friend = [1, 2, 3]
}
parent.prototype.sayName = function() {
    console.log(this.name)
}
function Child(age, name) {
    // 继承了Parent,同时传递了参数
    Parent.call(this,name)
    // 实例属性
    this.age = age
}
let c1 = new Child('lilei', 20)
let c2 = new Child('Alice', 10)
c1.friend.push(4)
console.log(c1.friend) // [1. 2. 3, 4]
console.log(c2.friend) // [1, 2, 3]
c1.sayName() // lilei
c2.sayName() // Alice
```
优点：可以在子类的构造函数中向父类的构造函数传递参数
缺点: 方法和属性都在构造函数中定义，函数无法复用, 在父类中原型上定义的的方法，对子类也是不可见的

## 3 组合继承
组合继承，也叫经典继承，将原型链技术和用构造函数组合在一起
```javascript
function Parent(name) {
    this.name = name
    this.friend = [1, 2, 3]
}
// 继承方法
parent.prototype.sayName = function() {
    console.log(this.name)
}
function Child(age, name) {
    // 继承了Parent,同时传递了参数
    Parent.call(this,name) // 第二次调用父类构造函数，在实例上创建了name和friend属性，屏蔽了原型上的同名属性
    // 实例属性
    this.age = age
}
Child.prototype = new Parent() //  第一次调用父类构造函数,在子类原型上创建了name和friend属性
let c1 = new Child('lilei', 20)
let c2 = new Child('Alice', 10)
c1.friend.push(4)
console.log(c1.friend) // [1. 2. 3, 4]
console.log(c2.friend) // [1, 2, 3]
c1.sayName() // 'lilei'
c2.sayName() // 'Alice'
console.log(c1 instanceof Child) // true
console.log(c1 instanceof Parent) // true
```
优点：包含了原型链继承和借用构造函数继承的优点，是javascript中最常用的继承模式
缺点：父类构造函数会调用两次，而且会在子类原型上创建不必要的属性

## 4 原型式继承

```javascript
function object(o) {
    function f () {}
    f.prototype = o
    return new f()
}
var person = {
    name:'hameimei',
    friend: [1, 2, 3]
}
var another = object(person)
another.name = 'lilei'
another.friend.push(4)
another.friend // [1, 2, 3, 4]
person.friend// [1, 2,3, 4]
```

原型式继承要求必须有一个对象作为可以作为另一个对象的基础，如果有一个对象的话，
可以把它传递给object函数，然后再根据需求对得到的对象修改即可

ES6新增了Object.create方法规范了原型式继承
优点:不必刻意创造构造函数
缺点:引用类型属性共享

## 5 寄生式继承
寄生式继承的思路与寄生构造函数和工厂模式类似，
即创建一个仅用于封装继承过程的函数，
该函数在内部以某种方式来增强对象，
最后再像真地是它做了所有工作一样返回对象
```javascript
function object(o) {
    function f () {}
    f.prototype = 0
    return new f()
}

function createAnother(original){
    var clone = object(original);    // 通过调用函数创建一个新对象
    clone.sayHi = function(){        //以某种方式来增强这个对象
        alert("hi");
    };
    return clone;                    //返回这个对象
}
```
在这个例子中，createAnother()函数接收了一个参数，也就是将要作为新对象基础的对象。
然后，把这个对象（original）传递给object()函数，将返回的结果赋值给clone。再为clone对象添加一个新方法sayHi()，最后返回clone对象。可以像下面这样来使用createAnother()函数：

```javascript
var person={
	name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

这个例子中的代码基于person返回了一个新对象——anotherPerson。新对象不仅具有person的所有属性和方法，而且还有自己的sayHi()方法。在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。前面示范继承模式时使用的object()函数不是必需的；任何能够返回新对象的函数都适用于此模式

缺点： 和借用构造函数模式一样，不能函数复用

## 6 寄生组合式继承
谓寄生组合式继承，即通过借用构造函数来继承属性，
通过原型链的混成形式来继承方法。其背后的基本思路是：
不必为了指定子类型的原型而调用超类型的构造函数，
我们所需要的无非就是超类型原型的一个副本而已。本质上，
就是使用寄生式继承来继承超类型的原型，
然后再将结果指定给子类型的原型
```javascript
function object(o) {
    function f () {}
    f.prototype = 0
    return new f()
}
//  第一步是创建超类型原型的一个副本。
//  第二步是为创建的副本添加constructor
//  属性，从而弥补因重写原型而失去的默认的constructor
//  属性。最后一步，将新创建的对象（即副本）
//  赋值给子类型的原型。这样，我们就可以用调用
//  inheritPrototype()
//  函数的语句
function inheritPrototype(child, parent) {
    var prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}
```

```javascript
function object(o) {
    function f () {}
    f.prototype = 0
    return new f()
}
function inheritPrototype(child, parent) {
    var prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}
function Parent(name) {
    this.name = name
    this.friend = [1, 2, 3]
}
// 继承方法
parent.prototype.sayName = function() {
    console.log(this.name)
}
function Child(age, name) {
    // 继承了Parent,同时传递了参数
    Parent.call(this,name) 
    // 实例属性
    this.age = age
}
inheritPrototype(Child, Parent)
Child.prototype.sayAge = function() {
    console.log(this.age)
}
```
优点: 只调用了一次父类构造函数 ，保持了原型链，能够正常的使用instanceof和isPrototypeOf,
**寄生组合式继承被认为是引用类型最理想的继承方式**
