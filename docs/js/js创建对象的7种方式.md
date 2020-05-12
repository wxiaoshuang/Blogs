# js中创建对象的7种方法
## 1 工厂模式
工厂模式是软件工程领域一种广为人知的设计模式，
这种模式抽象了创建具体对象的过程
```javascript
function createPerson(name, age) {
    var o = new Object()
    o.name  = name;
    o.age = age;
    o.sayName = function() {
        console.log(this.name)
    }
    return o;
}
var p1 =  createPerson('Alice', 17)
var p2 = createPerson('Bob', 20)
```
工厂模式虽然解决了创建多个相似对象的问题，
但却没有解决对象识别的问题（即怎样知道一个对象的类型
## 2 构造函数模式
```javascript
function Person(name, age) {
    this.name  = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name)
    }
}
var p1 =  new Person('Alice', 17)
var p2 = new Person('Bob', 20)
console.log(p1 instanceof Object);  //true
console.log(p1 instanceof Person);  //true
console.log(p2 instanceof Object);  //true
console.log(p2 instanceof Person);  //true
```
使用new调用构造函数实际上会经历以下几个步骤
   1. 创建一个新对象  
   2. 新对象的原型链接到构造函数的prototype
   3. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；  
   4. 执行构造函数中的代码（为这个新对象添加属性）；  
   5. 如果构造函数没有返回值或者返回的不是一个对象类型，那么返回这个新对象

我们来模拟实现一个new

```javascript
function myNew(constructor) {
    // 1
    var object = new Object() 
    // 2
    object.__proto__ = constructor.prototype 
    // 3 4
    var args = Array.prototype.slice.call(arguments, 1)
    var result = constructor.apply(this, args) 
    //5
    return typeof result === 'object' ? result : object 
}
// 这样调用Person
var p1 = myNew(Person, 'Alice', 20)
```
优点： 可以区分对象类型

缺点： 每个方法都要在每个实例上重新创建一
## 3 原型模式
js中创建的每个函数都有一个prototype
（原型）属性，这个属性是一个指针，指向一个对象，
而这个对象的用途是包含可以由特定类型的所有实例共享的属
性和方法。如果按照字面意思来理解，那么prototype
就是通过调用构造函数而创建的那个对象实例的原型对象。
使用原型对象的好处是可以让所有对象实例共享它所包含的属
性和方法。
```javascript
function Person() {
    
}
Person.prototype.name = "Alice"
Person.prototype.age = 20
Person.prototype.friends = ['A','B']
Person.prototype.lovedColors = ['res','blue']
Person.prototype.sayName = function() {
    console.log(this.name)
}
var p1 = new Person()
p1.name = 'new Alice'
p1.friends.push('new Friend') //改变引用类型的属性，地址不变
p1.lovedColors = ['yellow'] // 直接指向一个新的地址
var p2 = new Person()
// p1.name = "new Alice"
// p1.friends = ["A", "B", "new Friend"]
// p2.name= "Alice"
// p2.friends= ["A", "B", "new Friend"]
// p1.lovedColors ["yellow"]
// p2.lovedColors ["res", "blue"]
delete p1.name
// p1.name = 'Alice'
```
优点：可以区分实例类型
缺点：省略了为构造函数传递初始化参数这一环节，
结果所有实例在默认情况下都将取得相同的属性

原型中所有属性和方法是被所有实例共享，共享对于函数非常合适。对于那些包含基本值的属性也说得过去，
通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，
对于包含引用类型值的属性来说，修改一个实例的这个属性值可能会影响到所有实例的这个属性值
## 4 组合模式
　组合使用构造函数模式和原型模式

创建自定义类型的最常见方式，
就是组合使用构造函数模式与原型模式。
构造函数模式用于定义实例属性，
而原型模式用于定义方法和共享的属性。结果，
每个实例都会有自己的一份实例属性的副本，
但同时又共享着对方法的引用，最大限度地节省了内存。另外
，这种混成模式还支持向构造函数传递参数；
可谓是集两种模式之长
```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}
Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends);    //"Shelby,Count,Van"
alert(person2.friends);    //"Shelby,Count"
alert(person1.friends === person2.friends);    //false
alert(person1.sayName === person2.sayName);    //true
```
**组合模式是用来定义引用类型的一种默认模式**

## 5 动态原型模式
动态原型模式所有信息都封装在了构造函数中，
而通过在构造函数中初始化原型（仅在必要的情况下），
又保持了同时使用构造函数和原型的优点。换句话说，
可以通过检查某个应该存在的方法是否有效，
来决定是否需要初始化原型
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
     // 这段代码只会在初次调用构造函数时才会执行。此后，
     //  原型已经完成初始化，不需要再做什么修改了。不过要记住，
     //  这里对原型所做的修改，能够立即在所有实例中得到反映。
     //  因此，这种方法确实可以说非常完美
    if(typeof this.sayName !== 'function') {
        Person.prototype.sayName = function() {
            console.log(this.name)
        }
    }
}
var friend = Person("Nicholas", 29);
friend.sayName();  //"Nicholas"
```
## 6 寄生构造函数模式
这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，
然后再返回新创建的对象；但从表面上看，
这个函数又很像是典型的构造函数

```javascript
function Person(name, age) {
    var o = new Object()
    o.name  = name;
    o.age = age;
    o.sayName = function() {
        console.log(this.name)
    }
    return o;
}
var p1 =  new Person('Alice', 17)
var p2 = new Person('Bob', 20)
```
除了使用new
操作符并把使用的包装函数叫做构造函数之外，
这个模式跟工厂模式其实是一模一样
缺点：不能区分实例类型，返回的对象与构造函数或者与构造函数的原型属性之间没有关系
## 7 稳妥构造函数模式
所谓稳妥对象，指的是没有公共属性，
而且其方法也不引用this
的对象。稳妥对象最适合在一些安全的环境

```javascript
function Person(name) {
    var o = new Object()
    o.sayName = function() {
        console.log(name)
    }
    return o
}
var friend = Person("Nicholas");
friend.sayName();  //"Nicholas"
//这样，变量
//person中保存的是一个稳妥对象，而除了调用
//sayName()
//方法外，没有别的方式可以访问其数据成员
```
