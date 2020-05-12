# Promise

郑重声明，这篇文章虽然有手写promise的代码(引用)， 但是文章重点不是手把手教你写一个promise!!! 

这仅仅是一篇视频学习笔记，视频[链接在此](https://www.bilibili.com/video/av77292118)

看了网上各种各样的手写promise和promise教程，我必须承认这个是我看过讲的最好的promise教程！！！昨天一口气看到了凌晨两点，从使用到深入挖掘，再到最后的实现，真的超级精彩，本人语言表达能力有限，尽量给大家讲明白，强烈推荐大家去看原视频，看完你会有一种醍醐灌顶的感觉！！！

## Promise是什么

promise是js异步编程新的解决方案(旧的是什么?)

* 语法上: Promise是一个构造函数
* 功能上: Promise对象用来封装一个异步操作并可以获得其结果

Promise状态：promise有三种状态

初始状态： pending    成功: fulfilled  失败: rejected

无论成功还是失败, 都会有一个结果(value or reason)

状态一旦从pending变为其他两个状态，状态不可以再变了，结果也不会变了

Promise的执行流程   

```javascript                                                                                                      
                                                                                   then()                 
                                成功,执行resolve() > Promise对象(fulfilled状态) > 回调onFulfilled()                

  new Promise() > 执行异步操作 {                                                                   } 新的Promise对象            

                                失败,执行reject()  > Promise对象(rejected状态)  > 回调onRejected()           
                                                                                 then()/catch() 
                    

```

## 异步解决方案

promise为异步而生，在promise出现之前，我们的异步解决方案就是回调函数(回调函数(callback function)就是给另外一个宿主函数做参数的函数。回调函数在宿主函数内执行，执行结果返回给宿主函数)

现在有三件事doFirstThing, doSecondThing, doThirdThing, 第二件事依赖第一件事的结果,第三件事依赖第二件事的结果，如果我们要得到第三件事的结果

现在我们用不同的方案来实现

1. 回调函数

```javascript
doFirstThing(function(result) { //第一个函数function就是sucessCallback
  doSecondThing(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log('Got the final result' + finalResult)
    }, failureCallback)
  }, failureCallback)
}, failureCallback)
```

一旦嵌套太深，代码将会难以阅读和维护, 也就是形成了传说中的回调地狱(callback hell)

2. 用promise异步编程

``` javascript
doFirstThing().then(function(result) { //result是doFirstThing函数成功执行的返回值
        return doSecondThing(result) //执行器函数,同步回调
    })
    .then(function(newResult) { //newResult是doSecondThing成功执行的返回值
        return doThirdThing(newResult)
    })
    .then(function(finalResult) {
        console.log('Got the final result' + finalResult)
    })
    .catch(failureCallback) //统一的错误处理
```

回调函数采用了嵌套的方式依次调用doFirstThing(), doSecondThing(), doThirdThing(), 而Promise使用then将它们链接起来。

相比回调函数而言，Promise代码可读性更高，代码的执行顺序一目了然

JavaScript从ES8(即ECMAScript 2017)开始支持Async/Await。它让我们可以采用同步的方式调用Promise函数，提高异步代码的可读性。

3. 异步的终极解决方案 aysnc/await

在定义函数时，在其前面添加一个async关键字，就可以在函数内使用await了。当await一个Promise时，代码会采用非阻塞的方式继续执行下去。当Promise成功resolve了，await语句会正真执行结束，并获取resolve的值。当Promise失败reject了，await语句初会throw一个错误。

``` javascript
async function request() {
    try {
        const result = await doFirstThing()
        const newResult = await doSecondThing(result)
        const finalResult = await doThirdThing(newResult)
        console.log('Got the final result' + finalResult)
    } catch (error) {
        failureCallback(error)
    }
}
```

忽然之间，代码的可读性提高了非常多！当然，async/await的神奇之处不止于此。async/await的出错处理非常方便，因为我们可以把同步代码和异步代码写在同一个try…catch…语句中。async/await代码调试更加方便，使用Promise时，我们无法设置断点，而async/await代码可以像同步代码一样设置断点!!

## Promise API介绍

1. Promise.resolve

   返回一个成功/失败的promise对象

2. Promise.reject

   返回一个失败的promise对象

3. Promise.all方法: (promises) => {}

   promises: 包含n个promise的数组
   说明: 返回一个新的promise, 只有所有的promise都成功才成功

4. Promise.race方法: (promises) => {}

   promises: 包含n个promise的数组
   说明: 返回一个新的promise, 第一个完成的promise的结果状态就是最终的结果状态


## 搞懂几个Promise的关键问题

### 1 error属于promise哪个状态

``` javascript
const p = new Promise((resolve, reject) => {
    throw new Error('出错了') //属于rejected状态
})

p.then(
    value => {},
    reason => {
        console.log('reason', reason)
    }

)
//reason Error: 出错了
```

### 2 一个promise指定多个成功/失败回调函数 

``` javascript
const p2 = new Promise((resolve, reject) => {
    throw new Error('出错了') //属于rejected状态
})

p2.then(
    value => {},
    reason1 => {
        console.log('reason1', reason1)
    }
).then(
    reason2 => {
        console.log('reason2', reason2)
    }
)
// 打印结果
// reason1 Error: 出错了
// reason2 undefined
```

### 3 状态改变与指定回调函数的先后次序

1. 先指定回调函数，保存当前指定的回调函数，后改变状态(同时指定数据),异步执行回调函数

``` javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1) //后改变状态(同时指定数据),异步执行回调函数
    }, 1000)
}).then( //先指定回调函数,保存当前指定的回调函数
    value => {},
    reason => {
        console.log('reason', reason)
    }
)
```

2. 先改变状态(同时指定数据), 后指定回调函数,异步执行回调函数

``` javascript
new Promise((resolve, reject) => {
    resolve(1) //先改变状态(同时指定数据)
}).then( //后指定回调函数,异步执行回调函数
    value => {
        console.log('value', value)
    },
    reason => {
        console.log('reason', reason)
    }
)
console.log('-----') //先输出----, 再输出value 1
```

### 4 promise.then()返回的新promise的结果状态由什么决定

我们之道，**执行then是返回一个新的promise的，所以我们才可以链式调用，那么then返回的新的promise的结果和状态到底由什么决定？**

看完下面几个例子，相信你可以自己总结出来

在此申明一下，这个问题很重要，提醒一遍，最后会来一个终极题目考察你对promise的掌握程度

#### 4.1 在then里面什么也不返回

``` javascript
new Promise((resolve, reject) => {
    resolve(1)
}).then(
    value => {
        console.log("onFulfilled1()", value)
    }
).then(
    value => {
        console.log("onFulfilled2()", value)
    },
    reason => {
        console.log("onRejected2()", reason)
    }
)
// 打印结果
// onFulfilled1() 1
// onFulfilled2() undefined
```

#### 4.2 在then里面返回一个promise

如果返回一个fulfilled的promise, 那么继续then调用会执行成功的回调，如果返回一个rejected的promise，那么继续then调用会执行失败的回调

``` javascript
new Promise((resolve, reject) => {
    resolve(1)
}).then(
    value => {
        console.log("onFulfilled1()", value)
        return Promise.resolve(3) //返回一个新的且状态为fulfilled的promise
    }
).then(
    value => {
        console.log("onFulfilled2()", value)
    },
    reason => {
        console.log("onRejected2()", reason)
    }
)
// 打印结果
// onFulfilled1() 1
// onFulfilled2() 3
```

``` javascript
new Promise((resolve, reject) => {
    resolve(1)
}).then(
    value => {
        console.log("onFulfilled1()", value)
        return Promise.reject(3) //返回一个新的且状态为rejected的promise
    }
).then(
    value => {
        console.log("onFulfilled2()", value)
    },
    reason => {
        console.log("onRejected2()", reason)
    }
)
// 打印结果
// onFulfilled1() 1
// onRejected2() 3
```


#### 4.3 在then里面抛出一个异常

``` javascript
new Promise((resolve, reject) => {
    resolve(1)
}).then(
    value => {
        console.log("onFulfilled1()", value)
        throw 4 //新Promise状态为rejected, throw得到value值
    }
).then(
    value => {
        console.log("onFulfilled2()", value)
    },
    reason => {
        console.log("onRejected2()", reason)
    }
)
// 打印结果
// onFulfilled1() 1
// onRejected2() 4
```

#### 4.4 在then里面返回一个非Promise, 非error的普通值

``` javascript
new Promise((resolve, reject) => {
    resolve(1)
}).then(
    value => {
        console.log("onFulfilled1()", value)
        return 2 //新Promise状态为fulfilled, return得到value值
    }
).then(
    value => {
        console.log("onFulfilled2()", value)
    },
    reason => {
        console.log("onRejected2()", reason)
    }
)
// 打印结果
// onFulfilled1() 1
// onFulfilled2() 2
```

现在你知道了吧？**执行then返回的promise的状态和结果是由then中运行的回调函数执行后返回的结果决定的**，（注意：then中**运行的的回调函数**可能是onFulfilled的回调，也可能是onRejected的回调）

如果还不理解这句话，对着上面几个例子，再好好体会下，我只能说成这样了

### 如何串联多个操作任务 

``` javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('执行任务1(异步)')
        resolve(1)
    }, 1000)
}).then(
    value => {
        console.log('任务1的结果', value)
        console.log('执行任务2(同步)')
        return 2
    }
).then(
    value => {
        console.log('任务2的结果', value)

        return new Promise((resolve, reject) => {
            //启动任务3(异步)
            setTimeout(() => {
                console.log('执行任务3(异步)')
                resolve(3)
            }, 1000)
        })
    }
).then(
    value => {
        console.log('任务3的结果', value)
    }
)
```

### 异常穿透 

我们平时在使用then的时候，一般只传入成功的回调，也就是只传入一个参数，那么为什么最后我们还可以捕获到呢，这是因为第二个参数是默认的抛出异常的回调，这样才可以实现穿透

``` javascript
new Promise((resolve, reject) => {
    //resolve(1)
    reject(1)
}).then(
    value => {
        console.log('onFulfilled1()', value)
        return 2
    },
    //reason => Promise.reject(reason)
    reason => {
        throw reason
    } //默认failureCallback
).then(
    value => {
        console.log('onFulfilled2()', value)
        return 3
    }
).then(
    value => {
        console.log('onFulfilled3()', value)
    }
).catch(reason => {
    console.log('onRejected1()', reason)
})
```

### 中断Promise链

返回一个pending的promise就可以

``` javascript
new Promise((resolve, reject) => {
    reject(1)
}).then(
    value => {
        console.log('onFulfilled1()', value)
        return 2
    }
).then(
    value => {
        console.log('onFulfilled2()', value)
        return 3
    }
).then(
    value => {
        console.log('onFulfilled3()', value)
    }
).catch(reason => {
    console.log('onRejected1()', reason)
    return new Promise(() => {}) //返回一个pending的promise 中断promise链
}).then(
    value => {
        console.log('onFulfilled4()', value)
    },
    reason => {
        console.log('onRejected4()', reason)
    }
)
```

### 来道终极考题

跳过开胃小菜，直接上大餐，考考你到底理解了Promise没有

``` javascript
setTimeout(() => {
    console.log(0)
}, 0)
new Promise((resolve, reject) => {
    console.log(1)
    resolve()
}).then(() => {
    console.log(2)
    new Promise((resolve, reject) => {
        console.log(3)
        resolve()
    }).then(() => {
        console.log(4)
    }).then(() => {
        console.log(5)
    })
}).then(() => {
    console.log(6)
})
new Promise((resolve, reject) => {
    console.log(7)
    resolve()
}).then(() => {
    console.log(8)
})
```

答案是`1 7 2 3 8 4 6 5 0`，光看是看不出来的，要分析的，4 6 5这里比较难，我简单分析下

有两点准则请注意：

1. promise(...).then()的情况是执行promise，执行then(then的调用是同步的，只是里面的回调是异步的)，then中的回调放入微任务队列，promise状态变为fulfilled(执行了resolve)或者rejected(执行了reject)了，then的回调才会执行

2. 对于多个then链式调用的情况，注意，必须前一个then的回调执行完毕返回，后一个then的回调才会放入微任务队列。



分析：

第一轮：

0放入宏任务队列， 执行同步代码1， 2放入微队列， 执行同步代码7， 8放入微队列

```
输出： 1 7 

宏队列 [0]

微队列 [2, 8]
```

第二轮：取出宏任务对列的对头2，输出2， 继续往下执行，输出3， 4放入微任务队列，6也放入微任务队列， 5不会放入队列

这里简单分析下原因：执行3, 4 放入微任务队列，因为3已经执行完了，所以对于6来说，他的前一个then已经执行完了(没有显示return ,返回的是undefined) 所以6可以放入队列了，但是5不可以，必须4执行，5才可以放入队列

```
输出： 2 3

宏任务： [0]

微任务：[8 4 6]
```

第三轮 ：执行8，输出8，执行4， 5放入队列

```
输出： 8 4 

宏任务： [0]

微任务：[6 5]
```

后面就不分析了 ，依次输出 6 5 0

所以最终的结果是`1 7 2 3 8 4 6 5 0`

如果还是不能理解的话，指路[视频解析](https://www.bilibili.com/video/av77292118?p=40) 

## 一个简易的promise

``` javascript
/*
自定义Promise函数模块: IFFE
es5定义模块方法: 匿名函数(自)调用
*/

(function(window) {

    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'

    /*
    Promise构造函数
    excutor: 执行器函数(同步执行), 含2个参数(resolve, reject) => {}
    */
    function Promise(excutor) {
        const self = this //令函数resolve内的self与Promise的self一致

        self.status = PENDING //satus属性,初始为pending
        self.data = undefined //给promise对象指定一个用于存储结果数据的属性
        self.callbacks = [] //每个元素的结构: {onFulfilled(value){}, onRejected(reason){} }

        function resolve(value) {
            //如果当前状态不是pending,直接结束
            if (self.status !== PENDING) {
                return
            }

            //将状态改为resolved
            self.status = FULFILLED
            //保存value数据
            self.data = value
            //如果有待执行的callback函数,立刻异步执行回调函数
            if (self.callbacks.length > 0) {
                setTimeout(() => { //放入队列中执行所有成功的回调函数
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onFulfilled(value)
                    });
                })
            }
        }

        function reject(reason) {
            //如果当前状态不是pending,直接结束
            if (self.status !== PENDING) {
                return
            }

            //将状态改为rejected
            self.status = REJECTED
            //保存reason数据
            self.data = reason
            //如果有待执行的callback函数,立刻异步执行回调函数onRejected
            if (self.callbacks.length > 0) {
                setTimeout(() => { //放入队列中执行所有失败的回调函数
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onRejected(reason)
                    });
                })
            }
        }

        //立即同步执行excutor
        try {
            excutor(resolve, reject)
        } catch (error) { //如果执行器抛出异常,Promise对象变为rejected状态
            reject(error)
        }

    }

    /*
    Promise原型对象的then()
    指定成功和失败的回调函数
    返回一个新的promise对象，结果由onFulfilled/onRejected的执行结果决定
    onFulfilled回调函数: value => {}
    onRejected回调函数: reason => {}
    */
    Promise.prototype.then = function(onFulfilled, onRejected) {

        onFulfilled = typeof onFulfilled === 'function' ?
            onFulfilled : value => value

        //指定默认是失败回调
        onRejected = typeof onRejected === 'function' ?
            onRejected : reason => {
                throw reason
            }

        const self = this

        //返回一个新的promise对象
        //(状态改变) 
        return new Promise((resolve, reject) => {

            /*
            调用指定的回调函数处理,根据执行的结果,改变return的promise状态
            callback回调函数: data => {}
            */
            function handle(callback) {
                /*

                  1. 如果抛出异常,return的promise就会失败,reason就是error
                  2. 如果回调函数返回不是promise, return的promise就会成功,value就是返回值
                  3. 如果回调函数返回的是promise, return的promise结果就是这个promise的结果

                  */
                try {
                    const result = callback(self.data)

                    if (result instanceof Promise) {
                        //3. 如果回调函数返回的是promise, return的promise结果就是这个promise的结果
                        // result.then(
                        //   value => resolve(value),  //当result成功,让return的promise也成功( x=>fn(x), 将fn(x)的返回值返回)
                        //   reason => reject(reason)  //当result失败,让return的promise也失败
                        // )
                        result.then(resolve, reject) //将result的结果当作新Promise的结果（这里的resolve/reject是控制新promise的回调函数）
                    } else {
                        //2. 如果回调函数返回不是promise, return的promise就会成功,value就是返回值
                        resolve(result)
                    }
                } catch (error) {
                    //1. 如果抛出异常,return的promise就会失败,reason就是error
                    reject(error)
                }
            }

            //当前状态为pending, 保存回调函数
            if (self.status === PENDING) { //这里的self不是新promise的this
                self.callbacks.push({
                    onFulfilled(value) {
                        handle(onFulfilled)
                    },
                    onRejected(reason) {
                        handle(onRejected)
                    }
                })
            } else if (self.status === FULFILLED) {
                setTimeout(() => {
                    handle(onFulfilled)
                })
            } else { // REJECTED
                setTimeout(() => {
                    handle(onRejected)
                })
            }
        })
    }

    /*
    Promise原型对象的catch()
    指定失败的回调函数
    返回一个新的promise对象
    */
    Promise.prototype.catch = function(onRejected) {
        return this.then(undefined, onRejected)
    }

    /*
    Promise函数对象的resolve方法
    返回一个指定结果的成功的promise
    */
    Promise.resolve = function(value) {
        //返回一个失败/成功的promise
        return new Promise((resolve, reject) => {
            //value是promise
            if (value instanceof Promise) { //使用value的结果作为promise的结果
                value.then(resolve, reject)
            } else { //value不是promise => promise成功，数据是value
                resolve(value)
            }
        })
    }

    /*
    Promise函数对象的reject方法
    返回一个指定reason的失败的promise
    */
    Promise.reject = function(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    /*
    Promise函数对象的all方法
    返回一个promise,只有当所有promise成功时才成功
    */
    Promise.all = function(promises) {
        const values = new Array(promises.length) //用来保存所有成功value的数组
        //用来保存成功promise的数量
        let resolveCount = 0
        //返回新的promise
        return new Promise((resolve, reject) => {
            //遍历promises获取每个promise的结果
            promises.forEach((p, index) => {
                Promise.resolve(p).then( //p可以是数值
                    value => {
                        resolveCount++ //成功数量加1
                        //p成功，将成功的value保存进values
                        //values.push(value)  //push的value不能通过索引index获得
                        values[index] = value

                        // 如果全部成功，将return的promise改为成功
                        if (resolveCount === promises.length) {
                            resolve(values)
                        }
                    },
                    reason => { //只有一个失败，return的promise就失败
                        reject(reason) //无论reject还是resolve都只会执行一次，因为一个promise的结果一旦确定（resolved or rejected），就不可改
                    }
                )
            })
        })
    }

    /*
    Promise函数对象的race方法
    返回一个promise,其结果由第一个完成的promsie决定
    */
    Promise.race = function(promises) {
        //返回一个新的promise对象
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => { //forEach函数内部是异步的
                Promise.resolve(p).then(
                    value => {
                        resolve(value)
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }
    window.Promise = Promise
})(window)
```

上面的实现，只是一个简易的promise, 距离promise A+规范差距还挺大的, promsise A+ 规范在链接[传送门](https://promisesaplus.com/)在此, 有兴趣有能力的小伙伴可以自己去研究。

## 引一个基本符合A+规范的Promise

这是前端面试之道作者写的一个promise, 这里拿来给大家参考，promiseA+规范有872个用例，我测了下，可以跑通846个，还有26个没有跑通，虽然没有跑通100%，但是相对网上各种promise的版本，通过率是我测试最高的，所以贴出来代码给大家参考。

``` javascript
const PENDING = 'pending'
const FUIFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
    const self = this
    self.status = PENDING
    self.resolvedCallbacks = []
    self.rejectedCallbacks = []

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FUIFILLED
            self.value = value
            setTimeout(() => {
                self.resolvedCallbacks.forEach(fn => fn(self.value))
            })
        }
    }

    function reject(value) {
        if (self.status === PENDING) {
            self.status = REJECTED
            self.value = value
            setTimeout(() => {
                self.rejectedCallbacks.forEach(fn => fn(self.value))
            })
        }
    }

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const self = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => {
        throw error
    }
    let promise2
    if (self.status === PENDING) {
        promise2 = new MyPromise((resolve, reject) => {
            self.resolvedCallbacks.push(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
            self.rejectedCallbacks.push(() => {
                try {
                    let x = onRejected(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
    if (self.status === FUIFILLED) {
        promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
    if (self.status === REJECTED) {
        promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
    return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('same'))
    }
    let called = false
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, e => {
                    if (called) return
                    called = true
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            reject(e)
        }

    } else {
        resolve(x)
    }
}
```


参考：


* https://www.bilibili.com/video/av77292118
* https://dev.to/siwalikm/async-programming-basics-every-js-developer-should-know-in-2018-a9c

* 前端面试之道

