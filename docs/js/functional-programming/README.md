# 函数式编程
介绍函数式编程的最佳实践，希望读完了这篇文章，你会理解函数式编程的美妙并且爱上它。
## 纯函数
>纯函数是这样一种函数：对于同样的输入，总是会产生同样的输出，没有副作用, 
尽量在你的代码中使用纯函数，这会使你的代码更加健壮，测试更加容易。

接下来来一起看看各种副作用
### 引用自由变量
看下面这段代码
```javascript
  function foo(x) {
    y = x * 2;
  }
  var y;
  foo( 3 );
```
分析上面的代码，调用函数改变了函数外的变量y, 产生了副作用，因此不是纯函数

当一个函数引用了函数外的变量，也就是自由变量，并不是所有的自由变量引用都是糟糕的，但是我们处理的时候必须非常小心

我们可以非常容易地将他变成纯函数
```javascript
function foo(x) {
    return x*2;
}
foo(3);
```
### 随机数
随机数也会产生副作用，对于同样的输入，结果是无法预测的
### IO
最常见的副作用是输入输出，一个程序没有IO是完全没有意义的，因为它的工作不能用任何方式观测到，举个最常见的例子
```javascript
var users = {};

function fetchUserData(userId) {
    ajax( `http://some.api/user/${userId}`, function onUserData(user){
        users[userId] = user;
    } );
}
```
fetchUserData改变了users, 想变得更纯一点，我们可以创建一个包裹函数`safer_fetchUserData`，将外部变量和不纯的函数都包裹起来
```javascript
function safer_fetchUserData(userId,users) {
    // 拷贝一份外部变量
    users = Object.assign( {}, users );

    fetchUserData( userId );

    return users;


    // ***********************

    // 原始的非纯函数:
    function fetchUserData(userId) {
        ajax(
            `http://some.api/user/${userId}`,
            function onUserData(user){
                users[userId] = user;
            }
        );
    }
}
```
`safer_fetchUserData`更纯一点，但是依然不是纯函数，因为依赖ajax调用的结果，ajax的副作用是无法消除的
从上面也可以看出，副作用无法完全消除，我们只能尽可能地写纯函数，将不纯的部分都收集在一起

##  一元函数
一元函数是指只有一个参数的函数，以此类推，还有二元函数，多元函数
考虑下面这段代码
```javascript
["1","2","3"].map( parseInt );
```
相信很多人都会不假思索的回答[1,2,3], 但是真实的结果是[1, NaN, NaN], 认真思考一下array.map（fn）这个高阶函数的执行过程，在每一轮的迭代中，fn函数都会执行，执行的时候会传入三个参数, 分别是数组的这一轮的元素，索引，和数组本身，所以真实的执行情况是
```
parseInt("1", 0, ["1","2","3"])
parseInt("2", 1, ["1","2","3"])
parseInt("3", 2, ["1","2","3"])
```
parseInt(x,radix）可以接受两个参数，所以第三个参数忽略，第一个参数x代表要转换的值， 第二个参数radix是转换进制，当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 x 来判断数字的基数。

当忽略参数 radix , JavaScript 默认数字的基数如下:

如果 x 以 "0x" 开头，parseInt() 会把 x 的其余部分解析为十六进制的整数。

如果 x 以 0 开头，那么 ECMAScript v3 允许 parseInt()
的一个实现把其后的字符解析为八进制或十六进制的数字。

如果 x 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。
所以最后结果是[1, NaN, NaN]也就不足为奇了

那么如何解决这个问题，返回预期的结果, 估计很多人不假思索都会想出这种方式
```javascript
["1","2","3"].map(v => parseInt(v));
```
没错，的确可以得到正确的结果，简单粗暴，直接明了，但是这种方式是不是可以稍微封装一下，具有扩展性
在函数式编程中，可以用这个一元转换函数包裹目标函数，确保目标函数只会接受一个参数
```javascript
function unary(fn) {
    return function onlyOneArg(arg){
        return fn(arg);
    };
}
["1","2","3"].map( unary(parseInt) ); // [1,2,3]
```
## 偏函数 partial    
固定一个函数的一个或者多个参数，返回一个新的函数，这个函数用于接受剩余的参数, 和map结合使用比较多
```javascript
    function partial(fn, ...presetArgs) {
        return function partiallyApplied(...laterArgs ) {
           return fn(...presetArgs, ...laterArgs )
       } 
    }
    // 应用1
    var getPerson = partial( ajax, "http://some.api/person" )
    var getOrder = partial( ajax, "http://some.api/order" )
    // version1
    var getCurrentUser = partial(ajax, "http://some.api/person", {user: "hello world"})
    // version 2
    var getCurrentUser = partial( getPerson, { user: CURRENT_USER_ID } );
    // 应用2
    function add(x, y){
        return x + y
    }
    [1,2,3,4,5].map( partial( add, 3 ) )
