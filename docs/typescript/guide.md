# 入门指南
## 语言概述
> typescript是js的超集，可以编译成纯js,并且可以运行在任何浏览器上、Node.js环境中和任何支持ECMAScript 3（或更高版本）的JavaScript引擎中。

> 类型允许JavaScript开发者在开发JavaScript应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。
  类型是可选的，类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有JavaScript库的行为。
  
> TypeScript提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如异步功能和Decorators，以帮助建立健壮的组件。
    这些特性为高可信应用程序开发时是可用的，但是会被编译成简洁的ECMAScript3（或更新版本）的JavaScript。
## 基础类型
```typescript
// 1 boolean
let isStudent: boolean = true
// 2 number  二进制 八进制 十进制 十六进制
let num: number = 20
let bi: number = 0b11
let oc: number = 0o7
let hex: number = 0xa45
// 3 string
let str1: string = "double quato"
let str2: string = 'single quato'
// 模板字符串
let templateStr: string = `哈哈哈`
// 数组
let numArr: number[] = [1, 2,34]
let strArr: Array<string> = ['1232','asdas']
// 元祖 长度和类型确定
let tuple: [number, string]
tuple[0] = 1
tuple[1] = 'a'
// tuple[2] = 2 越界
// any
let anything: any = 4
anything = '123'
// object
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error
```

**枚举**

```typescript
enum Color {
    RED=1,
    GREEN,
    YELLOW
}
let colorName = Color[2]
console.log(colorName)
```
编译结果
```js
var Color;
(function (Color) {
    Color[Color["RED"] = 1] = "RED";
    Color[Color["GREEN"] = 2] = "GREEN";
    Color[Color["YELLOW"] = 3] = "YELLOW";
})(Color || (Color = {}));
var colorName = Color[2];
console.log(colorName);
```
## 接口
typeScript的核心原则之一是对值所具有的结构进行类型检查
```typescript
interface SquareConfig {
    width: number; 
}
```
### 可选属性
```typescript
interface SquareConfig {
    width: number;
    color?: string;
}
```
### 只读属性
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
```
你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// 1.x = 5; // error!
```
ts为数组提供了一个接口，只读数组`ReadonlyArray`
```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
```
上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
```typescript
a = ro as number[];
```

?>**`const` vs `readonly`**  
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。

### 额外属性

 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：
```typescript
interface SquareConfig {
    width: number;
    color?: string;
    [propName: string]: any;
}
```
表示的是SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。

### 函数类型

接口除了描述对象，还可以描述函数
>为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```
```typescript
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```
### 可索引类型

> 与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型
```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```
上面例子里，我们定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值

**`TypeScript支持两种索引签名：字符串和数字`** 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象

```typescript
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
interface Okay {
    [x: number]: Dog;
    [x: string]: Animal;
}
```
字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配
```typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
```
最后，你可以将索引签名设置为只读，这样就防止了给索引赋值
```typescript
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

### 类类型
> 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约
```typescript
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```
你可以在接口中描述一个方法，在类中实现它
```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    private myTime: Date;
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```
接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员

- **类静态部分与实例部分的区别**

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误
```typescript
interface ClockConstructor {
    new (hour: number, minute: number);
}
// // Class 'Clock' incorrectly implements interface 'ClockConstructor'.   Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'
class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```
因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。
```typescript
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```
因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。
### 继承接口
> 接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
> 一个接口可以继承多个接口，创建出多个接口的合成接口。
```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```
### 混合类型
> 先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。
```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```
### 接口继承类
> 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）

!> **Important** 有点绕!
## 类

## 函数
