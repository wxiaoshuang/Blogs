# Javascript设计模式

设计模式是一套被反复使用的、经过无数实践总结出的程序设计方法。使用设计模式是为了重用代码、让代码更容易被理解、保证代码可靠性，可维护性

## 设计原则

设计模式存在的根本原因是为了代码复用，增加可维护性，有如下6大原则

+ 开闭原则 （Open Close Principle）

  对扩展开放，对修改关闭，在程序需要进行拓展的时候，不能去修改原有的代码，实现一个热插拔的效果

+ 里氏替换原则（Liskov Substitution Principle）

  里氏代换原则是面向对象设计的基本原则之一。 里氏代换原则中说，任何基类可以出现的地方，子类一定可以出现。LSP 是继承复用的基石，只有当派生类可以替换掉基类，且软件单位的功能不受到影响时，基类才能真正被复用，而派生类也能够在基类的基础上增加新的行为。里氏代换原则是对开闭原则的补充。实现开闭原则的关键步骤就是抽象化，而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是对实现抽象化的具体步骤的规范

+ 依赖倒置原则（Dependence Inversion Principle）

  这个原则是开闭原则的基础，具体内容：针对接口编程，依赖于抽象而不依赖于具体。

+ 接口隔离原则（Interface Segregation Principle）

  使用多个隔离的接口，比使用单个接口要好。它还有另外一个意思是：降低类之间的耦合度

+ 迪米特法则，又称最少知道原则（Demeter Principle）

  一个实体应当尽量少地与其他实体之间发生相互作用，使得系统功能模块相对独立。

+ 合成复用原则（Composite Reuse Principle）

  尽量使用合成/聚合的方式，而不是使用继承。

  

## 单例模式

### 概念解读

保证一个类只有一个实例，实现的方法一般是先判断实例是否存在，如果存在就返回，如果不存在就创建了再返回，这就保证了一个类只有一个实例。在javascript中，从全局命名空间里，提供唯一一个访问点

浏览器中的 [window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 和 [document](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 全局变量，这两个对象都是单例，任何时候访问他们都是一样的对象，`window` 表示包含 DOM 文档的窗口，`document` 是窗口中载入的 DOM 文档，分别提供了各自相关的方法。

在 ES6 新增语法的 Module 模块特性，通过 `import/export` 导出模块中的变量是单例的，也就是说，如果在某个地方改变了模块内部变量的值，别的地方再引用的这个值是改变之后的



### 代码实现

```javascript
const Singleton = (function() {
    let _instance = null        // 存储单例
    
    const Singleton = function() {
        if (_instance) return _instance     // 判断是否已有单例
        _instance = this
        this.init()                         // 初始化操作
        return _instance
    }
    
    Singleton.prototype.init = function() {
        // 做些初始化
    }
    
    Singleton.getInstance = function() {
        if (_instance) return _instance
        _instance = new Singleton()
        return _instance
    }
    
    return Singleton
})()

const visitor1 = new Singleton()
const visitor2 = new Singleton()         // 既可以 new 获取单例
const visitor3 = Singleton.getInstance() // 也可以 getInstance 获取单例

console.log(visitor1 === visitor2)	// true
console.log(visitor1 === visitor3)	// true
```



### 优缺点

单例模式主要解决的问题就是**节约资源，保持访问一致性**。

优点：

1. 单例模式在创建后在内存中只存在一个实例，节约了内存开支和实例化时的性能开支，特别是需要重复使用一个创建开销比较大的类时，比起实例不断地销毁和重新实例化，单例能节约更多资源，比如数据库连接；
2. 单例模式可以解决对资源的多重占用，比如写文件操作时，因为只有一个实例，可以避免对一个文件进行同时操作；
3. 只使用一个实例，也可以减小垃圾回收机制 GC（Garbage Collecation） 的压力，表现在浏览器中就是系统卡顿减少，操作更流畅，CPU 资源占用更少；

缺点：

1. 单例模式对扩展不友好，一般**不容易扩展**，因为单例模式一般自行实例化，没有接口；
2. **与单一职责原则冲突**，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化；

## 构造函数模式

### 概念解读

构造函数用于创建特定类型的对象-不仅申明了

## 发布订阅模式 观察者模式