```
上面的偏函数对参数是从左到右固定，我们也可以很轻易地写一个从右到左的偏函数
```javascript
    function partialRight(fn, ...presetArgs) {
        return function partiallyApplied(...laterArgs) {
            return fn(...laterArgs, ...presetArgs)
        }   
    }
```
## 科里化 curry (ing) 
柯里化是一种将一个多元函数转换成一系列低元函数的技术。

```javscript
    function add(a, b) {
        return a + b;
    }
    
    // 执行 add 函数，一次传入两个参数即可
    add(1, 2) // 3
    // 假设有一个 curry 函数可以做到柯里化
    var addCurry = curry(add);
    addCurry(1)(2) // 3
```
下面是一个简单的实现
```javascript
function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fn) {
    var length = fn.length;
    var slice = Array.prototype.slice;
    return function() {
        // 如果函数参数没有传递完，那么继续curry
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
            // 参数传递完了，自己返回函数的执行结果了
        } else {
            return fn.apply(this, arguments);
        }
    };
}



```
我们封装的这个curry函数, 第一次只能传入参数，之后返回的函数才可以继续传原函数的参数,也就是只可以这么调用

```javascript
curry(add)(1)(2)
curry(add)(1, 2)
```

如果你使用过其他函数库比如`lodash`，它的curry函数就非常灵活，**第一次调用就可以传递函数参数，只要参数没传递完，下次调用返回的就是柯里化的函数，参数传递完毕，返回的就是函数执行的结果**，对于上面的例子，可以这么调用

```javascript
curry(add, 1, 2)()
curry(add)(1)(2)
curry(add)(1, 2)
curry(add, 1)(2)
```

我们来想办法实现这种功能的curry函数

```javascript
function curry(fn) {
    var length = fn.length;
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function() {
        var _args = args.slice(0)
        for(var i = 0; i < arguments.length; i++) {
            _args.push(arguments[i]);
        }
        if (_args.length < length) {
            return curry.apply(this, [fn, ..._args]);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}

```


## 组合 compose

函数组合，将一个函数的输出当成另外一个函数的输入，让数据流可以像水在水管中流动一样，为了组合，必须保证组合的函数参数只能有一个，而且必须有返回值
```javascript
    // 执行顺序从右向左
    function compose(...fn) {
        return function composed(result){
            var list = [...fn]
            while(list.length > 0) {
                result = list.pop()(result)
            }
            return result
        }
    }
    // 管道函数， 从左向右移动
    function pipe(...fn) {
        return function piped(result) {
            var list = [...fn]
            while(list.length > 0) {
                result = list.shift()(result)
            }
            return result
        }
    }

```
##  递归 recursion
```javascript
// 判断一个数是不是素数
function isPrime(num,divisor = 2){
    if (num < 2 || (num > 2 && num % divisor == 0)) {
        return false;
    }
    if (divisor <= Math.sqrt( num )) {
        return isPrime( num, divisor + 1 );
    }
    return true;
}
// 计算二叉树的深度
function depth(node) {
    if(node) {
            let depthLeft = depth(node.left)
            let depthRight = depth(node.right)
            return 1 + Math.max(depthLeft, depthLeft)
    }
    return 0
}
```
* 递归太深，会存在内存溢出的问题，需要用**尾调用**来优化
```javascript
    // 解决栈溢出的问题，尾调用优化
    // 尾调用的概念非常简单，就是指某个函数的最后一步是调用另一个函数。
    // 下面都不是
    // 情况一
    function f(x){
      let y = g(x);
      return y;
    }
    
    // 情况二
    function f(x){
      return g(x) + 1;
    }
    
    // 阶乘函数
    function factorial(n) {
        if( n === 1) {
            return 1
        }
        return n*factorial(n-1)
    }
```
将阶乘函数改成尾调用, 确保最后一步只调用自身, 就是把所有用到的内部变量改写成函数的参数
```javascript
    function factorial(n, total) {
        if (n===1) {
          return total  
        }
        return factorial(n - 1, n*total)
    }
    // 但是这样会传两个参数,用两个函数改写一下
    function factorial(n) {
        return tailFactorial(n ,1)
    }
    function tailFactorial(n, total) {
        if (n===1) {
          return total  
        }
        return tailFactorial(n - 1, n*total)
    }
    
    // 继续改写, tailFactorial放在factorial内部
    function factorial(n) {
        function tailFactorial(n, total) {
            if (n===1) {
            return total  
            }
            return tailFactorial(n - 1, n*total)
        }
        return tailFactorial(n ,1)
    } 
    
    // 也可以使用curry函数，将多参数的函数转换为单参数的形式
    function currying(fn, n) {
      return function (m) {
        return fn(m, n);
      };
    }
    function tailFactorial(n, total) {
        if (n===1) {
          return total  
        }
        return tailFactorial(n - 1, n*total)
    } 
    var factorial = currying(tailFactorial, 1)
    factorial(5)
```
