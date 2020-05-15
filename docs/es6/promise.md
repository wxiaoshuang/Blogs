```javascript
function MyPromise(executor) {
    this.state = PENDING
    let self = this
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []
    function reslove(value) {
        if(self.state === PENDING) {
            self.value = value
            self.state = FULFILLED
            setTimeout(function() {
                self.fulfilledCallbacks.forEach(fn => {
                    fn(value)
                })
            })
        }
    }
    function reject(value) {
        if(self.state === PENDING) {
            self.value = value
            self.state = REJECTED
            setTimeout(function() {
                self.rejectedCallbacks.forEach(fn => {
                    fn(value)
                })
            })
        }
    }
}
try {
    executor(reslove, reject)
}catch(e) {
    reject(e)
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'funcion'? onFulfilled : value => value
      onRejected = typeof onRejected === 'funcion'? onRejected : e => throw e
      let self = this
      let promise2
      if(self.status === PENDING) {
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
      } else if(self.status === REJECTED) {
           setTimeout(() => {
                try {
                    let x = onRejected(self.value)
                    resolutionPromise(promise2, x, resolve, reject)
                }catch(e) {
                    reject(err)
                }
            })
      } else {
        promise2 = new MyPromise((resolve, reject) =》 {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolutionPromise(promise2, x, resolve, reject)
                }catch(e) {
                    reject(err)
                }
            })
        })
      }
}
function resolutionPromise(promise2, x, resolve, reject) {
    if(x === promise2) {
        throw new TypeError("erro")
    }
    let called = false
    if (x !== null && typeof x === 'object' || typeof x === 'function') {
        let then = x.then
        if(typeof then === 'function') {
            then.call(x, y => {
                    if (called) return
                    called = true
                    resolutionPromise(promise2, y, resolve, reject)
                }, e => {
                    if (called) return
                    called = true
                    reject(e)
                })
        } else {
            resolve(x)
        }
    } elese {
      resolve(x)
    }
}
```